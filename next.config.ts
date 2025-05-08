import type { NextConfig } from "next";

// Define the Next.js configuration object
const nextConfig: NextConfig = {
  // Configuration options for your Next.js application go here.
  // See the Next.js documentation for all available options:
  // https://nextjs.org/docs/app/api-reference/next-config-js

  // Example common configurations (currently commented out):

  reactStrictMode: true, // Enables React Strict Mode for highlighting potential problems
  // swcMinify: true, // Uses the SWC compiler for faster builds and minification

  images: {
    // Configure domains allowed for next/image optimization
    remotePatterns: [
      // Example: Uncomment and replace with your image source domains
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/images/**',
      // },
    ],
  },

  // experimental: {
  //   // Enable experimental features if needed
  //   // appDir: true, // Already enabled by default in recent Next.js versions
  // },

  // TODO: Add any specific configurations required for this project (e.g., environment variables, redirects, headers, image optimization domains).
};

// Export the configuration object
export default nextConfig;
