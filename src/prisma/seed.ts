// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing previous data...');
  // Delete services first due to the relation with categories
  await prisma.service.deleteMany({});
  await prisma.category.deleteMany({});
  console.log('✅ Previous data cleared.');

  console.log('🌱 Seeding database...');

  // Create categories first, including the new "Featured" category
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Featured',
        slug: 'featured',
        description: 'Our most popular and recommended services.',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Development',
        slug: 'development',
        description: 'Custom web development services for modern businesses.',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Maintenance',
        slug: 'maintenance',
        description: 'Ongoing website care and maintenance services.',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Troubleshooting',
        slug: 'troubleshooting',
        description: 'Technical fixes and problem resolution services.',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Graphics & Video',
        slug: 'graphics-video',
        description: 'Professional design and video creation services.',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Digital Marketing',
        slug: 'digital-marketing',
        description:
          'Comprehensive digital marketing and advertising solutions.',
        isActive: true,
      },
    }),
  ]);

  console.log('✅ Categories created');

  // A map to easily find category IDs by their slug
  const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

  // Define services with their category slugs and mandatory descriptions
  const servicesToCreate = [
    // DEVELOPMENT SERVICES
    {
      name: 'WordPress Website Development',
      slug: 'wordpress-website-development',
      description:
        'Custom WordPress website development with modern design and functionality. Perfect for businesses looking for a professional online presence with easy content management.',
      price: 1299,
      originalPrice: 1799,
      features: [
        'Custom WordPress theme development',
        'Responsive mobile-first design',
        'SEO optimization setup',
        'Contact forms and integrations',
        'Admin training session',
        'Basic plugins installation',
        '30-day post-launch support',
        'Google Analytics setup',
      ],
      isActive: true,
      isPopular: true,
      icon: 'Code',
      categorySlugs: ['development'],
    },
    {
      name: 'Headless WordPress with Next.js Development',
      slug: 'headless-wordpress-nextjs-development',
      description:
        'Modern headless WordPress setup with Next.js frontend for lightning-fast performance and superior user experience.',
      price: 2499,
      originalPrice: 3299,
      features: [
        'Headless WordPress CMS setup',
        'Next.js React frontend',
        'GraphQL API integration',
        'Server-side rendering (SSR)',
        'Optimized performance',
        'Modern development stack',
        'Deployment setup',
        'Performance monitoring',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Zap',
      categorySlugs: ['development'],
    },
    {
      name: 'Shopify Store Design & Development',
      slug: 'shopify-store-design-development',
      description:
        'Complete Shopify store setup with custom design, product configuration, and payment integration.',
      price: 1799,
      originalPrice: 2499,
      features: [
        'Custom Shopify theme development',
        'Product catalog setup',
        'Payment gateway integration',
        'Shipping configuration',
        'Inventory management setup',
        'SEO optimization',
        'Mobile optimization',
        'Store training session',
      ],
      isActive: true,
      isPopular: true,
      icon: 'ShoppingCart',
      categorySlugs: ['development'],
    },
    {
      name: 'Fullstack Next.js Application Development',
      slug: 'fullstack-nextjs-application-development',
      description:
        'Complete fullstack web application development using Next.js, React, and modern backend technologies.',
      price: 3499,
      originalPrice: 4999,
      features: [
        'Next.js 14+ framework',
        'React frontend development',
        'API routes and backend',
        'Database integration',
        'Authentication system',
        'Responsive design',
        'Deployment and hosting',
        'Performance optimization',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Terminal',
      categorySlugs: ['development'],
    },
    {
      name: 'MERN Stack Web App Development',
      slug: 'mern-stack-web-app-development',
      description:
        'Full-featured web application development using MongoDB, Express.js, React, and Node.js stack.',
      price: 2999,
      originalPrice: 3999,
      features: [
        'MongoDB database setup',
        'Express.js backend API',
        'React frontend application',
        'Node.js server environment',
        'User authentication',
        'Real-time features',
        'RESTful API design',
        'Deployment assistance',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Database',
      categorySlugs: ['development'],
    },
    {
      name: 'ReactJS Frontend UI Development',
      slug: 'reactjs-frontend-ui-development',
      description:
        'Professional React.js frontend development with modern UI/UX design and component architecture.',
      price: 1999,
      originalPrice: 2699,
      features: [
        'React 18+ development',
        'Modern component architecture',
        'State management (Redux/Zustand)',
        'Responsive design system',
        'TypeScript integration',
        'Performance optimization',
        'Testing setup',
        'Documentation',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Paintbrush',
      categorySlugs: ['development'],
    },
    {
      name: 'Affordable All-in-One Web Development',
      slug: 'affordable-all-in-one-web-development',
      description:
        'Budget-friendly complete web solution including design, development, and basic setup for small businesses.',
      price: 79,
      originalPrice: 199,
      features: [
        'Template-based design',
        'Basic customization',
        'Mobile responsive',
        'Contact form setup',
        'Basic SEO setup',
        'Social media integration',
        'Google Analytics',
        '7-day support',
      ],
      isActive: true,
      isPopular: true,
      icon: 'DollarSign',
      categorySlugs: ['development'],
    },
    {
      name: 'Complete E-Commerce Launch Package',
      slug: 'complete-ecommerce-launch-package',
      description:
        'Everything you need to launch your online store including design, development, payment setup, and marketing basics.',
      price: 199,
      originalPrice: 399,
      features: [
        'E-commerce platform setup',
        'Product catalog creation',
        'Payment gateway integration',
        'Shipping configuration',
        'Basic inventory management',
        'SEO setup',
        'Social media integration',
        'Launch assistance',
      ],
      isActive: true,
      isPopular: true,
      icon: 'Package',
      categorySlugs: ['development', 'digital-marketing'],
    },

    // MAINTENANCE SERVICES
    {
      name: 'Ongoing WordPress Maintenance & Updates',
      slug: 'ongoing-wordpress-maintenance-updates',
      description:
        'Monthly WordPress maintenance service including updates, backups, security monitoring, and performance optimization.',
      price: 69,
      features: [
        'Monthly core updates',
        'Plugin updates',
        'Theme updates',
        'Weekly backups',
        'Security monitoring',
        'Uptime monitoring',
        'Performance optimization',
        'Monthly reports',
      ],
      isActive: true,
      isPopular: true,
      icon: 'RefreshCw',
      categorySlugs: ['maintenance'],
    },

    // TROUBLESHOOTING SERVICES
    {
      name: 'WordPress Malware Removal',
      slug: 'wordpress-malware-removal',
      description:
        'Professional malware removal service to clean infected WordPress websites and restore security.',
      price: 39,
      originalPrice: 99,
      features: [
        'Complete malware scan',
        'Malware removal',
        'Security hardening',
        'Clean backup restoration',
        'Blacklist check',
        'Basic monitoring',
        'Security report',
      ],
      isActive: true,
      isPopular: true,
      icon: 'Shield',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'Blacklist Removal & Reputation Repair',
      slug: 'blacklist-removal-reputation-repair',
      description:
        "Professional blacklist removal service to restore your website's reputation and search engine visibility.",
      price: 15,
      originalPrice: 49,
      features: [
        'Blacklist status check',
        'Google Safe Browsing removal',
        'Malware cleanup',
        'Reputation monitoring',
        'Search engine notification',
        'Status verification',
        'Prevention setup',
      ],
      isActive: true,
      isPopular: false,
      icon: 'AlertTriangle',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'WordPress Speed & Performance Optimization',
      slug: 'wordpress-speed-performance-optimization',
      description:
        'Comprehensive WordPress speed optimization to improve loading times and user experience.',
      price: 79,
      originalPrice: 149,
      features: [
        'Performance audit',
        'Image optimization',
        'Caching implementation',
        'Database optimization',
        'Plugin optimization',
        'CDN setup',
        'Minification',
        'Performance report',
      ],
      isActive: true,
      isPopular: true,
      icon: 'Zap',
      categorySlugs: ['troubleshooting', 'maintenance'],
    },
    {
      name: 'Advanced WordPress Security Hardening',
      slug: 'advanced-wordpress-security-hardening',
      description:
        'Comprehensive WordPress security hardening to protect against threats and vulnerabilities.',
      price: 99,
      originalPrice: 199,
      features: [
        'Security audit',
        'Vulnerability patching',
        'Firewall setup',
        'Login security',
        'File permissions',
        'Security plugins',
        'Monitoring setup',
        'Security report',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Lock',
      categorySlugs: ['troubleshooting', 'maintenance'],
    },
    {
      name: 'Secure Website Migration & Transfer',
      slug: 'secure-website-migration-transfer',
      description:
        'Safe and secure website migration between hosts with zero downtime and data integrity.',
      price: 29,
      originalPrice: 79,
      features: [
        'Pre-migration backup',
        'DNS management',
        'File transfer',
        'Database migration',
        'Testing verification',
        'SSL transfer',
        'Email setup',
        'Post-migration support',
      ],
      isActive: true,
      isPopular: false,
      icon: 'ArrowRightLeft',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'SSL Certificate Installation',
      slug: 'ssl-certificate-installation',
      description:
        'Professional SSL certificate installation and configuration for secure website connections.',
      price: 29,
      originalPrice: 59,
      features: [
        'SSL certificate purchase',
        'Installation and configuration',
        'HTTPS redirect setup',
        'Mixed content fixes',
        'Browser verification',
        'Auto-renewal setup',
        'Security testing',
      ],
      isActive: true,
      isPopular: true,
      icon: 'Lock',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'Fix 404 Not Found Errors',
      slug: 'fix-404-not-found-errors',
      description:
        'Identify and fix 404 not found errors to improve user experience and SEO rankings.',
      price: 29,
      originalPrice: 69,
      features: [
        '404 error audit',
        'Broken link identification',
        'Redirect implementation',
        'Custom 404 page',
        'Internal link fixes',
        'SEO impact assessment',
        'Testing verification',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Search',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'Resolve Email Deliverability Issues',
      slug: 'resolve-email-deliverability-issues',
      description:
        'Fix email delivery problems and improve inbox delivery rates for your website emails.',
      price: 49,
      originalPrice: 99,
      features: [
        'Email deliverability audit',
        'SMTP configuration',
        'SPF/DKIM setup',
        'DMARC implementation',
        'Spam testing',
        'Email authentication',
        'Delivery monitoring',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Mail',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'Fix 500 Internal Server Errors',
      slug: 'fix-500-internal-server-errors',
      description:
        'Diagnose and fix 500 internal server errors to restore website functionality.',
      price: 29,
      originalPrice: 79,
      features: [
        'Error log analysis',
        'Root cause identification',
        'Server configuration fix',
        'Plugin conflict resolution',
        'File permission correction',
        'Database repair',
        'Functionality testing',
      ],
      isActive: true,
      isPopular: false,
      icon: 'AlertTriangle',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'Fix 403 Forbidden Errors',
      slug: 'fix-403-forbidden-errors',
      description:
        'Resolve 403 forbidden access errors and restore proper website permissions.',
      price: 29,
      originalPrice: 69,
      features: [
        'Permission audit',
        'File permission correction',
        'Server configuration fix',
        'Access rule review',
        'Security settings adjustment',
        'Testing verification',
        'Prevention setup',
      ],
      isActive: true,
      isPopular: false,
      icon: 'ShieldAlert',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'Mixed Content SSL Fix',
      slug: 'mixed-content-ssl-fix',
      description:
        'Fix mixed content warnings on SSL-enabled websites for full HTTPS security.',
      price: 29,
      originalPrice: 59,
      features: [
        'Mixed content audit',
        'HTTP to HTTPS conversion',
        'Image source updates',
        'Script source fixes',
        'CSS reference updates',
        'Browser warning elimination',
        'Security verification',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Shield',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'White Screen of Death (WSOD) Recovery',
      slug: 'white-screen-of-death-wsod-recovery',
      description:
        'Emergency recovery service for WordPress white screen of death errors.',
      price: 29,
      originalPrice: 79,
      features: [
        'Error diagnosis',
        'Memory limit increase',
        'Plugin deactivation',
        'Theme switching',
        'Error log analysis',
        'Site restoration',
        'Prevention measures',
      ],
      isActive: true,
      isPopular: false,
      icon: 'MonitorSpeaker',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'Fix Error Establishing Database Connection',
      slug: 'fix-error-establishing-database-connection',
      description:
        'Resolve database connection errors and restore website database connectivity.',
      price: 25,
      originalPrice: 69,
      features: [
        'Database connection diagnosis',
        'Credential verification',
        'Database server check',
        'Configuration file repair',
        'Connection testing',
        'Database optimization',
        'Backup verification',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Database',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'DNS Configuration & Issue Resolution',
      slug: 'dns-configuration-issue-resolution',
      description:
        'Professional DNS setup and troubleshooting for proper domain name resolution.',
      price: 49,
      originalPrice: 99,
      features: [
        'DNS audit and analysis',
        'DNS record configuration',
        'Nameserver setup',
        'Propagation monitoring',
        'Email DNS setup',
        'Subdomain configuration',
        'Global DNS testing',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Globe',
      categorySlugs: ['troubleshooting'],
    },
    {
      name: 'WordPress Rescue & Repair Service',
      slug: 'wordpress-rescue-repair-service',
      description:
        'Comprehensive WordPress rescue service for severely damaged or compromised websites.',
      price: 49,
      originalPrice: 129,
      features: [
        'Complete site diagnosis',
        'Backup recovery',
        'Malware removal',
        'Database repair',
        'File restoration',
        'Plugin/theme fixes',
        'Security hardening',
        'Functionality testing',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Wrench',
      categorySlugs: ['troubleshooting', 'maintenance'],
    },

    // GRAPHICS & VIDEO SERVICES
    {
      name: 'Custom Logo Design',
      slug: 'custom-logo-design',
      description:
        'Professional custom logo design that perfectly represents your brand identity and values.',
      price: 199,
      originalPrice: 399,
      features: [
        '5 initial logo concepts',
        '3 rounds of revisions',
        'Vector files (AI, EPS)',
        'PNG and JPG formats',
        'Brand color palette',
        'Typography recommendations',
        'Usage guidelines',
        'Social media variants',
      ],
      isActive: true,
      isPopular: true,
      icon: 'Palette',
      categorySlugs: ['graphics-video'],
    },
    {
      name: 'Professional Brochure Design',
      slug: 'professional-brochure-design',
      description:
        'Eye-catching brochure designs that effectively communicate your message and attract customers.',
      price: 149,
      originalPrice: 299,
      features: [
        'Custom brochure design',
        'Tri-fold or bi-fold options',
        'Print-ready files',
        'High-resolution output',
        'Brand integration',
        '2 rounds of revisions',
        'Multiple format delivery',
        'Printing recommendations',
      ],
      isActive: true,
      isPopular: false,
      icon: 'FileText',
      categorySlugs: ['graphics-video'],
    },
    {
      name: 'Social Video Ads & Reels Creation',
      slug: 'social-video-ads-reels-creation',
      description:
        'Engaging video content creation for social media advertising and organic reach.',
      price: 299,
      originalPrice: 499,
      features: [
        '3 video concepts',
        'Professional editing',
        'Motion graphics',
        'Brand integration',
        'Multiple format export',
        'Platform optimization',
        'Music and sound effects',
        'Call-to-action integration',
      ],
      isActive: true,
      isPopular: true,
      icon: 'Video',
      categorySlugs: ['graphics-video', 'digital-marketing'],
    },

    // DIGITAL MARKETING SERVICES
    {
      name: 'Backlink Building Service',
      slug: 'backlink-building-service',
      description:
        "High-quality backlink building to improve your website's domain authority and search rankings.",
      price: 299,
      originalPrice: 499,
      features: [
        'High DA backlink acquisition',
        'Manual outreach',
        'Content-based link building',
        'Competitor analysis',
        'Monthly reporting',
        'White-hat techniques only',
        'Link quality verification',
        'Ongoing monitoring',
      ],
      isActive: true,
      isPopular: true,
      icon: 'Link',
      categorySlugs: ['digital-marketing'],
    },
    {
      name: 'Local SEO Optimization',
      slug: 'local-seo-optimization',
      description:
        'Complete local SEO optimization to improve visibility in local search results.',
      price: 199,
      originalPrice: 399,
      features: [
        'Google My Business optimization',
        'Local keyword research',
        'Citation building',
        'Review management setup',
        'Local schema markup',
        'NAP consistency',
        'Local content strategy',
        'Monthly local reports',
      ],
      isActive: true,
      isPopular: true,
      icon: 'MapPin',
      categorySlugs: ['digital-marketing'],
    },
    {
      name: 'E-commerce SEO Services',
      slug: 'ecommerce-seo-services',
      description:
        'Specialized SEO optimization for online stores to increase product visibility and sales.',
      price: 399,
      originalPrice: 699,
      features: [
        'Product page optimization',
        'Category page SEO',
        'Technical SEO audit',
        'Schema markup implementation',
        'Site speed optimization',
        'Mobile SEO',
        'Conversion optimization',
        'Monthly SEO reports',
      ],
      isActive: true,
      isPopular: false,
      icon: 'ShoppingBag',
      categorySlugs: ['digital-marketing'],
    },
    {
      name: 'Technical SEO Audit & Fixes',
      slug: 'technical-seo-audit-fixes',
      description:
        'Comprehensive technical SEO audit and implementation of fixes to improve search performance.',
      price: 249,
      originalPrice: 449,
      features: [
        'Complete technical SEO audit',
        'Crawl error fixes',
        'Site speed optimization',
        'Mobile-friendliness',
        'Schema markup',
        'XML sitemap optimization',
        'Robots.txt optimization',
        'Detailed audit report',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Search',
      categorySlugs: ['digital-marketing', 'troubleshooting'],
    },
    {
      name: 'Google Ads Campaign Management',
      slug: 'google-ads-campaign-management',
      description:
        'Professional Google Ads campaign setup and management to maximize ROI and conversions.',
      price: 499,
      originalPrice: 799,
      features: [
        'Campaign strategy development',
        'Keyword research & selection',
        'Ad copy creation',
        'Landing page optimization',
        'Bid management',
        'A/B testing setup',
        'Conversion tracking',
        'Monthly performance reports',
      ],
      isActive: true,
      isPopular: true,
      icon: 'Target',
      categorySlugs: ['digital-marketing'],
    },
    {
      name: 'Meta (Facebook & Instagram) Ads Management',
      slug: 'meta-facebook-instagram-ads-management',
      description:
        'Expert Facebook and Instagram advertising campaign management for social media success.',
      price: 399,
      originalPrice: 699,
      features: [
        'Audience research & targeting',
        'Creative development',
        'Campaign optimization',
        'A/B testing',
        'Pixel setup & tracking',
        'Retargeting campaigns',
        'Performance monitoring',
        'Monthly strategy reports',
      ],
      isActive: true,
      isPopular: true,
      icon: 'Users',
      categorySlugs: ['digital-marketing'],
    },
    {
      name: 'TikTok Ads Creation & Promotion',
      slug: 'tiktok-ads-creation-promotion',
      description:
        'Creative TikTok advertising campaigns designed to engage younger demographics effectively.',
      price: 349,
      originalPrice: 599,
      features: [
        'TikTok-native content creation',
        'Trending hashtag research',
        'Influencer collaboration',
        'Video ad optimization',
        'Audience targeting',
        'Performance tracking',
        'Viral content strategy',
        'Weekly performance reports',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Music',
      categorySlugs: ['digital-marketing', 'graphics-video'],
    },
    {
      name: 'LinkedIn B2B Ads Strategy & Management',
      slug: 'linkedin-b2b-ads-strategy-management',
      description:
        'Professional LinkedIn advertising for B2B lead generation and business growth.',
      price: 599,
      originalPrice: 999,
      features: [
        'B2B audience targeting',
        'Lead generation strategy',
        'Professional content creation',
        'InMail campaigns',
        'LinkedIn pixel setup',
        'Lead nurturing sequences',
        'ROI tracking',
        'Monthly B2B reports',
      ],
      isActive: true,
      isPopular: false,
      icon: 'Briefcase',
      categorySlugs: ['digital-marketing'],
    },
  ];

  console.log('🌱 Creating services...');

  for (const service of servicesToCreate) {
    const { categorySlugs, ...serviceData } = service;

    // If the service is popular, add the 'featured' category slug
    if (service.isPopular) {
      categorySlugs.push('featured');
    }

    // Prepare the connect statement for the many-to-many relation
    const categoryConnections = categorySlugs.map((slug) => ({
      id: categoryMap.get(slug)!,
    }));

    await prisma.service.create({
      data: {
        ...serviceData,
        categories: {
          connect: categoryConnections,
        },
      },
    });
  }

  console.log('✅ Services created');
  console.log('🎉 Seeding completed successfully!');
  console.log(
    `📊 Created ${categories.length} categories and ${servicesToCreate.length} services`,
  );
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
