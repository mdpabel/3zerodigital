import lazy from 'next/dynamic';
import prisma from '../../../prisma/db';

const PortfolioClient = lazy(() => import('./portfolio-client'));

type Props = {
  showFilters?: boolean;
  limit?: number;
  category?: string;
};

const PortfolioServer = async ({
  showFilters = false,
  limit = 6,
  category,
}: Props) => {
  try {
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
        take: limit,
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
      showFilters
        ? prisma.template.count({
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
          })
        : 0,
    ]);

    return (
      <PortfolioClient
        initialTemplates={templates}
        categories={categories}
        showFilters={showFilters}
        totalCount={totalCount}
      />
    );
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return (
      <div className='py-16 text-center'>
        <p className='text-red-500'>
          Error loading templates. Please try again later.
        </p>
      </div>
    );
  }
};

export default PortfolioServer;
