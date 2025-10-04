# ClimateSight Monorepo

A comprehensive weather data visualization platform with web frontend, mobile app, and backend API.

## Project Structure

```
climatesight-monorepo/
├── backend/           # Node.js + Express API server
├── frontend/          # Next.js web application
├── mobile/            # React Native mobile app
├── shared/            # Shared types, utilities, and constants
└── package.json       # Root workspace configuration
```

## First Time Setup (For New Clones)

### Prerequisites

#### For Windows Users
- **Node.js 18+** - [Download Windows installer](https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi)
- **Git for Windows** - [Download here](https://git-scm.com/download/win)
- **Visual Studio Code** (recommended) - [Download here](https://code.visualstudio.com/download)
- **For mobile development:**
  - **Expo CLI**: Open Command Prompt as Administrator and run `npm install -g @expo/cli`
  - **Expo Go app** on your phone (download from Google Play Store)
  - **Android Studio** - [Download here](https://developer.android.com/studio)

#### For Mac Users
- **Node.js 18+** - [Download macOS installer](https://nodejs.org/dist/v20.10.0/node-v20.10.0.pkg)
- **Git** - Install via Xcode Command Line Tools: `xcode-select --install`
- **Visual Studio Code** (recommended) - [Download here](https://code.visualstudio.com/download)
- **For mobile development:**
  - **Expo CLI**: Run `npm install -g @expo/cli` in Terminal
  - **Expo Go app** on your phone (download from App Store)
  - **Xcode** - Install from Mac App Store (for iOS development)
  - **Android Studio** - [Download here](https://developer.android.com/studio) (for Android development)

### Step-by-Step Setup

#### Option 1: Automated Setup (Recommended)

**For Mac Users:**
```bash
# Open Terminal and run:
git clone <repository-url>
cd climatesight-monorepo
chmod +x setup.sh
./setup.sh
```

**For Windows Users:**
```cmd
# Open Command Prompt or PowerShell and run:
git clone <repository-url>
cd climatesight-monorepo
setup.bat
```

#### Option 2: Manual Setup

**For Mac Users:**
1. **Open Terminal and clone the repository:**
   ```bash
   git clone <repository-url>
   cd climatesight-monorepo
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```
   This installs dependencies for all packages (shared, frontend, backend, mobile).

3. **Build the shared package:**
   ```bash
   npm run build:shared
   ```
   This is required because other packages depend on the shared package.

4. **Verify the setup:**
   ```bash
   npm run build
   ```
   This builds all packages to ensure everything is working correctly.

5. **Start development servers:**
   ```bash
   # Start both frontend and backend together
   npm run dev
   
   # Or start individually:
   npm run dev:frontend  # Next.js on http://localhost:3000
   npm run dev:backend   # Express on http://localhost:3001
   npm run dev:mobile    # Expo development server
   ```

**For Windows Users:**
1. **Open Command Prompt or PowerShell and clone the repository:**
   ```cmd
   git clone <repository-url>
   cd climatesight-monorepo
   ```

2. **Install all dependencies:**
   ```cmd
   npm run install:all
   ```
   This installs dependencies for all packages (shared, frontend, backend, mobile).

3. **Build the shared package:**
   ```cmd
   npm run build:shared
   ```
   This is required because other packages depend on the shared package.

4. **Verify the setup:**
   ```cmd
   npm run build
   ```
   This builds all packages to ensure everything is working correctly.

5. **Start development servers:**
   ```cmd
   # Start both frontend and backend together
   npm run dev
   
   # Or start individually:
   npm run dev:frontend  # Next.js on http://localhost:3000
   npm run dev:backend   # Express on http://localhost:3001
   npm run dev:mobile    # Expo development server
   ```

### Quick Start (After Initial Setup)

Once you've completed the first-time setup, you can use these quick commands:

```bash
# Start everything
npm run dev

# Or start specific services
npm run dev:frontend  # Web app only
npm run dev:backend   # API server only
npm run dev:mobile    # Mobile app only
```

## Individual Package Commands

### Shared Package (`@climatesight/shared`)
```bash
cd shared
npm run build    # Build TypeScript
npm run dev      # Watch mode
npm run clean    # Clean dist folder
```

### Frontend (`@climatesight/frontend`)
```bash
cd frontend
npm run dev      # Next.js development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

### Mobile (`@climatesight/mobile`)
```bash
cd mobile
npm run dev      # Expo development server
npm run android  # Android emulator
npm run ios      # iOS simulator
npm run web      # Web version
```

### Backend (`@climatesight/backend`)
```bash
cd backend
npm run dev      # Development server with hot reload
npm run build    # Build TypeScript
npm run start    # Production server
```

## Features

### 🌐 Web Frontend (Next.js)
- **Pages:** Login, Dashboard with weather charts
- **Components:** Weather charts, summary cards, location controls
- **Features:** Dark/light mode, responsive design, data filtering
- **Tech Stack:** Next.js 14, React 18, Tailwind CSS, Radix UI, Recharts

### 📱 Mobile App (React Native)
- **Screens:** Login, Dashboard, Charts, Settings
- **Navigation:** Tab navigation with stack navigation
- **Features:** Native charts, location picker, date selection
- **Tech Stack:** React Native, Expo, Victory Native, React Navigation

### 🚀 Backend API (Node.js)
- **Endpoints:** Authentication, weather data, user management
- **Features:** JWT authentication, rate limiting, validation
- **Tech Stack:** Express.js, TypeScript, Zod validation, JWT

### 📦 Shared Package
- **Types:** Weather data, API responses, user schemas
- **Utils:** Data processing, date formatting, trend calculation
- **Constants:** API endpoints, chart colors, mock data

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Weather Data
- `GET /api/weather/data` - Get weather data for location/date range
- `GET /api/weather/summary` - Get weather statistics
- `GET /api/weather/locations` - Get available locations

### User Management
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update user profile (auth required)
- `DELETE /api/users/profile` - Delete user account (auth required)

## Development

### Adding New Features

1. **Shared Types/Utils:** Add to `shared/src/`
2. **API Endpoints:** Add controllers in `backend/src/controllers/`
3. **Web Components:** Add to `frontend/src/components/`
4. **Mobile Screens:** Add to `mobile/src/screens/`

### Code Organization

- **Controllers:** Handle HTTP requests/responses
- **Services:** Business logic and data processing
- **Routes:** API endpoint definitions
- **Middleware:** Authentication, validation, error handling
- **Models:** Data structures and schemas

## Troubleshooting

### Common Setup Issues

1. **"Cannot find module '@climatesight/shared'"**
   ```bash
   # Solution: Build the shared package first
   npm run build:shared
   ```

2. **"TypeScript errors in backend"**
   ```bash
   # Solution: Ensure you're using Node.js 18+ and rebuild
   node --version  # Should be 18+
   npm run build:shared
   npm run build --workspace=backend
   ```

3. **"Expo build command not found"**
   ```bash
   # Solution: Install Expo CLI globally
   npm install -g @expo/cli
   ```

4. **"Port already in use"**
   
   **Windows:**
   ```cmd
   # Find process using port 3000
   netstat -ano | findstr :3000
   # Kill the process (replace <PID_NUMBER> with actual PID)
   taskkill /PID <PID_NUMBER> /F
   ```
   
   **Mac:**
   ```bash
   # Find and kill process using port 3000
   lsof -ti:3000 | xargs kill -9
   ```

5. **"Permission denied" errors**
   
   **Windows:**
   ```cmd
   # Run Command Prompt as Administrator, then:
   npm cache clean --force
   rmdir /s node_modules
   del package-lock.json
   npm run install:all
   ```
   
   **Mac:**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm run install:all
   ```

6. **Mobile app won't start**
   ```bash
   # Solution: Clear Expo cache
   cd mobile
   npx expo start --clear
   ```

### Environment Variables

Create these files if you need custom configuration:

#### Backend (.env)
```bash
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://localhost:5432/climatesight
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Production Deployment

1. **Build all packages:**
   ```bash
   npm run build:all
   ```

2. **Deploy backend:** Deploy `backend/dist/` to your server
3. **Deploy frontend:** Deploy `frontend/.next/` to Vercel/Netlify
4. **Deploy mobile:** Build with Expo/EAS Build

## Contributing

1. Make changes in the appropriate package
2. Update shared types if needed
3. Test across all platforms
4. Build and verify everything works

## Quick Reference

### Essential Commands

**Mac Users:**
```bash
# First time setup (automated)
git clone <repo-url>
cd climatesight-monorepo
./setup.sh

# First time setup (manual)
git clone <repo-url>
cd climatesight-monorepo
npm run install:all
npm run build:shared
npm run build
```

**Windows Users:**
```cmd
# First time setup (automated)
git clone <repo-url>
cd climatesight-monorepo
setup.bat

# First time setup (manual)
git clone <repo-url>
cd climatesight-monorepo
npm run install:all
npm run build:shared
npm run build
```

### Daily Development Commands
```bash
# Both platforms use the same commands:
npm run dev                    # Start frontend + backend
npm run dev:frontend          # Web app only
npm run dev:backend           # API only
npm run dev:mobile            # Mobile app only

# Building
npm run build                 # Build all packages
npm run build:shared          # Build shared package only
npm run build --workspace=frontend  # Build frontend only
npm run build --workspace=backend   # Build backend only

# Testing
npm run build                 # Verify everything builds
```

### Access Points
- **Web App**: http://localhost:3000
- **API Server**: http://localhost:3001
- **Mobile**: Scan QR code with Expo Go app

### Project Structure
```
├── shared/          # Types, utils, constants (build first!)
├── backend/         # Express API server
├── frontend/        # Next.js web app
└── mobile/          # React Native mobile app
```

## License

MIT License - see LICENSE file for details.