-- Feeds, Marketplace, and Notifications Tables Migration

-- ============================================================================
-- 1. SOCIAL FEEDS MODULE
-- ============================================================================

-- Feeds
CREATE TABLE public.feeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE SET NULL,
  feed_type TEXT NOT NULL CHECK (feed_type IN ('image', 'video', 'carousel')),
  caption TEXT,
  media_urls TEXT[] NOT NULL,
  thumbnail_url TEXT,
  tags TEXT[],
  location JSONB,
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'followers', 'private')),
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived', 'deleted')),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feeds_user_id ON public.feeds(user_id);
CREATE INDEX idx_feeds_workspace_id ON public.feeds(workspace_id);
CREATE INDEX idx_feeds_status ON public.feeds(status);
CREATE INDEX idx_feeds_created_at ON public.feeds(created_at DESC);

ALTER TABLE public.feeds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public feeds" ON public.feeds
  FOR SELECT USING (visibility = 'public' AND status = 'published');

CREATE POLICY "Users can view own feeds" ON public.feeds
  FOR SELECT USING (user_id = auth.uid());

CREATE TRIGGER update_feeds_updated_at
  BEFORE UPDATE ON public.feeds
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Feed cross posts
CREATE TABLE public.feed_cross_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id UUID NOT NULL REFERENCES public.feeds(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok')),
  social_connection_id UUID NOT NULL REFERENCES public.social_media_connections(id) ON DELETE CASCADE,
  platform_post_id TEXT,
  platform_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'posted', 'failed')),
  scheduled_for TIMESTAMPTZ,
  posted_at TIMESTAMPTZ,
  error_message TEXT,
  platform_metrics JSONB,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feed_cross_posts_feed_id ON public.feed_cross_posts(feed_id);
CREATE INDEX idx_feed_cross_posts_platform ON public.feed_cross_posts(platform);

ALTER TABLE public.feed_cross_posts ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_feed_cross_posts_updated_at
  BEFORE UPDATE ON public.feed_cross_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Feed likes
CREATE TABLE public.feed_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id UUID NOT NULL REFERENCES public.feeds(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(feed_id, user_id)
);

CREATE INDEX idx_feed_likes_feed_id ON public.feed_likes(feed_id);
CREATE INDEX idx_feed_likes_user_id ON public.feed_likes(user_id);

ALTER TABLE public.feed_likes ENABLE ROW LEVEL SECURITY;

-- Feed comments
CREATE TABLE public.feed_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id UUID NOT NULL REFERENCES public.feeds(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.feed_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  like_count INTEGER DEFAULT 0,
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feed_comments_feed_id ON public.feed_comments(feed_id);
CREATE INDEX idx_feed_comments_user_id ON public.feed_comments(user_id);
CREATE INDEX idx_feed_comments_parent_comment_id ON public.feed_comments(parent_comment_id);

ALTER TABLE public.feed_comments ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_feed_comments_updated_at
  BEFORE UPDATE ON public.feed_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Feed shares
CREATE TABLE public.feed_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id UUID NOT NULL REFERENCES public.feeds(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  shared_to TEXT CHECK (shared_to IN ('instagram', 'tiktok', 'internal')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feed_shares_feed_id ON public.feed_shares(feed_id);
CREATE INDEX idx_feed_shares_user_id ON public.feed_shares(user_id);

ALTER TABLE public.feed_shares ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. MARKETPLACE MODULE
-- ============================================================================

-- Marketplace products
CREATE TABLE public.marketplace_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  images TEXT[] NOT NULL,
  tags TEXT[],
  available_regions TEXT[],
  stock_quantity INTEGER,
  is_customizable BOOLEAN DEFAULT FALSE,
  customization_options JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_marketplace_products_workspace_id ON public.marketplace_products(workspace_id);
CREATE INDEX idx_marketplace_products_seller_id ON public.marketplace_products(seller_id);
CREATE INDEX idx_marketplace_products_category ON public.marketplace_products(category);
CREATE INDEX idx_marketplace_products_status ON public.marketplace_products(status);

ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published marketplace products" ON public.marketplace_products
  FOR SELECT USING (status = 'published');

CREATE TRIGGER update_marketplace_products_updated_at
  BEFORE UPDATE ON public.marketplace_products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Product reviews
CREATE TABLE public.product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.marketplace_products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  images TEXT[],
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

CREATE INDEX idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX idx_product_reviews_user_id ON public.product_reviews(user_id);

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_product_reviews_updated_at
  BEFORE UPDATE ON public.product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Product likes
CREATE TABLE public.product_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.marketplace_products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

CREATE INDEX idx_product_likes_product_id ON public.product_likes(product_id);
CREATE INDEX idx_product_likes_user_id ON public.product_likes(user_id);

ALTER TABLE public.product_likes ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 3. NOTIFICATIONS MODULE
-- ============================================================================

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  reference_type TEXT,
  reference_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_workspace_id ON public.notifications(workspace_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read, created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

