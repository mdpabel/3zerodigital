'use client';
import { contactUsSubmission } from '@/actions/contact-us';
import FormButton from '@/components/common/form-button';
import Input from '@/components/development/input';
import SelectInput from '@/components/development/select';
import Textarea from '@/components/development/textarea';

import { useActionState } from 'react';

const inquiryTypes = [
  { value: 'sales', label: 'Sales Inquiries' },
  { value: 'billing', label: 'Billing' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'general', label: 'General Information' },
  { value: 'other', label: 'Other' },
];

const ContactForm = () => {
  const [state, action] = useActionState(contactUsSubmission, {
    status: false,
    message: '',
  });

  return (
    <div className='mt-12'>
      <form
        action={action}
        className='bg-white dark:bg-gray-900 shadow-lg p-6 md:p-10 rounded-lg'>
        <SelectInput
          id='InquiryType'
          label='What type of information do you need'
          name='InquiryType'
          options={inquiryTypes}
          required
        />

        <Input
          id='name'
          name='name'
          placeholder='Your Name'
          label='Your Name'
          required
        />
        <Input
          id='email'
          label='Email Address'
          name='email'
          placeholder='Enter your email'
          required
        />
        <Textarea
          id='message'
          label='Additional Details or Questions'
          name='message'
          placeholder='Provide any additional details about your project'
        />

        <input type='hidden' name='honeypot' />

        <FormButton />

        {/* Display feedback */}
        {state.message && (
          <div
            className={`mt-4 text-center ${
              state.status ? 'text-green-500' : 'text-red-500'
            }`}>
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
