#!/bin/bash

# ClimateSight Monorepo Setup Script
# This script sets up the project for new developers

echo "🚀 Setting up ClimateSight Monorepo..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build shared package
echo "🔨 Building shared package..."
npm run build:shared

if [ $? -ne 0 ]; then
    echo "❌ Failed to build shared package"
    exit 1
fi

# Verify build
echo "🧪 Verifying build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build verification failed"
    exit 1
fi

echo "✅ Setup complete!"
echo ""
echo "🎉 You can now start development:"
echo "   npm run dev          # Start frontend + backend"
echo "   npm run dev:frontend # Web app only"
echo "   npm run dev:backend  # API only"
echo "   npm run dev:mobile   # Mobile app only"
echo ""
echo "📱 Access points:"
echo "   Web App: http://localhost:3000"
echo "   API: http://localhost:3001"
echo "   Mobile: Scan QR code with Expo Go app"