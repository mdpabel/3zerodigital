import {
  FaWordpress,
  FaShopify,
  FaServer,
  FaReact,
  FaShieldAlt,
  FaRocket,
  FaBug,
  FaExclamationTriangle,
  FaEnvelope,
  FaFacebook,
  FaLink,
  FaNodeJs,
  FaJs,
  FaCode,
  FaCube,
  FaImage,
  FaPlay,
} from 'react-icons/fa';

export const services = [
  {
    label: 'Development',
    href: '/development',
    description:
      'Comprehensive development services for modern web platforms, e-commerce, and full-stack applications.',
    icon: <FaJs />,
    imageUrl: '/services/1.png',
    meta: {
      title: 'Web Development Services | Custom Solutions for Your Business',
      description:
        'We provide modern web development services including e-commerce platforms, WordPress sites, and full-stack applications to help grow your online presence.',
    },
    serviceCategories: [
      {
        label: 'WordPress Development',
        href: '/wordpress-development',
        description: 'Custom themes, plugins, and WordPress site development.',
        icon: <FaWordpress />,
        featured: true,
        meta: {
          title:
            'Custom WordPress Solutions | Themes, Plugins, and Development',
          description:
            'Get custom WordPress development services with tailored themes, plugins, and full website development.',
        },
      },
      {
        label: 'Headless WordPress & Next.js',
        href: '/headless-wordpress-and-next.js',
        description:
          'Build modern, high-performance headless WordPress sites with Next.js.',
        icon: <FaReact />,
        featured: true,
        meta: {
          title: 'Headless WordPress with Next.js | High-Performance Websites',
          description:
            'Leverage the power of Next.js to create fast, secure, and scalable headless WordPress websites.',
        },
      },
      {
        label: 'Shopify Development',
        href: '/shopify',
        description:
          'Create scalable and engaging e-commerce stores using Shopify.',
        icon: <FaShopify />,
        featured: true,
        meta: {
          title: 'Shopify Development | Scalable E-commerce Solutions',
          description:
            'Develop high-converting, scalable e-commerce stores with Shopify, designed to grow your business.',
        },
      },
      {
        label: 'Fullstack Next.js Applications',
        href: '/nextjs-fullstack',
        description: 'End-to-end Next.js application development.',
        icon: <FaNodeJs />,
        featured: true,
        meta: {
          title: 'Fullstack Next.js Development | Build Dynamic Web Apps',
          description:
            'End-to-end web application development using Next.js for dynamic, fast, and scalable applications.',
        },
      },
      {
        label: 'MERN Stack Development',
        href: '/mern-stack',
        description:
          'Full-stack development using MongoDB, Express, React, and Node.js.',
        icon: <FaReact />,
        featured: true,
        meta: {
          title: 'MERN Stack Development | Build Modern Web Apps',
          description:
            'Develop full-stack applications using MongoDB, Express, React, and Node.js for fast and scalable solutions.',
        },
      },
      {
        label: 'Frontend',
        href: '/frontend',
        description: 'Modern frontend development using HTML, CSS, JavaScript.',
        icon: <FaCode />,
        featured: true,
        meta: {
          title: 'Frontend Web Development | Responsive & Modern UI',
          description:
            'Create modern, responsive user interfaces using the latest frontend technologies like HTML5, CSS3, and JavaScript.',
        },
      },
    ],
  },
  {
    label: 'Maintenance',
    href: '/maintenance',
    description:
      'Keep your website secure and up-to-date with our maintenance services.',
    icon: <FaShieldAlt />,
    imageUrl: '/services/2.png',
    meta: {
      title: 'Website Maintenance Services | Secure, Fast & Up-to-Date',
      description:
        'Ensure your website stays secure, fast, and up-to-date with ongoing maintenance services including backups, updates, and performance optimization.',
    },
    serviceCategories: [
      {
        label: 'WordPress Malware Removal',
        href: '/wordpress-malware-removal',
        description: 'Fix hacked sites with malware or redirect issues.',
        icon: <FaBug />,
        featured: true,
        meta: {
          title: 'WordPress Malware Removal | Clean & Secure Your Site',
          description:
            'Remove malware from your WordPress site and restore it to full functionality.',
        },
      },
      {
        label: 'WordPress Speed Optimization',
        href: '/wordpress-speed-optimization',
        description: 'Speed up your WordPress website for optimal performance.',
        icon: <FaRocket />,
        featured: true,
        meta: {
          title: 'WordPress Speed Optimization | Improve Performance',
          description:
            'Optimize your WordPress website for speed and performance to provide an excellent user experience and boost SEO.',
        },
      },
      {
        label: 'WordPress Security',
        href: '/wordpress-security',
        description: 'Enhance WordPress security to prevent attacks.',
        icon: <FaShieldAlt />,
        featured: true,
        meta: {
          title: 'WordPress Security | Protect Your Site from Attacks',
          description:
            'Implement strong security measures to protect your WordPress site from hackers and vulnerabilities.',
        },
      },
      {
        label: 'Ongoing WordPress Maintenance',
        href: '/ongoing-wordpress-maintenance',
        description: 'Continuous backups, updates, and monitoring.',
        icon: <FaShieldAlt />,
        featured: true,
        meta: {
          title:
            'Ongoing WordPress Maintenance | Keep Your Site Running Smoothly',
          description:
            'Ensure your WordPress site is always secure and up-to-date with continuous monitoring and maintenance.',
        },
      },
      {
        label: 'Blacklist Removal',
        href: '/blacklist-removal',
        description:
          'Remove your website from blacklists and restore its reputation.',
        icon: <FaShieldAlt />,
        featured: false,
        meta: {
          title: 'Blacklist Removal | Restore Your Website’s Reputation',
          description:
            'Remove your website from blacklists and fix any reputation issues to ensure it remains trusted by search engines.',
        },
      },
      {
        label: 'Email Deliverability Issues',
        href: '/email-deliverability-issues',
        description:
          'Resolve issues with email deliverability, spam filters, and blacklisting.',
        icon: <FaEnvelope />,
        featured: true,
        meta: {
          title: 'Email Deliverability Solutions | Improve Inbox Placement',
          description:
            'Resolve email deliverability issues, improve inbox placement, and avoid spam filters or blacklisting.',
        },
      },
      {
        label: 'Website Migration',
        href: '/website-migration',
        description:
          'Smoothly migrate your website to a new host or platform without downtime.',
        icon: <FaServer />,
        featured: false,
        meta: {
          title: 'Website Migration Services | Secure & Seamless Transition',
          description:
            'Move your website to a new host or platform with zero downtime and secure data migration.',
        },
      },
      {
        label: 'SSL Installation',
        href: '/ssl-installation',
        description:
          'Secure your website with SSL installation, ensuring safe data transmission.',
        icon: <FaShieldAlt />,
        featured: false,
        meta: {
          title: 'SSL Installation | Secure Your Website with HTTPS',
          description:
            'Protect your website and customer data by installing SSL certificates to enable secure connections.',
        },
      },
    ],
  },
  {
    label: 'Troubleshooting',
    href: '/troubleshooting',
    description: 'Quickly diagnose and fix common website errors and issues.',
    icon: <FaExclamationTriangle />,
    imageUrl: '/services/3.png',
    meta: {
      title:
        'Website Troubleshooting Services | Fix Errors & Restore Functionality',
      description:
        'We quickly diagnose and resolve common website errors such as 404, 500, and 403 to keep your site running smoothly.',
    },
    serviceCategories: [
      {
        label: '404 Page',
        href: '/404-not-found-error',
        description: 'Fix 404 errors and ensure proper redirection.',
        icon: <FaExclamationTriangle />,
        featured: true,
        meta: {
          title: 'Fix 404 Errors | Restore Missing Pages & Redirects',
          description:
            'Fix 404 errors, redirect broken links, and restore missing pages for a seamless user experience.',
        },
      },
      {
        label: '500 Page',
        href: '/500-internal-server-error',
        description: 'Resolve 500 Internal Server Errors.',
        icon: <FaExclamationTriangle />,
        featured: true,
        meta: {
          title:
            'Fix 500 Internal Server Errors | Restore Website Functionality',
          description:
            'Diagnose and resolve 500 Internal Server Errors to ensure your website remains accessible.',
        },
      },
      {
        label: '403 Forbidden',
        href: '/403-forbidden',
        description: 'Fix 403 errors for access issues.',
        icon: <FaExclamationTriangle />,
        featured: true,
        meta: {
          title: 'Fix 403 Forbidden Errors | Resolve Access Issues',
          description:
            'Fix 403 Forbidden errors to allow proper access to your website’s resources.',
        },
      },
      {
        label: 'Mixed Content Error',
        href: '/mixed-content-error',
        description:
          'Resolve mixed content errors to ensure all elements are loaded securely.',
        icon: <FaExclamationTriangle />,
        featured: true,
        meta: {
          title: 'Fix Mixed Content Errors | Secure Your Website Elements',
          description:
            'Resolve mixed content issues on your website to ensure all resources are loaded securely over HTTPS.',
        },
      },
      {
        label: 'White Screen Of Death',
        href: '/white-screen-of-death',
        description:
          'Diagnose and fix the white screen issue that makes your site inaccessible.',
        icon: <FaExclamationTriangle />,
        featured: true,
        meta: {
          title: 'Fix White Screen of Death | Restore Website Access',
          description:
            'Fix the White Screen of Death (WSOD) error and restore access to your website.',
        },
      },
    ],
  },
  {
    label: 'Marketing',
    href: '/marketing',
    description:
      'Drive traffic and increase conversions with targeted marketing strategies.',
    icon: <FaRocket />,
    imageUrl: '/services/4.png',
    meta: {
      title: 'Digital Marketing Services | SEO, Social Media & More',
      description:
        'Boost your online visibility and drive conversions with targeted digital marketing strategies including SEO, social media, and 3D content.',
    },
    serviceCategories: [
      {
        label: '3D Model',
        href: '/3d-model',
        description: 'Create stunning 3D models for your business or projects.',
        icon: <FaCube />,
        featured: true,
        meta: {
          title: '3D Model Creation | Visualize Your Business Ideas',
          description:
            'Create realistic and high-quality 3D models to showcase your products or services.',
        },
      },
      {
        label: '3D Render Image',
        href: '/3d-render-image',
        description:
          'Generate high-quality 3D render images for visualization and marketing.',
        icon: <FaImage />,
        featured: true,
        meta: {
          title: '3D Render Images | High-Quality Visualization',
          description:
            'Generate realistic and professional 3D render images for your marketing campaigns or presentations.',
        },
      },
      {
        label: '3D Animation',
        href: '/3d-animation',
        description:
          'Develop captivating 3D animations to promote your products or services.',
        icon: <FaPlay />,
        featured: true,
        meta: {
          title: '3D Animation Services | Engage Customers with Visual Stories',
          description:
            'Create engaging 3D animations to tell your brand’s story and captivate your audience.',
        },
      },
      {
        label: 'SEO Optimization',
        href: '/seo-optimization',
        description: 'Optimize your site for search engine visibility.',
        icon: <FaRocket />,
        featured: true,
        meta: {
          title: 'SEO Optimization Services | Improve Search Engine Rankings',
          description:
            'Boost your website’s visibility with effective SEO strategies designed to improve search rankings and drive traffic.',
        },
      },
      {
        label: 'Backlink Building',
        href: '/backlink-building',
        description:
          'Increase your site’s authority through strategic backlink building.',
        icon: <FaLink />,
        featured: true,
        meta: {
          title: 'Backlink Building | Boost Domain Authority and SEO',
          description:
            'Increase your website’s SEO performance and domain authority with high-quality backlinks.',
        },
      },
      {
        label: 'Social Media Marketing',
        href: '/social-media',
        description:
          'Boost your brand’s online presence with effective social media marketing.',
        icon: <FaFacebook />,
        featured: true,
        meta: {
          title: 'Social Media Marketing | Grow Your Brand’s Online Presence',
          description:
            'Increase your brand visibility and engagement on platforms like Facebook, Instagram, and Twitter with tailored social media marketing strategies.',
        },
      },
    ],
  },
] as const;
