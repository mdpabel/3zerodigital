'use client';
import { useState } from 'react';
import Turnstile, { useTurnstile } from 'react-turnstile';

const CFTurnstile = () => {
  const [token, setToken] = useState('');
  const turnstile = useTurnstile();

  return (
    <div className='mt-6'>
      <Turnstile
        sitekey={
          process.env.NODE_ENV === 'development'
            ? '1x00000000000000000000AA'
            : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
        }
        onVerify={(token) => setToken(token)}
      />
      <input type='hidden' name='cf-token' value={token} />
    </div>
  );
};

export default CFTurnstile;
