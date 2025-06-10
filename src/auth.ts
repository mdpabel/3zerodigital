import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma/db';
import { UserRole } from '@prisma/client';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // Fetch the role from the database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true, id: true }, // Adjust field to match your schema
        });

        token.role = dbUser?.role; // Default to 'user' if no role is found
        token.id = dbUser?.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.role = token.role as UserRole; // Pass role to session
      session.user.id = token.sub as string;
      return session;
    },
  },
  ...authConfig,
});
