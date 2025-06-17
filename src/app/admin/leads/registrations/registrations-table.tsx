'use client';

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
import Link from 'next/link';
import { Mail, Phone, Calendar, User } from 'lucide-react';

interface Registration {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  priority: string;
  createdAt: Date;
}

interface RegistrationsTableProps {
  registrations: Registration[];
  total: number;
  pages: number;
  currentPage: number;
}

const statusColors = {
  NEW: 'bg-blue-100 text-blue-800',
  CONTACTED: 'bg-yellow-100 text-yellow-800',
  QUALIFIED: 'bg-green-100 text-green-800',
  PROPOSAL_SENT: 'bg-purple-100 text-purple-800',
  NEGOTIATING: 'bg-orange-100 text-orange-800',
  CLOSED_WON: 'bg-emerald-100 text-emerald-800',
  CLOSED_LOST: 'bg-red-100 text-red-800',
};

const priorityColors = {
  LOW: 'bg-gray-100 text-gray-800',
  MEDIUM: 'bg-blue-100 text-blue-800',
  HIGH: 'bg-orange-100 text-orange-800',
  URGENT: 'bg-red-100 text-red-800',
};

export const RegistrationsTable = ({
  registrations,
  total,
  pages,
  currentPage,
}: RegistrationsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Registrations ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Info</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Registration Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((registration) => (
              <TableRow key={registration.id}>
                <TableCell>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <User className='w-4 h-4' />
                      <span className='font-medium'>{registration.name}</span>
                    </div>
                    <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                      <Mail className='w-3 h-3' />
                      {registration.email}
                    </div>
                    {registration.phone && (
                      <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                        <Phone className='w-3 h-3' />
                        {registration.phone}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {registration.company || (
                    <span className='text-muted-foreground italic'>
                      No company
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      statusColors[
                        registration.status as keyof typeof statusColors
                      ]
                    }>
                    {registration.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      priorityColors[
                        registration.priority as keyof typeof priorityColors
                      ]
                    }>
                    {registration.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-1'>
                    <Calendar className='w-3 h-3' />
                    {new Date(registration.createdAt).toLocaleDateString()}
                  </div>
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
                <Link href={`/admin/leads/registrations?page=${page}`}>
                  {page}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
