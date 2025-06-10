'use client';

import { motion } from 'framer-motion';
import {
  MessageSquare,
  PenTool,
  Code,
  TestTube,
  Rocket,
  HeartHandshake,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ComponentWrapper from '@/components/common/component-wrapper';
import { cn } from '@/lib/utils';

const processSteps = [
  {
    step: 1,
    icon: MessageSquare,
    title: 'Discovery & Planning',
    description:
      'We analyze your business needs, target audience, and competition to create a strategic plan',
    duration: '1-2 days',
    deliverables: [
      'Requirements document',
      'Project timeline',
      'Technology recommendation',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    step: 2,
    icon: PenTool,
    title: 'Design & Wireframing',
    description:
      'Custom design creation focused on user experience and conversion optimization',
    duration: '3-5 days',
    deliverables: ['Wireframes', 'Design mockups', 'User flow diagrams'],
    color: 'from-purple-500 to-pink-600',
  },
  {
    step: 3,
    icon: Code,
    title: 'Development & Integration',
    description:
      'Building your store with modern technologies and integrating all necessary systems',
    duration: '7-14 days',
    deliverables: ['Functional store', 'Payment integration', 'Admin panel'],
    color: 'from-green-500 to-emerald-600',
  },
  {
    step: 4,
    icon: TestTube,
    title: 'Testing & Optimization',
    description:
      'Comprehensive testing across devices and browsers, performance optimization',
    duration: '2-3 days',
    deliverables: ['Test reports', 'Performance audit', 'Bug fixes'],
    color: 'from-orange-500 to-red-600',
  },
  {
    step: 5,
    icon: Rocket,
    title: 'Launch & Training',
    description: 'Store deployment, team training, and initial marketing setup',
    duration: '1 day',
    deliverables: ['Live store', 'Training session', 'Documentation'],
    color: 'from-indigo-500 to-purple-600',
  },
  {
    step: 6,
    icon: HeartHandshake,
    title: 'Support & Maintenance',
    description:
      'Ongoing support, updates, and optimization to ensure continued success',
    duration: 'Ongoing',
    deliverables: ['24/7 support', 'Regular updates', 'Performance monitoring'],
    color: 'from-teal-500 to-green-600',
  },
];

const EcommerceProcess = () => {
  return (
    <section className='bg-white dark:bg-slate-900 py-16 md:py-24'>
      <ComponentWrapper>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 md:mb-16 text-center'>
            <Badge className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 text-gray-300'>
              <Rocket className='mr-2 w-4 h-4' />
              Our Process
            </Badge>

            <h2 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                How We Build Your Store
              </span>
            </h2>

            <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Our proven 6-step process ensures your ecommerce store is built
              efficiently and effectively
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className='hidden lg:block relative'>
            <div className='left-1/2 absolute bg-gradient-to-b from-blue-500 to-purple-600 w-0.5 h-full -translate-x-1/2 transform'></div>

            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={cn(
                  'relative flex items-center mb-16',
                  index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8',
                )}>
                <Card className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md border-slate-200/50 dark:border-slate-700/50 w-96'>
                  <CardContent className='p-6'>
                    <div className='flex items-center gap-4 mb-4'>
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center shadow-lg',
                          step.color,
                        )}>
                        <step.icon className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <div className='text-slate-500 dark:text-slate-400 text-sm'>
                          Step {step.step}
                        </div>
                        <h3 className='font-bold text-slate-900 dark:text-white text-xl'>
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <p className='mb-4 text-slate-600 dark:text-slate-300'>
                      {step.description}
                    </p>

                    <div className='space-y-3'>
                      <div className='flex justify-between items-center text-sm'>
                        <span className='text-slate-500 dark:text-slate-400'>
                          Duration:
                        </span>
                        <span className='font-medium text-slate-900 dark:text-white'>
                          {step.duration}
                        </span>
                      </div>

                      <div>
                        <div className='mb-2 text-slate-500 dark:text-slate-400 text-sm'>
                          Deliverables:
                        </div>
                        <div className='space-y-1'>
                          {step.deliverables.map((deliverable, idx) => (
                            <div key={idx} className='flex items-center gap-2'>
                              <CheckCircle className='w-3 h-3 text-green-600 dark:text-green-400' />
                              <span className='text-slate-600 dark:text-slate-300 text-xs'>
                                {deliverable}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline dot */}
                <div className='left-1/2 absolute bg-white dark:bg-slate-800 border-4 border-blue-500 rounded-full w-4 h-4 -translate-x-1/2 transform'></div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className='lg:hidden space-y-8'>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md border-slate-200/50 dark:border-slate-700/50'>
                  <CardContent className='p-6'>
                    <div className='flex items-center gap-4 mb-4'>
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center shadow-lg',
                          step.color,
                        )}>
                        <step.icon className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <div className='text-slate-500 dark:text-slate-400 text-sm'>
                          Step {step.step}
                        </div>
                        <h3 className='font-bold text-slate-900 dark:text-white text-xl'>
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <p className='mb-4 text-slate-600 dark:text-slate-300'>
                      {step.description}
                    </p>

                    <div className='gap-4 grid grid-cols-1 sm:grid-cols-2'>
                      <div>
                        <div className='mb-1 text-slate-500 dark:text-slate-400 text-sm'>
                          Duration
                        </div>
                        <div className='font-medium text-slate-900 dark:text-white'>
                          {step.duration}
                        </div>
                      </div>

                      <div>
                        <div className='mb-2 text-slate-500 dark:text-slate-400 text-sm'>
                          Deliverables
                        </div>
                        <div className='space-y-1'>
                          {step.deliverables.map((deliverable, idx) => (
                            <div key={idx} className='flex items-center gap-2'>
                              <CheckCircle className='w-3 h-3 text-green-600 dark:text-green-400' />
                              <span className='text-slate-600 dark:text-slate-300 text-xs'>
                                {deliverable}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default EcommerceProcess;
