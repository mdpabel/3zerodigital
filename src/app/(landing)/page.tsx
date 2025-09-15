export const dynamic = 'force-static';

import lazy from 'next/dynamic';
import Portfolio from '@/components/portfolio/portfolio';
import Hero from './hero';
import { getServices } from '@/actions/service-actions';
import { getCategories } from '@/actions/category-actions';

const ServicesBrowser = lazy(
  () => import('@/components/services/services-browser'),
);
const CategoryWhyChooseUs = lazy(
  () => import('@/components/common/why-choose-us'),
);
const CompanyStats = lazy(() => import('@/components/common/company-stats'));

const Home = async () => {
  const services = await getServices();
  const categories = await getCategories();

  categories.sort((a, b) => {
    if (a.name === 'Featured') return -1;
    if (b.name === 'Featured') return 1;
    return 0;
  });

  return (
    <div>
      <Hero />
      <ServicesBrowser services={services} categories={categories} />
      <CategoryWhyChooseUs />
      <Portfolio limit={6} />
      <CompanyStats />
    </div>
  );
};

export default Home;
