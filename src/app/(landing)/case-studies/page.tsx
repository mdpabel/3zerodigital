import { Metadata } from 'next';
import CaseStudiesList from './case-studies-list';
import { wordpress } from '@/lib/wordpress';

export async function generateMetadata(): Promise<Metadata> {
  // Dummy categories and tags for metadata keywords
  const categories = ['E-commerce', 'FinTech', 'Healthcare', 'SaaS'];
  const tags = ['WordPress', 'Next.js', 'SEO', 'Security', 'Malware Cleanup'];

  const keywords = [...categories, ...tags].join(', ');

  return {
    title: 'Case Studies - Success Stories | 3Zero Digital',
    description:
      'Explore our real-world case studies showcasing zero-compromise digital solutions in web development, SEO optimization, security, and advanced malware protection.',
    keywords,
    openGraph: {
      title: 'Case Studies - Success Stories | 3Zero Digital',
      description:
        'Explore our real-world case studies showcasing zero-compromise digital solutions in web development, SEO optimization, security, and advanced malware protection.',
      url: 'https://www.3zerodigital.com/case-studies', // Update with actual domain
      siteName: '3Zero Digital',
      images: [
        {
          url: '/images/case-studies-og-image.jpg', // Update with actual OG image path
          width: 1200,
          height: 630,
          alt: '3Zero Digital Case Studies',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Case Studies - Success Stories | 3Zero Digital',
      description:
        'Explore our real-world case studies showcasing zero-compromise digital solutions in web development, SEO optimization, security, and advanced malware protection.',
      images: ['/images/case-studies-twitter-image.jpg'], // Update with actual Twitter image path
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: 'https://www.3zerodigital.com/case-studies', // Update with actual domain
    },
  };
}

const CaseStudiesPage = async () => {
  const { hasMore, posts, total, totalPages } = await wordpress.getPosts({
    postType: 'case-study',
    status: 'publish',
  });

  console.log(total);

  return <CaseStudiesList />;
};

export default CaseStudiesPage;
