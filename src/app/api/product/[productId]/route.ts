import prisma from '../../../../../prisma/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const productId = (await params).productId;

    // Fetch product and its prices from the database
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: { prices: true },
    });

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ product: null });
  }
}
