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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Mail, Trash2 } from 'lucide-react';
import {
  deleteNewsletterSubscriber,
  unsubscribeFromNewsletter,
} from '@/actions/newsletter-actions';
import { toast } from 'sonner';
import Link from 'next/link';

interface Newsletter {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
  createdAt: Date;
}

interface NewsletterTableProps {
  subscribers: Newsletter[];
  total: number;
  pages: number;
  currentPage: number;
}

export const NewsletterTable = ({
  subscribers,
  total,
  pages,
  currentPage,
}: NewsletterTableProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleUnsubscribe = async (email: string, id: string) => {
    setLoading(id);
    try {
      const result = await unsubscribeFromNewsletter(email);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(id);
    try {
      const result = await deleteNewsletterSubscriber(id);
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
        <CardTitle>Subscribers ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscribed</TableHead>
              <TableHead className='w-[70px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className='font-medium'>
                  {subscriber.email}
                </TableCell>
                <TableCell>{subscriber.name || 'N/A'}</TableCell>
                <TableCell>
                  <Badge
                    variant={subscriber.isActive ? 'default' : 'secondary'}>
                    {subscriber.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(subscriber.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <MoreHorizontal className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      {subscriber.isActive && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleUnsubscribe(subscriber.email, subscriber.id)
                          }
                          disabled={loading === subscriber.id}>
                          <Mail className='mr-2 w-4 h-4' />
                          Unsubscribe
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDelete(subscriber.id)}
                        disabled={loading === subscriber.id}
                        className='text-red-600'>
                        <Trash2 className='mr-2 w-4 h-4' />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                <Link href={`/admin/newsletters?page=${page}`}>{page}</Link>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
