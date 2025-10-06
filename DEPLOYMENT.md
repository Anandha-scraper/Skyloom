# Deploying Skyloom

This guide walks you through deploying the Skyloom web app (Next.js) to Vercel and the API (Express) to a separate host.

## Overview
- Frontend: Next.js (deployed on Vercel)
- Backend: Express API (deploy to your VM/provider)
- Shared package: bundled into each app during build

## 1) Backend (Express) Deployment
You can run the backend anywhere Node 18+ is available. Example with a simple VM:

1) SSH into your server and install Node 18+
2) Clone your repo and install deps for shared + backend
```bash
cd shared && npm ci && npm run build
cd ../backend && npm ci && npm run build
```
3) Configure environment
```bash
# backend/.env
PORT=3002
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
JWT_SECRET=replace-me
```
4) Start the server (use a process manager like pm2 or systemd)
```bash
node dist/index.js
# or with pm2
pm2 start dist/index.js --name skyloom-api
```
5) Put a reverse proxy (nginx) in front of port 3002 with TLS, e.g.
```nginx
location / {
  proxy_pass http://127.0.0.1:3002;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
}
```

## 2) Frontend (Next.js) on Vercel
1) Push your code to GitHub
2) Import the repo in Vercel (Framework Preset: Next.js)
3) Environment Variables (Project Settings → Environment Variables):
   - NEXT_PUBLIC_API_URL = https://api.yourdomain.com
4) Deploy

Notes:
- Vercel reads `frontend/package.json` to build the Next.js app.
- Root `vercel.json` routes requests to `frontend/`.

## 3) Local Development
```bash
npm run dev:backend    # http://localhost:3002
npm run dev            # http://localhost:3000
```
The frontend calls `${NEXT_PUBLIC_API_URL}/api/...`. For local dev, `frontend/next.config.js` defaults to `http://localhost:3002`.

## 4) Troubleshooting
- CORS: Ensure `FRONTEND_URL` in backend `.env` matches your Vercel domain
- 404 /api: The frontend calls your external API: `${NEXT_PUBLIC_API_URL}/api/...`
- Timeouts: Check server logs and any reverse proxy timeouts (nginx)
- Env drift: Verify Vercel project has `NEXT_PUBLIC_API_URL` set correctly

## 5) Security Notes
- Rotate `JWT_SECRET` before production
- Reduce logs in production
- Consider rate limits and WAF rules

Happy shipping!
