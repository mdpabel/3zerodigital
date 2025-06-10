import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className='mx-auto px-4 py-12 max-w-3xl text-center container'>
      <div className='bg-gray-100 dark:bg-gray-900 shadow-lg p-8 rounded-lg'>
        <div className='flex justify-center items-center text-blue-500'>
          <Loader2 className='mr-4 animate-spin' size={50} />
          <div>
            <h2 className='font-semibold text-2xl'>
              Verifying your account...
            </h2>
            <p className='mt-4 text-gray-500'>
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
