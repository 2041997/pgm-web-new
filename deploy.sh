#!/bin/bash

echo "🚀 Starting deployment process..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy using PM2
    echo "🔄 Deploying with PM2..."
    pm2 start ecosystem.config.js --env production
    
    echo "✅ Deployment completed successfully!"
else
    echo "❌ Build failed. Deployment aborted."
    exit 1
fi
