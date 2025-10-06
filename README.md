# Skyloom – Weather Data Dashboard

Skyloom is a clean, fast weather analytics dashboard. It pairs a Next.js frontend with a lightweight Node/Express API to fetch and visualize historical weather data from NASA POWER, with a mock fallback for reliability.

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
- npm

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

3. **Start development servers**
   ```bash
npm run dev:backend    # starts API on http://localhost:3002
npm run dev            # starts frontend on http://localhost:3000
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
└── package.json       # Root package.json with workspaces
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start frontend (Next.js)
npm run dev:backend      # Start backend (Express)

# Building
npm run build            # Build shared + frontend
npm run build:backend    # Build backend

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

### Vercel (Recommended)
The frontend deploys on Vercel; the backend runs separately (e.g., a small VM or a serverless host). Point the frontend to the backend URL via `NEXT_PUBLIC_API_URL`.

Quick steps:
1) Push to GitHub and import the repo in Vercel
2) Project: set Framework = Next.js
3) Environment Variables:
   - `NEXT_PUBLIC_API_URL` = https://your-backend.example.com
4) Deploy

### Environment Variables

```bash
# Required (Frontend → Backend base URL)
NEXT_PUBLIC_API_URL=https://your-backend.example.com
```

## 📱 Mobile App

The mobile app has been removed from this repository to simplify deployment. Focus is on a great web experience.

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

Basic demo auth with localStorage is included for the dashboard flow. Replace with your provider (AuthJS, Clerk, etc.) for production.

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

**Built with using Next.js, TypeScript, and modern web technologies.**

<!-- Updated for Vercel deployment -->