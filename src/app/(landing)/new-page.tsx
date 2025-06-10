import React from 'react';

const Home = () => {
  return (
    <div className='relative bg-[#171717] w-full h-screen overflow-hidden font-sans text-white'>
      <div className='absolute inset-0 flex justify-center items-center mx-auto w-[90vw] h-full'>
        {/* Vertical Lines */}
        <div className='after:block after:top-[-50%] left-1/2 after:left-0 absolute after:absolute bg-white/10 after:bg-gradient-to-b after:from-transparent after:via-white after:to-white w-px after:w-full h-full after:h-[15vh] animate-line-drop after:animate-drop delay-[2s]' />
        <div className='after:block after:top-[-50%] left-1/2 after:left-0 absolute after:absolute bg-white/10 after:bg-gradient-to-b after:from-transparent after:via-white after:to-white w-px after:w-full h-full after:h-[15vh] animate-line-drop after:animate-drop' />
        <div className='after:block after:top-[-50%] left-1/2 after:left-0 absolute after:absolute bg-white/10 after:bg-gradient-to-b after:from-transparent after:via-white after:to-white w-px after:w-full h-full after:h-[15vh] translate-x-[25%] animate-line-drop after:animate-drop delay-[2.5s]' />
      </div>

      <div className='z-10 relative flex justify-center items-center h-full'>
        <h1 className='font-bold text-4xl'>Home</h1>
      </div>
    </div>
  );
};

export default Home;
