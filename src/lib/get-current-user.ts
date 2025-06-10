import { auth } from '@/auth';
import prisma from '@/prisma/db';
import { redirect } from 'next/navigation';

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return redirect('/login');
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return redirect('/login');
  }

  return { user, userId: user.id };
};
