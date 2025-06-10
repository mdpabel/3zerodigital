import { getServices } from '@/actions/service-actions';
import { ServiceForm } from '../service-form';

export default async function NewServicePage() {
  // const categories = await getCategories();
  const services = await getServices(); // For related services

  return (
    <div className='mx-auto py-8 container'>
      <div className='mb-8'>
        <h1 className='font-bold text-gray-900 dark:text-white text-3xl'>
          Create New Service
        </h1>
        <p className='mt-2 text-gray-600 dark:text-gray-300'>
          Add a new service to your offerings
        </p>
      </div>

      <ServiceForm categories={[]} services={services} />
    </div>
  );
}
