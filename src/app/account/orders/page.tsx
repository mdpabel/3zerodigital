import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Download, Eye, MessageSquare } from 'lucide-react';

const OrdersPage = () => {
  const orders = [
    {
      id: 'ORD-001',
      service: 'WordPress Development',
      description:
        'Custom WordPress theme development with e-commerce integration',
      status: 'Completed',
      date: '2024-01-15',
      amount: '$1,200',
      deliverables: ['Source Code', 'Documentation', 'Training Video'],
      progress: 100,
    },
    {
      id: 'ORD-002',
      service: 'SEO Package',
      description:
        'Complete SEO optimization for 20 pages including technical SEO',
      status: 'In Progress',
      date: '2024-01-10',
      amount: '$800',
      deliverables: ['SEO Audit Report', 'Keyword Research', 'Monthly Reports'],
      progress: 65,
    },
    {
      id: 'ORD-003',
      service: 'Logo Design',
      description: 'Professional logo design with brand guidelines',
      status: 'Completed',
      date: '2024-01-05',
      amount: '$300',
      deliverables: [
        'Logo Files (PNG, SVG)',
        'Brand Guidelines',
        'Color Palette',
      ],
      progress: 100,
    },
    {
      id: 'ORD-004',
      service: 'Website Maintenance',
      description: 'Monthly WordPress maintenance and security updates',
      status: 'Active',
      date: '2024-01-01',
      amount: '$150/month',
      deliverables: ['Monthly Reports', 'Backup Files', 'Security Scans'],
      progress: 100,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Active':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
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
        <Button>
          <Download className='mr-2 w-4 h-4' />
          Export Orders
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex md:flex-row flex-col gap-4'>
            <div className='flex-1'>
              <Input placeholder='Search orders...' className='w-full' />
            </div>
            <Select>
              <SelectTrigger className='w-full md:w-48'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='completed'>Completed</SelectItem>
                <SelectItem value='progress'>In Progress</SelectItem>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className='w-full md:w-48'>
                <SelectValue placeholder='Date Range' />
              </SelectTrigger>
              <SelectContent>
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
        {orders.map((order) => (
          <Card key={order.id} className='hover:shadow-lg transition-shadow'>
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

                  {/* Progress Bar for In Progress Orders */}
                  {order.status === 'In Progress' && (
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
                  <div className='mt-4'>
                    <p className='mb-2 font-medium text-sm'>Deliverables:</p>
                    <div className='flex flex-wrap gap-2'>
                      {order.deliverables.map((deliverable, index) => (
                        <span
                          key={index}
                          className='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs'>
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-2 lg:min-w-[200px]'>
                  <Button variant='outline' size='sm'>
                    <Eye className='mr-2 w-4 h-4' />
                    View Details
                  </Button>
                  <Button variant='outline' size='sm'>
                    <MessageSquare className='mr-2 w-4 h-4' />
                    Contact Support
                  </Button>
                  {(order.status === 'Completed' ||
                    order.deliverables.length > 0) && (
                    <Button size='sm'>
                      <Download className='mr-2 w-4 h-4' />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
