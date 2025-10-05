# Skyloom - Vercel Deployment Guide

## Overview
This guide will help you deploy the Skyloom weather dashboard to Vercel. The project is a Next.js application with a monorepo structure.

## Prerequisites
- Vercel account
- GitHub repository with the cleaned code
- Environment variables configured

## Project Structure
```
skyloom/
├── frontend/          # Next.js application (main deployment target)
├── backend/           # Express.js API (optional for Vercel)
├── shared/            # Shared utilities and types
├── mobile/            # React Native app (not deployed to Vercel)
├── vercel.json        # Vercel configuration
└── package.json       # Root package.json with workspaces
```

## Deployment Steps

### 1. Prepare Your Repository
The project has been cleaned up with the following changes:
- ✅ Removed `node_modules/` directories
- ✅ Removed `dist/` build folders
- ✅ Removed mobile-specific files and setup scripts
- ✅ Updated package names from `@climatesight/*` to `@skyloom/*`
- ✅ Configured Vercel settings
- ✅ Optimized for production deployment

### 2. Environment Variables
Set up the following environment variables in Vercel:

#### Required Environment Variables:
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

#### Optional Environment Variables:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key
```

### 3. Deploy to Vercel

#### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name: skyloom
# - Directory: ./frontend
# - Override settings? No
```

#### Option B: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 4. Configure Build Settings
In your Vercel project settings:

#### Build & Development Settings:
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### Environment Variables:
Add the environment variables mentioned in step 2.

### 5. Monorepo Configuration
The project uses npm workspaces. Vercel will automatically:
- Install dependencies from the root `package.json`
- Build the shared package first
- Then build the frontend application

### 6. Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS settings as instructed

## Post-Deployment

### 1. Verify Deployment
- Check that the application loads correctly
- Test the login functionality
- Verify weather data displays properly
- Check that all routes work (/, /dashboard)

### 2. Monitor Performance
- Use Vercel Analytics to monitor performance
- Check build logs for any issues
- Monitor function execution if using API routes

### 3. Backend Considerations
If you need the backend API:
- Deploy the backend separately (Railway, Render, or another service)
- Update `NEXT_PUBLIC_API_URL` to point to your backend
- Or convert backend routes to Next.js API routes in `frontend/src/app/api/`

## Troubleshooting

### Common Issues:

#### Build Failures:
- Ensure all dependencies are properly installed
- Check that the shared package builds successfully
- Verify TypeScript compilation

#### Environment Variables:
- Make sure all required environment variables are set
- Check that variable names match exactly (case-sensitive)

#### Routing Issues:
- Verify that the `vercel.json` configuration is correct
- Check that Next.js routing is properly configured

#### Package Import Errors:
- Ensure all `@skyloom/shared` imports are updated
- Verify the shared package builds before the frontend

### Getting Help:
- Check Vercel deployment logs
- Review the Vercel documentation
- Check the project's GitHub issues

## Performance Optimization

### Already Implemented:
- ✅ Standalone output for better performance
- ✅ Optimized package imports
- ✅ Proper image domains configuration
- ✅ Clean build process

### Additional Optimizations:
- Enable Vercel Analytics
- Configure caching headers
- Use Vercel's Edge Functions if needed
- Implement proper error boundaries

## Security Considerations
- Environment variables are properly configured
- API keys are not exposed in client-side code
- Proper CORS configuration for API calls
- Authentication state management

---

## Quick Start Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Clean build artifacts
npm run clean
```

Your Skyloom weather dashboard is now ready for deployment to Vercel! 🌍⛅
