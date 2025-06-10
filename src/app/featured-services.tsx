import React from 'react';
import FeaturedServicesClient from './featured-services-client';
import prisma from '@/prisma/db';

const FeaturedServices = async () => {
  const categories = await prisma.category.findMany({
    include: {
      services: true,
    },
  });

  const serialized = categories.map((category) => ({
    ...category,
    services: category.services.map((s) => ({
      ...s,
      price: s.price?.toNumber() ?? null,
      originalPrice: s.originalPrice?.toNumber() ?? null,
    })),
  }));

  return <FeaturedServicesClient />;
};

export default FeaturedServices;
