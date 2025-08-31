// app/dashboard/tickets/create/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CreateTicketPage = () => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
    orderNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className='max-w-2xl'>
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/dashboard/tickets'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='mr-2 w-4 h-4' />
            Back to Tickets
          </Button>
        </Link>
        <div>
          <h1 className='font-bold text-3xl'>Create Support Ticket</h1>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>
            Describe your issue and we'll help you resolve it
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ticket Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              <div>
                <Label htmlFor='category'>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='technical'>Technical Support</SelectItem>
                    <SelectItem value='billing'>Billing & Payments</SelectItem>
                    <SelectItem value='general'>General Support</SelectItem>
                    <SelectItem value='feature'>Feature Request</SelectItem>
                    <SelectItem value='bug'>Bug Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor='priority'>Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder='Select priority' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='low'>Low</SelectItem>
                    <SelectItem value='medium'>Medium</SelectItem>
                    <SelectItem value='high'>High</SelectItem>
                    <SelectItem value='urgent'>Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor='orderNumber'>Related Order (Optional)</Label>
              <Input
                id='orderNumber'
                placeholder='ORD-001'
                value={formData.orderNumber}
                onChange={(e) =>
                  setFormData({ ...formData, orderNumber: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor='subject'>Subject</Label>
              <Input
                id='subject'
                placeholder='Brief description of your issue'
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                placeholder='Please describe your issue in detail. Include any error messages, steps to reproduce the problem, and what you expected to happen.'
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={6}
                required
              />
            </div>

            <div>
              <Label>Attachments (Optional)</Label>
              <div className='p-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg text-center'>
                <Upload className='mx-auto mb-2 w-8 h-8 text-gray-400' />
                <p className='mb-2 text-gray-600 dark:text-gray-400 text-sm'>
                  Drag and drop files here, or click to browse
                </p>
                <p className='text-gray-500 text-xs'>
                  Max file size: 10MB. Supported formats: JPG, PNG, PDF, TXT
                </p>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  className='mt-2'>
                  Browse Files
                </Button>
              </div>
            </div>

            <div className='flex gap-4'>
              <Button type='submit' className='flex-1'>
                Create Ticket
              </Button>
              <Link href='/dashboard/tickets'>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTicketPage;
