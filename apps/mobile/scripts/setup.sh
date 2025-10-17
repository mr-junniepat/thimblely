#!/bin/bash

# Thimblely Mobile App Setup Script
# This script sets up the mobile app development environment

set -e  # Exit on error

echo "🚀 Setting up Thimblely Mobile App..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the mobile app directory."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js version 18 or higher is recommended. Current version: $(node -v)"
fi

# Navigate to root
cd ../..

echo "📦 Building shared library..."
cd libs/shared
npm install --legacy-peer-deps 2>/dev/null || true
npm run build

echo "📱 Installing mobile dependencies..."
cd ../../apps/mobile
npm install --legacy-peer-deps

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Add assets to assets/images/ directory"
echo "  2. Run 'npm start' to start the development server"
echo "  3. Press 'i' for iOS simulator or 'a' for Android emulator"
echo ""
echo "For more information, see SETUP.md"

