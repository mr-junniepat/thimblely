# FigJam Content for Database Relationships

Copy and paste this into a FigJam diagram to visualize the database relationships.

## Main Sections to Create

### 1. AUTHENTICATION LAYER (Central Box)

```
auth.users
    ↓ (1:1)
profiles
    ├─ verification_logs
    ├─ auth_sessions
    ├─ oauth_connections
    └─ social_media_connections
```

### 2. WORKSPACE LAYER (Below Authentication)

```
profiles (owner_id)
    ↓ (1:many)
workspaces
    ├─ workspace_members
    ├─ workspace_invitations
    └─ Connects to ALL modules below
```

### 3. CRM MODULE (Left Cluster)

```
workspaces
    ↓
clients
    ├─ client_interactions
    ├─ client_measurements
    ↓ (references clients)
orders
    └─ order_items
```

### 4. INVENTORY MODULE (Below CRM)

```
workspaces
    ↓
inventory_items
    ↓
inventory_movements
```

### 5. FINANCE MODULE (Right Cluster)

```
workspaces
    ├─ transactions
    ├─ financial_goals
    ├─ auto_splits
    └─ invoices
```

### 6. CALENDAR MODULE (Top Right)

```
profiles + workspaces
    ↓
events
    └─ event_reminders
```

### 7. COMMUNICATION MODULE (Bottom Right)

```
workspaces
    ↓
communication_channels
    ↓
messages
```

### 8. FEEDS MODULE (Center Bottom)

```
profiles + workspaces
    ↓
feeds
    ├─ feed_cross_posts
    ├─ feed_likes
    ├─ feed_comments (with nested replies)
    └─ feed_shares
```

### 9. MARKETPLACE MODULE (Center)

```
workspaces
    ↓
marketplace_products
    ├─ product_reviews
    └─ product_likes
```

### 10. NOTIFICATIONS (Top Layer)

```
profiles
    ↓
notifications
    (connects to all modules)
```

## Color Coding Suggestions

- 🔵 **Authentication Layer** - Blue
- 🟢 **Workspace Layer** - Green
- 🟡 **CRM Module** - Yellow
- 🟠 **Inventory Module** - Orange
- 🟣 **Finance Module** - Purple
- 🔴 **Calendar Module** - Red
- 🟦 **Communication Module** - Light Blue
- 🟨 **Feeds Module** - Gold
- 🟢 **Marketplace Module** - Emerald
- ⚪ **Notifications** - Gray

## Connections to Highlight

1. **Thick lines**: Core relationships

   - auth.users → profiles (1:1)
   - profiles → workspaces (1:many)
   - workspaces → all modules

2. **Medium lines**: Direct module relationships

   - clients → orders → order_items
   - inventory_items → inventory_movements
   - feeds → feed_cross_posts

3. **Thin lines**: Association relationships
   - feed_likes (user_id)
   - product_likes (user_id)
   - workspace_members (user_id)

## Key Notes to Add

- **34 Total Tables**: 33 custom + 1 Supabase managed
- **Workspace Isolation**: All data scoped by workspace_id
- **RLS Enforcement**: User access controlled by workspace membership
- **Cross-Border**: Region tracking for GDPR compliance
- **Multi-Workspace**: Users can own/join multiple workspaces

## Layout Structure

```
                ┌─────────────────┐
                │  NOTIFICATIONS  │
                └────────┬────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
   ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
   │  CALENDAR│     │ MARKETPLACE│   │  FINANCE│
   └──────────┘     └──────────┘   └──────────┘
        │               │               │
        │               │               │
    ┌───┴───────────────┴───────────────┴───┐
    │         WORSPACE LAYER                │
    │               │                        │
    │     ┌─────────▼─────────┐            │
    │     │   AUTH LAYER      │            │
    │     └─────────┬─────────┘            │
    │               │                       │
    │     ┌─────────┴───────────┐          │
    │     │    CRM MODULE      │          │
    │     └─────────┬───────────┘          │
    │               │                       │
    │     ┌─────────▼───────────┐          │
    │     │ INVENTORY MODULE    │          │
    │     └─────────────────────┘          │
    └───────────────────────────────────────┘
```

## Connection Details

### From Workspaces to Modules (All 1:many)

- clients
- orders
- inventory_items
- transactions
- financial_goals
- invoices
- events
- communication_channels
- marketplace_products
- feeds (optional)
- social_media_connections (optional)

### From Profiles (User-centric)

- Multiple workspaces (owner)
- Multiple workspace memberships
- Personal feeds
- Product likes/reviews
- Feed likes/comments
- Notifications

### From Clients (CRM-centric)

- Multiple orders
- Multiple invoices
- Interaction history
- Measurements (tailors)

### From Orders (Order-centric)

- Multiple order_items
- Can reference inventory_items
- Can generate invoices
- Can link to client
- Can create events
