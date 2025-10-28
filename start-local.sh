#!/bin/bash

# Start Thimberly Local Development

echo "🚀 Starting Thimberly Local Development..."

# Check if .env exists
if [ ! -f .env ]; then
  echo "⚠️  .env file not found. Creating from example..."
  cp docker-compose.env.example .env
  echo "✅ Created .env file. Please edit it with your configuration."
fi

# Start Supabase with Docker Compose
echo "📦 Starting Supabase services..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
sleep 5

# Check if services are running
if docker ps | grep -q "supabase"; then
  echo "✅ Supabase services are running!"
  echo ""
  echo "📊 Access the services:"
  echo "   • Supabase Studio: http://localhost:54323"
  echo "   • Supabase API: http://localhost:54321"
  echo "   • GraphQL API: http://localhost:54321/graphql/v1"
  echo "   • PostgreSQL: localhost:54322"
  echo ""
  echo "🔐 Default credentials:"
  echo "   • Database: postgres:your-super-secret-postgres-password"
  echo "   • Anon Key: See .env file"
  echo ""
else
  echo "❌ Failed to start Supabase services"
  echo "   Run 'docker-compose logs' to see errors"
fi

