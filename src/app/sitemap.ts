import prisma from '../../prisma/db';
import type { MetadataRoute } from 'next';
import { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types';

const generateStaticSitemap = () => {
  const staticPages = [
    '/',
    '/login',
    '/signup',
    '/offers',
    '/privacy-policy-policy',
    '/terms-of-service-of-service',
    '/contact',
    '/about-us',
    '/case-studies',
    '/blogs',
    '/shop',
    '/faq',
    '/careers',
    '/book-a-call',
    '/cookie-policy',
    '/refund-policy',
    '/login',
    '/signup',
  ];
  const urls: MetadataRoute.Sitemap = [];

  staticPages.forEach((page) => {
    urls.push({
      url: `https://www.3zerodigital.com${page}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    });
  });

  return urls;
};

// export const generateCaseStudiesSitemap = async () => {
//   const caseStudies = await fetchCaseStudies();

//   const caseStudySitemap = caseStudies.map((caseStudy) => ({
//     url: `https://www.3zerodigital.com/case-studies/${caseStudy.slug}`,
//     lastModified: new Date(),
//     changeFrequency: 'monthly',
//     priority: 0.7,
//   }));

//   return caseStudySitemap;
// };

// export const generateBlogSitemap = async () => {
//   const baseUrl = 'https://www.3zerodigital.com';

//   // Fetch dynamic content
//   const blogs = await getPosts();
//   const tags = await fetchTags();
//   const categories = await fetchCategories();

//   const posts = blogs.posts as WP_REST_API_Posts;

//   // Generate blog post URLs
//   const blogUrls: MetadataRoute.Sitemap = posts.map(
//     (post: WP_REST_API_Post) => ({
//       url: `${baseUrl}/blog/${post.slug}`,
//       lastModified: post.modified ? new Date(post.modified) : new Date(), // Use `modified` if available
//       changeFrequency: 'weekly',
//       priority: 0.7,
//     }),
//   );

//   // Generate category URLs
//   const categoryUrls: MetadataRoute.Sitemap = categories.map(
//     (category: { slug: string }) => ({
//       url: `${baseUrl}/category/${category.slug}`,
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.6,
//     }),
//   );

//   // Generate tag URLs
//   const tagUrls: MetadataRoute.Sitemap = tags.map((tag: { slug: string }) => ({
//     url: `${baseUrl}/tag/${tag.slug}`,
//     lastModified: new Date(),
//     changeFrequency: 'monthly',
//     priority: 0.4,
//   }));

//   return [...blogUrls, ...categoryUrls];
// };

const generateTemplateCategorySitemap = async () => {
  const categories = await prisma.templateCategory.findMany();

  const baseUrl = 'https://www.3zerodigital.com/shop/category';

  // Generate category URLs
  const categoriesUrl: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  return categoriesUrl;
};

// export const blacklistSitemap = () => {
//   const blacklist = blacklistData;
//   const baseUrl = 'https://www.3zerodigital.com/blacklist-removal';

//   // Generate category URLs
//   const urls: MetadataRoute.Sitemap = blacklist.map((b) => ({
//     url: `${baseUrl}/${b.slug}`,
//     lastModified: new Date(),
//     changeFrequency: 'monthly',
//     priority: 0.4,
//   }));

//   return urls;
// };

export default async function sitemap() {
  const staticPages = generateStaticSitemap();
  // const caseStudies = await generateCaseStudiesSitemap();
  // const blogs = await generateBlogSitemap();
  const templateCategory = await generateTemplateCategorySitemap();
  // const blacklist = blacklistSitemap();

  return [...staticPages, ...templateCategory];
}
