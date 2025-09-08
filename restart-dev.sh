#!/bin/bash

echo "🔄 Restarting development server..."

# Stop current development server
echo "⏹️ Stopping current development server..."
pkill -f "next dev" || true

# Wait a moment for cleanup
sleep 2

# Clean development environment
echo "🧹 Cleaning development environment..."
./dev-clean.sh

# Install dependencies if needed
echo "📦 Checking dependencies..."
npm install

# Start fresh development server
echo "🚀 Starting fresh development server..."
npm run dev
