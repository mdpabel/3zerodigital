import { getAllLeads } from '@/actions/lead-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Phone, Mail, TrendingUp } from 'lucide-react';
import { LeadStatus } from '@prisma/client';
import { LeadsTable } from './leads-table';

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parseInt((await searchParams).page || '1');
  const { leads, total, pages, currentPage } = await getAllLeads(page, 10);

  // Calculate stats
  const newLeads = leads.filter(
    (lead) => lead.status === LeadStatus.NEW,
  ).length;
  const qualifiedLeads = leads.filter(
    (lead) => lead.status === LeadStatus.QUALIFIED,
  ).length;
  const wonLeads = leads.filter(
    (lead) => lead.status === LeadStatus.CLOSED_WON,
  ).length;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-semibold text-3xl'>Leads & Contacts</h1>
        <p className='text-muted-foreground'>
          Manage your leads, track interactions, and convert prospects
        </p>
      </div>

      {/* Stats Cards */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Total Leads</CardTitle>
            <Users className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>{total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>New Leads</CardTitle>
            <Mail className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-blue-600 text-2xl'>{newLeads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Qualified</CardTitle>
            <Phone className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-green-600 text-2xl'>
              {qualifiedLeads}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Closed Won</CardTitle>
            <TrendingUp className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-purple-600 text-2xl'>{wonLeads}</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <LeadsTable
        leads={leads}
        total={total}
        pages={pages}
        currentPage={currentPage}
      />
    </div>
  );
}
