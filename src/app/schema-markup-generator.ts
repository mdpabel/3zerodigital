export const generateSchemaMarkup = (slug: string) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '3zerodigital.com',
        item: 'https://www.3zerodigital.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: slug,
        item: `https://www.3zerodigital.com/${slug}`,
      },
    ],
  };
};
