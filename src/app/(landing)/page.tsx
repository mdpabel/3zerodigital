export const dynamic = 'force-static';

import Portfolio from '@/components/portfolio/portfolio';
import Hero from './hero';
import CategoryWhyChooseUs from '@/components/common/why-choose-us';
import CompanyStats from '@/components/common/company-stats';
import { getServices } from '@/actions/service-actions';
import ServicesBrowser from '@/components/services/services-browser';
import { getCategories } from '@/actions/category-actions';
import FreePerksBadge from '@/components/common/free-perk-badge';

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
      {/* <FeaturedServices featuredServices={services} />  */}
      <ServicesBrowser services={services} categories={categories} />
      <CategoryWhyChooseUs />
      <Portfolio limit={6} />
      <CompanyStats />
    </div>
  );
};

export default Home;
