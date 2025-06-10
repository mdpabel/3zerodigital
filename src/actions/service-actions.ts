'use server';

import { revalidatePath } from 'next/cache';
import { Prisma, Category } from '@prisma/client';
import { redirect } from 'next/navigation';
import {
  createServiceSchema,
  updateServiceSchema,
  CreateServiceInput,
  UpdateServiceInput,
} from '@/lib/validations/service';
import prisma from '@/prisma/db';

export async function createService(data: CreateServiceInput) {
  try {
    const validatedData = createServiceSchema.parse(data);

    // Check if slug already exists
    const existingService = await prisma.service.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingService) {
      return { error: 'Service with this slug already exists' };
    }

    const { relatedServiceIds, ...serviceData } = validatedData;

    const service = await prisma.service.create({
      data: {
        ...serviceData,
        features: validatedData.features || [],
        guarantees: validatedData.guarantees || [],
      },
    });

    // Connect related services if provided
    if (relatedServiceIds && relatedServiceIds.length > 0) {
      await prisma.service.update({
        where: { id: service.id },
        data: {
          relatedTo: {
            connect: relatedServiceIds.map((id) => ({ id })),
          },
        },
      });
    }

    revalidatePath('/admin/services');
    return { success: true, service };
  } catch (error) {
    console.error('Error creating service:', error);
    return { error: 'Failed to create service' };
  }
}

export async function updateService(data: UpdateServiceInput) {
  try {
    const validatedData = updateServiceSchema.parse(data);
    const { id, relatedServiceIds, ...updateData } = validatedData;

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...updateData,
        features: updateData.features || [],
        guarantees: updateData.guarantees || [],
      },
    });

    // Update related services if provided
    if (relatedServiceIds !== undefined) {
      await prisma.service.update({
        where: { id },
        data: {
          relatedTo: {
            set: relatedServiceIds.map((id) => ({ id })),
          },
        },
      });
    }

    revalidatePath('/admin/services');
    return { success: true, service };
  } catch (error) {
    console.error('Error updating service:', error);
    return { error: 'Failed to update service' };
  }
}

export async function deleteService(id: string) {
  try {
    await prisma.service.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { error: 'Failed to delete service' };
  }
}

export async function getServices(includeInactive = false) {
  return await prisma.service.findMany({
    where: {
      deletedAt: null,
      ...(includeInactive ? {} : { isActive: true }),
    },
    include: {
      category: true,
      relatedTo: {
        where: { deletedAt: null },
        include: { category: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getServiceById(id: string) {
  return await prisma.service.findUnique({
    where: { id, deletedAt: null },
    include: {
      category: true,
      relatedTo: {
        where: { deletedAt: null },
        include: { category: true },
      },
    },
  });
}

const customOrder = [
  'Development',
  'Maintenance',
  'Digital Marketing',
  'Troubleshooting',
  'Graphics & Video',
];

type CategoryWithServices = Prisma.CategoryGetPayload<{
  include: { services: true };
}>;

// Type-safe custom sort function
const sortCategories = <T extends { name: string }>(categories: T[]): T[] => {
  return categories.sort((a, b) => {
    const indexA = customOrder.indexOf(a.name);
    const indexB = customOrder.indexOf(b.name);
    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    );
  });
};

// Only categories
export async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany();
  return sortCategories(categories);
}

// Categories with related services
export async function getCategoriesWithServices(): Promise<
  CategoryWithServices[]
> {
  const categories = await prisma.category.findMany({
    include: {
      services: true,
    },
  });

  return sortCategories(categories);
}
