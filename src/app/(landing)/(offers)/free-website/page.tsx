import React from 'react';
import CampaignLanding from './campaign-landing';
import prisma from '../../../../../prisma/db';

const page = async () => {
  const category = false;

  const [templates, categories, totalCount] = await Promise.all([
    // Fetch templates
    prisma.template.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      take: 12,
      where: {
        deleted: false,
        salePrice: 0,
        ...(category && {
          categories: {
            some: {
              category: {
                name: category,
              },
            },
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),

    // Fetch categories (only those with templates)
    prisma.templateCategory.findMany({
      where: {
        templates: {
          some: {
            template: {
              deleted: false,
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    }),

    // Count total templates (only if needed for pagination)
    prisma.template.count({
      where: {
        deleted: false,
        ...(category && {
          categories: {
            some: {
              category: {
                name: category,
              },
            },
          },
        }),
      },
    }),
  ]);

  return (
    <CampaignLanding
      initialTemplates={templates}
      categories={categories}
      showFilters={false}
      totalCount={totalCount}
    />
  );
};

export default page;
