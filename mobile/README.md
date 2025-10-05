# ClimateSight Mobile App

A React Native mobile application built with Expo SDK 54 for weather data visualization and analysis.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   # or
   npx expo start
   ```

3. **Run on device:**
   - Install Expo Go from App Store/Play Store
   - Scan the QR code with Expo Go
   - The app will load on your device

### Platform-specific commands

```bash
# Android
npm run android
# or
npx expo start --android

# iOS (macOS only)
npm run ios
# or
npx expo start --ios

# Web
npm run web
# or
npx expo start --web
```

## 📱 Features

- **Authentication**: Demo login system
- **Weather Dashboard**: Real-time weather data visualization
- **Interactive Charts**: Temperature, rainfall, wind, humidity trends
- **Location Search**: Find weather data for any location
- **Date Range Selection**: Historical weather data analysis
- **Settings**: App preferences and configuration

## 🛠 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── screens/            # App screens
├── services/           # API services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Key Dependencies
- **Expo SDK 54**: Latest stable version
- **React Native 0.76.3**: Cross-platform mobile framework
- **React Navigation 7**: Navigation library
- **Victory Native**: Chart visualization
- **React Query**: Data fetching and caching
- **TypeScript**: Type safety

### Building for Production

```bash
# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios

# Export for web
npm run build
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the mobile directory:
```
EXPO_PUBLIC_API_URL=http://localhost:3002/api
```

### Metro Configuration
The app uses a custom Metro configuration to support the shared package in the monorepo.

### TypeScript
Full TypeScript support with strict type checking and path mapping.

## 📦 Monorepo Integration

This mobile app is part of a monorepo and shares code with:
- **Backend**: Node.js/Express API
- **Frontend**: Next.js web application  
- **Shared**: Common types and utilities

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues:**
   ```bash
   npx expo start --clear
   ```

2. **Dependency conflicts:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Expo Go connection issues:**
   - Ensure both devices are on the same network
   - Try using tunnel mode: `npx expo start --tunnel`

### Debug Mode
Enable debug mode by shaking the device or pressing `Cmd+D` (iOS) / `Cmd+M` (Android).

## 📄 License

Private - ClimateSight Project