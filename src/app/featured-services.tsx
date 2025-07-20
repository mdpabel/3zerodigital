import React from 'react';
import FeaturedServicesClient from './featured-services-client';
import prisma from '../../prisma/db';

const FeaturedServices = async () => {
  const services = await prisma.service.findMany({
    where: {
      categories: {
        some: {
          name: 'Featured',
        },
      },
      isActive: true,
    },
    include: {
      categories: true,
    },
    take: 4, // Limit to 4 featured services
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <FeaturedServicesClient services={services} />;
};

export default FeaturedServices;
