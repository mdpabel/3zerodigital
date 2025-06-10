import { motion } from 'framer-motion';
import ComponentWrapper from '@/components/common/component-wrapper';
import BlogHeader from './blog-header';
import BlogContent from './blog-content';
import BlogSidebar from './blog-sidebar';
import { BlogBreadcrumb, BlogShare } from './blog-breadcrumb';

// Dummy blog post data
const blogPost = {
  id: 1,
  title:
    'Complete Guide to SSL Certificates: Why Your Website Needs HTTPS in 2024',
  slug: 'complete-guide-ssl-certificates-https-2024',
  excerpt:
    "Learn everything you need to know about SSL certificates, why they're essential for your website, and how to implement them properly for maximum security and SEO benefits.",
  content: `
    <p>In today's digital landscape, website security has become more critical than ever. With cyber threats on the rise and Google prioritizing secure websites in search rankings, SSL certificates have evolved from a nice-to-have feature to an absolute necessity.</p>

    <h2>What is an SSL Certificate?</h2>
    <p>SSL (Secure Socket Layer) certificates are small data files that digitally bind a cryptographic key to your organization's details. When installed on a web server, it activates the padlock and the https protocol, allowing secure connections from a web server to a browser.</p>

    <h3>Types of SSL Certificates</h3>
    <p>There are several types of SSL certificates available:</p>
    <ul>
      <li><strong>Domain Validated (DV)</strong> - Basic encryption, perfect for blogs and small websites</li>
      <li><strong>Organization Validated (OV)</strong> - Medium encryption with company verification</li>
      <li><strong>Extended Validation (EV)</strong> - Highest level of encryption with comprehensive verification</li>
    </ul>

    <h2>Why SSL Certificates Are Essential</h2>
    <p>SSL certificates provide multiple benefits that are crucial for modern websites:</p>

    <h3>1. Data Protection</h3>
    <p>SSL certificates encrypt all data transmitted between your website and visitors, protecting sensitive information like passwords, credit card numbers, and personal details from hackers and cybercriminals.</p>

    <h3>2. SEO Benefits</h3>
    <p>Google has confirmed that HTTPS is a ranking signal. Websites with SSL certificates receive a slight ranking boost compared to their non-secure counterparts. This means better visibility in search results and more organic traffic.</p>

    <h3>3. Trust and Credibility</h3>
    <p>The padlock icon and "Secure" label in browsers instantly communicate to visitors that your site is safe. This builds trust and can significantly improve conversion rates, especially for e-commerce websites.</p>

    <h2>Common SSL Implementation Mistakes</h2>
    <p>Many website owners make critical errors when implementing SSL certificates:</p>

    <blockquote>
      <p>"The most common mistake we see is incomplete HTTPS migration, where some resources still load over HTTP, creating mixed content warnings that can actually hurt user trust more than having no SSL at all."</p>
    </blockquote>

    <h3>Mixed Content Issues</h3>
    <p>Mixed content occurs when HTTPS pages load HTTP resources. This creates security warnings and can prevent proper SSL functionality. Common culprits include:</p>
    <ul>
      <li>Images loaded from HTTP URLs</li>
      <li>External scripts and stylesheets</li>
      <li>Embedded videos or widgets</li>
      <li>Web fonts from unsecured CDNs</li>
    </ul>

    <h2>SSL Installation Best Practices</h2>
    <p>Proper SSL installation involves several critical steps:</p>

    <ol>
      <li><strong>Choose the Right Certificate</strong> - Select based on your website type and security needs</li>
      <li><strong>Complete Domain Validation</strong> - Ensure all domains and subdomains are covered</li>
      <li><strong>Configure Redirects</strong> - Set up proper 301 redirects from HTTP to HTTPS</li>
      <li><strong>Update Internal Links</strong> - Change all internal links to use HTTPS</li>
      <li><strong>Fix Mixed Content</strong> - Identify and resolve all mixed content issues</li>
      <li><strong>Test Thoroughly</strong> - Use SSL testing tools to verify proper implementation</li>
    </ol>

    <h2>Conclusion</h2>
    <p>SSL certificates are no longer optional for websites. They're essential for security, user trust, and SEO performance. While the technical implementation can be complex, the benefits far outweigh the effort required.</p>

    <p>If you're not technically inclined, consider hiring a professional service to handle the installation. The cost of professional installation is minimal compared to the potential losses from security breaches or poor search rankings.</p>
  `,
  author: {
    name: 'Sarah Johnson',
    avatar: '/images/authors/sarah-johnson.jpg',
    bio: 'Senior Web Security Specialist with 8+ years of experience in SSL implementation and website security.',
    social: {
      twitter: '@sarahjohnson_dev',
      linkedin: 'sarahjohnson',
    },
  },
  publishedAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-20T14:30:00Z',
  readingTime: 8,
  category: {
    name: 'Security',
    slug: 'security',
    color: 'green',
  },
  tags: [
    { name: 'SSL', slug: 'ssl' },
    { name: 'HTTPS', slug: 'https' },
    { name: 'Security', slug: 'security' },
    { name: 'SEO', slug: 'seo' },
    { name: 'Web Development', slug: 'web-development' },
  ],
  featuredImage: '/images/blog/ssl-guide-hero.jpg',
  views: 2847,
  likes: 156,
  commentsCount: 23,
};

// Mock related posts
const relatedPosts = [
  {
    id: 2,
    title: 'Website Speed Optimization: Complete Guide for 2024',
    slug: 'website-speed-optimization-guide-2024',
    excerpt:
      'Learn how to dramatically improve your website loading times with proven optimization techniques.',
    featuredImage: '/images/blog/speed-optimization.jpg',
    publishedAt: '2024-01-10T09:00:00Z',
    readingTime: 12,
    category: { name: 'Performance', slug: 'performance', color: 'blue' },
    author: { name: 'Mike Chen', avatar: '/images/authors/mike-chen.jpg' },
  },
  {
    id: 3,
    title: 'SEO Best Practices for Small Business Websites',
    slug: 'seo-best-practices-small-business',
    excerpt:
      'Essential SEO strategies that small businesses can implement to improve their online visibility.',
    featuredImage: '/images/blog/seo-small-business.jpg',
    publishedAt: '2024-01-08T11:30:00Z',
    readingTime: 10,
    category: { name: 'SEO', slug: 'seo', color: 'purple' },
    author: {
      name: 'Emily Rodriguez',
      avatar: '/images/authors/emily-rodriguez.jpg',
    },
  },
  {
    id: 4,
    title: 'Building Trust Online: Essential Elements for Business Websites',
    slug: 'building-trust-online-business-websites',
    excerpt:
      'Discover the key elements that make visitors trust your website and convert into customers.',
    featuredImage: '/images/blog/building-trust.jpg',
    publishedAt: '2024-01-05T16:00:00Z',
    readingTime: 7,
    category: { name: 'Business', slug: 'business', color: 'orange' },
    author: { name: 'David Kim', avatar: '/images/authors/david-kim.jpg' },
  },
];

export default function BlogPostPage() {
  return (
    <div className='bg-gradient-to-br from-slate-50 dark:from-slate-950 via-white dark:via-slate-900 to-blue-50/30 dark:to-blue-950/30 min-h-screen'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl container'>
          {/* Breadcrumb */}
          {/* <BlogBreadcrumb category={blogPost.category} title={blogPost.title} /> */}

          {/* Blog Header */}
          <BlogHeader post={blogPost} />

          <div className='gap-12 grid grid-cols-1 lg:grid-cols-4 mt-12'>
            {/* Main Content */}
            <div className='lg:col-span-3'>
              <BlogContent post={blogPost} />
              <BlogShare post={blogPost} />
              {/* <BlogComments post={blogPost} /> */}
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>
              <BlogSidebar />
            </div>
          </div>

          {/* Related Posts */}
          {/* <RelatedPosts posts={relatedPosts} />  */}
        </div>
      </ComponentWrapper>
    </div>
  );
}
