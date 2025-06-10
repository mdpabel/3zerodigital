'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

const CopyCoupon = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('FREEPALESTINE');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='flex items-center gap-3'>
      <Button
        variant='outline'
        onClick={handleCopy}
        className='hover:bg-black border border-black transition'>
        {copied ? (
          <Check className='mr-2 w-4 h-4' />
        ) : (
          <Copy className='mr-2 w-4 h-4' />
        )}
        {copied ? 'Copied!' : 'Copy Code'}
      </Button>
      <span className='font-mono text-sm'>FREEPALESTINE</span>
    </div>
  );
};

export default CopyCoupon;
