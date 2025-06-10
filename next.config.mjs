import nextAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
    staleTimes: {
      dynamic: 300,
      static: 600,
    },
    serverActions: {
      bodySizeLimit: '200mb',
    },
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'react-icons',
      'lucide-react',
      'react-quill',
      'react-quill-new',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.3zerodigital.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    nextScriptWorkers: true,
  },
  async redirects() {
    return [
      {
        source:
          '/blog/how-we-cleaned-242000-japanese-hack-pages-from-a-site-in-10-hours',
        destination:
          '/blog/how-we-removed-242000-japanese-seo-spam-pages-from-a-hacked-site-in-10-hours',
        permanent: true,
      },

      {
        source: '/affordable-personal-website-development',
        destination: '/affordable-personal-web-development',
        permanent: true,
      },

      {
        source: '/affordable-personal-website-development-lite',
        destination: '/affordable-personal-web-development',
        permanent: true,
      },
    ];
  },
};

const withBundleAnalyzer = nextAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
