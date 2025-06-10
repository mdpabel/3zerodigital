import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './prisma/db';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    Credentials({
      // Specify the fields to be submitted in the credentials
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null; // Return null if credentials are missing or incomplete
        }

        // Fetch user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // Check if user exists and compare password hash
        if (!user || !user.password) {
          return null; // User doesn't exist or doesn't have a valid password
        }

        // Compare provided password with the hashed password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        // If password is invalid, return null
        if (!isValid) {
          return null;
        }

        // Return the user object if credentials are valid
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
