#!/bin/bash

# Stop Thimberly Local Development

echo "🛑 Stopping Thimberly Local Development..."

# Stop Supabase services
docker-compose down

echo "✅ Thimberly services stopped."

