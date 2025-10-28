-- Migration: Support Contacts Table
-- Stores support contact information for Help & Support screen

CREATE TABLE public.support_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_type TEXT NOT NULL CHECK (contact_type IN ('email', 'phone', 'link')),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_support_contacts_type ON public.support_contacts(contact_type);
CREATE INDEX idx_support_contacts_order ON public.support_contacts(display_order);

ALTER TABLE public.support_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Support contacts are public" ON public.support_contacts
  FOR SELECT USING (is_active = true);

CREATE TRIGGER update_support_contacts_updated_at
  BEFORE UPDATE ON public.support_contacts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert default support contacts
INSERT INTO public.support_contacts (contact_type, label, value, display_order) VALUES
  ('email', 'Customer Care', 'care@emailsupport.com', 1),
  ('email', 'Support', 'support@emailsupport.com', 2),
  ('phone', 'US Support', '+1 800 555 0199', 3),
  ('phone', 'International', '+234 9034588495', 4);

