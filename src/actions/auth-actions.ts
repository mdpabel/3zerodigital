'use server';

import { redirect } from 'next/navigation';
import { APIError } from 'better-auth/api';
import { authClient } from '@/lib/auth-client';
import { SignUpSchema, LoginSchema } from '@/lib/validations/auth';

export async function signInAction(formData: FormData) {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('pwd') as string,
  };

  // Validate formData using LoginSchema
  const validation = LoginSchema.safeParse(rawFormData);

  if (!validation.success) {
    // Extract error messages from the validation result
    const errorMessage = validation.error.errors
      .map((err) => err.message)
      .join(', ');
    return { message: errorMessage, success: false };
  }

  const { email, password } = validation.data;

  try {
    await authClient.signIn.email({
      email,
      password,
    });
    console.log('Signed in');
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case 'UNAUTHORIZED':
          return { message: 'User Not Found.', success: false };
        case 'BAD_REQUEST':
          return { message: 'Invalid email.', success: false };
        default:
          return { message: 'Something went wrong.', success: false };
      }
    }
    console.error('sign in with email has not worked', error);
    throw error;
  }
  redirect('/dashboard');
}

export async function signUpAction(formData: FormData) {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
  };

  // Validate formData using SignUpSchema
  const validation = SignUpSchema.safeParse(rawFormData);

  console.log(
    'sign up action',
    validation,
    formData,
    formData.get('acceptTerms'),
  );

  if (!validation.success) {
    // Extract error messages from the validation result
    const errorMessage = validation.error.errors
      .map((err) => err.message)
      .join(', ');
    return { message: errorMessage, success: false };
  }

  const { email, password, confirmPassword, firstName, lastName } =
    validation.data;

  // Ensure password and confirmPassword match
  if (password !== confirmPassword) {
    const errorMessage = 'Password and confirm password do not match.';
    console.log({ errorMessage });
    return { message: errorMessage, success: false };
  }

  try {
    await authClient.signUp.email({
      name: `${firstName} ${lastName}`,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case 'UNPROCESSABLE_ENTITY':
          return { message: 'User already exists.', success: false };
        case 'BAD_REQUEST':
          return { message: 'Invalid email.', success: false };
        default:
          return { message: 'Something went wrong.', success: false };
      }
    }
    console.error('sign up with email and password has not worked', error);
  }
  redirect('/dashboard');
}
