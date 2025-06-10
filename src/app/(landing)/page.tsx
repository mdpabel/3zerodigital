export const dynamic = 'force-static';

import FeaturedServices from '@/app/featured-services';
import Portfolio from '@/components/portfolio/portfolio';
import FinalCTA from '@/components/common/final-cta';
import Hero from './hero';
import CategoryWhyChooseUs from '@/components/common/why-choose-us';
import CompanyStats from '@/components/common/company-stats';

const Home = async () => {
  return (
    <div>
      <Hero />
      <FeaturedServices />
      <CategoryWhyChooseUs />
      <Portfolio limit={6} />
      <CompanyStats />
      <FinalCTA />
    </div>
  );
};

export default Home;
