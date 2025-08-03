import nextAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 300,
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
      [
        '/blog/how-we-cleaned-242000-japanese-hack-pages-from-a-site-in-10-hours',
        '/blog/how-we-removed-242000-japanese-seo-spam-pages-from-a-hacked-site-in-10-hours',
      ],
      [
        '/affordable-personal-website-development',
        '/affordable-personal-web-development',
      ],
      [
        '/affordable-personal-website-development-lite',
        '/affordable-personal-web-development',
      ],
      ['/3d-animation', '/social-video-ads-reels-creation'],
      ['/3d-model', '/social-video-ads-reels-creation'],
      ['/3d-model', '/social-video-ads-reels-creation'],
      ['/3d-render-image', '/social-video-ads-reels-creation'],
      ['/403-forbidden', '/fix-403-forbidden-errors'],
      ['/404-not-found-error', '/fix-404-not-found-errors'],
      ['/500-internal-server-error', '/fix-500-internal-server-errors'],
      [
        '/affordable-e-commerce-website-development',
        '/affordable-all-in-one-web-development',
      ],
      ['/wordpress-maintenance', '/ongoing-wordpress-maintenance-updates'],
      [
        '/why-you-should-choose-wordpress-for-your-website-in-2024',
        '/blog/why-you-should-choose-wordpress-for-your-website-in-2024',
      ],
      [
        '/why-websites-with-3-zero-stand-out-virtually-zero-vulnerability-downtime-and-errors',
        '/blog/why-websites-with-3-zero-stand-out-virtually-zero-vulnerability-downtime-and-errors',
      ],
      [
        '/why-ecommerce-website-maintenance-services-matter-for-your-business',
        '/blog/why-ecommerce-website-maintenance-services-matter-for-your-business',
      ],
      [
        '/why-ai-cant-replace-humans-the-critical-role-of-judgment',
        '/blog/why-ai-cant-replace-humans-the-critical-role-of-judgment',
      ],
      ['/website-for-doctors', '/affordable-all-in-one-web-development'],
      [
        '/understanding-short-tail-and-long-tail-keywords',
        '/blog/understanding-short-tail-and-long-tail-keywords',
      ],
      ['/understanding-lsi-keywords', '/blog/understanding-lsi-keywords'],
      ['/website-for-doctors', '/affordable-all-in-one-web-development'],
    ].map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

const withBundleAnalyzer = nextAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
