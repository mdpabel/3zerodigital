import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { BookingConfirmationEmail } from '@/components/email/booking-confirmation';
import { BookingNotificationEmail } from '@/components/email/booking-notification';
import prisma from '@/prisma/db';
import { resend } from '@/lib/send-email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      service,
      message,
      date,
      timeSlot,
      timezone,
    } = body;

    // Validate required fields
    if (!name || !email || !date || !timeSlot) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Check if slot is still available
    const existingBooking = await prisma.booking.findFirst({
      where: {
        date: new Date(date),
        timeSlot,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Time slot is no longer available' },
        { status: 409 },
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        company,
        service,
        message,
        date: new Date(date),
        timeSlot,
        timezone: timezone || 'UTC',
      },
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: 'info@3zerodigital.com',
      to: email,
      subject: 'Call Scheduled - 3Zero Digital',
      react: BookingConfirmationEmail({ booking }),
    });

    // Send notification email to company
    await resend.emails.send({
      from: 'hello@3zerodigital.com',
      to: 'team@3zerodigital.com',
      subject: `New Call Booking - ${name}`,
      react: BookingNotificationEmail({ booking }),
    });

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        date: booking.date,
        timeSlot: booking.timeSlot,
      },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
