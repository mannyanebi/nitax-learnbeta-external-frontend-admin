/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" }, // Adjust port if necessary
  //         { key: "Access-Control-Allow-Methods", value: "GET, DELETE, PATCH, POST, PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //       ]
  //     }
  //   ];
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://134.122.88.106:8080/:path*',
  //     },
  //   ]
  // },
  reactStrictMode: true,
  env: {
    HOST: process.env.HOST,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY
  }
}

module.exports = nextConfig