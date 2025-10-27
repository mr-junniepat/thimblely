# Complete Thimblely Database Schema

## Overview

This document contains the complete database schema for the Thimblely platform, including all modules: Authentication, Workspaces, CRM, Orders, Inventory, Finance, Calendar, Communication, Feeds, and Marketplace.

**Total: 37 custom tables + 1 Supabase managed table = 38 tables**

---

## Table of Contents

1. [Authentication Layer (6 tables)](#authentication-layer)
2. [Workspace Management (3 tables)](#workspace-management)
3. [CRM Module (3 tables)](#crm-module)
4. [Orders Module (2 tables)](#orders-module)
5. [Inventory Module (2 tables)](#inventory-module)
6. [Finance Module (4 tables)](#finance-module)
7. [Calendar Module (2 tables)](#calendar-module)
8. [Communication Module (2 tables)](#communication-module)
9. [Social Feeds Module (5 tables)](#social-feeds-module)
10. [Marketplace Module (3 tables)](#marketplace-module)
11. [Notifications Module (1 table)](#notifications-module)
12. [Database Relationships](#database-relationships)

---

## Authentication Layer

### 1. `auth.users` (Supabase Managed)
- Managed by Supabase Auth
- Handles: email, encrypted_password, email_confirmed_at, phone, phone_confirmed_at
- Social auth identities stored in `auth.identities`

### 2. `public.profiles`

```sql
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
  verification_token TEXT,
  verification_sent_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_country_region ON public.profiles(country_code, region);
CREATE INDEX idx_profiles_is_active ON public.profiles(is_active);
```

### 3. `public.verification_logs`

```sql
CREATE TABLE public.verification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  verification_type TEXT NOT NULL CHECK (verification_type IN ('email', 'sms')),
  provider TEXT DEFAULT 'infobip',
  status TEXT NOT NULL CHECK (status IN ('sent', 'delivered', 'failed', 'verified')),
  token TEXT,
  sent_to TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  metadata JSONB
);

CREATE INDEX idx_verification_logs_user_id ON public.verification_logs(user_id);
CREATE INDEX idx_verification_logs_status ON public.verification_logs(status);
```

### 4. `public.auth_sessions`

```sql
CREATE TABLE public.auth_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL,
  device_info JSONB,
  ip_address TEXT,
  location JSONB,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_auth_sessions_user_id ON public.auth_sessions(user_id);
CREATE INDEX idx_auth_sessions_expires_at ON public.auth_sessions(expires_at);
```

### 5. `public.oauth_connections`

```sql
CREATE TABLE public.oauth_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('google', 'apple')),
  provider_user_id TEXT NOT NULL,
  email TEXT,
  metadata JSONB,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider, provider_user_id)
);

CREATE INDEX idx_oauth_connections_user_id ON public.oauth_connections(user_id);
CREATE INDEX idx_oauth_connections_provider ON public.oauth_connections(provider, provider_user_id);
```

### 6. `public.social_media_connections`

```sql
CREATE TABLE public.social_media_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok')),
  platform_user_id TEXT NOT NULL,
  username TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  account_type TEXT CHECK (account_type IN ('personal', 'business', 'creator')),
  permissions TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  last_synced_at TIMESTAMPTZ,
  metadata JSONB,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform, platform_user_id)
);

CREATE INDEX idx_social_media_connections_user_id ON public.social_media_connections(user_id);
CREATE INDEX idx_social_media_connections_workspace_id ON public.social_media_connections(workspace_id);
```

---

## Workspace Management

### 7. `public.workspaces`

```sql
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
  tax_id TEXT,
  business_documents JSONB,
  stripe_account_id TEXT,
  subscription_tier TEXT DEFAULT 'basic' CHECK (subscription_tier IN ('basic', 'pro', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'suspended', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workspaces_owner_id ON public.workspaces(owner_id);
CREATE INDEX idx_workspaces_slug ON public.workspaces(slug);
```

### 8. `public.workspace_members`

```sql
CREATE TABLE public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  permissions JSONB,
  invited_by UUID REFERENCES public.profiles(id),
  invitation_token TEXT,
  invitation_sent_at TIMESTAMPTZ,
  invitation_accepted_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'removed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

CREATE INDEX idx_workspace_members_workspace_id ON public.workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user_id ON public.workspace_members(user_id);
```

### 9. `public.workspace_invitations`

```sql
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
```

---

## CRM Module

### 10. `public.clients`

```sql
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  added_by UUID NOT NULL REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  location TEXT,
  avatar_url TEXT,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
  status TEXT DEFAULT 'prospect' CHECK (status IN ('active', 'prospect', 'inactive')),
  total_orders INTEGER DEFAULT 0,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  last_order_date TIMESTAMPTZ,
  notes TEXT,
  tags TEXT[],
  custom_fields JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_workspace_id ON public.clients(workspace_id);
CREATE INDEX idx_clients_status ON public.clients(status);
CREATE INDEX idx_clients_priority ON public.clients(priority);
```

### 11. `public.client_interactions`

```sql
CREATE TABLE public.client_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  interaction_type TEXT CHECK (interaction_type IN ('call', 'email', 'meeting', 'note', 'order', 'payment')),
  subject TEXT,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_client_interactions_client_id ON public.client_interactions(client_id);
CREATE INDEX idx_client_interactions_workspace_id ON public.client_interactions(workspace_id);
```

### 12. `public.client_measurements`

```sql
CREATE TABLE public.client_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  measurement_template_id UUID,
  measurements JSONB NOT NULL,
  taken_by UUID REFERENCES public.profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_client_measurements_client_id ON public.client_measurements(client_id);
```

---

## Orders Module

### 13. `public.orders`

```sql
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  order_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  due_date TIMESTAMPTZ,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')),
  subtotal DECIMAL(12,2) DEFAULT 0,
  tax DECIMAL(12,2) DEFAULT 0,
  discount DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL,
  amount_paid DECIMAL(12,2) DEFAULT 0,
  balance_due DECIMAL(12,2) DEFAULT 0,
  deposit_amount DECIMAL(12,2),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid')),
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  assigned_to UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_workspace_id ON public.orders(workspace_id);
CREATE INDEX idx_orders_client_id ON public.orders(client_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_order_date ON public.orders(order_date DESC);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
```

### 14. `public.order_items`

```sql
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  inventory_item_id UUID REFERENCES public.inventory_items(id) ON DELETE SET NULL,
  item_name TEXT NOT NULL,
  item_description TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(12,2) NOT NULL,
  total_price DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_inventory_item_id ON public.order_items(inventory_item_id);
```

---

## Inventory Module

### 15. `public.inventory_items`

```sql
CREATE TABLE public.inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT NOT NULL,
  description TEXT,
  category TEXT,
  current_stock INTEGER NOT NULL DEFAULT 0,
  min_stock_level INTEGER NOT NULL DEFAULT 0,
  max_stock_level INTEGER,
  cost_price DECIMAL(12,2),
  selling_price DECIMAL(12,2),
  unit TEXT DEFAULT 'pcs',
  status TEXT CHECK (status IN ('in-stock', 'low-stock', 'out-of-stock')),
  supplier_name TEXT,
  supplier_contact TEXT,
  image_url TEXT,
  tags TEXT[],
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, sku)
);

CREATE INDEX idx_inventory_items_workspace_id ON public.inventory_items(workspace_id);
CREATE INDEX idx_inventory_items_status ON public.inventory_items(status);
CREATE INDEX idx_inventory_items_sku ON public.inventory_items(sku);
```

### 16. `public.inventory_movements`

```sql
CREATE TABLE public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id UUID NOT NULL REFERENCES public.inventory_items(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  movement_type TEXT CHECK (movement_type IN ('stock-in', 'stock-out', 'adjustment', 'return')),
  quantity INTEGER NOT NULL,
  previous_stock INTEGER NOT NULL,
  new_stock INTEGER NOT NULL,
  reference_type TEXT,
  reference_id UUID,
  notes TEXT,
  moved_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inventory_movements_inventory_item_id ON public.inventory_movements(inventory_item_id);
CREATE INDEX idx_inventory_movements_workspace_id ON public.inventory_movements(workspace_id);
CREATE INDEX idx_inventory_movements_created_at ON public.inventory_movements(created_at DESC);
```

---

## Finance Module

### 17. `public.transactions`

```sql
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('income', 'expense')),
  category TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  description TEXT,
  reference_type TEXT,
  reference_id UUID,
  payment_method TEXT,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_workspace_id ON public.transactions(workspace_id);
CREATE INDEX idx_transactions_type ON public.transactions(transaction_type);
CREATE INDEX idx_transactions_date ON public.transactions(date DESC);
```

### 18. `public.financial_goals`

```sql
CREATE TABLE public.financial_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  goal_type TEXT CHECK (goal_type IN ('monthly', 'yearly')),
  target_amount DECIMAL(12,2) NOT NULL,
  current_amount DECIMAL(12,2) DEFAULT 0,
  category TEXT NOT NULL,
  deadline TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_financial_goals_workspace_id ON public.financial_goals(workspace_id);
CREATE INDEX idx_financial_goals_status ON public.financial_goals(status);
```

### 19. `public.auto_splits`

```sql
CREATE TABLE public.auto_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  split_type TEXT CHECK (split_type IN ('percentage', 'fixed_amount')),
  value DECIMAL(12,2) NOT NULL,
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_auto_splits_workspace_id ON public.auto_splits(workspace_id);
```

### 20. `public.invoices`

```sql
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  invoice_number TEXT UNIQUE NOT NULL,
  bills_from TEXT NOT NULL,
  bills_to TEXT NOT NULL,
  recipient_email TEXT,
  title TEXT,
  description TEXT,
  currency TEXT DEFAULT 'USD',
  subtotal DECIMAL(12,2) NOT NULL,
  tax DECIMAL(12,2) DEFAULT 0,
  discount DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL,
  issued_date TIMESTAMPTZ NOT NULL,
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid')),
  amount_paid DECIMAL(12,2) DEFAULT 0,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoices_workspace_id ON public.invoices(workspace_id);
CREATE INDEX idx_invoices_client_id ON public.invoices(client_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoices_invoice_number ON public.invoices(invoice_number);
```

---

## Calendar Module

### 21. `public.events`

```sql
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT CHECK (event_type IN ('meeting', 'deadline', 'reminder', 'appointment')),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  all_day BOOLEAN DEFAULT FALSE,
  location TEXT,
  attendees UUID[],
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  reminder_minutes INTEGER,
  color TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_workspace_id ON public.events(workspace_id);
CREATE INDEX idx_events_user_id ON public.events(user_id);
CREATE INDEX idx_events_start_time ON public.events(start_time);
```

### 22. `public.event_reminders`

```sql
CREATE TABLE public.event_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reminder_time TIMESTAMPTZ NOT NULL,
  sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_event_reminders_event_id ON public.event_reminders(event_id);
CREATE INDEX idx_event_reminders_user_id ON public.event_reminders(user_id);
CREATE INDEX idx_event_reminders_sent ON public.event_reminders(sent, reminder_time);
```

---

## Communication Module

### 23. `public.communication_channels`

```sql
CREATE TABLE public.communication_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  channel_type TEXT NOT NULL CHECK (channel_type IN ('whatsapp', 'telegram', 'sms', 'email')),
  channel_name TEXT NOT NULL,
  api_key TEXT,
  webhook_url TEXT,
  phone_number TEXT,
  email_address TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  configuration JSONB,
  connected_by UUID REFERENCES public.profiles(id),
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_communication_channels_workspace_id ON public.communication_channels(workspace_id);
CREATE INDEX idx_communication_channels_type ON public.communication_channels(channel_type);
```

### 24. `public.messages`

```sql
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES public.communication_channels(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  direction TEXT CHECK (direction IN ('inbound', 'outbound')),
  message_type TEXT CHECK (message_type IN ('text', 'image', 'video', 'document')),
  content TEXT,
  media_urls TEXT[],
  external_message_id TEXT,
  sender_name TEXT,
  sender_identifier TEXT,
  recipient_name TEXT,
  recipient_identifier TEXT,
  status TEXT CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_workspace_id ON public.messages(workspace_id);
CREATE INDEX idx_messages_channel_id ON public.messages(channel_id);
CREATE INDEX idx_messages_client_id ON public.messages(client_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);
```

---

## Social Feeds Module

### 25. `public.feeds`

```sql
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
```

### 26. `public.feed_cross_posts`

```sql
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
```

### 27. `public.feed_likes`

```sql
CREATE TABLE public.feed_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id UUID NOT NULL REFERENCES public.feeds(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(feed_id, user_id)
);

CREATE INDEX idx_feed_likes_feed_id ON public.feed_likes(feed_id);
CREATE INDEX idx_feed_likes_user_id ON public.feed_likes(user_id);
```

### 28. `public.feed_comments`

```sql
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
```

### 29. `public.feed_shares`

```sql
CREATE TABLE public.feed_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id UUID NOT NULL REFERENCES public.feeds(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  shared_to TEXT CHECK (shared_to IN ('instagram', 'tiktok', 'internal')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feed_shares_feed_id ON public.feed_shares(feed_id);
CREATE INDEX idx_feed_shares_user_id ON public.feed_shares(user_id);
```

---

## Marketplace Module

### 30. `public.marketplace_products`

```sql
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
```

### 31. `public.product_reviews`

```sql
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
```

### 32. `public.product_likes`

```sql
CREATE TABLE public.product_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.marketplace_products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

CREATE INDEX idx_product_likes_product_id ON public.product_likes(product_id);
CREATE INDEX idx_product_likes_user_id ON public.product_likes(user_id);
```

---

## Notifications Module

### 33. `public.notifications`

```sql
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
```

---

## Database Relationships

```
auth.users
    |
    ├─ 1:1 ──> profiles
    |           |
    |           ├─ 1:many ──> workspaces (owner)
    |           |             |
    |           |             ├─ 1:many ──> workspace_members
    |           |             ├─ 1:many ──> workspace_invitations
    |           |             ├─ 1:many ──> clients
    |           |             ├─ 1:many ──> orders
    |           |             ├─ 1:many ──> inventory_items
    |           |             ├─ 1:many ──> transactions
    |           |             ├─ 1:many ──> financial_goals
    |           |             ├─ 1:many ──> auto_splits
    |           |             ├─ 1:many ──> invoices
    |           |             ├─ 1:many ──> events
    |           |             ├─ 1:many ──> communication_channels
    |           |             ├─ 1:many ──> messages
    |           |             ├─ 1:many ──> feeds (workspace posts)
    |           |             ├─ 1:many ──> social_media_connections (workspace)
    |           |             └─ 1:many ──> marketplace_products
    |           |
    |           ├─ 1:many ──> workspace_members (user)
    |           ├─ 1:many ──> verification_logs
    |           ├─ 1:many ──> auth_sessions
    |           ├─ 1:many ──> oauth_connections
    |           ├─ 1:many ──> social_media_connections (personal)
    |           ├─ 1:many ──> feeds (personal posts)
    |           ├─ 1:many ──> feed_likes
    |           ├─ 1:many ──> feed_comments
    |           ├─ 1:many ──> feed_shares
    |           ├─ 1:many ──> product_likes
    |           ├─ 1:many ──> product_reviews
    |           └─ 1:many ──> notifications
    |
    └─ clients
        ├─ 1:many ──> client_interactions
        ├─ 1:many ──> client_measurements
        ├─ 1:many ──> orders
        └─ 1:many ──> invoices

orders
    └─ 1:many ──> order_items

inventory_items
    └─ 1:many ──> inventory_movements

feeds
    ├─ 1:many ──> feed_cross_posts
    ├─ 1:many ──> feed_likes
    ├─ 1:many ──> feed_comments (including nested)
    └─ 1:many ──> feed_shares

marketplace_products
    ├─ 1:many ──> product_reviews
    └─ 1:many ──> product_likes

events
    └─ 1:many ──> event_reminders

communication_channels
    └─ 1:many ──> messages
```

---

## Table Count Summary

- **Authentication Layer**: 6 tables
- **Workspace Management**: 3 tables
- **CRM Module**: 3 tables
- **Orders Module**: 2 tables
- **Inventory Module**: 2 tables
- **Finance Module**: 4 tables
- **Calendar Module**: 2 tables
- **Communication Module**: 2 tables
- **Social Feeds Module**: 5 tables
- **Marketplace Module**: 3 tables
- **Notifications Module**: 1 table

**Total: 33 custom tables + 1 Supabase managed table = 34 tables**

