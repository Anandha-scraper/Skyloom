@echo off
echo 🚀 Setting up Expo SDK 54 for ClimateSight Mobile...

REM Clean existing installation
echo 🧹 Cleaning existing installation...
if exist node_modules rmdir /s /q node_modules
if exist .expo rmdir /s /q .expo
if exist dist rmdir /s /q dist
if exist package-lock.json del package-lock.json

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Install Expo CLI globally if not present
where expo >nul 2>nul
if %errorlevel% neq 0 (
    echo 📱 Installing Expo CLI globally...
    npm install -g @expo/cli
)

REM Clear Expo cache
echo 🗑️ Clearing Expo cache...
npx expo install --fix

REM Install Expo SDK 54 dependencies
echo ⬆️ Installing Expo SDK 54 dependencies...
npx expo install expo@~54.0.0
npx expo install expo-router@~4.0.0
npx expo install expo-status-bar@~2.0.0

REM Install React Navigation v7
echo 🧭 Installing React Navigation v7...
npm install @react-navigation/native@^7.0.0
npm install @react-navigation/stack@^7.0.0
npm install @react-navigation/bottom-tabs@^7.0.0

REM Install other dependencies
echo 📚 Installing other dependencies...
npm install react-native-screens@~4.1.0
npm install react-native-safe-area-context@~4.12.0
npm install react-native-gesture-handler@~2.20.0
npm install react-native-reanimated@~3.16.0
npm install react-native-svg@15.8.0

REM Install development dependencies
echo 🔧 Installing development dependencies...
npm install --save-dev @types/react@~18.3.0
npm install --save-dev @types/react-native@~0.76.0
npm install --save-dev typescript@~5.6.0

echo ✅ Setup complete!
echo.
echo 🚀 To start the development server:
echo    npm run dev
echo    or
echo    npx expo start
echo.
echo 📱 To run on specific platforms:
echo    npm run android  # Android
echo    npm run ios      # iOS (macOS only)
echo    npm run web      # Web browser
echo.
echo 🔧 To clear cache if needed:
echo    npx expo start --clear
pause