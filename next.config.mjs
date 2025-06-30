import createNextIntlPlugin from 'next-intl/plugin';

const intlPlugin = createNextIntlPlugin('./src/shared/config/intl.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default intlPlugin(nextConfig);
