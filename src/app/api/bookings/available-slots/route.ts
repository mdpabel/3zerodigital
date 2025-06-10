import prisma from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';

// Available time slots (9 AM to 5 PM, 30-min slots)
const TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
];

const UNAVAILABLE_DAYS = [0, 6]; // Sunday and Saturday

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    // Check if it's a weekend
    if (UNAVAILABLE_DAYS.includes(dayOfWeek)) {
      return NextResponse.json({ availableSlots: [] });
    }

    // Get existing bookings for the date
    const existingBookings = await prisma.booking.findMany({
      where: {
        date: {
          gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
          lt: new Date(selectedDate.setHours(23, 59, 59, 999)),
        },
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
      select: {
        timeSlot: true,
      },
    });

    const bookedSlots = existingBookings.map((booking) => booking.timeSlot);
    const availableSlots = TIME_SLOTS.filter(
      (slot) => !bookedSlots.includes(slot),
    );

    return NextResponse.json({ availableSlots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
