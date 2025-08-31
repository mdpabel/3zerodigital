// app/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShoppingBag,
  Headphones,
  Download,
  CreditCard,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import prisma from '@/../prisma/db';

// helpers
const statusLabel = (s: string) =>
  s === 'PENDING'
    ? 'Pending'
    : s === 'CONFIRMED'
      ? 'Active'
      : s === 'IN_PROGRESS'
        ? 'In Progress'
        : s === 'COMPLETED'
          ? 'Completed'
          : s === 'CANCELLED'
            ? 'Cancelled'
            : s === 'REFUNDED'
              ? 'Refunded'
              : s === 'PARTIALLY_REFUNDED'
                ? 'Partially Refunded'
                : s === 'FREE'
                  ? 'Free'
                  : s;

const money = (n: number, c = 'USD') =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: c }).format(
    n || 0,
  );

const dstr = (d: Date) => d.toISOString().slice(0, 10);

const AccountDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className='space-y-2'>
        <h1 className='font-bold text-3xl'>Welcome</h1>
        <p className='text-gray-600 dark:text-gray-400 text-sm'>
          Please sign in to view your dashboard.
        </p>
      </div>
    );
  }

  // Fetch in parallel
  const [ordersCount, lifetimeSpendAgg, downloadsCount, recentOrdersRaw] =
    await Promise.all([
      prisma.order.count({ where: { userId } }),
      prisma.payment.aggregate({
        where: { order: { userId }, status: 'PAID' },
        _sum: { amount: true },
      }),
      prisma.templateOrderItem.count({
        where: {
          order: { userId, status: 'COMPLETED' }, // only completed orders count as downloads
          template: { fileUrl: { not: '' } },
        },
      }),
      prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: {
          orderItems: { include: { service: { select: { name: true } } } },
          TemplateOrderItem: {
            include: { template: { select: { name: true } } },
          },
          payments: { select: { currency: true } },
        },
      }),
    ]);

  const currency = recentOrdersRaw[0]?.payments[0]?.currency || 'USD';

  const lifetimeSpend = money(lifetimeSpendAgg._sum.amount || 0, currency);

  const recentOrders = recentOrdersRaw.map((o) => {
    const serviceNames = o.orderItems
      .map((i) => i.service?.name)
      .filter(Boolean) as string[];
    const templateNames = o.TemplateOrderItem.map(
      (t) => t.template?.name,
    ).filter(Boolean) as string[];
    const names = [...serviceNames, ...templateNames];

    const title =
      names.length === 0
        ? 'Order'
        : names.length <= 2
          ? names.join(', ')
          : `${names[0]}, ${names[1]} + ${names.length - 2} more`;

    return {
      id: o.orderNumber || o.id,
      title,
      status: statusLabel(o.status),
      date: dstr(o.createdAt),
      amount: money(o.totalAmount, currency),
      href: `/dashboard/orders/${o.id}`,
    };
  });

  // No tickets model in schema -> keep 0 & empty list
  const activeTickets = 0;
  const recentTickets: Array<{
    id: string;
    subject: string;
    status: string;
    priority: string;
    date: string;
  }> = [];

  const stats = [
    {
      title: 'Total Orders',
      value: String(ordersCount),
      icon: ShoppingBag,
      color: 'text-blue-600',
      href: '/dashboard/orders',
    },
    {
      title: 'Active Tickets',
      value: String(activeTickets),
      icon: Headphones,
      color: 'text-green-600',
      href: '/dashboard/tickets',
    },
    {
      title: 'Downloads',
      value: String(downloadsCount),
      icon: Download,
      color: 'text-purple-600',
      href: '/dashboard/downloads',
    },
    {
      title: 'Total Spent',
      value: lifetimeSpend,
      icon: CreditCard,
      color: 'text-orange-600',
      href: '/dashboard/billing',
    },
  ] as const;

  const firstName = session.user?.name?.split(' ')?.[0] || 'there';

  return (
    <div className='space-y-8'>
      {/* Welcome Header */}
      <div>
        <h1 className='font-bold text-3xl'>Welcome back, {firstName}!</h1>
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
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
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
            {recentOrders.length === 0 ? (
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                No orders yet.{' '}
                <Link
                  href='/services'
                  className='text-blue-600 dark:text-blue-300 hover:underline'>
                  Browse services
                </Link>
                .
              </p>
            ) : (
              <div className='space-y-4'>
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={order.href}
                    className='flex justify-between items-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 p-4 rounded-lg'>
                    <div>
                      <h4 className='font-medium'>{order.title}</h4>
                      <p className='text-gray-600 dark:text-gray-400 text-sm'>
                        {order.id} • {order.date}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-semibold'>{order.amount}</p>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-1 text-xs ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : order.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : order.status === 'Active'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Support Tickets (empty state) */}
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
            {recentTickets.length === 0 ? (
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                No tickets yet.
              </p>
            ) : (
              <div className='space-y-4'>
                {recentTickets.map((t) => (
                  <div
                    key={t.id}
                    className='flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
                    <div>
                      <h4 className='font-medium'>{t.subject}</h4>
                      <p className='text-gray-600 dark:text-gray-400 text-sm'>
                        {t.id} • {t.date}
                      </p>
                    </div>
                    <div className='text-right'>
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs ${
                          t.status === 'Resolved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                        {t.status}
                      </span>
                      <p className='mt-1 text-gray-500 text-xs'>{t.priority}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
