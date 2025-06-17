import { getCategories } from '@/actions/service-actions';
import { ServiceForm } from '../service-form';

export default async function CreateServicePage() {
  // Only fetch the data that is actually needed for the form
  const categories = await getCategories();

  return (
    <div className='mx-auto py-8 container'>
      {/* Remove the unnecessary 'services' prop */}
      <ServiceForm categories={categories} mode='create' />
    </div>
  );
}
