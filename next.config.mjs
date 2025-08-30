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
      ['/blog/author/1', '/blog'],
      ['/blog/author/6', '/blog'],
      ['/blogs', '/blog'],
      ['/book-call', '/book-a-call'],
      [
        '/building-an-email-tracking-system-in-next-js-and-node-js',
        '/blog/building-an-email-tracking-system-in-next-js-and-node-js',
      ],
      ['/case-studies/Owen-Brooks', '/case-studies'],
      ['/case-studies/Solo-Shop', '/case-studies'],
      ['/case-studies/lunera', '/case-studies'],
      ['/case-studies/max-rivers', '/case-studies'],
      ['/case-studies/neil-fishkin', '/case-studies'],
      ['/case-studies/roofing-service', '/case-studies'],
      ['/case-studies/snowshield', '/case-studies'],
      [
        '/case-study-how-i-secured-my-wordpress-site-from-cyber-threats',
        '/case-studies',
      ],
      ['/category/domain-name-system', '/blog'],
      ['/category/hacking', '/blog'],
      ['/category/security', '/blog'],
      [
        '/common-wordpress-security-issues-fix-them-protect-your-site-now',
        '/blog/common-wordpress-security-issues-fix-them-protect-your-site-now',
      ],
      [
        '/composable-commerce-vs-headless-ecommerce-which-is-best-for-your-business',
        '/blog/composable-commerce-vs-headless-ecommerce-which-is-best-for-your-business',
      ],
      [
        '/deepseek-vs-chatgpt-the-ai-battle-reshaping-the-industry-in-2025',
        '/blog/deepseek-vs-chatgpt-the-ai-battle-reshaping-the-industry-in-2025',
      ],
      ['/frontend', '/fullstack-nextjs-application-development'],
      ['/google-ads', '/google-ads-campaign-management'],
      ['/shop/:path*', '/templates'],
      ['/how-i-fixed-wpml-htaccess-overwrite-issue-in-5-minutes', '/'],
      [
        '/cookies',
        '/blog/how-i-fixed-wpml-htaccess-overwrite-issue-in-5-minutes',
      ],
      [
        '/how-much-does-it-really-cost-to-build-and-deploy-a-website-in-2025',
        '/blog/how-much-does-it-really-cost-to-build-and-deploy-a-website-in-2025',
      ],
      ['/how-to-install-ioncube-via-easyapache-4', '/'],
      ['/cookies', '/blog/how-to-install-ioncube-via-easyapache-4'],
      [
        '/how-to-speed-up-your-wordpress-site-with-redis-object-cache',
        '/blog/how-to-speed-up-your-wordpress-site-with-redis-object-cache',
      ],
      [
        '/how-user-intent-shapes-effective-content',
        '/blog/how-user-intent-shapes-effective-content',
      ],
      ['/increase-your-vps-ram-by-4gb-for-free-with-swap-space', '/'],
      [
        '/cookies',
        '/blog/increase-your-vps-ram-by-4gb-for-free-with-swap-space',
      ],
      ['/local-seo', '/local-seo-optimization'],
      ['/maintenance/wordpress-malware-removal', '/wordpress-malware-removal'],
      ['/malware-removal', '/wordpress-malware-removal'],
      [
        '/mastering-the-art-of-bypassing-403-forbidden-errors',
        '/blog/mastering-the-art-of-bypassing-403-forbidden-errors',
      ],
      ['/mern-stack', '/mern-stack-web-app-development'],
      ['/mern-stack-development', '/mern-stack-web-app-development'],
      ['/meta-ads', '/meta-facebook-instagram-ads-management'],
      ['/mixed-content-error', '/mixed-content-ssl-fix'],
      ['/nextjs-applications', '/fullstack-nextjs-application-development'],
      ['/nextjs-fullstack', '/fullstack-nextjs-application-development'],
      ['/place-order', '/services'],
      ['/privacy', '/privacy-policy'],
      ['/privacy-policy-policy', '/privacy-policy'],
      [
        '/reseller-hosting-comparison-plans-features-and-costs',
        '/blog/reseller-hosting-comparison-plans-features-and-costs',
      ],
      ['/seo-optimization', '/technical-seo-audit-fixes'],
      ['/social-media', '/'],
      ['/social-media-graphics', '/'],
      ['/status', '/'],
      ['/support/tickets/create', '/'],
      ['/tag/ai', '/'],
      ['/tag/bash-script', '/'],
      ['/tag/dns', '/'],
      ['/team', '/'],
      ['/terms', '/'],
      ['/tiktok-ads', '/'],
      ['/tutorials', '/'],
      ['/affordable-web-development', '/affordable-all-in-one-web-development'],
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
