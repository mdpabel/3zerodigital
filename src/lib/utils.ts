import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Schema, z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function catchZodErrors(err: z.ZodError, schema: Schema) {
  const errors: string[] = [];
  const error = err.flatten().fieldErrors;

  for (const key in error) {
    if (Object.prototype.hasOwnProperty.call(error, key)) {
      const err = key as keyof z.infer<typeof schema>;
      const message = error[err] ? error[err][0] : '';

      if (message) {
        errors.push(message);
      }
    }
  }

  return errors.toString();
}

type FormatCurrencyType = {
  amount: number;
  local?: string;
  currency?: string;
  decimalPlaces?: number;
};

export const formatCurrency = ({
  amount,
  currency = 'USD',
  decimalPlaces = 2,
  local = 'en-US',
}: FormatCurrencyType) => {
  if (!amount) {
    return;
  }

  const formatter = new Intl.NumberFormat(local, {
    style: 'currency',
    currency,
    maximumFractionDigits: decimalPlaces,
  });

  return isNaN(amount) ? '--' : formatter.format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const generateTitleFromSlug = (slug: string) => {
  // Split the slug by hyphens and join by spaces
  const title = slug.split('-').join(' ');

  // Capitalize the first letter of the title and make the rest lowercase
  return title.charAt(0).toUpperCase() + title.slice(1);
};

// lib/utils.ts (additional functions)
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp.slice(-6)}-${random}`;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
