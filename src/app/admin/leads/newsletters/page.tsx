import { getAllNewsletterSubscribers } from '@/actions/newsletter-actions';
import { NewsletterTable } from './newsletter-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Mail, TrendingUp, UserPlus } from 'lucide-react';

export default async function NewslettersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parseInt((await searchParams).page || '1');
  const { subscribers, total, pages, currentPage } =
    await getAllNewsletterSubscribers(page, 10);

  const activeSubscribers = subscribers.filter(
    (sub: any) => sub.isActive,
  ).length;
  const inactiveSubscribers = total - activeSubscribers;
  const thisMonth = subscribers.filter(
    (sub: any) => new Date(sub.createdAt).getMonth() === new Date().getMonth(),
  ).length;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-semibold text-3xl'>Newsletter Subscribers</h1>
        <p className='text-muted-foreground'>
          Manage your newsletter subscribers and track engagement
        </p>
      </div>

      {/* Stats Cards */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>
              Total Subscribers
            </CardTitle>
            <Users className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>{total}</div>
            <p className='text-muted-foreground text-xs'>
              +{thisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Active</CardTitle>
            <Mail className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-green-600 text-2xl'>
              {activeSubscribers}
            </div>
            <p className='text-muted-foreground text-xs'>
              {total > 0 ? Math.round((activeSubscribers / total) * 100) : 0}%
              of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Inactive</CardTitle>
            <TrendingUp className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-red-600 text-2xl'>
              {inactiveSubscribers}
            </div>
            <p className='text-muted-foreground text-xs'>Unsubscribed users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>This Month</CardTitle>
            <UserPlus className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-blue-600 text-2xl'>{thisMonth}</div>
            <p className='text-muted-foreground text-xs'>New subscribers</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscribers Table */}
      <NewsletterTable
        subscribers={subscribers}
        total={total}
        pages={pages}
        currentPage={currentPage}
      />
    </div>
  );
}
