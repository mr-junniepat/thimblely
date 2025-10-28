-- Migration 3: Inventory & Orders
-- Order: Inventory must be created BEFORE order_items

-- ============================================================================
-- INVENTORY ITEMS
-- ============================================================================
CREATE TABLE public.inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  sku TEXT NOT NULL,
  name TEXT NOT NULL,
  current_stock INTEGER NOT NULL DEFAULT 0,
  min_stock_level INTEGER NOT NULL DEFAULT 0,
  status TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, sku)
);

CREATE INDEX idx_inventory_items_workspace_id ON public.inventory_items(workspace_id);

ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_inventory_items_updated_at
  BEFORE UPDATE ON public.inventory_items
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- INVENTORY MOVEMENTS
-- ============================================================================
CREATE TABLE public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id UUID NOT NULL REFERENCES public.inventory_items(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  movement_type TEXT CHECK (movement_type IN ('stock-in', 'stock-out', 'adjustment', 'return')),
  quantity INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inventory_movements_inventory_item_id ON public.inventory_movements(inventory_item_id);

ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- ORDERS
-- ============================================================================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  channel_id UUID,
  created_from_context_id UUID,
  order_source TEXT CHECK (order_source IN ('direct', 'website', 'whatsapp', 'telegram', 'phone')),
  order_number TEXT UNIQUE NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'paid', 'cancelled', 'fulfilled')),
  confirmed_by UUID REFERENCES public.profiles(id),
  confirmed_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_workspace_id ON public.orders(workspace_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_deleted_at ON public.orders(deleted_at) WHERE deleted_at IS NULL;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- ORDER ITEMS (depends on inventory_items)
-- ============================================================================
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  inventory_item_id UUID REFERENCES public.inventory_items(id) ON DELETE SET NULL,
  item_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_inventory_item_id ON public.order_items(inventory_item_id);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- DELIVERABLES
-- ============================================================================
CREATE TABLE public.deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  status TEXT,
  due_date TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_deliverables_workspace_id ON public.deliverables(workspace_id);

ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_deliverables_updated_at
  BEFORE UPDATE ON public.deliverables
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

