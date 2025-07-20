import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Custom404() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='px-4 text-center'>
        <div className='flex justify-center mb-4'>
          <AlertTriangle className='w-16 h-16 text-[#516395]' />
        </div>
        <h1 className='mb-4 font-bold text-zinc-800 dark:text-zinc-200 text-4xl md:text-6xl'>
          404 - Page Not Found
        </h1>
        <p className='mb-8 text-zinc-600 dark:text-zinc-400 text-lg md:text-xl'>
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href='/'
          className='bg-gradient-to-r from-[#614385] to-[#516395] shadow-lg px-6 py-3 rounded-lg text-white hover:scale-105 transition-transform'>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
