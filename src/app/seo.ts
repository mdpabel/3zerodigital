import { Metadata } from 'next';
import { siteMetadata } from './metadata';
import prisma from '@/prisma/db';

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  [key: string]: any; // For any other dynamic properties like `url`, etc.
}

// Function to generate metadata for services and subservices
export function genMetaData({
  title,
  description,
  image,
  url,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title: `${title} | ${siteMetadata.title}`,
    description: description || siteMetadata.description,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: url || './', // Ensure the correct URL is provided
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    alternates: {
      canonical: url,
    },
    ...rest,
  };
}

// Function to dynamically generate metadata for a service or subservice
export async function getServiceMetadata(serviceHref: string) {
  const service = null;

  if (service) {
    return genMetaData({
      title: service.metaTitle!,
      description: service.metaDescription!,
      url: `https://www.3zerodigital.com/${service.slug}`,
    });
  }

  // Default metadata if no matching service or subservice is found
  return genMetaData({
    title: '3Zero Digital | Services',
    description: 'Explore our wide range of services.',
    url: 'https://www.3zerodigital.com/services',
  });
}
