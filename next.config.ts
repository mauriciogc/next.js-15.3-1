import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheHandler: require.resolve('./lib/InMemoryCacheHandler.js'),
  cacheMaxMemorySize: 0,
  devIndicators: { position: 'bottom-right' },
  images: {
    loader: 'custom',
    loaderFile: './image/image-loader.js',
  },
};

export default nextConfig;
