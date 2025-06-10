// app/admin/clients/page.tsx
'use client';

import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const clients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@techflow.com',
    company: 'TechFlow Solutions',
    phone: '+1 (555) 123-4567',
    location: 'Toronto, ON',
    status: 'Active',
    projects: 3,
    totalValue: '$45,500',
    lastContact: '2024-01-08',
    avatar: '/avatars/sarah.jpg',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@greentech.com',
    company: 'GreenTech Innovations',
    phone: '+1 (555) 987-6543',
    location: 'Vancouver, BC',
    status: 'Active',
    projects: 2,
    totalValue: '$32,200',
    lastContact: '2024-01-07',
    avatar: '/avatars/mike.jpg',
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma@coastal.com',
    company: 'Coastal Realty',
    phone: '+1 (555) 456-7890',
    location: 'Halifax, NS',
    status: 'Inactive',
    projects: 1,
    totalValue: '$18,900',
    lastContact: '2023-12-15',
    avatar: '/avatars/emma.jpg',
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james@startup.com',
    company: 'Digital Startup Inc.',
    phone: '+1 (555) 321-0987',
    location: 'Montreal, QC',
    status: 'Lead',
    projects: 0,
    totalValue: '$0',
    lastContact: '2024-01-06',
    avatar: '/avatars/james.jpg',
  },
];

export default function ClientsPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='font-bold text-slate-900 dark:text-white text-3xl'>
            Clients
          </h1>
          <p className='text-slate-600 dark:text-slate-400'>
            Manage your client relationships and projects
          </p>
        </div>
        <Button className='bg-gradient-to-r from-blue-600 to-purple-600'>
          <Plus className='mr-2 w-4 h-4' />
          Add Client
        </Button>
      </div>

      {/* Stats */}
      <div className='gap-6 grid grid-cols-1 md:grid-cols-4'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <div className='bg-blue-100 dark:bg-blue-900 p-3 rounded-lg'>
                <DollarSign className='w-6 h-6 text-blue-600' />
              </div>
              <div>
                <p className='font-bold text-slate-900 dark:text-white text-2xl'>
                  156
                </p>
                <p className='text-slate-600 dark:text-slate-400 text-sm'>
                  Total Clients
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <div className='bg-green-100 dark:bg-green-900 p-3 rounded-lg'>
                <Calendar className='w-6 h-6 text-green-600' />
              </div>
              <div>
                <p className='font-bold text-slate-900 dark:text-white text-2xl'>
                  124
                </p>
                <p className='text-slate-600 dark:text-slate-400 text-sm'>
                  Active Clients
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <div className='bg-purple-100 dark:bg-purple-900 p-3 rounded-lg'>
                <MapPin className='w-6 h-6 text-purple-600' />
              </div>
              <div>
                <p className='font-bold text-slate-900 dark:text-white text-2xl'>
                  18
                </p>
                <p className='text-slate-600 dark:text-slate-400 text-sm'>
                  New This Month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <div className='bg-orange-100 dark:bg-orange-900 p-3 rounded-lg'>
                <Phone className='w-6 h-6 text-orange-600' />
              </div>
              <div>
                <p className='font-bold text-slate-900 dark:text-white text-2xl'>
                  92%
                </p>
                <p className='text-slate-600 dark:text-slate-400 text-sm'>
                  Retention Rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className='flex justify-between items-center gap-4'>
        <div className='flex flex-1 items-center gap-4 max-w-md'>
          <div className='relative flex-1'>
            <Search className='top-1/2 left-3 absolute w-4 h-4 text-slate-400 -translate-y-1/2 transform' />
            <Input
              placeholder='Search clients...'
              className='bg-white dark:bg-slate-800 pl-10'
            />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm'>
            <Filter className='mr-2 w-4 h-4' />
            Filters
          </Button>
        </div>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback>
                          {client.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='font-medium text-slate-900 dark:text-white'>
                          {client.name}
                        </p>
                        <p className='text-slate-500 dark:text-slate-400 text-sm'>
                          {client.company}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-1 text-sm'>
                        <Mail className='w-3 h-3' />
                        {client.email}
                      </div>
                      <div className='flex items-center gap-1 text-sm'>
                        <Phone className='w-3 h-3' />
                        {client.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-1'>
                      <MapPin className='w-4 h-4 text-slate-400' />
                      {client.location}
                    </div>
                  </TableCell>
                  <TableCell>{client.projects}</TableCell>
                  <TableCell className='font-medium'>
                    {client.totalValue}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        client.status === 'Active'
                          ? 'default'
                          : client.status === 'Lead'
                            ? 'secondary'
                            : 'outline'
                      }>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.lastContact}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end items-center gap-2'>
                      <Button variant='ghost' size='sm'>
                        <Eye className='w-4 h-4' />
                      </Button>
                      <Button variant='ghost' size='sm'>
                        <Edit className='w-4 h-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-red-600'>
                        <Trash2 className='w-4 h-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
