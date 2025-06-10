import ComponentWrapper from '@/components/common/component-wrapper';
import Hero from '@/components/common/Hero';
import SEOServiceForm from '../seo-form';
import {
  FaCogs,
  FaBug,
  FaTools,
  FaDatabase,
  FaServer,
  FaSearch,
  FaUsers,
  FaHandshake,
  FaChartPie,
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SEOComparison from '../seo-comparison';
import ServiceHero from '@/components/common/Hero';

const features = [
  {
    title: 'Site Audits & Diagnostics',
    description:
      'Comprehensive site audits to identify and fix technical SEO issues slowing down your site.',
    icon: <FaBug className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Speed Optimization',
    description:
      'Enhance page load times and site responsiveness for better user experience and rankings.',
    icon: <FaTools className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Structured Data & Schema',
    description:
      'Implement schema markup to help search engines better understand and display your content.',
    icon: <FaDatabase className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Server & Hosting Configuration',
    description:
      'Optimize server settings and ensure reliable hosting to minimize downtime and improve crawlability.',
    icon: <FaServer className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Indexation & Crawlability',
    description:
      'Ensure search engines can effectively crawl and index your site pages to maximize visibility.',
    icon: <FaSearch className='w-12 h-12 text-gradient' />,
  },
  {
    title: 'Technical SEO Monitoring',
    description:
      'Continuous monitoring and fixing of issues like broken links, redirects, and errors to maintain SEO health.',
    icon: <FaCogs className='w-12 h-12 text-gradient' />,
  },
];

const whyChooseStats = [
  {
    number: '0',
    label: 'Vulnerability',
    icon: <FaUsers className='mx-auto mb-2 w-10 h-10 text-gradient' />,
  },
  {
    number: '0',
    label: 'Downtime',
    icon: <FaHandshake className='mx-auto mb-2 w-10 h-10 text-gradient' />,
  },
  {
    number: '0',
    label: 'Error',
    icon: <FaChartPie className='mx-auto mb-2 w-10 h-10 text-gradient' />,
  },
];

const coreValuesTabs = [
  {
    label: 'Technical SEO Pricing',
    content: `Our pricing is customized based on your site’s complexity and goals. Starting prices vary by project scope and client needs.`,
  },
  {
    label: 'Reporting',
    content: `Receive detailed technical SEO reports including site health, crawl stats, and performance improvements.`,
  },
  {
    label: 'Accountability',
    content: `We provide dedicated support and timely fixes to ensure your technical SEO remains flawless.`,
  },
];

const TechnicalSEOPage = () => {
  return (
    <div>
      <ServiceHero
        title='Technical SEO'
        subtitle='Optimize Your Site’s Foundation'
        description='Optimize your website’s infrastructure with Technical SEO to improve speed, crawlability, indexing, and overall search engine performance.'
        badge='Technical SEO'
        backgroundGradient='from-indigo-600/20 via-blue-600/10 to-green-600/20 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-green-900/30'
        primaryColor='from-indigo-600 to-green-600'
        secondaryColor='from-blue-500 to-indigo-600'
        features={[
          {
            icon: 'Settings',
            text: 'Site Health',
            description: 'Fix crawl & index issues',
            color: 'from-indigo-500 to-green-600',
          },
          {
            icon: 'Zap',
            text: 'Speed Optimization',
            description: 'Faster load times',
            color: 'from-blue-500 to-indigo-600',
          },
          {
            icon: 'Shield',
            text: 'Security',
            description: 'Protect your site & users',
            color: 'from-green-500 to-blue-600',
          },
        ]}
        stats={[
          { value: '500+', label: 'Sites Audited', icon: 'Settings' },
          { value: '<2s', label: 'Avg. Load Time', icon: 'Zap' },
          { value: '100%', label: 'Secure', icon: 'Shield' },
        ]}
        ctaPrimary={{
          text: 'Get Technical SEO',
          href: '/contact?service=technical-seo',
        }}
        ctaSecondary={{
          text: 'See Audit Results',
          href: '/portfolio?category=technical-seo',
        }}
      />
    </div>
  );
};

export default TechnicalSEOPage;
