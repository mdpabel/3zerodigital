import { CreateEmailOptions, Resend } from 'resend';

const api_key = process.env.RESEND_API_KEY!;

export const resend = new Resend(api_key);

export async function sendEmail({
  replyTo,
  subject,
  react,
  to,
  name,
}: Pick<CreateEmailOptions, 'replyTo' | 'subject' | 'react' | 'to'> & {
  name: string;
}) {
  try {
    const response = await resend.emails.send({
      from: '3Zero Digital <info@3zerodigital.com>',
      replyTo,
      to,
      subject,
      react,
    });

    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Email sending failed.');
  }
}
