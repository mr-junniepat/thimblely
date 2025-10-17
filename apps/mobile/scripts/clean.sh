#!/bin/bash

# Clean script for mobile app
# Removes node_modules, cache, and build artifacts

set -e

echo "🧹 Cleaning mobile app..."

# Remove node_modules
if [ -d "node_modules" ]; then
    echo "Removing node_modules..."
    rm -rf node_modules
fi

# Remove .expo
if [ -d ".expo" ]; then
    echo "Removing .expo cache..."
    rm -rf .expo
fi

# Remove .expo-shared
if [ -d ".expo-shared" ]; then
    echo "Removing .expo-shared..."
    rm -rf .expo-shared
fi

# Remove iOS build
if [ -d "ios" ]; then
    echo "Removing iOS build..."
    rm -rf ios
fi

# Remove Android build
if [ -d "android" ]; then
    echo "Removing Android build..."
    rm -rf android
fi

echo "✅ Clean complete!"
echo ""
echo "Run 'npm install --legacy-peer-deps' to reinstall dependencies"

