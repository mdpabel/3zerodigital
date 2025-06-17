'use server';

import { revalidatePath } from 'next/cache';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
  createCategorySchema,
  updateCategorySchema,
} from '@/lib/validations/category';
import prisma from '@/prisma/db';

// Reusable response type
type ActionResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getCategoryById(id: string) {
  return await prisma.category.findUnique({
    where: { id },
  });
}

export async function createCategory(
  data: CreateCategoryInput,
): Promise<ActionResponse<null>> {
  const validation = createCategorySchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: 'Invalid input.' };
  }

  try {
    // THE FIX: Ensure description is a string before sending to the database.
    const { description, ...restOfData } = validation.data;
    await prisma.category.create({
      data: {
        ...restOfData,
        description: description ?? '', // Use empty string if description is undefined
      },
    });

    revalidatePath('/admin/categories');
    return { success: true, message: 'Category created successfully.' };
  } catch (error) {
    // Handle potential unique constraint errors (e.g., for slug)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return {
        success: false,
        message: 'A category with this name or slug already exists.',
      };
    }
    return { success: false, message: 'Failed to create category.' };
  }
}

export async function updateCategory(
  data: UpdateCategoryInput,
): Promise<ActionResponse<null>> {
  const validation = updateCategorySchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: 'Invalid input.' };
  }

  const { id, ...updateData } = validation.data;

  try {
    await prisma.category.update({
      where: { id },
      data: updateData, // This works fine for updates, as undefined fields are just ignored
    });
    revalidatePath('/admin/categories');
    revalidatePath(`/admin/categories/${id}/edit`);
    return { success: true, message: 'Category updated successfully.' };
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return {
        success: false,
        message: 'A category with this name or slug already exists.',
      };
    }
    return { success: false, message: 'Failed to update category.' };
  }
}

export async function deleteCategory(
  id: string,
): Promise<ActionResponse<null>> {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath('/admin/categories');
    return { success: true, message: 'Category deleted successfully.' };
  } catch (error) {
    return {
      success: false,
      message:
        'Failed to delete category. It may be in use by one or more services.',
    };
  }
}
