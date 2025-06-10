import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { getServices } from '@/actions/service-actions';
import Spinner from '@/components/common/spinner';

export default async function ServicesPage() {
  return (
    <div className='mx-auto py-8 container'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-bold text-gray-900 dark:text-white text-3xl'>
            Services Management
          </h1>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Manage your agency services and pricing
          </p>
        </div>
        <Link href='/admin/services/new'>
          <Button>
            <Plus className='mr-2 w-4 h-4' />
            Add Service
          </Button>
        </Link>
      </div>

      <Suspense fallback={<Spinner />}>
        {/* <ServicesListWrapper /> */}
      </Suspense>
    </div>
  );
}

// async function ServicesListWrapper() {
//   const services = await getServices(true);

//   return <ServicesList services={services} />;
// }
