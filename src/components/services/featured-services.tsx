'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Megaphone, ShieldCheck, Wrench } from 'lucide-react';
import ComponentWrapper from '@/components/common/component-wrapper';
import { Button } from '@/components/ui/button';
import { Service } from '@prisma/client';

// Helper to map icon names to Lucide components
const IconComponent = ({ name }: { name: string }) => {
  const commonProps = {
    className: 'w-6 h-6 md:w-7 md:h-7 transition-colors duration-300',
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

const FeaturedServices = ({
  featuredServices,
}: {
  featuredServices: Service[];
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeServiceId, setActiveServiceId] = useState(
    featuredServices[0].id,
  );

  const activeService = useMemo(
    () => featuredServices.find((s) => s.id === activeServiceId)!,
    [activeServiceId],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const panelVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  return (
    <ComponentWrapper>
      <div ref={sectionRef} className='relative py-20 md:py-32'>
        {/* Background Glow */}
        <div
          aria-hidden='true'
          className='-top-1/4 right-0 -z-10 absolute bg-gradient-to-br from-blue-500/10 dark:from-blue-400/5 to-purple-500/10 dark:to-purple-500/5 blur-3xl m-auto rounded-full w-[500px] h-[500px]'
        />

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
          {/* Section Header */}
          <motion.div variants={itemVariants} className='mb-12 text-center'>
            <h2 className='font-bold text-3xl sm:text-4xl md:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                A Spectrum of Solutions
              </span>
            </h2>
            <p className='mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300 text-lg'>
              Select a service to see how we deliver on our promise of Zero
              Compromises.
            </p>
          </motion.div>

          {/* Interactive Grid */}
          <div className='items-start gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-2'>
            {/* Left Panel: Service Selection */}
            <motion.div
              variants={containerVariants}
              className='gap-4 grid grid-cols-1 sm:grid-cols-2'>
              {featuredServices.map((service) => (
                <motion.button
                  key={service.id}
                  variants={itemVariants}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`relative p-5 text-left rounded-xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                    activeServiceId === service.id
                      ? 'bg-white/80 dark:bg-slate-800/80 border-blue-400/50 dark:border-blue-500/70 shadow-2xl shadow-blue-500/10'
                      : 'bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}>
                  {activeServiceId === service.id && (
                    <motion.div
                      layoutId='active-service-indicator'
                      className='-z-10 absolute inset-0 border-2 border-blue-500 rounded-xl'
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                  <div
                    className={`flex items-center gap-4 ${
                      activeServiceId === service.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}>
                    <IconComponent name={service.icon || 'Code'} />
                    <h3 className='font-bold text-slate-800 dark:text-slate-100 text-lg'>
                      {service.name}
                    </h3>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Right Panel: Service Details */}
            <div className='relative bg-white/50 dark:bg-slate-800/50 shadow-xl backdrop-blur-lg p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl min-h-[450px] lg:min-h-full'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeService.id}
                  variants={panelVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  className='flex flex-col h-full'>
                  <div className='flex-grow'>
                    <div className='flex items-center gap-4 mb-4'>
                      <div className='bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg p-3 rounded-lg text-white'>
                        <IconComponent name={activeService.icon || 'Code'} />
                      </div>
                      <h3 className='font-bold text-slate-900 dark:text-white text-2xl'>
                        {activeService.name}
                      </h3>
                    </div>
                    <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
                      {activeService.description}
                    </p>
                    <ul className='space-y-3 mt-6'>
                      {Array.isArray(activeService.features) &&
                        activeService.features.map((feature, idx) => {
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

                  <div className='mt-8 pt-6 border-slate-200/50 dark:border-slate-700/50 border-t'>
                    <div className='flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4'>
                      <div>
                        <span className='text-slate-500 dark:text-slate-400 text-sm'>
                          Starting from
                        </span>
                        <p className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-transparent text-3xl'>
                          ${activeService.price.toFixed(0)}
                        </p>
                      </div>
                      <Button
                        asChild
                        size='lg'
                        className='group w-full sm:w-auto'>
                        <Link href={`/services/${activeService.slug}`}>
                          Learn More
                          <ArrowRight className='ml-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </ComponentWrapper>
  );
};

export default FeaturedServices;
