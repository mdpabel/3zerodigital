import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://www.3zerodigital.com/',
  plugins: [adminClient()],
});
