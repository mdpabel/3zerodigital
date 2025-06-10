import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { nextCookies } from 'better-auth/next-js';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [nextCookies()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
});
