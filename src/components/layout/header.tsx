import { Navbar } from './navbar';
import { getCategoriesWithServices } from '@/actions/service-actions';

const Header = async () => {
  const categories = (await getCategoriesWithServices()).filter(
    (c) => c.name !== 'Featured',
  );

  const serialized = categories.map((category) => ({
    ...category,
    services: category.services.map((s) => ({
      ...s,
      price: s.price ?? null,
      originalPrice: s.originalPrice ?? null,
    })),
  }));

  return <Navbar services={serialized} />;
};

export default Header;
