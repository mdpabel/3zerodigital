export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '3Zero Digital',
  url: 'https://www.3zerodigital.com',
  logo: 'https://www.3zerodigital.com/images/logo-light.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+44 7878 798374',
    contactType: 'customer service',
    areaServed: 'GB',
    availableLanguage: 'en',
  },
  sameAs: [
    'https://www.facebook.com/3zerodigital.LLC',
    'https://x.com/3ZeroDigital',
    'https://www.linkedin.com/company/3zerodigital',
  ],
};

export const productSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Custom Web Development & Security Agency | 3Zero Digital',
  image: 'https://www.3zerodigital.com/images/logo-light.png',
  description: `Offering top-tier custom web development and website security solutions with
virtually zero vulnerabilities, zero downtime, and zero errors. We ensure your business achieves
optimal digital performance.`,
  brand: {
    '@type': 'Brand',
    name: '3Zero Digital',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '4.9',
    ratingCount: '100',
  },
};

export const ratingSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Custom Web Development & Security Agency | 3Zero Digital',
  image: 'https://www.3zerodigital.com/images/logo-light.png',
  description:
    'Offering top-tier custom web development and website security solutions with virtually zero vulnerabilities, zero downtime, and zero errors. We ensure your business achieves optimal digital performance.',
  brand: {
    '@type': 'Brand',
    name: '3Zero Digital',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '4.9',
    ratingCount: '100',
  },
};
