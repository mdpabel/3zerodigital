// app/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShoppingBag,
  Headphones,
  Download,
  CreditCard,
  TrendingUp,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

const AccountDashboard = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '24',
      icon: ShoppingBag,
      color: 'text-blue-600',
      href: '/dashboard/orders',
    },
    {
      title: 'Active Tickets',
      value: '2',
      icon: Headphones,
      color: 'text-green-600',
      href: '/dashboard/tickets',
    },
    {
      title: 'Downloads',
      value: '18',
      icon: Download,
      color: 'text-purple-600',
      href: '/dashboard/downloads',
    },
    {
      title: 'Total Spent',
      value: '$4,287',
      icon: CreditCard,
      color: 'text-orange-600',
      href: '/dashboard/billing',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      service: 'WordPress Development',
      status: 'Completed',
      date: '2024-01-15',
      amount: '$1,200',
    },
    {
      id: 'ORD-002',
      service: 'SEO Package',
      status: 'In Progress',
      date: '2024-01-10',
      amount: '$800',
    },
    {
      id: 'ORD-003',
      service: 'Logo Design',
      status: 'Completed',
      date: '2024-01-05',
      amount: '$300',
    },
  ];

  const recentTickets = [
    {
      id: 'TKT-001',
      subject: 'Website Loading Issue',
      status: 'Open',
      priority: 'High',
      date: '2024-01-18',
    },
    {
      id: 'TKT-002',
      subject: 'SSL Certificate Question',
      status: 'Resolved',
      priority: 'Medium',
      date: '2024-01-16',
    },
  ];

  return (
    <div className='space-y-8'>
      {/* Welcome Header */}
      <div>
        <h1 className='font-bold text-3xl'>Welcome back, John!</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => (
          <Card key={stat.title} className='hover:shadow-lg transition-shadow'>
            <CardContent className='p-6'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    {stat.title}
                  </p>
                  <p className='font-bold text-2xl'>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <Link href={stat.href}>
                <Button variant='link' className='mt-2 p-0 h-auto'>
                  View Details →
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='gap-8 grid lg:grid-cols-2'>
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className='flex justify-between items-center'>
              Recent Orders
              <Link href='/dashboard/orders'>
                <Button variant='outline' size='sm'>
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className='flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
                  <div>
                    <h4 className='font-medium'>{order.service}</h4>
                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                      {order.id} • {order.date}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold'>{order.amount}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className='flex justify-between items-center'>
              Support Tickets
              <Link href='/dashboard/tickets'>
                <Button variant='outline' size='sm'>
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className='flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
                  <div>
                    <h4 className='font-medium'>{ticket.subject}</h4>
                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                      {ticket.id} • {ticket.date}
                    </p>
                  </div>
                  <div className='text-right'>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        ticket.status === 'Resolved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                      {ticket.status}
                    </span>
                    <p className='mt-1 text-gray-500 text-xs'>
                      {ticket.priority}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
            <Link href='/services'>
              <Button variant='outline' className='flex-col gap-2 w-full h-20'>
                <ShoppingBag className='w-6 h-6' />
                Browse Services
              </Button>
            </Link>
            <Link href='/dashboard/tickets/create'>
              <Button variant='outline' className='flex-col gap-2 w-full h-20'>
                <Headphones className='w-6 h-6' />
                Get Support
              </Button>
            </Link>
            <Link href='/contact'>
              <Button variant='outline' className='flex-col gap-2 w-full h-20'>
                <Clock className='w-6 h-6' />
                Book a Call
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountDashboard;
