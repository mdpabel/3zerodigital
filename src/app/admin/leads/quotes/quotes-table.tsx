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
import { updateQuoteStatus } from '@/actions/lead-actions';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  Eye,
  Mail,
  Phone,
  Building,
  DollarSign,
  Calendar,
  Code,
} from 'lucide-react';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  description: string;
  status: 'PENDING' | 'REVIEWED' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  amount?: number;
  createdAt: Date;
  lead?: {
    id: string;
    status: string;
  };
}

interface QuotesTableProps {
  quotes: Quote[];
  total: number;
  pages: number;
  currentPage: number;
}

const statusColors = {
  PENDING:
    'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  REVIEWED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  SENT: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  ACCEPTED:
    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  EXPIRED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
};

export const QuotesTable = ({
  quotes,
  total,
  pages,
  currentPage,
}: QuotesTableProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusChange = async (
    quoteId: string,
    newStatus:
      | 'PENDING'
      | 'REVIEWED'
      | 'SENT'
      | 'ACCEPTED'
      | 'REJECTED'
      | 'EXPIRED',
  ) => {
    setLoading(quoteId);
    try {
      const result = await updateQuoteStatus(quoteId, newStatus);
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
        <CardTitle>Quote Requests ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact Info</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Budget & Timeline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lead Status</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell>
                  <div className='space-y-1'>
                    <div className='font-medium'>{quote.name}</div>
                    <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                      <Mail className='w-3 h-3' />
                      {quote.email}
                    </div>
                    {quote.phone && (
                      <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                        <Phone className='w-3 h-3' />
                        {quote.phone}
                      </div>
                    )}
                    {quote.company && (
                      <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                        <Building className='w-3 h-3' />
                        {quote.company}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-1'>
                      <Code className='w-3 h-3' />
                      <span className='font-medium text-sm'>
                        {quote.service.replace('-', ' ')}
                      </span>
                    </div>
                    <div className='text-muted-foreground text-sm'>
                      {quote.projectType}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='space-y-1'>
                    {quote.budget && (
                      <div className='flex items-center gap-1 text-sm'>
                        <DollarSign className='w-3 h-3' />
                        {quote.budget}
                      </div>
                    )}
                    {quote.timeline && (
                      <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                        <Calendar className='w-3 h-3' />
                        {quote.timeline}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={quote.status}
                    onValueChange={(
                      value:
                        | 'PENDING'
                        | 'REVIEWED'
                        | 'SENT'
                        | 'ACCEPTED'
                        | 'REJECTED'
                        | 'EXPIRED',
                    ) => handleStatusChange(quote.id, value)}
                    disabled={loading === quote.id}>
                    <SelectTrigger className='w-32'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='PENDING'>Pending</SelectItem>
                      <SelectItem value='REVIEWED'>Reviewed</SelectItem>
                      <SelectItem value='SENT'>Sent</SelectItem>
                      <SelectItem value='ACCEPTED'>Accepted</SelectItem>
                      <SelectItem value='REJECTED'>Rejected</SelectItem>
                      <SelectItem value='EXPIRED'>Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {quote.lead ? (
                    <Badge variant='outline'>
                      {quote.lead.status.replace('_', ' ')}
                    </Badge>
                  ) : (
                    'No Lead'
                  )}
                </TableCell>
                <TableCell>
                  {new Date(quote.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant='outline' size='sm'>
                        <Eye className='mr-1 w-4 h-4' />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-3xl'>
                      <DialogHeader>
                        <DialogTitle>Quote Request Details</DialogTitle>
                        <DialogDescription>
                          Submitted on{' '}
                          {new Date(quote.createdAt).toLocaleString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className='space-y-6'>
                        <div className='gap-4 grid grid-cols-2'>
                          <div>
                            <label className='font-medium text-sm'>Name</label>
                            <p className='text-muted-foreground text-sm'>
                              {quote.name}
                            </p>
                          </div>
                          <div>
                            <label className='font-medium text-sm'>Email</label>
                            <p className='text-muted-foreground text-sm'>
                              {quote.email}
                            </p>
                          </div>
                          {quote.phone && (
                            <div>
                              <label className='font-medium text-sm'>
                                Phone
                              </label>
                              <p className='text-muted-foreground text-sm'>
                                {quote.phone}
                              </p>
                            </div>
                          )}
                          {quote.company && (
                            <div>
                              <label className='font-medium text-sm'>
                                Company
                              </label>
                              <p className='text-muted-foreground text-sm'>
                                {quote.company}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className='gap-4 grid grid-cols-2'>
                          <div>
                            <label className='font-medium text-sm'>
                              Service
                            </label>
                            <p className='text-muted-foreground text-sm'>
                              {quote.service.replace('-', ' ')}
                            </p>
                          </div>
                          <div>
                            <label className='font-medium text-sm'>
                              Project Type
                            </label>
                            <p className='text-muted-foreground text-sm'>
                              {quote.projectType}
                            </p>
                          </div>
                          {quote.budget && (
                            <div>
                              <label className='font-medium text-sm'>
                                Budget
                              </label>
                              <p className='text-muted-foreground text-sm'>
                                {quote.budget}
                              </p>
                            </div>
                          )}
                          {quote.timeline && (
                            <div>
                              <label className='font-medium text-sm'>
                                Timeline
                              </label>
                              <p className='text-muted-foreground text-sm'>
                                {quote.timeline}
                              </p>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className='font-medium text-sm'>
                            Project Description
                          </label>
                          <div className='bg-muted mt-2 p-3 rounded-lg'>
                            <p className='text-sm whitespace-pre-wrap'>
                              {quote.description}
                            </p>
                          </div>
                        </div>

                        {quote.amount && (
                          <div>
                            <label className='font-medium text-sm'>
                              Quote Amount
                            </label>
                            <p className='font-semibold text-green-600 text-lg'>
                              ${quote.amount.toLocaleString()}
                            </p>
                          </div>
                        )}
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
                <Link href={`/admin/leads/quotes?page=${page}`}>{page}</Link>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
