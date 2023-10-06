/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["learnbeta.fra1.digitaloceanspaces.com"],
  },
  reactStrictMode: true,
  env: {
    HOST: process.env.HOST,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  },
};

module.exports = nextConfig;
