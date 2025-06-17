import { getCategories, getServiceById } from '@/actions/service-actions';
import { notFound } from 'next/navigation';
import { ServiceForm } from '../../service-form';

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const serviceId = (await params).id;

  const [service, categories] = await Promise.all([
    getServiceById(serviceId),
    getCategories(),
  ]);

  if (!service) {
    notFound();
  }

  // IMPORTANT: Convert Decimal fields to numbers before passing to the client component
  const serializableInitialData = {
    ...service,
    price: service.price,
    originalPrice: service.originalPrice ? service.originalPrice : null, // Handle optional field
  };

  return (
    <div className='mx-auto py-8 container'>
      <ServiceForm
        // Pass the serialized data, not the raw service object
        initialData={serializableInitialData}
        categories={categories}
        mode='edit'
      />
    </div>
  );
}
