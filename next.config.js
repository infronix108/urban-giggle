/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // Disable SWC minification
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Disable experimental features that might cause issues
    webpackBuildWorker: false,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
  },
};

module.exports = nextConfig;