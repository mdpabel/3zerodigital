import React from 'react';

export default function Loading() {
  return (
    <div className='place-content-center grid min-h-screen' aria-busy>
      <div role='status' aria-live='polite'>
        <div className='border-2 border-slate-500 border-t-transparent rounded-full w-12 h-12 animate-spin' />
        <span className='sr-only'>Loading</span>
      </div>
    </div>
  );
}
