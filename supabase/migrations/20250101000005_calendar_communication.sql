-- Migration 5: Calendar & Communication

-- ============================================================================
-- EVENTS
-- ============================================================================
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  event_type TEXT CHECK (event_type IN ('appointment', 'meeting', 'fitting', 'consultation')),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  fitting_request_id UUID,
  location TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')),
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_workspace_id ON public.events(workspace_id);
CREATE INDEX idx_events_client_id ON public.events(client_id);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- EVENT REMINDERS
-- ============================================================================
CREATE TABLE public.event_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  reminder_time TIMESTAMPTZ NOT NULL,
  sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_event_reminders_event_id ON public.event_reminders(event_id);

ALTER TABLE public.event_reminders ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- FITTING REQUESTS
-- ============================================================================
CREATE TABLE public.fitting_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  request_status TEXT DEFAULT 'sent' CHECK (request_status IN ('sent', 'pending', 'accepted', 'declined', 'cancelled')),
  request_message TEXT,
  event_id UUID,
  communication_method TEXT CHECK (communication_method IN ('email', 'whatsapp', 'sms', 'phone')),
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMPTZ,
  client_notified_via_channel BOOLEAN DEFAULT FALSE,
  available_slots JSONB,
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fitting_requests_workspace_id ON public.fitting_requests(workspace_id);
CREATE INDEX idx_fitting_requests_client_id ON public.fitting_requests(client_id);

ALTER TABLE public.fitting_requests ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_fitting_requests_updated_at
  BEFORE UPDATE ON public.fitting_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- COMMUNICATION CHANNELS
-- ============================================================================
CREATE TABLE public.communication_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  channel_type TEXT NOT NULL CHECK (channel_type IN ('whatsapp_business', 'telegram_business', 'email', 'sms')),
  channel_name TEXT NOT NULL,
  phone_number TEXT,
  platform_account_id TEXT,
  credentials_ref TEXT,
  config JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  supports_orders BOOLEAN DEFAULT FALSE,
  order_settings JSONB,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_communication_channels_workspace_id ON public.communication_channels(workspace_id);

ALTER TABLE public.communication_channels ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_communication_channels_updated_at
  BEFORE UPDATE ON public.communication_channels
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- MESSAGES
-- ============================================================================
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES public.communication_channels(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  message_type TEXT CHECK (message_type IN ('text', 'image', 'video', 'order_request', 'order_confirmation')),
  content TEXT NOT NULL,
  platform_message_id TEXT NOT NULL,
  media_urls JSONB,
  metadata JSONB,
  is_order_related BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(channel_id, platform_message_id)
);

CREATE INDEX idx_messages_workspace_id ON public.messages(workspace_id);
CREATE INDEX idx_messages_channel_id ON public.messages(channel_id);
CREATE INDEX idx_messages_client_id ON public.messages(client_id);
CREATE INDEX idx_messages_deleted_at ON public.messages(deleted_at) WHERE deleted_at IS NULL;

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Update orders to reference communication_channels
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS channel_id UUID REFERENCES public.communication_channels(id) ON DELETE SET NULL;

