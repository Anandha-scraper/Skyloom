@echo off
REM ClimateSight Monorepo Setup Script for Windows
REM This script sets up the project for new developers

echo 🚀 Setting up ClimateSight Monorepo...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
node --version

REM Install dependencies
echo 📦 Installing dependencies...
call npm run install:all

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build shared package
echo 🔨 Building shared package...
call npm run build:shared

if %errorlevel% neq 0 (
    echo ❌ Failed to build shared package
    pause
    exit /b 1
)

REM Verify build
echo 🧪 Verifying build...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build verification failed
    pause
    exit /b 1
)

echo ✅ Setup complete!
echo.
echo 🎉 You can now start development:
echo    npm run dev          # Start frontend + backend
echo    npm run dev:frontend # Web app only
echo    npm run dev:backend  # API only
echo    npm run dev:mobile   # Mobile app only
echo.
echo 📱 Access points:
echo    Web App: http://localhost:3000
echo    API: http://localhost:3001
echo    Mobile: Scan QR code with Expo Go app

pause