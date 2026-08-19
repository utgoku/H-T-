import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.vietqr.io',
        pathname: '/image/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.prymalab.com' }],
        destination: 'https://prymalab.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
