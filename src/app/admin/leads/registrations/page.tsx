import { getAllLeads } from '@/actions/lead-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Calendar, TrendingUp } from 'lucide-react';
import { RegistrationsTable } from './registrations-table';

export default async function RegistrationsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const { leads, total, pages, currentPage } = await getAllLeads(
    page,
    10,
    'USER_REGISTRATION',
  );

  const thisMonth = leads.filter(
    (lead) => new Date(lead.createdAt).getMonth() === new Date().getMonth(),
  ).length;

  const thisWeek = leads.filter((lead) => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(lead.createdAt) >= weekAgo;
  }).length;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-semibold text-3xl'>User Registrations</h1>
        <p className='text-muted-foreground'>
          Track users who registered on your platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>
              Total Registrations
            </CardTitle>
            <Users className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>{total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>This Week</CardTitle>
            <TrendingUp className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-blue-600 text-2xl'>{thisWeek}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>This Month</CardTitle>
            <Calendar className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-green-600 text-2xl'>{thisMonth}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>
              Conversion Rate
            </CardTitle>
            <UserPlus className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-purple-600 text-2xl'>--</div>
            <p className='text-muted-foreground text-xs'>Coming soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Registrations Table */}
      <RegistrationsTable
        registrations={leads}
        total={total}
        pages={pages}
        currentPage={currentPage}
      />
    </div>
  );
}
