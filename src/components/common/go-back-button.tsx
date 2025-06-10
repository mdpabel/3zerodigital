'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const GoBack = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className='inline-block bg-gradient-to-r from-[#614385] to-[#516395] shadow-md mt-6 px-6 py-3 rounded-lg text-white transform transition-transform hover:scale-105'>
      Go Back to Form
    </button>
  );
};

export default GoBack;
