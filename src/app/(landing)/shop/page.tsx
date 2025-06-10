import { genMetaData } from '@/app/seo';
import prisma from '@/prisma/db';
import Portfolio from '@/components/portfolio/portfolio';
import { Suspense } from 'react';
import PortfolioSkeleton from '@/components/portfolio/portfolio-skeleton';

export const metadata = genMetaData({
  title: 'Shop',
  url: '/shop',
});

export async function generateStaticParams() {
  const templates = await prisma.template.findMany();

  return templates.map((template) => ({
    slug: template.slug,
  }));
}

type Props = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
};

const ShopPage = async () => {
  return (
    <Suspense fallback={<PortfolioSkeleton />}>
      <Portfolio showFilters={true} />
    </Suspense>
  );
};

export default ShopPage;
