export const dynamic = 'force-static';

import Portfolio from '@/components/portfolio/portfolio';
import Hero from './hero';
import CategoryWhyChooseUs from '@/components/common/why-choose-us';
import CompanyStats from '@/components/common/company-stats';
import { getFeaturedServices } from '@/actions/service-actions';
import FeaturedServices from '@/components/services/featured-services';

const Home = async () => {
  const services = await getFeaturedServices();

  return (
    <div>
      <Hero />
      <FeaturedServices featuredServices={services} />
      <CategoryWhyChooseUs />
      <Portfolio limit={6} />
      <CompanyStats />
    </div>
  );
};

export default Home;
