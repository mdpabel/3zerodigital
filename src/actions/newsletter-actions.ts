'use server';

import prisma from '@/prisma/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
});

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const data = {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
    };

    const validatedData = subscribeSchema.parse(data);

    // Check if email already exists
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email: validatedData.email },
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return {
          success: false,
          message: 'This email is already subscribed to our newsletter.',
        };
      } else {
        // Reactivate subscription
        await prisma.newsletter.update({
          where: { email: validatedData.email },
          data: { isActive: true, name: validatedData.name },
        });
        return {
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        };
      }
    }

    // Create new subscription
    await prisma.newsletter.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
      },
    });

    revalidatePath('/admin/newsletters');

    return {
      success: true,
      message: 'Successfully subscribed to our newsletter!',
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    await prisma.newsletter.update({
      where: { email },
      data: { isActive: false },
    });

    revalidatePath('/admin/newsletters');

    return {
      success: true,
      message: 'Successfully unsubscribed from newsletter.',
    };
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return {
      success: false,
      message: 'Failed to unsubscribe. Please try again.',
    };
  }
}

export async function getNewsletterSubscribers() {
  try {
    const subscribers = await prisma.newsletter.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    return subscribers;
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return [];
  }
}

export async function getAllNewsletterSubscribers(page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;

    const [subscribers, total] = await Promise.all([
      prisma.newsletter.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.newsletter.count(),
    ]);

    return {
      subscribers,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return {
      subscribers: [],
      total: 0,
      pages: 0,
      currentPage: 1,
    };
  }
}

export async function deleteNewsletterSubscriber(id: string) {
  try {
    await prisma.newsletter.delete({
      where: { id },
    });

    revalidatePath('/admin/newsletters');

    return {
      success: true,
      message: 'Subscriber deleted successfully.',
    };
  } catch (error) {
    console.error('Error deleting newsletter subscriber:', error);
    return {
      success: false,
      message: 'Failed to delete subscriber.',
    };
  }
}
