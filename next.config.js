// const withPWA = require("next-pwa");
// /** @type {import('next').NextConfig} */
module.exports =  {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  // pwa: {
  //   dest: "public",
  //   register: true,
  //   skipWaiting: true,
  //   disable: process.env.NODE_ENV === 'development',
  // },
  experimental: {
    appDir: true,
  },
};
// module.exports = nextConfig;
