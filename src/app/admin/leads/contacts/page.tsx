import { getContactForms } from '@/actions/lead-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Phone, AlertCircle } from 'lucide-react';
import { ContactFormsTable } from './contact-forms-table';

export default async function ContactFormsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parseInt((await searchParams).page || '1');
  const { forms, total, pages, currentPage } = await getContactForms(page, 10);

  const unreadForms = forms.filter((form) => form.status === 'UNREAD').length;
  const repliedForms = forms.filter((form) => form.status === 'REPLIED').length;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-semibold text-3xl'>Contact Forms</h1>
        <p className='text-muted-foreground'>
          Manage contact form submissions and customer inquiries
        </p>
      </div>

      {/* Stats Cards */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Total Forms</CardTitle>
            <MessageSquare className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>{total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Unread</CardTitle>
            <AlertCircle className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-red-600 text-2xl'>{unreadForms}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Replied</CardTitle>
            <Mail className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-green-600 text-2xl'>
              {repliedForms}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>This Month</CardTitle>
            <Phone className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-blue-600 text-2xl'>
              {
                forms.filter(
                  (form) =>
                    new Date(form.createdAt).getMonth() ===
                    new Date().getMonth(),
                ).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Forms Table */}
      <ContactFormsTable
        forms={forms}
        total={total}
        pages={pages}
        currentPage={currentPage}
      />
    </div>
  );
}
