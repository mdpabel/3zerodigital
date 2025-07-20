import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const TicketsPage = () => {
  const tickets = [
    {
      id: 'TKT-001',
      subject: 'Website Loading Speed Issue',
      description:
        'My website has been loading very slowly since the last update...',
      status: 'Open',
      priority: 'High',
      category: 'Technical Support',
      createdDate: '2024-01-18',
      lastReply: '2024-01-19',
      replies: 3,
    },
    {
      id: 'TKT-002',
      subject: 'SSL Certificate Installation Question',
      description:
        'I need help understanding the SSL certificate installation process...',
      status: 'Resolved',
      priority: 'Medium',
      category: 'General Support',
      createdDate: '2024-01-16',
      lastReply: '2024-01-17',
      replies: 5,
    },
    {
      id: 'TKT-003',
      subject: 'Request for Additional Features',
      description: 'Would like to add a booking system to my WordPress site...',
      status: 'In Progress',
      priority: 'Low',
      category: 'Feature Request',
      createdDate: '2024-01-14',
      lastReply: '2024-01-18',
      replies: 2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='font-bold text-3xl'>Support Tickets</h1>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>
            Get help from our support team
          </p>
        </div>
        <Link href='/account/tickets/create'>
          <Button>
            <Plus className='mr-2 w-4 h-4' />
            New Ticket
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-4'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-2'>
              <AlertCircle className='w-5 h-5 text-red-500' />
              <div>
                <p className='text-gray-600 text-sm'>Open</p>
                <p className='font-bold text-2xl'>1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-2'>
              <Clock className='w-5 h-5 text-blue-500' />
              <div>
                <p className='text-gray-600 text-sm'>In Progress</p>
                <p className='font-bold text-2xl'>1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-2'>
              <MessageSquare className='w-5 h-5 text-green-500' />
              <div>
                <p className='text-gray-600 text-sm'>Resolved</p>
                <p className='font-bold text-2xl'>1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-2'>
              <MessageSquare className='w-5 h-5 text-gray-500' />
              <div>
                <p className='text-gray-600 text-sm'>Total</p>
                <p className='font-bold text-2xl'>3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets List */}
      <div className='space-y-4'>
        {tickets.map((ticket) => (
          <Card key={ticket.id} className='hover:shadow-lg transition-shadow'>
            <CardContent className='p-6'>
              <div className='flex lg:flex-row flex-col gap-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <h3 className='font-semibold text-lg'>{ticket.subject}</h3>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge
                      variant='outline'
                      className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </div>
                  <p className='mb-3 text-gray-600 dark:text-gray-400'>
                    {ticket.description}
                  </p>
                  <div className='flex items-center gap-4 text-gray-500 text-sm'>
                    <span>#{ticket.id}</span>
                    <span>{ticket.category}</span>
                    <span>Created: {ticket.createdDate}</span>
                    <span>Last reply: {ticket.lastReply}</span>
                    <span>{ticket.replies} replies</span>
                  </div>
                </div>
                <div className='flex flex-col gap-2 lg:min-w-[150px]'>
                  <Link href={`/account/tickets/${ticket.id}`}>
                    <Button variant='outline' size='sm' className='w-full'>
                      <MessageSquare className='mr-2 w-4 h-4' />
                      View & Reply
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
