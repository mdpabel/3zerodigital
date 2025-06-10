import { Booking } from '@prisma/client';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
} from '@react-email/components';

export const BookingNotificationEmail = ({ booking }: { booking: Booking }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Html>
      <Head />
      <Body
        style={{ backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' }}>
        <Container
          style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
          <Section
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '40px',
            }}>
            <Heading
              style={{
                color: '#1f2937',
                textAlign: 'center',
                marginBottom: '30px',
              }}>
              New Booking Received! 🚀
            </Heading>

            <Text
              style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '24px',
              }}>
              Hello Team,
            </Text>

            <Text
              style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '24px',
              }}>
              A new call has been scheduled. Please review the details below and
              prepare accordingly.
            </Text>

            <Section
              style={{
                backgroundColor: '#f3f4f6',
                padding: '20px',
                borderRadius: '8px',
                margin: '30px 0',
              }}>
              <Heading
                style={{
                  color: '#1f2937',
                  fontSize: '18px',
                  margin: '0 0 15px 0',
                }}>
                Booking Details:
              </Heading>
              <Text style={{ color: '#374151', margin: '5px 0' }}>
                <strong>Client Name:</strong> {booking.name}
              </Text>
              <Text style={{ color: '#374151', margin: '5px 0' }}>
                <strong>Client Email:</strong> {booking.email}
              </Text>
              <Text style={{ color: '#374151', margin: '5px 0' }}>
                <strong>Date:</strong> {formatDate(booking.date)}
              </Text>
              <Text style={{ color: '#374151', margin: '5px 0' }}>
                <strong>Time Slot:</strong> {booking.timeSlot}
              </Text>
              {booking.service && (
                <Text style={{ color: '#374151', margin: '5px 0' }}>
                  <strong>Service:</strong> {booking.service}
                </Text>
              )}
              <Text style={{ color: '#374151', margin: '5px 0' }}>
                <strong>Booking ID:</strong> {booking.id}
              </Text>
            </Section>

            <Text
              style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '24px',
              }}>
              You can view and manage this booking in the admin panel.
            </Text>

            <Button
              href='https://3zerodigital.com/admin/bookings'
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '6px',
                display: 'inline-block',
                margin: '20px 0',
              }}>
              View Booking
            </Button>

            <Hr style={{ margin: '30px 0' }} />

            <Text
              style={{
                color: '#6b7280',
                fontSize: '14px',
                textAlign: 'center',
              }}>
              3Zero Digital Admin Notification
              <br />
              hello@3zerodigital.com | +1 (555) 123-4567
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
