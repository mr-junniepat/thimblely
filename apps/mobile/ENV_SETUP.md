# Environment Setup for Mobile App

Create a `.env` file in `apps/mobile/` directory with the following content:

```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# Infobip Configuration (for phone verification)
INFOBIP_BASE_URL=https://ypz669.api.infobip.com
INFOBIP_API_KEY=9b5d308914388ae9c2f94c19678884e7-96658137-e1a9-4a66-8d92-8079f45309a4

# Infobip Configuration (auto-generated)
INFOBIP_APPLICATION_ID=C69D2C8545D99BE511A5F7ACD3FA44AA
INFOBIP_MESSAGE_TEMPLATE_ID=6D83916B5AFE3802E4500D69993F8C17

# Local Development
EXPO_PUBLIC_GRAPHQL_URL=http://localhost:54321/graphql/v1
NODE_ENV=development
```

## Local Supabase Setup

1. Install Supabase CLI:

   ```bash
   npm install -g supabase
   ```

2. Login to Supabase CLI:

   ```bash
   supabase login
   ```

3. Initialize Supabase in the project:

   ```bash
   cd apps/backend/supabase
   supabase init
   ```

4. Start local Supabase:
   ```bash
   supabase start
   ```

This will start:

- Supabase Studio at http://localhost:54323
- PostgreSQL at localhost:54322
- Supabase REST API at http://localhost:54321
- Supabase GraphQL at http://localhost:54321/graphql/v1

## Migration Setup

The migrations are already created in `apps/backend/supabase/migrations/`:

- `20250101000001_base_schema.sql` - Core auth & workspace tables
- `20250101000002_crm_orders_inventory.sql` - CRM, orders, inventory
- `20250101000003_finance_calendar_communication.sql` - Finance, calendar, communication
- `20250101000004_feeds_marketplace_notifications.sql` - Feeds, marketplace, notifications

To apply migrations:

```bash
cd apps/backend/supabase
supabase db reset
```

## Connecting Mobile App

The mobile app will connect to:

- Local Supabase instance at `http://localhost:54321`
- GraphQL endpoint at `http://localhost:54321/graphql/v1`

## Environment Variables Explanation

- `EXPO_PUBLIC_SUPABASE_URL`: Local Supabase instance URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Anon key for local Supabase (pre-configured)
- `INFOBIP_BASE_URL`: Infobip API base URL for phone verification
- `INFOBIP_API_KEY`: Infobip API key
- `INFOBIP_APPLICATION_ID`: Infobip application ID for SMS
- `INFOBIP_MESSAGE_TEMPLATE_ID`: Infobip message template ID
- `EXPO_PUBLIC_GRAPHQL_URL`: GraphQL endpoint URL
