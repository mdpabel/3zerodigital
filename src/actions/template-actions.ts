'use server';

import { revalidatePath } from 'next/cache';
import {
  CreateTemplateInput,
  UpdateTemplateInput,
  createTemplateSchema,
  updateTemplateSchema,
} from '@/lib/validations/template';
import prisma from '../../prisma/db';

type ActionResponse = {
  success: boolean;
  message: string;
};

// --- Read Actions ---

export async function getTemplates() {
  return await prisma.template.findMany({
    where: { deleted: false },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getTemplateById(id: string) {
  return await prisma.template.findUnique({
    where: { id, deleted: false },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
}

export async function getTemplateCategories() {
  return await prisma.templateCategory.findMany({
    orderBy: { name: 'asc' },
  });
}

// --- Write Actions ---

export async function createTemplate(
  data: CreateTemplateInput,
): Promise<ActionResponse> {
  const validation = createTemplateSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: 'Invalid input.' };
  }

  const { categoryIds, ...templateData } = validation.data;

  try {
    // Use a transaction to ensure the template and its category links are created together
    await prisma.$transaction(async (prisma) => {
      const newTemplate = await prisma.template.create({
        data: templateData,
      });

      await prisma.templateCategoryOnTemplate.createMany({
        data: categoryIds.map((catId) => ({
          templateId: newTemplate.id,
          categoryId: catId,
        })),
      });
    });

    revalidatePath('/admin/templates');
    revalidatePath('/');
    revalidatePath('/templates');
    return { success: true, message: 'Template created successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to create template.' };
  }
}

export async function updateTemplate(
  data: UpdateTemplateInput,
): Promise<ActionResponse> {
  const validation = updateTemplateSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: 'Invalid input.' };
  }

  const { id, categoryIds, ...templateData } = validation.data;

  try {
    // Use a transaction to update the template and its category links atomically
    await prisma.$transaction(async (prisma) => {
      await prisma.template.update({
        where: { id },
        data: templateData,
      });

      // If categoryIds were provided, update the links
      if (categoryIds) {
        // 1. Delete existing links
        await prisma.templateCategoryOnTemplate.deleteMany({
          where: { templateId: id },
        });
        // 2. Create new links
        await prisma.templateCategoryOnTemplate.createMany({
          data: categoryIds.map((catId) => ({
            templateId: id,
            categoryId: catId,
          })),
        });
      }
    });

    revalidatePath('/admin/templates');
    revalidatePath(`/admin/templates/${id}/edit`);
    revalidatePath('/');
    revalidatePath('/templates');
    return { success: true, message: 'Template updated successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to update template.' };
  }
}

export async function deleteTemplate(id: string): Promise<ActionResponse> {
  try {
    // We use a soft delete by setting the 'deleted' flag
    await prisma.template.update({
      where: { id },
      data: { deleted: true },
    });
    revalidatePath('/admin/templates');
    revalidatePath('/');
    revalidatePath('/templates');
    return { success: true, message: 'Template deleted successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to delete template.' };
  }
}
