'use server';

import { redirect } from 'next/navigation';
import { APIError } from 'better-auth/api';
import { authClient } from '@/lib/auth-client';
import { SignUpSchema, LoginSchema } from '@/lib/validations/auth';
export async function signInAction(formData: FormData) {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Validate formData using LoginSchema
  const validation = LoginSchema.safeParse(rawFormData);

  if (!validation.success) {
    // Extract error messages from the validation result
    const errorMessages = validation.error.errors.map((err) => ({
      field: err.path[0], // The field that caused the error
      message: err.message, // The error message
    }));

    return {
      message: 'Validation failed',
      errors: errorMessages,
      success: false,
    };
  }

  const { email, password } = validation.data;

  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      return {
        message: error.message || 'Something went wrong during sign-in.',
        success: false,
      };
    }

    return {
      message: 'Signed in successfully! Redirecting...',
      success: true,
    };
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case 'UNAUTHORIZED':
          return { message: 'Invalid email or password.', success: false };
        case 'BAD_REQUEST':
          return { message: 'Invalid email format.', success: false };
        default:
          return {
            message: 'Something went wrong. Please try again.',
            success: false,
          };
      }
    }

    console.error('Sign in with email failed:', error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      success: false,
    };
  }
}

export async function signUpAction(formData: FormData) {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    acceptTerms: formData.get('acceptTerms') === 'true',
  };

  // Validate formData using SignUpSchema
  const validation = SignUpSchema.safeParse(rawFormData);

  if (!validation.success) {
    // Extract error messages from the validation result
    const errorMessages = validation.error.errors.map((err) => ({
      field: err.path[0], // The field that caused the error
      message: err.message, // The error message
    }));
    return {
      message: 'Validation failed',
      errors: errorMessages,
      success: false,
    };
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
    const { data, error } = await authClient.signUp.email({
      name: `${firstName} ${lastName}`,
      email,
      password,
    });

    if (error) {
      return {
        message: error.message || 'Something went wrong.',
        success: false,
      };
    }

    return {
      message: 'Account created successfully! Redirecting...',
      success: true,
    };
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
    return {
      message: 'Something went wrong.',
      success: false,
    };
  }
}
