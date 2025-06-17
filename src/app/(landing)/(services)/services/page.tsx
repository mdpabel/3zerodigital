import {
  getCategories,
  getServices, // We'll assume a new paginated action
} from '@/actions/service-actions';
import ServicesBrowser from './services-browser';

// This page can be statically generated and revalidated
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static';

const SERVICES_PAGE_SIZE = 6;

const ServicesPage = async () => {
  // Fetch initial data on the server
  const services = await getServices();
  const categories = await getCategories();

  return <ServicesBrowser services={services} categories={categories} />;
};

export default ServicesPage;
