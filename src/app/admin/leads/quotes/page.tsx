import { getQuotes } from '@/actions/lead-actions';
import { QuotesTable } from './quotes-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, DollarSign, Clock, CheckCircle } from 'lucide-react';

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const { quotes, total, pages, currentPage } = await getQuotes(page, 10);

  const pendingQuotes = quotes.filter(
    (quote) => quote.status === 'PENDING',
  ).length;
  const sentQuotes = quotes.filter((quote) => quote.status === 'SENT').length;
  const acceptedQuotes = quotes.filter(
    (quote) => quote.status === 'ACCEPTED',
  ).length;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-semibold text-3xl'>Quote Requests</h1>
        <p className='text-muted-foreground'>
          Manage quote requests and track proposal status
        </p>
      </div>

      {/* Stats Cards */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>
              Total Requests
            </CardTitle>
            <FileText className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>{total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Pending</CardTitle>
            <Clock className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-orange-600 text-2xl'>
              {pendingQuotes}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Sent</CardTitle>
            <DollarSign className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-blue-600 text-2xl'>{sentQuotes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Accepted</CardTitle>
            <CheckCircle className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-green-600 text-2xl'>
              {acceptedQuotes}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quotes Table */}
      <QuotesTable
        quotes={quotes}
        total={total}
        pages={pages}
        currentPage={currentPage}
      />
    </div>
  );
}
