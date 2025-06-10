import React from 'react';

const CardBorder = () => {
  return (
    <div className='flex flex-row'>
      <div className='bg-gradient-to-r from-transparent via-pink-500 to-violet-600 w-full h-[1px]'></div>
      <div className='bg-gradient-to-r from-violet-600 to-transparent w-full h-[1px]'></div>
    </div>
  );
};

export default CardBorder;
