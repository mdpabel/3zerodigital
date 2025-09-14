import * as React from 'react';
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

type PasswordResetEmailProps = {
  resetUrl: string;
  userName?: string;
  appName?: string;
  supportEmail?: string;
  expiresInHours?: number;
  requestIP?: string;
  requestedAt?: string; // e.g., "Sep 14, 2025 10:32 AM"
};

export const passwordResetSubject = (appName = '3Zero Digital') =>
  `${appName}: Reset your password`;

export default function PasswordResetEmail({
  resetUrl,
  userName = 'there',
  appName = 'Your App',
  supportEmail = 'support@example.com',
  expiresInHours = 24,
  requestIP,
  requestedAt,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={styles.main}>
        {/* Preheader (hidden preview text) */}
        <Text style={styles.preheader}>
          Reset your {appName} password. This link expires in {expiresInHours}{' '}
          hours.
        </Text>

        <Container style={styles.card}>
          <Section>
            <Heading as='h1' style={styles.h1}>
              Reset your password
            </Heading>
            <Text style={styles.greeting}>Hi {userName},</Text>
            <Text style={styles.text}>
              We received a request to reset your {appName} password. Click the
              button below to choose a new password. This link will expire in{' '}
              {expiresInHours} hours.
            </Text>

            <Section
              style={{ textAlign: 'center', marginTop: 20, marginBottom: 8 }}>
              <Button href={resetUrl} style={styles.button}>
                Reset password
              </Button>
            </Section>

            <Text style={styles.helper}>
              If the button doesn’t work, copy and paste this URL into your
              browser:
            </Text>
            <Text style={styles.code}>{resetUrl}</Text>

            <Hr style={styles.hr} />

            <Text style={styles.small}>
              If you didn’t request this, you can safely ignore this email. Your
              password won’t change.
            </Text>

            {(requestIP || requestedAt) && (
              <Text style={styles.tiny}>
                Request details{requestedAt ? ` • ${requestedAt}` : ''}
                {requestIP ? ` • IP: ${requestIP}` : ''}
              </Text>
            )}

            <Text style={styles.footer}>
              Need help? Contact us at{' '}
              <a href={`mailto:${supportEmail}`} style={styles.link}>
                {supportEmail}
              </a>
              .
            </Text>

            <Text style={styles.signature}>— The {appName} Team</Text>
          </Section>
        </Container>

        <Text style={styles.legal}>
          You’re receiving this email because a password reset was requested for
          your {appName} account.
        </Text>
      </Body>
    </Html>
  );
}

const styles = {
  main: {
    backgroundColor: '#f6f9fc',
    padding: '24px 0',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,Ubuntu,Segoe UI Symbol,Apple Color Emoji,Segoe UI Emoji',
  } as React.CSSProperties,
  preheader: {
    display: 'none',
    visibility: 'hidden',
    opacity: 0,
    color: 'transparent',
    height: 0,
    width: 0,
    overflow: 'hidden',
  } as React.CSSProperties,
  card: {
    width: '100%',
    maxWidth: '560px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    border: '1px solid #eaeaea',
    borderRadius: '12px',
    padding: '32px',
  } as React.CSSProperties,
  h1: {
    margin: 0,
    fontSize: '24px',
    lineHeight: '32px',
    color: '#111827',
    fontWeight: 700,
  } as React.CSSProperties,
  greeting: {
    margin: '16px 0 4px',
    fontSize: '15px',
    color: '#111827',
  } as React.CSSProperties,
  text: {
    margin: '0 0 16px',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#374151',
  } as React.CSSProperties,
  button: {
    display: 'inline-block',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    padding: '12px 18px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 600,
  } as React.CSSProperties,
  helper: {
    margin: '16px 0 6px',
    fontSize: '13px',
    color: '#4B5563',
  } as React.CSSProperties,
  code: {
    fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#111827',
    backgroundColor: '#F3F4F6',
    padding: '10px',
    borderRadius: '8px',
    wordBreak: 'break-all',
  } as React.CSSProperties,
  hr: {
    borderColor: '#E5E7EB',
    margin: '20px 0',
  } as React.CSSProperties,
  small: {
    margin: '0 0 6px',
    fontSize: '12px',
    color: '#6B7280',
  } as React.CSSProperties,
  tiny: {
    margin: '0 0 12px',
    fontSize: '11px',
    color: '#9CA3AF',
  } as React.CSSProperties,
  footer: {
    margin: '6px 0',
    fontSize: '12px',
    color: '#6B7280',
  } as React.CSSProperties,
  link: {
    color: '#2563EB',
    textDecoration: 'underline',
  } as React.CSSProperties,
  signature: {
    marginTop: 14,
    fontSize: '13px',
    color: '#374151',
  } as React.CSSProperties,
  legal: {
    margin: '12px auto 0',
    maxWidth: '560px',
    textAlign: 'center' as const,
    fontSize: '11px',
    color: '#9CA3AF',
  },
};
