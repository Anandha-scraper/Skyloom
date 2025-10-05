/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@skyloom/shared"],
  images: {
    domains: ["localhost", "images.unsplash.com", "api.nasa.gov"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002",
  },
  experimental: {
    optimizePackageImports: ["@skyloom/shared"],
  },
  output: "standalone",
};

module.exports = nextConfig;