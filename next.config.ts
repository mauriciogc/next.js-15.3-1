import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://fakestoreapi.com/img/*')],
  },
};

export default nextConfig;
