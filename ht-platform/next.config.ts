import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
