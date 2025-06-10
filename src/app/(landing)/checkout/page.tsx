import { Suspense } from 'react';
import Spinner from '@/components/common/spinner';
import { getServices } from '@/actions/service-actions';
import { CheckoutForm } from './checkout-form';

export default async function CheckoutPage() {
  return (
    <div className='mx-auto py-8 container'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8 text-center'>
          <h1 className='font-bold text-gray-900 dark:text-white text-3xl'>
            Place Your Order
          </h1>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Get started with professional digital services
          </p>
        </div>

        <Suspense fallback={<Spinner />}>
          <CheckoutWrapper />
        </Suspense>
      </div>
    </div>
  );
}

async function CheckoutWrapper() {
  const services = await getServices();

  return <CheckoutForm services={services} />;
}
