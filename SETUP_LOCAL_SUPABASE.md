# Local Supabase Setup Guide

This guide will help you set up a local Supabase instance for Thimberly development.

## Prerequisites

- Node.js and npm installed
- Supabase CLI installed
- Docker Desktop installed (required for Supabase local development)

## Installation

1. Install Supabase CLI globally:

   ```bash
   npm install -g supabase
   ```

2. Verify installation:
   ```bash
   supabase --version
   ```

## Setup Steps

### 1. Initialize Supabase

```bash
cd apps/backend/supabase
supabase init
```

This will create a `config.toml` file in the current directory.

### 2. Start Local Supabase

```bash
supabase start
```

This will:

- Pull Docker images for Supabase services
- Start PostgreSQL, Supabase Studio, and other services
- Create initial database schema
- Print connection strings and API keys

**Output will look like:**

```
Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Apply Database Migrations

The migrations are in `apps/backend/supabase/migrations/`:

- `20250101000001_base_schema.sql` - Core auth & workspace tables
- `20250101000002_crm_orders_inventory.sql` - CRM, orders, inventory
- `20250101000003_finance_calendar_communication.sql` - Finance, calendar, communication
- `20250101000004_feeds_marketplace_notifications.sql` - Feeds, marketplace, notifications

Apply migrations:

```bash
supabase db reset
```

This will drop all tables and reapply all migrations.

### 4. Set Up Environment Variables

Create a `.env` file in `apps/mobile/`:

```bash
# Copy the example
cp apps/mobile/ENV_SETUP.md apps/mobile/.env

# Edit .env with your local values
# Use the anon key printed by `supabase start`
```

Update `.env` with local Supabase values:

```bash
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<copy from supabase start output>
EXPO_PUBLIC_GRAPHQL_URL=http://localhost:54321/graphql/v1
```

### 5. Access Supabase Studio

Open http://localhost:54323 in your browser to access Supabase Studio where you can:

- View database tables
- Manage users
- Test queries
- View logs
- Manage storage

## Development Workflow

### Start Development

1. Start local Supabase:

   ```bash
   cd apps/backend/supabase
   supabase start
   ```

2. Start mobile app:
   ```bash
   cd apps/mobile
   npx expo start
   ```

### Stop Local Supabase

```bash
supabase stop
```

### Reset Database

To reapply all migrations:

```bash
supabase db reset
```

## Running Migrations

After creating new migration files, apply them:

```bash
supabase db reset  # Reapply all migrations
```

## Accessing Logs

```bash
# View all logs
supabase logs

# Follow specific service
supabase logs --db-postgres
supabase logs --studio
```

## Troubleshooting

### Port Already in Use

If ports are already in use:

```bash
supabase stop
supabase start
```

### Database Reset Issues

If migration fails:

```bash
# Stop and restart
supabase stop
supabase start
supabase db reset
```

### Docker Issues

Ensure Docker Desktop is running:

```bash
docker ps
```

## Next Steps

1. Configure RLS policies in `apps/backend/supabase/migrations/`
2. Set up email templates in Supabase Studio
3. Configure OAuth providers (Google, Apple)
4. Test authentication flow
5. Connect mobile app to local Supabase

## Reference

- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [Local Development](https://supabase.com/docs/guides/cli/local-development)
- [Database Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)
