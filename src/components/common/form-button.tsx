'use client';

import { useFormStatus } from 'react-dom';
import Spinner from './spinner';
import { ReactNode } from 'react';

const FormButton = ({ children = 'Submit' }: { children?: ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className='flex justify-center items-center bg-gradient-to-r from-[#614385] to-[#516395] shadow-md mt-8 py-3 rounded-lg w-full font-semibold text-white transform hover:scale-105 transition-transform'>
      {pending ? <Spinner /> : children}
    </button>
  );
};

export default FormButton;
