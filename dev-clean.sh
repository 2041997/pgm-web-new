#!/bin/bash

echo "🧹 Cleaning development environment..."

# Stop development server if running
echo "⏹️ Stopping any running development servers..."
pkill -f "next dev" || true

# Clean Next.js cache and build artifacts
echo "🗑️ Removing .next directory..."
rm -rf .next

echo "🗑️ Removing out directory..."
rm -rf out

echo "🗑️ Removing TypeScript build info..."
rm -f tsconfig.tsbuildinfo

# Clear npm cache
echo "🧽 Clearing npm cache..."
npm cache clean --force

echo "✅ Development environment cleaned!"
echo "💡 Run 'npm run dev' to start fresh development server"
