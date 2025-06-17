// app/admin/page.tsx
'use client';

import { motion } from 'framer-motion';
import {
  Users,
  FolderOpen,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Globe,
  Shield,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const stats = [
  {
    title: 'Total Revenue',
    value: '$54,239',
    change: '+12.5%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    title: 'Active Projects',
    value: '23',
    change: '+3',
    changeType: 'positive',
    icon: FolderOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
  },
  {
    title: 'Total Clients',
    value: '156',
    change: '+8',
    changeType: 'positive',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+0.5%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900',
  },
];

const recentProjects = [
  {
    id: 1,
    name: 'TechFlow E-commerce',
    client: 'TechFlow Solutions',
    status: 'In Progress',
    progress: 75,
    dueDate: '2024-01-15',
    priority: 'High',
  },
  {
    id: 2,
    name: 'GreenTech Website',
    client: 'GreenTech Innovations',
    status: 'Review',
    progress: 90,
    dueDate: '2024-01-10',
    priority: 'Medium',
  },
  {
    id: 3,
    name: 'Coastal Realty Platform',
    client: 'Coastal Realty',
    status: 'Development',
    progress: 45,
    dueDate: '2024-01-25',
    priority: 'Low',
  },
];

const recentLeads = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'Digital Startup Inc.',
    service: 'Web Development',
    status: 'New',
    value: '$5,500',
    date: '2024-01-08',
  },
  {
    id: 2,
    name: 'Mike Chen',
    company: 'Local Restaurant',
    service: 'Digital Marketing',
    status: 'Contacted',
    value: '$2,200',
    date: '2024-01-07',
  },
  {
    id: 3,
    name: 'Emma Davis',
    company: 'Fashion Brand',
    service: 'E-commerce Development',
    status: 'Proposal Sent',
    value: '$8,900',
    date: '2024-01-06',
  },
];

const zeroMetrics = [
  {
    title: 'Security Incidents',
    value: '0',
    period: 'This Month',
    icon: Shield,
    status: 'success',
  },
  {
    title: 'Downtime Events',
    value: '0',
    period: 'This Quarter',
    icon: Zap,
    status: 'success',
  },
  {
    title: 'Critical Errors',
    value: '0',
    period: 'This Week',
    icon: CheckCircle,
    status: 'success',
  },
];

export default function AdminDashboard() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='font-bold text-slate-900 dark:text-white text-3xl'>
            Dashboard
          </h1>
          <p className='text-slate-600 dark:text-slate-400'>
            Welcome back! Here's what's happening at 3Zero Digital.
          </p>
        </div>
        <Button className='bg-gradient-to-r from-blue-600 to-purple-600'>
          <Calendar className='mr-2 w-4 h-4' />
          View Calendar
        </Button>
      </div>

      {/* Stats Grid */}
      <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}>
            <Card>
              <CardContent className='p-6'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-medium text-slate-600 dark:text-slate-400 text-sm'>
                      {stat.title}
                    </p>
                    <div className='flex items-baseline gap-2'>
                      <p className='font-bold text-slate-900 dark:text-white text-2xl'>
                        {stat.value}
                      </p>
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === 'positive'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 3Zero Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='w-5 h-5 text-emerald-600' />
              3Zero Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='gap-6 grid grid-cols-1 md:grid-cols-3'>
              {zeroMetrics.map((metric) => (
                <div key={metric.title} className='text-center'>
                  <div className='inline-flex bg-emerald-100 dark:bg-emerald-900 mb-3 p-4 rounded-lg'>
                    <metric.icon className='w-8 h-8 text-emerald-600' />
                  </div>
                  <h3 className='mb-1 font-bold text-slate-900 dark:text-white text-3xl'>
                    {metric.value}
                  </h3>
                  <p className='font-medium text-slate-900 dark:text-white'>
                    {metric.title}
                  </p>
                  <p className='text-slate-600 dark:text-slate-400 text-sm'>
                    {metric.period}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className='flex justify-between items-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg'>
                    <div className='flex-1'>
                      <h4 className='font-medium text-slate-900 dark:text-white'>
                        {project.name}
                      </h4>
                      <p className='text-slate-600 dark:text-slate-400 text-sm'>
                        {project.client}
                      </p>
                      <div className='mt-2'>
                        <Progress value={project.progress} className='h-2' />
                        <p className='mt-1 text-slate-500 text-xs'>
                          {project.progress}% complete
                        </p>
                      </div>
                    </div>
                    <div className='ml-4 text-right'>
                      <Badge
                        variant={
                          project.status === 'In Progress'
                            ? 'default'
                            : project.status === 'Review'
                              ? 'secondary'
                              : 'outline'
                        }>
                        {project.status}
                      </Badge>
                      <p className='mt-1 text-slate-500 text-xs'>
                        Due: {project.dueDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className='flex justify-between items-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg'>
                    <div>
                      <h4 className='font-medium text-slate-900 dark:text-white'>
                        {lead.name}
                      </h4>
                      <p className='text-slate-600 dark:text-slate-400 text-sm'>
                        {lead.company}
                      </p>
                      <p className='text-slate-500 text-xs'>{lead.service}</p>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-slate-900 dark:text-white'>
                        {lead.value}
                      </p>
                      <Badge
                        variant={
                          lead.status === 'New'
                            ? 'default'
                            : lead.status === 'Contacted'
                              ? 'secondary'
                              : 'outline'
                        }
                        className='mt-1'>
                        {lead.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
