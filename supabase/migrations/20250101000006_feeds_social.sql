-- Migration 6: Feeds, Social, Marketplace & Other Features

-- Note: social_media_connections already exists from migration 1

-- ============================================================================
-- FEEDS
-- ============================================================================
CREATE TABLE public.feeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  feed_type TEXT NOT NULL,
  caption TEXT,
  media_urls JSONB NOT NULL,
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'followers', 'private')),
  interactions JSONB DEFAULT '{"likes": 0, "comments": 0, "shares": 0}'::jsonb,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feeds_user_id ON public.feeds(user_id);
CREATE INDEX idx_feeds_workspace_id ON public.feeds(workspace_id);

ALTER TABLE public.feeds ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_feeds_updated_at
  BEFORE UPDATE ON public.feeds
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- FEED INTERACTIONS
-- ============================================================================
CREATE TABLE public.feed_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id UUID NOT NULL REFERENCES public.feeds(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'comment', 'share')),
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feed_interactions_feed_id ON public.feed_interactions(feed_id);
CREATE INDEX idx_feed_interactions_user_id ON public.feed_interactions(user_id);

ALTER TABLE public.feed_interactions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- FEED CROSS POSTS
-- ============================================================================
CREATE TABLE public.feed_cross_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id UUID NOT NULL REFERENCES public.feeds(id) ON DELETE CASCADE,
  social_connection_id UUID REFERENCES public.social_media_connections(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'posted', 'failed')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feed_cross_posts_feed_id ON public.feed_cross_posts(feed_id);

ALTER TABLE public.feed_cross_posts ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_feed_cross_posts_updated_at
  BEFORE UPDATE ON public.feed_cross_posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- MARKETPLACE PRODUCTS
-- ============================================================================
CREATE TABLE public.marketplace_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price DECIMAL(12,2) NOT NULL,
  images JSONB,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold_out', 'archived')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_marketplace_products_workspace_id ON public.marketplace_products(workspace_id);

ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_marketplace_products_updated_at
  BEFORE UPDATE ON public.marketplace_products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- PRODUCT INTERACTIONS
-- ============================================================================
CREATE TABLE public.product_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.marketplace_products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('review', 'like')),
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_interactions_product_id ON public.product_interactions(product_id);
CREATE INDEX idx_product_interactions_user_id ON public.product_interactions(user_id);

ALTER TABLE public.product_interactions ENABLE ROW LEVEL SECURITY;

