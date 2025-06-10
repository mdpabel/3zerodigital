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

export const BookingConfirmationEmail = ({ booking }: { booking: Booking }) => {
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
              Call Scheduled Successfully! 📅
            </Heading>

            <Text
              style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '24px',
              }}>
              Hi {booking.name},
            </Text>

            <Text
              style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '24px',
              }}>
              Thank you for scheduling a call with 3Zero Digital! We're excited
              to discuss your project and show you how we can help with zero
              vulnerabilities, zero downtime, and zero errors.
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
                Call Details:
              </Heading>
              <Text style={{ color: '#374151', margin: '5px 0' }}>
                <strong>Date:</strong> {formatDate(booking.date)}
              </Text>
              <Text style={{ color: '#374151', margin: '5px 0' }}>
                <strong>Time:</strong> {booking.timeSlot}
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
              <strong>What to expect:</strong>
            </Text>
            <Text
              style={{
                color: '#374151',
                fontSize: '14px',
                lineHeight: '20px',
                marginLeft: '20px',
              }}>
              • Free 30-minute consultation
              <br />
              • Discussion of your project requirements
              <br />
              • Custom pricing proposal
              <br />
              • Technical recommendations
              <br />• Timeline and next steps
            </Text>

            <Text
              style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '24px',
                marginTop: '20px',
              }}>
              We'll call you at the scheduled time. If you need to reschedule,
              please reply to this email or call us at +1 (555) 123-4567.
            </Text>

            <Button
              href='https://3zerodigital.com/contact'
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '6px',
                display: 'inline-block',
                margin: '20px 0',
              }}>
              Contact Us
            </Button>

            <Hr style={{ margin: '30px 0' }} />

            <Text
              style={{
                color: '#6b7280',
                fontSize: '14px',
                textAlign: 'center',
              }}>
              3Zero Digital - Zero Vulnerabilities, Zero Downtime, Zero Errors
              <br />
              hello@3zerodigital.com | +1 (555) 123-4567
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
