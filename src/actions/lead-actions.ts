'use server';

import prisma from '@/prisma/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { LeadStatus, Priority, LeadSource } from '@prisma/client';

// Enhanced contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  formType: z
    .enum(['GENERAL', 'SUPPORT', 'SALES', 'PARTNERSHIP', 'FEEDBACK'])
    .default('GENERAL'),
});

const quoteRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Service is required'),
  projectType: z.string().min(1, 'Project type is required'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
});

// Create or update lead
async function createOrUpdateLead(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: LeadSource;
  priority?: Priority;
}) {
  let lead = await prisma.lead.findFirst({
    where: { email: data.email },
  });

  if (!lead) {
    lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        source: data.source,
        status: LeadStatus.NEW,
        priority: data.priority || Priority.MEDIUM,
      },
    });
  } else {
    // Update existing lead if new info provided
    lead = await prisma.lead.update({
      where: { id: lead.id },
      data: {
        phone: data.phone || lead.phone,
        company: data.company || lead.company,
        // Don't change source if lead already exists
      },
    });
  }

  return lead;
}

// Contact Form Submission
export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      service: formData.get('service') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      formType: (formData.get('formType') as string) || 'GENERAL',
    };

    const validatedData = contactFormSchema.parse(data);

    // Create or update lead
    const lead = await createOrUpdateLead({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      source: LeadSource.CONTACT_FORM,
      priority: Priority.MEDIUM,
    });

    // Create contact form entry
    await prisma.contactForm.create({
      data: {
        leadId: lead.id,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        service: validatedData.service,
        subject: validatedData.subject,
        message: validatedData.message,
        formType: validatedData.formType as any,
      },
    });

    revalidatePath('/admin/leads');
    revalidatePath('/admin/leads/contacts');

    return {
      success: true,
      message:
        "Thank you for your message! We'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error('Contact form submission error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}

// Quote Request Submission
export async function submitQuoteRequest(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      service: formData.get('service') as string,
      projectType: formData.get('projectType') as string,
      budget: formData.get('budget') as string,
      timeline: formData.get('timeline') as string,
      description: formData.get('description') as string,
    };

    const validatedData = quoteRequestSchema.parse(data);

    // Create or update lead
    const lead = await createOrUpdateLead({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      source: LeadSource.QUOTE_REQUEST,
      priority: Priority.HIGH,
    });

    // Create quote request
    await prisma.quote.create({
      data: {
        leadId: lead.id,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        service: validatedData.service,
        projectType: validatedData.projectType,
        budget: validatedData.budget,
        timeline: validatedData.timeline,
        description: validatedData.description,
      },
    });

    revalidatePath('/admin/leads');
    revalidatePath('/admin/leads/quotes');

    return {
      success: true,
      message:
        "Quote request submitted successfully! We'll review and get back to you within 24 hours.",
    };
  } catch (error) {
    console.error('Quote request submission error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}

// Newsletter subscription with lead creation
export async function subscribeToNewsletter(formData: FormData) {
  console.log({ formData });

  try {
    const data = {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
    };

    const validatedData = z
      .object({
        email: z.string().email('Invalid email address'),
        name: z.string().optional(),
      })
      .parse(data);

    // Check if email already exists in newsletter
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email: validatedData.email },
    });

    if (existingSubscription && existingSubscription.isActive) {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter.',
      };
    }

    // Create or update newsletter subscription
    await prisma.newsletter.upsert({
      where: { email: validatedData.email },
      update: {
        isActive: true,
        name: validatedData.name,
      },
      create: {
        email: validatedData.email,
        name: validatedData.name,
      },
    });

    // Create lead if name is provided
    if (validatedData.name) {
      await createOrUpdateLead({
        name: validatedData.name,
        email: validatedData.email,
        source: LeadSource.NEWSLETTER,
        priority: Priority.LOW,
      });
    }

    revalidatePath('/admin/leads');
    revalidatePath('/admin/newsletters');

    return {
      success: true,
      message: 'Successfully subscribed to our newsletter!',
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}

// Track user registration as lead
export async function trackUserRegistration(userData: {
  name: string;
  email: string;
  phone?: string;
}) {
  try {
    await createOrUpdateLead({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      source: LeadSource.USER_REGISTRATION,
      priority: Priority.MEDIUM,
    });

    revalidatePath('/admin/leads');
  } catch (error) {
    console.error('Error tracking user registration:', error);
  }
}

// Get all leads with enhanced data
export async function getAllLeads(page = 1, limit = 10, source?: string) {
  try {
    const skip = (page - 1) * limit;

    const where = source ? { source: source as LeadSource } : {};

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          contactForms: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          quotes: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return {
      leads,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching leads:', error);
    return {
      leads: [],
      total: 0,
      pages: 0,
      currentPage: 1,
    };
  }
}

// Get contact forms
export async function getContactForms(page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;

    const [forms, total] = await Promise.all([
      prisma.contactForm.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          lead: true,
        },
      }),
      prisma.contactForm.count(),
    ]);

    return {
      forms,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    return {
      forms: [],
      total: 0,
      pages: 0,
      currentPage: 1,
    };
  }
}

// Get quotes
export async function getQuotes(page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;

    const [quotes, total] = await Promise.all([
      prisma.quote.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          lead: true,
        },
      }),
      prisma.quote.count(),
    ]);

    return {
      quotes,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return {
      quotes: [],
      total: 0,
      pages: 0,
      currentPage: 1,
    };
  }
}

// Update lead status
export async function updateLeadStatus(id: string, status: LeadStatus) {
  try {
    await prisma.lead.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/admin/leads');

    return {
      success: true,
      message: 'Lead status updated successfully.',
    };
  } catch (error) {
    console.error('Error updating lead status:', error);
    return {
      success: false,
      message: 'Failed to update lead status.',
    };
  }
}

// Update contact form status
export async function updateContactFormStatus(
  id: string,
  status: 'UNREAD' | 'READ' | 'REPLIED' | 'CLOSED',
) {
  try {
    await prisma.contactForm.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/admin/leads/contacts');

    return {
      success: true,
      message: 'Contact form status updated successfully.',
    };
  } catch (error) {
    console.error('Error updating contact form status:', error);
    return {
      success: false,
      message: 'Failed to update contact form status.',
    };
  }
}

// Update quote status
export async function updateQuoteStatus(
  id: string,
  status: 'PENDING' | 'REVIEWED' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED',
) {
  try {
    await prisma.quote.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/admin/leads/quotes');

    return {
      success: true,
      message: 'Quote status updated successfully.',
    };
  } catch (error) {
    console.error('Error updating quote status:', error);
    return {
      success: false,
      message: 'Failed to update quote status.',
    };
  }
}
