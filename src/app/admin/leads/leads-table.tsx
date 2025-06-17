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
import { updateLeadStatus } from '@/actions/lead-actions';
import { toast } from 'sonner';
import Link from 'next/link';
import { Lead, LeadStatus, Priority } from '@prisma/client';

interface LeadsTableProps {
  leads: Lead[];
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

export const LeadsTable = ({
  leads,
  total,
  pages,
  currentPage,
}: LeadsTableProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setLoading(leadId);
    try {
      const result = await updateLeadStatus(leadId, newStatus);
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
        <CardTitle>All Leads ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Forms</TableHead>
              <TableHead>Quotes</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div>
                    <div className='font-medium'>{lead.name}</div>
                    <div className='text-muted-foreground text-sm'>
                      {lead.email}
                    </div>
                    {lead.phone && (
                      <div className='text-muted-foreground text-sm'>
                        {lead.phone}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{lead.company || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant='outline'>
                    {lead.source.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={priorityColors[lead.priority]}>
                    {lead.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onValueChange={(value: LeadStatus) =>
                      handleStatusChange(lead.id, value)
                    }
                    disabled={loading === lead.id}>
                    <SelectTrigger className='w-36'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(LeadStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className='text-center'>
                    {lead.contactForms.length > 0 ? (
                      <Badge variant='secondary'>
                        {lead.contactForms.length}
                      </Badge>
                    ) : (
                      '-'
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='text-center'>
                    {lead.quotes.length > 0 ? (
                      <Badge variant='secondary'>{lead.quotes.length}</Badge>
                    ) : (
                      '-'
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(lead.createdAt).toLocaleDateString()}
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
                <Link href={`/admin/leads?page=${page}`}>{page}</Link>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
