import Script from 'next/script';
import React from 'react';

const CookieYes = () => {
  return (
    <Script
      suppressHydrationWarning
      id='cookieyes'
      strategy='afterInteractive'
      type='text/javascript'
      src='https://cdn-cookieyes.com/client_data/5cdf576570b3e24a0a725fb2/script.js'></Script>
  );
};

export default CookieYes;
