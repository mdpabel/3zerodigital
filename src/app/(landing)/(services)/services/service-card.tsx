'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Megaphone, ShieldCheck, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Service } from '@prisma/client';

// Helper to map icon names to Lucide components
const IconComponent = ({ name }: { name: string }) => {
  const commonProps = {
    className: 'h-6 w-6 text-white',
  };
  switch (name) {
    case 'Code':
      return <Code {...commonProps} />;
    case 'Megaphone':
      return <Megaphone {...commonProps} />;
    case 'ShieldCheck':
      return <ShieldCheck {...commonProps} />;
    case 'Wrench':
      return <Wrench {...commonProps} />;
    default:
      return <Code {...commonProps} />;
  }
};

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
      className='flex flex-col bg-white/70 dark:bg-slate-800/70 shadow-lg hover:shadow-2xl backdrop-blur-md p-6 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl h-full text-left transition-all duration-300'>
      {/* Main content area */}
      <div className='flex-grow'>
        <div className='flex items-center gap-4 mb-4'>
          <div className='flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg p-3 rounded-lg w-12 h-12 text-white'>
            <IconComponent name={service.icon || 'Code'} />
          </div>
          <h3 className='font-bold text-slate-900 dark:text-white text-xl'>
            {service.name}
          </h3>
        </div>
        <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
          {service.description}
        </p>
        <ul className='space-y-3 mt-6'>
          {Array.isArray(service.features) &&
            service.features.map((feature, idx) => {
              // This handles both simple strings and object structures in your JSON field
              const value =
                typeof feature === 'object' &&
                feature !== null &&
                'value' in feature
                  ? (feature as any).value
                  : feature;

              return value ? (
                <li
                  key={idx}
                  className='flex items-center text-slate-700 dark:text-slate-200'>
                  <ShieldCheck className='flex-shrink-0 mr-3 w-5 h-5 text-blue-500' />
                  <span>{value}</span>
                </li>
              ) : null;
            })}
        </ul>
      </div>

      {/* Footer with Price and CTA */}
      <div className='mt-8 pt-6 border-slate-200/50 dark:border-slate-700/50 border-t'>
        <div className='flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4'>
          <div>
            <span className='text-slate-500 dark:text-slate-400 text-sm'>
              Starting from
            </span>
            <p className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-transparent text-3xl'>
              ${Number(service.price).toFixed(0)}
            </p>
          </div>
          <Button asChild size='lg' className='group w-full sm:w-auto'>
            <Link href={`/${service.slug}`}>
              Learn More
              <ArrowRight className='ml-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
