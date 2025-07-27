// components/ssl/ssl-process-section.tsx
'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  Settings,
  TestTube,
  ArrowRight,
} from 'lucide-react';

const SSLProcessSection = () => {
  const processSteps = [
    {
      step: '1',
      icon: CheckCircle,
      title: 'Certificate Purchase',
      description:
        'We source and purchase the appropriate SSL certificate for your domain and hosting environment.',
      duration: '30 minutes',
      tasks: [
        'Domain verification',
        'Certificate selection',
        'Purchase & validation',
      ],
    },
    {
      step: '2',
      icon: Settings,
      title: 'Professional Installation',
      description:
        'Our experts install the SSL certificate on your server and configure all necessary settings.',
      duration: '1-2 hours',
      tasks: [
        'Server configuration',
        'Certificate installation',
        'Security headers setup',
      ],
    },
    {
      step: '3',
      icon: ArrowRight,
      title: 'HTTPS Configuration',
      description:
        'Set up automatic redirects from HTTP to HTTPS and fix any mixed content issues.',
      duration: '30 minutes',
      tasks: ['HTTPS redirects', 'Mixed content fixes', 'URL canonicalization'],
    },
    {
      step: '4',
      icon: TestTube,
      title: 'Testing & Verification',
      description:
        'Comprehensive testing to ensure your SSL is working perfectly across all browsers and devices.',
      duration: '30 minutes',
      tasks: [
        'SSL testing',
        'Browser compatibility',
        'Performance verification',
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='mb-20'>
      <div className='mb-12 text-center'>
        <h2 className='mb-4 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl'>
          Our SSL Installation Process
        </h2>
        <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg'>
          Professional, secure, and thorough. We handle every aspect of SSL
          installation so you can focus on your business.
        </p>
      </div>

      <div className='space-y-8'>
        {processSteps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className={`flex flex-col lg:flex-row items-center gap-8 ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
            {/* Step Number & Icon */}
            <div className='flex-shrink-0'>
              <div className='relative'>
                <div className='flex justify-center items-center bg-gradient-to-r from-green-600 to-blue-600 mb-4 rounded-2xl w-24 h-24'>
                  <span className='font-bold text-white text-2xl'>
                    {step.step}
                  </span>
                </div>
                <div className='-top-2 -right-2 absolute flex justify-center items-center bg-white dark:bg-slate-800 border-2 border-green-500 rounded-full w-8 h-8'>
                  <step.icon className='w-4 h-4 text-green-600' />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className='flex-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
              <div className='flex md:flex-row flex-col justify-between items-start md:items-center mb-4'>
                <h3 className='mb-2 md:mb-0 font-bold text-slate-900 dark:text-white text-2xl'>
                  {step.title}
                </h3>
                <div className='flex items-center gap-1 text-blue-600 dark:text-blue-400'>
                  <Clock className='w-4 h-4' />
                  <span className='font-medium text-sm'>{step.duration}</span>
                </div>
              </div>

              <p className='mb-6 text-slate-600 dark:text-slate-300 leading-relaxed'>
                {step.description}
              </p>

              <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
                {step.tasks.map((task, taskIdx) => (
                  <div key={taskIdx} className='flex items-center gap-2'>
                    <div className='flex-shrink-0 bg-green-500 rounded-full w-2 h-2' />
                    <span className='text-slate-600 dark:text-slate-300 text-sm'>
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className='bg-gradient-to-r from-slate-50 dark:from-slate-900/50 to-green-50 dark:to-green-950/20 mt-12 p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-center'>
        <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
          Total Installation Time: 2-3 Hours
        </h3>
        <p className='mb-6 text-slate-600 dark:text-slate-300'>
          Most installations are completed the same day. We'll keep you updated
          throughout the process.
        </p>

        <div className='flex flex-wrap justify-center items-center gap-6 text-sm'>
          <div className='flex items-center gap-2'>
            <div className='bg-green-500 rounded-full w-3 h-3' />
            <span className='text-slate-600 dark:text-slate-300'>
              Same-day completion
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='bg-blue-500 rounded-full w-3 h-3' />
            <span className='text-slate-600 dark:text-slate-300'>
              Regular updates
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='bg-purple-500 rounded-full w-3 h-3' />
            <span className='text-slate-600 dark:text-slate-300'>
              Post-installation support
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SSLProcessSection;
