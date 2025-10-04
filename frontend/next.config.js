/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@climatesight/shared"],
  images: {
    domains: ["localhost"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002",
  },
};

module.exports = nextConfig;