# Thimblely Supabase Database

This directory contains the database schema and migrations for the Thimblely platform.

## Database Overview

Total Tables: **34**

- 33 custom tables + 1 Supabase managed table (`auth.users`)

## Migration Files

All migrations are numbered chronologically and should be run in order:

1. **20250101000001_base_schema.sql** - Core authentication and workspace tables

   - Profiles, verification logs, auth sessions, OAuth connections
   - Workspaces, workspace members, workspace invitations
   - Social media connections

2. **20250101000002_crm_orders_inventory.sql** - CRM, Orders, and Inventory modules

   - Clients, client interactions, client measurements
   - Orders, order items
   - Inventory items, inventory movements

3. **20250101000003_finance_calendar_communication.sql** - Finance, Calendar, and Communication modules

   - Transactions, financial goals, auto splits, invoices
   - Events, event reminders
   - Communication channels, messages

4. **20250101000004_feeds_marketplace_notifications.sql** - Feeds, Marketplace, and Notifications modules
   - Feeds, feed cross posts, feed likes, feed comments, feed shares
   - Marketplace products, product reviews, product likes
   - Notifications

## Database Schema Summary

### Authentication Layer (6 tables)

1. `auth.users` - Supabase managed
2. `public.profiles` - User profiles
3. `public.verification_logs` - Email/SMS verification
4. `public.auth_sessions` - Session management
5. `public.oauth_connections` - Google/Apple OAuth
6. `public.social_media_connections` - Instagram/TikTok

### Workspace Management (3 tables)

7. `public.workspaces` - Business workspaces
8. `public.workspace_members` - Team membership
9. `public.workspace_invitations` - Pending invitations

### CRM Module (3 tables)

10. `public.clients` - Client information
11. `public.client_interactions` - Client interaction history
12. `public.client_measurements` - Measurement records for tailors

### Orders Module (2 tables)

13. `public.orders` - Customer orders
14. `public.order_items` - Order line items

### Inventory Module (2 tables)

15. `public.inventory_items` - Stock management
16. `public.inventory_movements` - Stock movement history

### Finance Module (4 tables)

17. `public.transactions` - Financial transactions
18. `public.financial_goals` - Goal tracking
19. `public.auto_splits` - Automated savings
20. `public.invoices` - Invoice management

### Calendar Module (2 tables)

21. `public.events` - Calendar events
22. `public.event_reminders` - Event reminders

### Communication Module (2 tables)

23. `public.communication_channels` - WhatsApp/Telegram connections
24. `public.messages` - Message history

### Feeds Module (5 tables)

25. `public.feeds` - User/business posts
26. `public.feed_cross_posts` - Cross-platform posting
27. `public.feed_likes` - Post likes
28. `public.feed_comments` - Post comments
29. `public.feed_shares` - Post shares

### Marketplace Module (3 tables)

30. `public.marketplace_products` - Product listings
31. `public.product_reviews` - Product reviews
32. `public.product_likes` - Product likes

### Notifications Module (1 table)

33. `public.notifications` - User notifications

## Running Migrations

### Using Supabase CLI

```bash
# Initialize Supabase project (if not done)
supabase init

# Link to your remote project
supabase link --project-ref your-project-ref

# Run all migrations
supabase db push

# Or run migrations locally
supabase migration up
```

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run each migration file in order
4. Or use the migration tool in the dashboard

## Environment Variables

Add these to your mobile app `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Row Level Security (RLS)

All custom tables have RLS enabled with appropriate policies:

- Users can only access data in workspaces they're members of
- Admins have elevated access
- Public data (like marketplace products) is viewable by all authenticated users

## Database Functions

- `handle_new_user()` - Auto-creates profile when auth.user is created
- `activate_user_account()` - Activates account after verification
- `handle_updated_at()` - Auto-updates timestamp on row updates

## Next Steps

1. Install Supabase client in mobile app:

   ```bash
   npm install @supabase/supabase-js @react-native-async-storage/async-storage
   ```

2. Create Supabase client configuration
3. Implement authentication flows
4. Set up Infobip integration for email verification
