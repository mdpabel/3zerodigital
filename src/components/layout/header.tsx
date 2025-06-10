import prisma from '@/prisma/db';
import { Navbar } from './navbar';
import { getCategoriesWithServices } from '@/actions/service-actions';

const Header = async () => {
  const categories = await getCategoriesWithServices();

  const serialized = categories.map((category) => ({
    ...category,
    services: category.services.map((s) => ({
      ...s,
      price: s.price?.toNumber() ?? null,
      originalPrice: s.originalPrice?.toNumber() ?? null,
    })),
  }));

  return <Navbar services={serialized} />;
};

export default Header;
