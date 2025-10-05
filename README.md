# Skyloom - Weather Data Dashboard

A modern, responsive weather data dashboard built with Next.js, featuring historical weather analysis, interactive charts, and a beautiful user interface.

## 🌟 Features

- **Interactive Weather Dashboard**: View historical weather data with beautiful charts and summaries
- **Location-based Analysis**: Analyze weather patterns for different locations worldwide
- **Date Range Selection**: Customize your analysis with flexible date range controls
- **Real-time Data**: Get up-to-date weather information and trends
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and Radix UI components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd skyloom
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
skyloom/
├── frontend/          # Next.js web application
│   ├── src/
│   │   ├── app/       # Next.js 13+ app router
│   │   ├── components/ # React components
│   │   ├── contexts/   # React contexts
│   │   ├── services/   # API services
│   │   └── styles/     # Global styles
│   └── package.json
├── backend/           # Express.js API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
├── shared/            # Shared utilities and types
│   ├── src/
│   │   ├── types/
│   │   ├── utils/
│   │   └── constants/
│   └── package.json
├── mobile/            # React Native mobile app
└── package.json       # Root package.json with workspaces
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start frontend development server
npm run dev:backend      # Start backend development server
npm run dev:mobile       # Start mobile development server

# Building
npm run build            # Build frontend and shared packages
npm run build:all        # Build all packages

# Utilities
npm run clean            # Clean build artifacts
npm run install:all      # Install all dependencies
```

### Technology Stack

**Frontend:**
- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Recharts for data visualization

**Backend:**
- Express.js
- TypeScript
- Drizzle ORM
- PostgreSQL (Neon)
- JWT Authentication

**Shared:**
- TypeScript
- Zod for validation

**Mobile:**
- React Native
- Expo SDK 54
- React Navigation

## 🌐 Deployment

### Vercel Deployment
This project is optimized for Vercel deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables
4. Deploy!

### Environment Variables

```bash
# Required
NEXT_PUBLIC_API_URL=https://your-api-domain.com

# Optional
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key
```

## 📱 Mobile App

The mobile app is built with React Native and Expo. To run it:

```bash
cd mobile
npm install
npm run dev
```

## 🎨 UI Components

The project uses a comprehensive set of UI components built with Radix UI and styled with Tailwind CSS:

- Buttons, Cards, Inputs
- Date pickers and calendars
- Charts and data visualization
- Navigation and layout components
- Form controls and validation

## 📊 Data Visualization

Weather data is presented through:
- Interactive line charts showing temperature, precipitation, wind, and humidity trends
- Summary cards with key metrics and trend indicators
- Responsive charts that work on all device sizes

## 🔐 Authentication

Simple authentication system with:
- Login/logout functionality
- Session management
- Protected routes
- User context management

## 🌍 Weather Data

The application integrates with weather APIs to provide:
- Historical weather data
- Current conditions
- Trend analysis
- Location-based data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
2. Review the troubleshooting section
3. Open an issue on GitHub

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**