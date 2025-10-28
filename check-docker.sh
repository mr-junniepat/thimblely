#!/bin/bash

echo "🐳 Checking Docker status..."

if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running!"
  echo ""
  echo "Please:"
  echo "  1. Open Docker Desktop"
  echo "  2. Wait for it to fully start"
  echo "  3. Run './check-docker.sh' again"
  echo ""
  exit 1
fi

echo "✅ Docker is running!"
echo ""
echo "Starting Thimberly services..."
docker compose up -d

echo ""
echo "📊 Access the services:"
echo "   • Supabase Studio: http://localhost:54323"
echo "   • Auth API: http://localhost:9999"
echo "   • PostgreSQL: localhost:54322"
echo ""
echo "✅ Thimberly is ready!"

