'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { updateContactFormStatus } from '@/actions/lead-actions';
import { toast } from 'sonner';
import Link from 'next/link';
import { Eye, Mail, Phone, Building, Globe } from 'lucide-react';
import { ContactForm } from '@prisma/client';

interface ContactFormsTableProps {
  forms: ContactForm[];
  total: number;
  pages: number;
  currentPage: number;
}

const statusColors = {
  UNREAD: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  READ: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  REPLIED:
    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  CLOSED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
};

const formTypeColors = {
  GENERAL: 'bg-gray-100 text-gray-800',
  SUPPORT: 'bg-blue-100 text-blue-800',
  SALES: 'bg-green-100 text-green-800',
  PARTNERSHIP: 'bg-purple-100 text-purple-800',
  FEEDBACK: 'bg-orange-100 text-orange-800',
};

export const ContactFormsTable = ({
  forms,
  total,
  pages,
  currentPage,
}: ContactFormsTableProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusChange = async (
    formId: string,
    newStatus: 'UNREAD' | 'READ' | 'REPLIED' | 'CLOSED',
  ) => {
    setLoading(formId);
    try {
      const result = await updateContactFormStatus(formId, newStatus);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form Submissions ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact Info</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lead Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.map((form) => (
              <TableRow key={form.id}>
                <TableCell>
                  <div className='space-y-1'>
                    <div className='font-medium'>{form.name}</div>
                    <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                      <Mail className='w-3 h-3' />
                      {form.email}
                    </div>
                    {form.phone && (
                      <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                        <Phone className='w-3 h-3' />
                        {form.phone}
                      </div>
                    )}
                    {form.company && (
                      <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                        <Building className='w-3 h-3' />
                        {form.company}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      formTypeColors[
                        form.formType as keyof typeof formTypeColors
                      ]
                    }>
                    {form.formType}
                  </Badge>
                </TableCell>
                <TableCell>
                  {form.service ? (
                    <div className='flex items-center gap-1'>
                      <Globe className='w-3 h-3' />
                      <span className='text-sm'>
                        {form.service.replace('-', ' ')}
                      </span>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  <Select
                    value={form.status}
                    onValueChange={(
                      value: 'UNREAD' | 'READ' | 'REPLIED' | 'CLOSED',
                    ) => handleStatusChange(form.id, value)}
                    disabled={loading === form.id}>
                    <SelectTrigger className='w-28'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='UNREAD'>Unread</SelectItem>
                      <SelectItem value='READ'>Read</SelectItem>
                      <SelectItem value='REPLIED'>Replied</SelectItem>
                      <SelectItem value='CLOSED'>Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {form.lead ? (
                    <Badge variant='outline'>
                      {form.lead.status.replace('_', ' ')}
                    </Badge>
                  ) : (
                    'No Lead'
                  )}
                </TableCell>
                <TableCell>
                  {new Date(form.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant='outline' size='sm'>
                        <Eye className='mr-1 w-4 h-4' />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                      <DialogHeader>
                        <DialogTitle>Contact Form Details</DialogTitle>
                        <DialogDescription>
                          Submitted on{' '}
                          {new Date(form.createdAt).toLocaleString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className='space-y-4'>
                        <div className='gap-4 grid grid-cols-2'>
                          <div>
                            <label className='font-medium text-sm'>Name</label>
                            <p className='text-muted-foreground text-sm'>
                              {form.name}
                            </p>
                          </div>
                          <div>
                            <label className='font-medium text-sm'>Email</label>
                            <p className='text-muted-foreground text-sm'>
                              {form.email}
                            </p>
                          </div>
                          {form.phone && (
                            <div>
                              <label className='font-medium text-sm'>
                                Phone
                              </label>
                              <p className='text-muted-foreground text-sm'>
                                {form.phone}
                              </p>
                            </div>
                          )}
                          {form.company && (
                            <div>
                              <label className='font-medium text-sm'>
                                Company
                              </label>
                              <p className='text-muted-foreground text-sm'>
                                {form.company}
                              </p>
                            </div>
                          )}
                        </div>
                        {form.subject && (
                          <div>
                            <label className='font-medium text-sm'>
                              Subject
                            </label>
                            <p className='text-muted-foreground text-sm'>
                              {form.subject}
                            </p>
                          </div>
                        )}
                        {form.service && (
                          <div>
                            <label className='font-medium text-sm'>
                              Service Interest
                            </label>
                            <p className='text-muted-foreground text-sm'>
                              {form.service.replace('-', ' ')}
                            </p>
                          </div>
                        )}
                        <div>
                          <label className='font-medium text-sm'>Message</label>
                          <p className='text-muted-foreground text-sm whitespace-pre-wrap'>
                            {form.message}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {pages > 1 && (
          <div className='flex justify-center items-center gap-2 mt-4'>
            {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size='sm'
                asChild>
                <Link href={`/admin/leads/contacts?page=${page}`}>{page}</Link>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
