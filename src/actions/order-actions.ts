'use server';

import { revalidatePath } from 'next/cache';
import {
  createOrderSchema,
  updateOrderStatusSchema,
  CreateOrderInput,
  UpdateOrderStatusInput,
} from '@/lib/validations/order';
import { generateOrderNumber } from '@/lib/utils';
import prisma from '@/prisma/db';

export async function createOrder(data: CreateOrderInput) {
  try {
    const validatedData = createOrderSchema.parse(data);

    // Calculate total amount
    let totalAmount = 0;
    const serviceIds = validatedData.items.map((item) => item.serviceId);

    const services = await prisma.service.findMany({
      where: {
        id: { in: serviceIds },
        isActive: true,
        deletedAt: null,
      },
    });

    if (services.length !== serviceIds.length) {
      return { error: 'One or more services not found or inactive' };
    }

    const orderItems = validatedData.items.map((item) => {
      const service = services.find((s) => s.id === item.serviceId);
      if (!service) throw new Error('Service not found');

      const price = item.customAmount || Number(service.price);
      totalAmount += price * item.quantity;

      return {
        serviceId: item.serviceId,
        quantity: item.quantity,
        price,
        customAmount: item.customAmount,
        specifications: item.specifications || {},
      };
    });

    // Check if user exists or create new one
    let user = await prisma.user.findUnique({
      where: { email: validatedData.customerEmail },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerEmail: validatedData.customerEmail,
        customerName: validatedData.customerName,
        customerPhone: validatedData.customerPhone,
        deliveryEmail: validatedData.deliveryEmail,
        deliveryPhone: validatedData.deliveryPhone,
        notes: validatedData.notes,
        totalAmount,
        userId: user?.id,
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        orderItems: {
          include: {
            service: true,
          },
        },
      },
    });

    revalidatePath('/admin/orders');
    return { success: true, order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: 'Failed to create order' };
  }
}

export async function updateOrderStatus(data: UpdateOrderStatusInput) {
  try {
    const validatedData = updateOrderStatusSchema.parse(data);

    const order = await prisma.order.update({
      where: { id: validatedData.orderId },
      data: { status: validatedData.status },
      include: {
        orderItems: {
          include: {
            service: true,
          },
        },
      },
    });

    revalidatePath('/admin/orders');
    return { success: true, order };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { error: 'Failed to update order status' };
  }
}

export async function getOrders() {
  return await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          service: {
            include: {
              category: true,
            },
          },
        },
      },
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getOrderById(id: string) {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: {
          service: {
            include: {
              category: true,
            },
          },
        },
      },
      user: true,
    },
  });
}
