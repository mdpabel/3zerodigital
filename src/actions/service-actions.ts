// lib/actions/service.ts
'use server';

import { revalidatePath } from 'next/cache';
import { Prisma, Category } from '@prisma/client';
import {
  createServiceSchema,
  updateServiceSchema,
  CreateServiceInput,
  UpdateServiceInput,
} from '@/lib/validations/service';
import prisma from '../../prisma/db';
import { z } from 'zod';

type ActionResult<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  // FIX: The type for fieldErrors from Zod can include undefined values.
  errors?: Record<string, string[] | undefined>;
};

export async function createService(
  data: CreateServiceInput,
): Promise<ActionResult> {
  try {
    const validatedData = createServiceSchema.parse(data);

    // Check if slug already exists
    const existingService = await prisma.service.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingService) {
      return {
        success: false,
        message: 'Service with this slug already exists',
      };
    }

    const { categoryIds, relatedServiceIds, ...serviceData } = validatedData;

    const service = await prisma.service.create({
      data: {
        ...serviceData,
        features: validatedData.features || [],
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
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
    return {
      success: true,
      message: 'Service created successfully',
      data: service,
    };
  } catch (error: any) {
    console.error('Error creating service:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: error.formErrors.fieldErrors,
      };
    }

    return {
      success: false,
      message: 'Failed to create service',
    };
  }
}

export async function updateService(
  data: UpdateServiceInput,
): Promise<ActionResult> {
  try {
    const validatedData = updateServiceSchema.parse(data);
    const { id, categoryIds, relatedServiceIds, ...updateData } = validatedData;

    // Check if slug already exists (excluding current service)
    if (updateData.slug) {
      const existingService = await prisma.service.findFirst({
        where: {
          slug: updateData.slug,
          id: { not: id },
        },
      });

      if (existingService) {
        return {
          success: false,
          message: 'Service with this slug already exists',
        };
      }
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...updateData,
        ...(updateData.features && { features: updateData.features }),
        ...(categoryIds && {
          categories: {
            set: categoryIds.map((id) => ({ id })),
          },
        }),
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
    return {
      success: true,
      message: 'Service updated successfully',
      data: service,
    };
  } catch (error) {
    console.error('Error updating service:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: error.formErrors.fieldErrors,
      };
    }

    return {
      success: false,
      message: 'Failed to update service',
    };
  }
}

export async function deleteService(id: string): Promise<ActionResult> {
  try {
    await prisma.service.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    revalidatePath('/admin/services');
    return {
      success: true,
      message: 'Service deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting service:', error);
    return {
      success: false,
      message: 'Failed to delete service',
    };
  }
}

export async function getServices(includeInactive = false) {
  return await prisma.service.findMany({
    where: {
      deletedAt: null,
      ...(includeInactive ? {} : { isActive: true }),
    },
    include: {
      categories: true,
      relatedTo: {
        where: { deletedAt: null },
        include: { categories: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export const getFeaturedServices = async () => {
  return prisma.service.findMany({
    where: {
      categories: {
        some: {
          name: 'Featured',
        },
      },
    },
  });
};

export async function getServiceById(id: string) {
  return await prisma.service.findUnique({
    where: { id, deletedAt: null },
    include: {
      categories: true,
      relatedTo: {
        where: { deletedAt: null },
        include: { categories: true },
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

const sortCategories = <T extends { name: string }>(categories: T[]): T[] => {
  return categories.sort((a, b) => {
    const indexA = customOrder.indexOf(a.name);
    const indexB = customOrder.indexOf(b.name);
    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    );
  });
};

export async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany();
  return sortCategories(categories);
}

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

export const getServiceBySlug = async (slug: string) => {
  const service = await prisma.service.findFirst({
    where: {
      slug,
    },
    include: {
      relatedTo: true,
    },
  });

  if (!service) {
    throw new Error('No service found with slug ' + slug);
  }

  return service;
};
