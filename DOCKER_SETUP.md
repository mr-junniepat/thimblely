# Docker Setup for Thimberly

Quick start guide for running Thimberly with Docker.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose v2

## Quick Start

### 1. Create Environment File

```bash
cp docker-compose.env.example .env
```

### 2. Start Services

```bash
./start-local.sh
```

Or manually:

```bash
docker-compose up -d
```

### 3. Access Services

- **Supabase Studio**: http://localhost:54323
- **Supabase API**: http://localhost:54321
- **GraphQL API**: http://localhost:54321/graphql/v1
- **PostgreSQL**: localhost:54322

### 4. Stop Services

```bash
./stop-local.sh
```

Or manually:

```bash
docker-compose down
```

## Services

The Docker setup includes:

1. **supabase-db** - PostgreSQL database
2. **supabase-auth** - Supabase Auth with Infobip SMS
3. **supabase-kong** - API Gateway
4. **supabase-studio** - Database management UI
5. **supabase-rest** - REST API
6. **supabase-graphql-engine** - GraphQL API

## Configuration

Edit `.env` file to configure:

- Database credentials
- JWT secrets
- Infobip SMS settings
- API keys

## Apply Migrations

After starting services, apply database migrations:

```bash
# Connect to the database
docker exec -it supabase_db_2pumws2o6fy psql -U postgres

# Apply migrations
# (See apps/backend/supabase/migrations/)
```

## View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f supabase-auth
```

## Troubleshooting

### Port Conflicts

If ports are in use, stop conflicting services:

```bash
# Stop local Supabase if running
supabase stop

# Then start Docker
./start-local.sh
```

### Database Issues

Reset the database:

```bash
docker-compose down -v
docker-compose up -d
```

### Check Service Status

```bash
docker-compose ps
```

## Default Credentials

See `.env` file for:

- Database password
- JWT secret
- API keys

## Next Steps

1. Start Docker services
2. Apply migrations
3. Configure mobile app `.env` file
4. Start mobile app with `npx expo start`
