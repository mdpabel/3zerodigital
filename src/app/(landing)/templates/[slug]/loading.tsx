import React from 'react';
import { FaRegClock, FaRegFileAlt } from 'react-icons/fa'; // For icons

const ProductDetailsSkeleton = () => {
  return (
    <div className='relative mx-auto px-4 py-10 w-full max-w-5xl container'>
      {/* Top Section: Product Name, Recently Updated, Well Documented */}
      <div className='flex md:flex-row flex-col justify-between items-start'>
        <div className='mb-6 md:mb-0'>
          {/* Skeleton for Product Name */}
          <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-48 h-8'></div>

          {/* Skeleton for Categories */}
          <div className='mt-2'>
            <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-32 h-6'></div>
            <div className='bg-gray-300 dark:bg-gray-700 mt-2 rounded-md w-40 h-6'></div>
          </div>
        </div>

        <div className='flex items-center space-x-6'>
          {/* Skeleton for Recently Updated */}
          <div className='flex items-center space-x-2'>
            <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-5 h-5'></div>
            <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-24 h-4'></div>
          </div>
          {/* Skeleton for Well Documented */}
          <div className='flex items-center space-x-2'>
            <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-5 h-5'></div>
            <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-24 h-4'></div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className='gap-10 grid grid-cols-1 lg:grid-cols-5 mt-8'>
        {/* Left Section: Image Carousel */}
        <div className='lg:col-span-3'>
          <div className='mb-8'>
            {/* Skeleton for Image Carousel */}
            <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-full h-64'></div>
          </div>
        </div>

        {/* Right Section: Pricing Table */}
        <div className='lg:col-span-2'>
          <div className='bg-gray-900 shadow-lg p-6 rounded-lg'>
            {/* Skeleton for Pricing Title */}
            <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-24 h-6'></div>

            <div className='space-y-4'>
              {/* Skeleton for Price */}
              <div className='flex justify-between items-center'>
                <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-32 h-4'></div>
                <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-28 h-6'></div>
              </div>

              {/* Skeleton for Sale Price */}
              <div className='flex justify-between items-center'>
                <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-28 h-4'></div>
                <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-24 h-6'></div>
              </div>

              {/* Skeleton for Best Value Badge */}
              <div className='mt-4'>
                <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-24 h-6'></div>
              </div>

              {/* Skeleton for Checkout Button */}
              <div className='mt-6'>
                <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-full h-10'></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className='mt-10'>
        {/* Skeleton for Links Title */}
        <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-24 h-6'></div>

        <div className='mt-2'>
          {/* Skeleton for Links */}
          <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-32 h-6'></div>
        </div>
      </div>

      {/* Product Description */}
      <div className='mt-10'>
        {/* Skeleton for Description Title */}
        <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-40 h-6'></div>

        <div className='mt-4'>
          {/* Skeleton for Description Text */}
          <div className='bg-gray-300 dark:bg-gray-700 rounded-md w-full h-4'></div>
          <div className='bg-gray-300 dark:bg-gray-700 mt-2 rounded-md w-full h-4'></div>
          <div className='bg-gray-300 dark:bg-gray-700 mt-2 rounded-md w-full h-4'></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
