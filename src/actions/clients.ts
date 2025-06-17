'use server';

import prisma from '@/prisma/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  company: z.string().optional(),
  industry: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export async function createClient(data: z.infer<typeof createClientSchema>) {
  try {
    // const { userId } = auth();
    // if (!userId) throw new Error('Unauthorized');

    const validatedData = createClientSchema.parse(data);

    const client = await prisma.client.create({
      data: {
        ...validatedData,
        lastContact: new Date(),
      },
    });

    revalidatePath('/dashboard/clients');
    return { success: true, client };
  } catch (error) {
    console.error('Failed to create client:', error);
    return { success: false, error: 'Failed to create client' };
  }
}

export async function getClients() {
  try {
    const { userId } = auth();
    if (!userId) throw new Error('Unauthorized');

    const clients = await prisma.client.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return clients;
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    return [];
  }
}

export async function updateClient(
  id: string,
  data: Partial<z.infer<typeof createClientSchema>>,
) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error('Unauthorized');

    const client = await prisma.client.update({
      where: { id, userId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    revalidatePath('/dashboard/clients');
    return { success: true, client };
  } catch (error) {
    console.error('Failed to update client:', error);
    return { success: false, error: 'Failed to update client' };
  }
}

export async function deleteClient(id: string) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error('Unauthorized');

    await prisma.client.delete({
      where: { id, userId },
    });

    revalidatePath('/dashboard/clients');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete client:', error);
    return { success: false, error: 'Failed to delete client' };
  }
}
