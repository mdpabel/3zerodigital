import React from 'react';
import Image from 'next/image';

// Import local images
import beforeImage from '@/../public/images/services/performance-before.png';
import afterImage from '@/../public/images/services/performance-after.png';

const PerformanceComparison: React.FC = () => {
  return (
    <div className='mt-32 p-4'>
      {/* Engaging Title and Subtitle with more detail */}
      <div className='mx-auto mb-8 max-w-4xl text-center'>
        <h2 className='mb-6 font-bold text-3xl text-center text-zinc-800 md:text-4xl dark:text-zinc-200'>
          How We Boosted Page Speed by 66% — See the Stunning Results!
        </h2>
        <p className='mt-4 text-lg'>
          Faster load times mean happier users, better engagement, and more
          conversions. See how we turned a sluggish website into a performance
          powerhouse, with load times that increase user retention and improve
          SEO rankings.
        </p>
      </div>

      {/* Image Comparison */}
      <div className='flex md:flex-row flex-col justify-center items-center gap-8'>
        {/* Before Image */}
        <div className='w-full md:w-1/2 text-center'>
          <Image
            src={beforeImage}
            alt='Before Performance'
            className='shadow-md rounded-lg w-full h-auto'
          />
          <p className='mt-2'>Before: PageSpeed 25</p>
        </div>

        {/* After Image */}
        <div className='w-full md:w-1/2 text-center'>
          <Image
            src={afterImage}
            alt='After Performance'
            className='shadow-md rounded-lg w-full h-auto'
          />
          <p className='mt-2'>After: PageSpeed 100</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparison;
