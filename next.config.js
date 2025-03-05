/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // Disable SWC minification
  images: {
    domains: ['images.unsplash.com'], // Allow images from Unsplash
  },
  experimental: {
    // Disable experimental features that might cause issues
    webpackBuildWorker: false,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
  },
};

module.exports = nextConfig;