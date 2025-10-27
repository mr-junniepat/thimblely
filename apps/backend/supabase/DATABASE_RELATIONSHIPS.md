# Thimblely Database Relationships

This document visualizes how all 34 tables connect to each other in the Thimblely platform.

## Complete Database Schema Visualization

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         AUTHENTICATION LAYER                             │
└─────────────────────────────────────────────────────────────────────────┘

auth.users (Supabase Managed)
    │
    │ 1:1
    ├──────────────────────────────────────────────────────────────────────┐
    │                                                                       │
    v                                                                       │
public.profiles (User Accounts)                                            │
    │                                                                       │
    ├─ 1:many ─> verification_logs (Email/SMS logs)                       │
    ├─ 1:many ─> auth_sessions (Login sessions)                            │
    ├─ 1:many ─> oauth_connections (Google/Apple)                          │
    │                                                                       │
    │                                                                       │
┌───┴──────────────────────────────────────────────────────────────────────┘
│   WORKSPACE & BUSINESS LAYER
└───┬──────────────────────────────────────────────────────────────────────┐
    │                                                                       │
    ├─ 1:many ─> workspaces (owner_id) ──────┐                             │
    │               │                         │                             │
    │               ├─ 1:many ──> workspace_members ──┐                     │
    │               │            (user_id)     │       │                     │
    │               │                          │       │                     │
    │               ├─ 1:many ──> workspace_invitations │                   │
    │               │                                │                       │
    │               └─ 1:many ──> social_media_connections (workspace)      │
    │                                                                       │
    └─ 1:many ─> workspace_members (member_user_id) ────────┘             │
                    │                                                       │
                    └─ Workspace links to:                                  │
                       • clients (workspace_id)                             │
                       • orders (workspace_id)                              │
                       • inventory_items (workspace_id)                     │
                       • transactions (workspace_id)                        │
                       • financial_goals (workspace_id)                     │
                       • invoices (workspace_id)                             │
                       • events (workspace_id)                                │
                       • communication_channels (workspace_id)              │
                       • messages (workspace_id)                             │
                       • feeds (workspace_id)                                │
                       • marketplace_products (workspace_id)                │


┌─────────────────────────────────────────────────────────────────────────┐
│                         CRM MODULE                                      │
└─────────────────────────────────────────────────────────────────────────┘

workspaces
    │
    └─ 1:many ──> clients (workspace_id)
                     │
                     ├─ 1:many ──> client_interactions
                     │               (call, email, meeting notes)
                     │
                     ├─ 1:many ──> client_measurements
                     │               (tailor measurements)
                     │
                     ├─ 1:many ──> orders (client_id)
                     │                 │
                     │                 └─ 1:many ──> order_items
                     │                                    │
                     │                                    ├─ inventory_item_id
                     │                                    └─ (item_name, price, qty)
                     │
                     └─ 1:many ──> invoices (client_id)


┌─────────────────────────────────────────────────────────────────────────┐
│                         INVENTORY MODULE                                │
└─────────────────────────────────────────────────────────────────────────┘

workspaces
    │
    └─ 1:many ──> inventory_items (workspace_id)
                     │
                     ├─ UNIQUE(workspace_id, sku)
                     │
                     └─ 1:many ──> inventory_movements
                                     (stock-in, stock-out, adjustments)
                                         │
                                         └─ tracks: quantity, previous_stock, new_stock


┌─────────────────────────────────────────────────────────────────────────┐
│                         FINANCE MODULE                                  │
└─────────────────────────────────────────────────────────────────────────┘

workspaces
    │
    ├─ 1:many ──> transactions (workspace_id)
    │               (income/expense, category, amount)
    │
    ├─ 1:many ──> financial_goals (workspace_id)
    │               (monthly/yearly targets, progress)
    │
    ├─ 1:many ──> auto_splits (workspace_id)
    │               (percentage or fixed amount splits)
    │
    └─ 1:many ──> invoices (workspace_id)
                     │
                     ├─ references orders (order_id)
                     ├─ references clients (client_id)
                     └─ tracks payment status


┌─────────────────────────────────────────────────────────────────────────┐
│                         CALENDAR MODULE                                 │
└─────────────────────────────────────────────────────────────────────────┘

profiles (user_id)
    │
    ├─ 1:many ──> events
                     │
                     ├─ workspace_id (optional)
                     ├─ client_id (optional)
                     ├─ order_id (optional)
                     └─ 1:many ──> event_reminders


┌─────────────────────────────────────────────────────────────────────────┐
│                         COMMUNICATION MODULE                            │
└─────────────────────────────────────────────────────────────────────────┘

workspaces
    │
    └─ 1:many ──> communication_channels (whatsapp, telegram, sms, email)
                     │
                     └─ 1:many ──> messages
                                     │
                                     ├─ channel_id
                                     └─ client_id (optional)


┌─────────────────────────────────────────────────────────────────────────┐
│                         SOCIAL FEEDS MODULE                             │
└─────────────────────────────────────────────────────────────────────────┘

profiles (user_id)
    │
    ├─ 1:many ──> social_media_connections (personal)
    │               (Instagram, TikTok tokens)
    │
    └─ 1:many ──> feeds
                     │
                     ├─ workspace_id (optional, for business posts)
                     ├─ feed_type (image/video/carousel)
                     │
                     ├─ 1:many ──> feed_cross_posts
                     │               │
                     │               ├─ platform (instagram/tiktok)
                     │               └─ social_connection_id
                     │
                     ├─ 1:many ──> feed_likes (user_id)
                     │
                     ├─ 1:many ──> feed_comments (user_id)
                     │                  │
                     │                  └─ parent_comment_id (nested replies)
                     │
                     └─ 1:many ──> feed_shares (user_id)


workspaces
    │
    └─ 1:many ──> social_media_connections (business accounts)
                     └─ used for workspace/brand posts


┌─────────────────────────────────────────────────────────────────────────┐
│                         MARKETPLACE MODULE                              │
└─────────────────────────────────────────────────────────────────────────┘

workspaces
    │
    └─ 1:many ──> marketplace_products
                     │
                     ├─ seller_id (profile)
                     ├─ category, price, images
                     │
                     ├─ 1:many ──> product_reviews
                     │               │
                     │               ├─ user_id
                     │               └─ rating, review_text
                     │
                     └─ 1:many ──> product_likes (user_id)


┌─────────────────────────────────────────────────────────────────────────┐
│                         NOTIFICATIONS MODULE                           │
└─────────────────────────────────────────────────────────────────────────┘

profiles (user_id)
    │
    └─ 1:many ──> notifications
                     │
                     ├─ workspace_id (optional)
                     ├─ reference_type (order, client, invoice, etc.)
                     └─ reference_id


═══════════════════════════════════════════════════════════════════════════
                     KEY RELATIONSHIPS SUMMARY
═══════════════════════════════════════════════════════════════════════════

1. User Authentication:
   auth.users → profiles (1:1)
   profiles → verification_logs (1:many)
   profiles → auth_sessions (1:many)
   profiles → oauth_connections (1:many)

2. Workspace Management:
   profiles → workspaces (1:many via owner_id)
   workspaces → workspace_members (1:many)
   profiles → workspace_members (1:many via user_id)
   workspaces → workspace_invitations (1:many)

3. Business Operations (CRM):
   workspaces → clients (1:many)
   clients → client_interactions (1:many)
   clients → client_measurements (1:many)
   clients → orders (1:many)
   clients → invoices (1:many)

4. Orders & Inventory:
   workspaces → orders (1:many)
   orders → order_items (1:many)
   order_items → inventory_items (many-to-one)
   workspaces → inventory_items (1:many)
   inventory_items → inventory_movements (1:many)

5. Finance:
   workspaces → transactions (1:many)
   workspaces → financial_goals (1:many)
   workspaces → auto_splits (1:many)
   workspaces → invoices (1:many)

6. Content & Social:
   profiles → feeds (1:many personal)
   workspaces → feeds (1:many business)
   feeds → feed_cross_posts (1:many)
   feeds → feed_likes (1:many)
   feeds → feed_comments (1:many with nested replies)
   feeds → feed_shares (1:many)

7. Marketplace:
   workspaces → marketplace_products (1:many)
   marketplace_products → product_reviews (1:many)
   marketplace_products → product_likes (1:many)

8. Notifications:
   profiles → notifications (1:many)
   workspaces → notifications (optional context)

═══════════════════════════════════════════════════════════════════════════

## Critical Business Rules

### Cross-Border Functionality
- Profiles have `country_code`, `region`, `data_residency_region` for GDPR compliance
- Workspaces have `operating_regions[]` and `cross_border_enabled` flag
- Marketplace products have `available_regions[]` for regional availability

### Workspace Access
- Only workspace members can access workspace data (RLS enforced)
- Workspace owners have full control
- Invitations allow adding team members

### Customer Workspace Upgrades
- Regular customers (role='customer') can't create workspaces by default
- They must upgrade or be invited to join a workspace
- When upgraded, role stays 'customer' but they gain workspace access

### Multi-Workspace Users
- One user can own multiple workspaces
- One user can be a member of multiple workspaces (different roles)
- Data is isolated per workspace via RLS policies

### Feed Attribution
- Personal feeds: user_id only
- Business feeds: user_id + workspace_id
- Feeds can be cross-posted to Instagram/TikTok via feed_cross_posts

### Order Fulfillment Flow
orders (1) ──> order_items (many)
                ├─ references inventory_items (optional)
                ├─ can use workspace inventory
                └─ tracks unit_price, quantity, total_price

inventory_movements tracks all stock changes (auto-generated on order completion)

```
