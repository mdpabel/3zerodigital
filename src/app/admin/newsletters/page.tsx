import { getAllNewsletterSubscribers } from '@/actions/newsletter-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Mail, TrendingUp } from 'lucide-react';
import { NewsletterTable } from './newsletter-table';

export default async function NewslettersPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const { subscribers, total, pages, currentPage } =
    await getAllNewsletterSubscribers(page, 10);

  const activeSubscribers = subscribers.filter((sub) => sub.isActive).length;
  const inactiveSubscribers = total - activeSubscribers;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-semibold text-3xl'>Newsletter Subscribers</h1>
        <p className='text-muted-foreground'>
          Manage your newsletter subscribers and track engagement
        </p>
      </div>

      {/* Stats Cards */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>
              Total Subscribers
            </CardTitle>
            <Users className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>{total}</div>
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
