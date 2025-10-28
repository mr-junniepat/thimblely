-- Migration 2: CRM Module
-- Clients, measurements, interactions

-- ============================================================================
-- CLIENTS
-- ============================================================================
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  client_type TEXT CHECK (client_type IN ('individual', 'business')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'inactive')),
  total_revenue DECIMAL(12,2) DEFAULT 0,
  has_workspace_access BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_workspace_id ON public.clients(workspace_id);
CREATE INDEX idx_clients_status ON public.clients(status);
CREATE INDEX idx_clients_deleted_at ON public.clients(deleted_at) WHERE deleted_at IS NULL;

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- CLIENT INTERACTIONS
-- ============================================================================
CREATE TABLE public.client_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  interaction_type TEXT,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_client_interactions_client_id ON public.client_interactions(client_id);
CREATE INDEX idx_client_interactions_workspace_id ON public.client_interactions(workspace_id);

ALTER TABLE public.client_interactions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- MEASUREMENT TEMPLATES
-- ============================================================================
CREATE TABLE public.measurement_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  template_name TEXT NOT NULL,
  category TEXT,
  measurement_fields JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_measurement_templates_workspace_id ON public.measurement_templates(workspace_id);

ALTER TABLE public.measurement_templates ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- MEASUREMENT REQUESTS
-- ============================================================================
CREATE TABLE public.measurement_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  measurement_template_id UUID NOT NULL REFERENCES public.measurement_templates(id) ON DELETE CASCADE,
  requested_by UUID NOT NULL REFERENCES public.profiles(id),
  request_status TEXT DEFAULT 'sent' CHECK (request_status IN ('sent', 'pending', 'filled', 'completed')),
  request_message TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  filled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_measurement_requests_workspace_id ON public.measurement_requests(workspace_id);
CREATE INDEX idx_measurement_requests_client_id ON public.measurement_requests(client_id);

ALTER TABLE public.measurement_requests ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- CLIENT MEASUREMENTS
-- ============================================================================
CREATE TABLE public.client_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  measurement_template_id UUID NOT NULL REFERENCES public.measurement_templates(id) ON DELETE CASCADE,
  measurement_request_id UUID REFERENCES public.measurement_requests(id) ON DELETE CASCADE,
  measurements JSONB NOT NULL,
  submission_status TEXT DEFAULT 'pending' CHECK (submission_status IN ('pending', 'completed', 'reviewed')),
  submitted_by UUID REFERENCES public.profiles(id),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_client_measurements_client_id ON public.client_measurements(client_id);

ALTER TABLE public.client_measurements ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_measurement_templates_updated_at
  BEFORE UPDATE ON public.measurement_templates
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_measurement_requests_updated_at
  BEFORE UPDATE ON public.measurement_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_client_measurements_updated_at
  BEFORE UPDATE ON public.client_measurements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

