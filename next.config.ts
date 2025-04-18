import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow builds to succeed even if lint errors are present
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to successfully complete even if there are type errors
    ignoreBuildErrors: true,
  },
  /* config options here */
};

export default nextConfig;
