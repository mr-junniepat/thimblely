-- Migration 1: Auth & Workspaces (Core)
-- Based on ERD, creates auth-related tables and workspace management

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROFILES (linked to auth.users)
-- ============================================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('business', 'customer', 'admin')),
  business_type TEXT CHECK (business_type IN ('tailor', 'fashion_designer', 'manufacturer', 'influencer')),
  country_code TEXT NOT NULL,
  region TEXT NOT NULL,
  data_residency_region TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,
  owns_workspace BOOLEAN DEFAULT FALSE,
  verification_token TEXT,
  verification_sent_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_country_region ON public.profiles(country_code, region);
CREATE INDEX idx_profiles_is_active ON public.profiles(is_active);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Service role can do everything
CREATE POLICY "Service role bypasses RLS" ON public.profiles
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ============================================================================
-- WORKSPACES
-- ============================================================================
CREATE TABLE public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  business_type TEXT NOT NULL CHECK (business_type IN ('tailor', 'fashion_designer', 'manufacturer', 'influencer')),
  description TEXT,
  logo_url TEXT,
  operating_regions TEXT[],
  primary_market TEXT,
  cross_border_enabled BOOLEAN DEFAULT TRUE,
  is_locked BOOLEAN DEFAULT FALSE,
  settings JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workspaces_owner_id ON public.workspaces(owner_id);
CREATE INDEX idx_workspaces_slug ON public.workspaces(slug);

ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own workspaces" ON public.workspaces
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Workspace members can view workspace" ON public.workspaces
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members
      WHERE workspace_id = workspaces.id AND user_id = auth.uid() AND invitation_status = 'active'
    )
  );

-- ============================================================================
-- WORKSPACE MEMBERS
-- ============================================================================
CREATE TABLE public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  permissions JSONB,
  permissions_version INTEGER DEFAULT 1,
  invitation_status TEXT DEFAULT 'pending' CHECK (invitation_status IN ('pending', 'active', 'suspended', 'removed')),
  invited_by UUID REFERENCES public.profiles(id),
  removed_at TIMESTAMPTZ,
  removed_by UUID REFERENCES public.profiles(id),
  removal_reason JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

CREATE INDEX idx_workspace_members_workspace_id ON public.workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user_id ON public.workspace_members(user_id);

ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view workspace members" ON public.workspace_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members wm
      WHERE wm.workspace_id = workspace_members.workspace_id AND wm.user_id = auth.uid() AND wm.invitation_status = 'active'
    )
  );

-- ============================================================================
-- WORKSPACE INVITATIONS
-- ============================================================================
CREATE TABLE public.workspace_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'member', 'viewer')),
  invited_by UUID NOT NULL REFERENCES public.profiles(id),
  invitation_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

CREATE INDEX idx_workspace_invitations_workspace_id ON public.workspace_invitations(workspace_id);
CREATE INDEX idx_workspace_invitations_email ON public.workspace_invitations(email);

ALTER TABLE public.workspace_invitations ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- WORKSPACE SETTINGS
-- ============================================================================
CREATE TABLE public.workspace_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  notification_preferences JSONB,
  module_permissions JSONB,
  feature_flags JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workspace_settings_workspace_id ON public.workspace_settings(workspace_id);

ALTER TABLE public.workspace_settings ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- NOTIFICATIONS
-- ============================================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_workspace_id ON public.notifications(workspace_id);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  full_name TEXT;
  initials TEXT;
  avatar_url TEXT;
BEGIN
  -- Get full name from user metadata or default to email
  full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    CONCAT(NEW.raw_user_meta_data->>'firstName', ' ', NEW.raw_user_meta_data->>'lastName'),
    NEW.email
  );
  
  -- Generate initials from first and last name
  initials := CONCAT(
    UPPER(SUBSTRING(NEW.raw_user_meta_data->>'firstName', 1, 1)),
    UPPER(SUBSTRING(NEW.raw_user_meta_data->>'lastName', 1, 1))
  );
  
  -- Generate avatar URL using UI Avatars (similar to Gravatar but with custom initials)
  avatar_url := CONCAT(
    'https://ui-avatars.com/api/?name=',
    full_name,
    '&size=128&background=A30552&color=FFFFFF&bold=true&length=2'
  );
  
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    avatar_url,
    country_code,
    region,
    data_residency_region
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(full_name, NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
    avatar_url,
    COALESCE(NEW.raw_user_meta_data->>'country_code', 'US'),
    COALESCE(NEW.raw_user_meta_data->>'region', 'americas'),
    COALESCE(NEW.raw_user_meta_data->>'region', 'americas')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON public.workspaces
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_workspace_members_updated_at
  BEFORE UPDATE ON public.workspace_members
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

