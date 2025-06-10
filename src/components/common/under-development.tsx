const UnderDevelopment = () => {
  return (
    <div className='flex flex-col justify-center items-center shadow-lg p-6 rounded-lg min-h-screen text-center'>
      <h1 className='mb-6 font-bold text-4xl text-zinc-800 md:text-5xl dark:text-zinc-200'>
        Under Development
      </h1>
      <p className='mb-8 text-lg text-zinc-700 md:text-xl dark:text-zinc-400'>
        We're working hard to bring this feature to you. Stay tuned!
      </p>
      <div className='flex justify-center items-center'>
        <div className='border-indigo-600 mb-4 border-t-4 rounded-full w-16 h-16 animate-spin'></div>
      </div>
      <div>
        <p className='text-sm text-zinc-500 md:text-md dark:text-zinc-400'>
          Thank you for your patience.
        </p>
      </div>
    </div>
  );
};

export default UnderDevelopment;
