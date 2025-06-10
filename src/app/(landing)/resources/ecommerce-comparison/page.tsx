'use client';

import { motion } from 'framer-motion';
import {
  Code,
  ShoppingBag,
  Database,
  CheckCircle,
  XCircle,
  ArrowRight,
  BarChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ComponentWrapper from '@/components/common/component-wrapper';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaWordpress } from 'react-icons/fa';
import { techStacks } from '../../(services)/(development)/complete-ecommerce-launch-package/ecommerce-tech-stack';

const getMaintenanceBadge = (maintenanceLevel: string) => {
  switch (maintenanceLevel.toLowerCase()) {
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
  }
};

const EcommerceComparisonPage = () => {
  return (
    <section className='bg-gradient-to-br from-slate-50 dark:from-slate-900 to-blue-50/30 dark:to-blue-950/30 py-16 md:py-24'>
      <ComponentWrapper>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 md:mb-16 text-center'>
            <Badge className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 text-gray-300'>
              <BarChart className='mr-2 w-4 h-4' />
              Detailed Comparison
            </Badge>

            <h1 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                E-commerce Stack Showdown
              </span>
            </h1>

            <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Analyze the key differences between our e-commerce solutions to
              make an informed decision for your business.
            </p>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-xl overflow-hidden'>
            <div className='overflow-x-auto'>
              <Table className='divide-y divide-slate-200 dark:divide-slate-700 min-w-full'>
                <TableHeader className='bg-slate-50/50 dark:bg-slate-900/50'>
                  <TableRow>
                    <TableHead className='px-6 py-3 font-medium text-slate-500 dark:text-slate-300 text-xs text-left uppercase tracking-wider'>
                      Technology
                    </TableHead>
                    <TableHead className='px-6 py-3 font-medium text-slate-500 dark:text-slate-300 text-xs text-left uppercase tracking-wider'>
                      Best For
                    </TableHead>
                    <TableHead className='px-6 py-3 font-medium text-slate-500 dark:text-slate-300 text-xs text-left uppercase tracking-wider'>
                      Metrics
                    </TableHead>
                    <TableHead className='px-6 py-3 font-medium text-slate-500 dark:text-slate-300 text-xs text-left uppercase tracking-wider'>
                      Pros
                    </TableHead>
                    <TableHead className='px-6 py-3 font-medium text-slate-500 dark:text-slate-300 text-xs text-left uppercase tracking-wider'>
                      Cons
                    </TableHead>
                    <TableHead className='px-6 py-3 font-medium text-slate-500 dark:text-slate-300 text-xs text-right uppercase tracking-wider'>
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='divide-y divide-slate-200/70 dark:divide-slate-700/70'>
                  {techStacks.map((stack) => (
                    <TableRow
                      key={stack.id}
                      className='hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors'>
                      <TableCell className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-3'>
                          <div
                            className={cn(
                              'p-2 rounded-lg bg-gradient-to-r',
                              stack.color,
                            )}>
                            <stack.icon className='w-5 h-5 text-white' />
                          </div>
                          <span className='font-semibold text-slate-800 dark:text-slate-100'>
                            {stack.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='px-6 py-4 max-w-xs text-slate-600 dark:text-slate-300 text-sm'>
                        {stack.bestFor}
                      </TableCell>
                      <TableCell className='px-6 py-4 text-sm whitespace-nowrap'>
                        <div className='space-y-2'>
                          <div className='flex justify-between items-center gap-2'>
                            <span className='text-slate-500 dark:text-slate-400'>
                              Price:
                            </span>
                            <span className='font-semibold text-slate-800 dark:text-slate-200'>
                              {stack.pricing}
                            </span>
                          </div>
                          <div className='flex justify-between items-center gap-2'>
                            <span className='text-slate-500 dark:text-slate-400'>
                              Timeline:
                            </span>
                            <span className='font-semibold text-slate-800 dark:text-slate-200'>
                              {stack.timeline}
                            </span>
                          </div>
                          <div className='flex justify-between items-center gap-2'>
                            <span className='text-slate-500 dark:text-slate-400'>
                              Maintenance:
                            </span>
                            <Badge
                              variant='outline'
                              className={cn(
                                'border-none',
                                getMaintenanceBadge(stack.maintenance),
                              )}>
                              {stack.maintenance}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <ul className='space-y-1'>
                          {stack.pros.map((pro, idx) => (
                            <li key={idx} className='flex items-start gap-2'>
                              <CheckCircle className='flex-shrink-0 mt-0.5 w-4 h-4 text-green-500' />
                              <span className='text-slate-600 dark:text-slate-300 text-sm'>
                                {pro}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <ul className='space-y-1'>
                          {stack.cons.map((con, idx) => (
                            <li key={idx} className='flex items-start gap-2'>
                              <XCircle className='flex-shrink-0 mt-0.5 w-4 h-4 text-red-500' />
                              <span className='text-slate-600 dark:text-slate-300 text-sm'>
                                {con}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className='px-6 py-4 text-right whitespace-nowrap'>
                        <Button asChild size='sm' variant='ghost'>
                          <Link
                            href={`/contact?service=ecommerce&stack=${stack.id}`}>
                            Get Started
                            <ArrowRight className='ml-2 w-4 h-4' />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-16 text-center'>
            <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-md mx-auto p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl max-w-4xl'>
              <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
                Still Have Questions?
              </h3>
              <p className='mx-auto mb-6 max-w-2xl text-slate-600 dark:text-slate-300'>
                Choosing the right technology is a critical step. Our experts
                are here to provide a free, no-obligation consultation to help
                you find the perfect fit for your project.
              </p>
              <Button
                asChild
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl text-white transition-shadow'>
                <Link href='/contact?service=ecommerce-consultation'>
                  Schedule Your Free Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default EcommerceComparisonPage;
