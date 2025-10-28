# Thimberly Quick Start Guide

Get up and running with Thimberly in minutes.

## Prerequisites

- Node.js 18+ installed
- Docker Desktop installed
- iOS Simulator (for iOS) or Android Emulator (for Android)

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Local Supabase

```bash
# Install Supabase CLI
npm install -g supabase

# Navigate to Supabase directory
cd apps/backend/supabase

# Initialize Supabase
supabase init

# Start local Supabase
supabase start
```

This will start:

- **Supabase Studio**: http://localhost:54323 (Database UI)
- **Supabase API**: http://localhost:54321
- **GraphQL API**: http://localhost:54321/graphql/v1
- **PostgreSQL**: localhost:54322

### 3. Apply Database Migrations

```bash
# From apps/backend/supabase directory
supabase db reset
```

This will apply all migrations:

- Core auth & workspace tables
- CRM, orders, inventory
- Finance, calendar, communication
- Feeds, marketplace, notifications

### 4. Configure Mobile App

Create `.env` file in `apps/mobile/`:

```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<copy from supabase start output>

# Infobip Configuration (for phone verification)
INFOBIP_BASE_URL=https://ypz669.api.infobip.com
INFOBIP_API_KEY=9b5d308914388ae9c2f94c19678884e7-96658137-e1a9-4a66-8d92-8079f45309a4
INFOBIP_APPLICATION_ID=C69D2C8545D99BE511A5F7ACD3FA44AA
INFOBIP_MESSAGE_TEMPLATE_ID=6D83916B5AFE3802E4500D69993F8C17

# GraphQL URL
EXPO_PUBLIC_GRAPHQL_URL=http://localhost:54321/graphql/v1
NODE_ENV=development
```

### 5. Start Mobile App

```bash
cd apps/mobile
npx expo start
```

Then press:

- `i` to open iOS Simulator
- `a` to open Android Emulator
- `w` to open in web browser

## What's Next?

### For Authentication

- Check `apps/mobile/src/screens/LoginScreen.tsx`
- GraphQL queries: `libs/shared/src/lib/graphql/schemas/auth/queries.ts`
- GraphQL mutations: `libs/shared/src/lib/graphql/schemas/auth/mutations.ts`

### For Database Schema

- ERD: `apps/backend/supabase/database-erd-optimized.mmd`
- Security: `apps/backend/supabase/SECURITY_REQUIREMENTS.md`
- Migrations: `apps/backend/supabase/migrations/`

### For Development

- Run `supabase studio` to view database
- Run `supabase logs` to view logs
- Run `supabase db reset` to reapply migrations

## Useful Commands

```bash
# Start Supabase
cd apps/backend/supabase
supabase start

# Stop Supabase
supabase stop

# Reset database
supabase db reset

# View logs
supabase logs

# Start mobile app
cd apps/mobile
npx expo start --clear
```

## Troubleshooting

### Port Conflicts

If ports are in use, stop Supabase and restart:

```bash
supabase stop
supabase start
```

### Database Issues

Reset the database:

```bash
supabase db reset
```

### Mobile App Won't Connect

- Check `.env` file exists in `apps/mobile/`
- Verify `EXPO_PUBLIC_SUPABASE_URL` is correct
- Restart Expo with `--clear` flag

## Project Structure

```
apps/
├── mobile/           # React Native mobile app
│   ├── src/
│   │   ├── screens/  # UI screens
│   │   └── components/ # Reusable components
├── backend/
│   └── supabase/     # Supabase config & migrations
libs/
└── shared/           # Shared GraphQL queries, mutations
    └── src/lib/graphql/
        └── schemas/
            └── auth/ # Authentication GraphQL operations
```

## Need Help?

- Check `SETUP_LOCAL_SUPABASE.md` for detailed Supabase setup
- Check `apps/mobile/ENV_SETUP.md` for environment configuration
- Check `apps/backend/supabase/README.md` for database migrations
- Check `libs/shared/src/lib/graphql/schemas/AUTH_SETUP.md` for authentication
