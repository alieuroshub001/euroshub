import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Add other custom Next.js configs here if needed
};

export default bundleAnalyzer(nextConfig);
