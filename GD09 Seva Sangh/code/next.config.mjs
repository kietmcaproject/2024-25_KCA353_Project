import { fileURLToPath } from 'url';
import { dirname } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_URI: process.env.MONGO_URI,
  },

  // Webpack configuration (Path aliases using __dirname workaround)
  webpack(config) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    config.resolve.alias['@components'] = `${__dirname}/components`;
    return config;
  },

  // Other configurations (redirects, rewrites, etc.) can remain the same as before
};

export default nextConfig;
