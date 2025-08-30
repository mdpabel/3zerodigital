import React from 'react';
import prisma from '../../../../prisma/db';
import { notFound } from 'next/navigation';
import CheckoutForm from './checkout-form';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ templateId: string }>;
}) => {
  const { templateId } = await searchParams;

  // Fetch template details using templateId
  const template = await prisma.template.findUnique({
    where: { id: templateId },
  });

  if (!template) {
    return notFound();
  }

  return <CheckoutForm template={template} />;
};

export default page;
