-- Migration 4: Finance Module

-- ============================================================================
-- TRANSACTIONS
-- ============================================================================
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL,
  category TEXT,
  amount DECIMAL(12,2) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_workspace_id ON public.transactions(workspace_id);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- FINANCIAL GOALS
-- ============================================================================
CREATE TABLE public.financial_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  goal_type TEXT NOT NULL,
  target_amount DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_financial_goals_workspace_id ON public.financial_goals(workspace_id);

ALTER TABLE public.financial_goals ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_financial_goals_updated_at
  BEFORE UPDATE ON public.financial_goals
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- AUTO SPLITS
-- ============================================================================
CREATE TABLE public.auto_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  split_type TEXT NOT NULL,
  value DECIMAL(12,2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_auto_splits_workspace_id ON public.auto_splits(workspace_id);

ALTER TABLE public.auto_splits ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_auto_splits_updated_at
  BEFORE UPDATE ON public.auto_splits
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- INVOICES
-- ============================================================================
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  invoice_number TEXT UNIQUE NOT NULL,
  bill_info JSONB,
  total_amount DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoices_workspace_id ON public.invoices(workspace_id);
CREATE INDEX idx_invoices_client_id ON public.invoices(client_id);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- FINANCE EXPORTS
-- ============================================================================
CREATE TABLE public.finance_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  export_type TEXT NOT NULL,
  format TEXT NOT NULL,
  file_url TEXT NOT NULL,
  config JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_finance_exports_workspace_id ON public.finance_exports(workspace_id);

ALTER TABLE public.finance_exports ENABLE ROW LEVEL SECURITY;

