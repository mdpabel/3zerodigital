'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const offers = [
  {
    id: 1,
    title: '15% OFF for Palestine 🇵🇸',
    code: 'FREEPALESTINE',
    description:
      'Show your support for Palestine. Use this code to get 15% off. We encourage you to donate the saved amount for the cause.',
  },
  // Add more offers here
];

const Offers = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className='mx-auto px-4 py-10 max-w-4xl'>
      <h1 className='mb-6 font-bold text-3xl'>🎁 Current Offers</h1>
      <div className='gap-6 grid grid-cols-1 sm:grid-cols-2'>
        {offers.map((offer) => (
          <div
            key={offer.id}
            className='shadow-sm p-5 border dark:border-neutral-500 border-black/10 rounded-xl'>
            <h2 className='mb-2 font-semibold text-xl'>{offer.title}</h2>
            <p className='mb-4 text-sm'>{offer.description}</p>
            <div className='flex items-center gap-3'>
              <Button
                variant='outline'
                onClick={() => handleCopy(offer.code)}
                className=''>
                {copiedCode === offer.code ? (
                  <>
                    <Check className='mr-2 w-4 h-4' /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className='mr-2 w-4 h-4' /> Copy Code
                  </>
                )}
              </Button>
              <span className='font-mono text-sm'>{offer.code}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
