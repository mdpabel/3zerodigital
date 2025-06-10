'use client';

import Script from 'next/script';

const TawkChat = () => {
  return (
    <>
      <Script
        suppressHydrationWarning
        src='https://embed.tawk.to/66eac2884cbc4814f7da18fb/1i82gfq14'
        strategy='afterInteractive'
        type='text/javascript'
      />
    </>
  );
};

export default TawkChat;
