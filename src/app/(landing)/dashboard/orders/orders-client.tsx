'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Download, Eye } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UIOrder } from './page';
import DownloadActions from '../download-actions';

// badge color by label
const getStatusColor = (label: string) => {
  switch (label) {
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'Active':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Cancelled':
      return 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
    case 'Refunded':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200';
    case 'Partially Refunded':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    case 'Free':
      return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

type Props = { orders: UIOrder[] };

export default function OrdersClient({ orders }: Props) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const inRange = (iso: string) => {
      if (dateRange === 'all') return true;
      const d = new Date(iso);
      const now = new Date();
      switch (dateRange) {
        case '7days': {
          const from = new Date();
          from.setDate(now.getDate() - 7);
          return d >= from;
        }
        case '30days': {
          const from = new Date();
          from.setDate(now.getDate() - 30);
          return d >= from;
        }
        case '3months': {
          const from = new Date();
          from.setMonth(now.getMonth() - 3);
          return d >= from;
        }
        case 'year': {
          const from = new Date(now.getFullYear(), 0, 1);
          return d >= from;
        }
        default:
          return true;
      }
    };

    return orders.filter((o) => {
      const matchesQuery =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.service.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q);

      const matchesStatus = status === 'all' || o.statusRaw === status;

      return matchesQuery && matchesStatus && inRange(o.createdAt);
    });
  }, [orders, query, status, dateRange]);

  const exportCSV = () => {
    const header = ['OrderID', 'Title', 'Status', 'Date', 'Amount'];
    const rows = filtered.map((o) => [
      o.id,
      o.service,
      o.status,
      o.date,
      o.amount,
    ]);

    const csv = [header, ...rows]
      .map((r) =>
        r
          .map((cell) => {
            const value = String(cell ?? '');
            // escape quotes
            const escaped = value.replace(/"/g, '""');
            // wrap if needed
            return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
          })
          .join(','),
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='font-bold text-3xl'>My Orders</h1>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>
            Track and manage all your service orders
          </p>
        </div>
        <Button onClick={exportCSV}>
          <Download className='mr-2 w-4 h-4' />
          Export Orders
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex md:flex-row flex-col gap-4'>
            <div className='flex-1'>
              <Input
                placeholder='Search orders...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className='w-full md:w-48'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='COMPLETED'>Completed</SelectItem>
                <SelectItem value='IN_PROGRESS'>In Progress</SelectItem>
                <SelectItem value='CONFIRMED'>Active</SelectItem>
                <SelectItem value='PENDING'>Pending</SelectItem>
                <SelectItem value='CANCELLED'>Cancelled</SelectItem>
                <SelectItem value='REFUNDED'>Refunded</SelectItem>
                <SelectItem value='PARTIALLY_REFUNDED'>
                  Partially Refunded
                </SelectItem>
                <SelectItem value='FREE'>Free</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className='w-full md:w-48'>
                <SelectValue placeholder='Date Range' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Any time</SelectItem>
                <SelectItem value='7days'>Last 7 days</SelectItem>
                <SelectItem value='30days'>Last 30 days</SelectItem>
                <SelectItem value='3months'>Last 3 months</SelectItem>
                <SelectItem value='year'>This year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className='space-y-4'>
        {filtered.map((order) => (
          <Card key={order.dbId} className='hover:shadow-lg transition-shadow'>
            <CardContent className='p-6'>
              <div className='flex lg:flex-row flex-col justify-between lg:items-center gap-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <h3 className='font-semibold text-lg'>{order.service}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>

                  <p className='mb-3 text-gray-600 dark:text-gray-400'>
                    {order.description}
                  </p>

                  <div className='flex items-center gap-4 text-gray-500 text-sm'>
                    <span>Order ID: {order.id}</span>
                    <span>Date: {order.date}</span>
                    <span className='font-semibold text-gray-900 dark:text-gray-100'>
                      {order.amount}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {order.status === 'In Progress' &&
                    typeof order.progress === 'number' && (
                      <div className='mt-4'>
                        <div className='flex justify-between items-center mb-2'>
                          <span className='font-medium text-sm'>Progress</span>
                          <span className='text-gray-600 text-sm'>
                            {order.progress}%
                          </span>
                        </div>
                        <div className='bg-gray-200 rounded-full w-full h-2'>
                          <div
                            className='bg-blue-600 rounded-full h-2 transition-all duration-300'
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                  {/* Deliverables */}
                  {order.deliverables.length > 0 && (
                    <div className='mt-4'>
                      <p className='mb-2 font-medium text-sm'>Deliverables:</p>
                      <div className='flex flex-wrap gap-2'>
                        {order.deliverables.map((d, i) => (
                          <span
                            key={i}
                            className='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs'>
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className='flex flex-col gap-2 lg:min-w-[200px]'>
                  <Button variant='outline' size='sm' asChild>
                    <Link href={order.detailHref}>
                      <Eye className='mr-2 w-4 h-4' />
                      View Details
                    </Link>
                  </Button>

                  <DownloadActions
                    templateId={order.templateId}
                    liveUrl={order.liveUrl}
                    githubRepo={order.githubRepo!}
                    demoUrl={order.liveUrl!}
                    demoDescription={order.description}
                    description={order.description}
                    demoTitle={order.templateTitle}
                    demoImage={order.templateImage}
                    env={order.env}
                    title={order.templateTitle}
                    envDescription={order.envDescription}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <Card>
            <CardContent className='p-8 text-gray-600 dark:text-gray-400 text-sm text-center'>
              No matching orders. Try adjusting your filters or{' '}
              <Link
                href='/services'
                className='font-medium text-blue-600 dark:text-blue-300 hover:underline'>
                browse Services
              </Link>
              .
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
