'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView, LayoutGroup } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ComponentWrapper from '@/components/common/component-wrapper';
import { Service, Category } from '@prisma/client';
import {
  ArrowRight,
  Code,
  Megaphone,
  ShieldCheck,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

type ServiceWithCategories = Service & { categories: Category[] };
type Props = { services: ServiceWithCategories[]; categories: Category[] };

const IconComponent = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const commonProps = { className: className || 'w-6 h-6' };
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

const ServicesBrowser = ({ services, categories }: Props) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.slug || '',
  );
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = useMemo(() => {
    if (!activeCategory) return [];
    const filtered = services.filter((service) =>
      service.categories.some((cat) => cat.slug === activeCategory),
    );
    if (filtered.length > 0 && !selectedService) {
      setSelectedService(filtered[0]);
    }
    return filtered;
  }, [services, activeCategory, selectedService]);

  const currentIndex = selectedService
    ? filteredServices.findIndex((s) => s.id === selectedService.id)
    : 0;

  const navigateService = (direction: 'prev' | 'next') => {
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % filteredServices.length
        : (currentIndex - 1 + filteredServices.length) %
          filteredServices.length;
    setSelectedService(filteredServices[newIndex]);
  };

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
      <div ref={sectionRef} className='relative py-20 min-h-screen'>
        {/* Background Glow */}
        <div
          aria-hidden='true'
          className='-top-1/4 right-0 -z-10 absolute bg-gradient-to-br from-blue-500/10 dark:from-blue-400/5 to-purple-500/10 dark:to-purple-500/5 blur-3xl m-auto rounded-full w-[500px] h-[600px]'
        />

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
          {/* Header */}
          <motion.div variants={itemVariants} className='mb-12 text-center'>
            <h1 className='mb-6 font-bold text-4xl md:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Service Explorer
              </span>
            </h1>

            <div className='md:flex md:flex-wrap md:justify-center gap-3 grid'>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => {
                    setActiveCategory(category.slug);
                    setSelectedService(null);
                  }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                    activeCategory === category.slug
                      ? 'bg-white/80 dark:bg-slate-800/80 border-blue-400/50 dark:border-blue-500/70 shadow-2xl shadow-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'
                  }`}>
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Interactive Grid */}
          <div className='items-start gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-2'>
            {/* Left Side - Service List */}
            <motion.div
              variants={containerVariants}
              className={`${
                selectedService ? 'hidden lg:block' : 'block'
              } bg-white/50 dark:bg-slate-800/50 shadow-xl backdrop-blur-lg p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl min-h-[400px] lg:h-[700px] overflow-y-auto`}>
              <div className='mb-6'>
                <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                  {categories.find((cat) => cat.slug === activeCategory)?.name}{' '}
                  Services
                </h2>
                <p className='text-slate-600 dark:text-slate-300 text-sm'>
                  Select a service to view details
                </p>
              </div>

              <LayoutGroup>
                <div className='gap-4 grid'>
                  <AnimatePresence>
                    {filteredServices.map((service, index) => (
                      <motion.button
                        key={service.id}
                        variants={itemVariants}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedService(service)}
                        className={`relative p-5 text-left rounded-xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                          selectedService?.id === service.id
                            ? 'bg-white/80 dark:bg-slate-800/80 border-blue-400/50 dark:border-blue-500/70 shadow-2xl shadow-blue-500/10'
                            : 'bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}>
                        {selectedService?.id === service.id && (
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
                            selectedService?.id === service.id
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-slate-600 dark:text-slate-400'
                          }`}>
                          <IconComponent
                            name={service.icon || 'Code'}
                            className='w-6 h-6 transition-colors'
                          />
                          <div className='flex-1'>
                            <h3 className='font-bold text-slate-800 dark:text-slate-100 text-lg'>
                              {service.name}
                            </h3>
                            <p className='text-slate-500 dark:text-slate-400 text-sm line-clamp-1'>
                              ${Number(service.price).toFixed(0)} -{' '}
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </LayoutGroup>
            </motion.div>

            {/* Right Side - Service Details */}
            <div className='bg-white/50 dark:bg-slate-800/50 shadow-xl backdrop-blur-lg p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl lg:h-[700px] min-h-[400px] overflow-y-auto'>
              <AnimatePresence mode='wait'>
                {selectedService && (
                  <motion.div
                    key={selectedService.id}
                    variants={panelVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className='flex flex-col h-full'>
                    <div className='flex-grow'>
                      <div className='flex md:flex-row flex-col justify-between items-center gap-3 md:gap-0 mb-6'>
                        <div className='flex items-center gap-4'>
                          <div className='bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg p-3 rounded-lg text-white'>
                            <IconComponent
                              name={selectedService.icon || 'Code'}
                              className='w-7 h-7'
                            />
                          </div>
                          <h2 className='font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                            {selectedService.name}
                          </h2>
                        </div>

                        {/* Navigation */}
                        <div className='flex gap-2'>
                          <button
                            onClick={() => navigateService('prev')}
                            className='bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 p-2 rounded-lg transition-all duration-300'>
                            <ChevronLeft className='w-5 h-5 text-slate-600 dark:text-slate-300' />
                          </button>
                          <button
                            onClick={() => navigateService('next')}
                            className='bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 p-2 rounded-lg transition-all duration-300'>
                            <ChevronRight className='w-5 h-5 text-slate-600 dark:text-slate-300' />
                          </button>
                        </div>
                      </div>

                      <p className='mb-4 text-slate-600 dark:text-slate-300 leading-relaxed'>
                        {selectedService.description}
                      </p>

                      <ul className='space-y-3'>
                        {Array.isArray(selectedService.features) &&
                          selectedService.features.map((feature, idx) => {
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

                    {/* CTA Section */}
                    <div className='mt-8 pt-6 border-slate-200/50 dark:border-slate-700/50 border-t'>
                      <div className='flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4'>
                        <div>
                          <span className='text-slate-500 dark:text-slate-400 text-sm'>
                            Starting from
                          </span>
                          <p className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-transparent text-3xl'>
                            ${Number(selectedService.price).toFixed(0)}
                          </p>
                        </div>
                        <div className='flex sm:flex-row flex-col gap-4 w-full sm:w-auto'>
                          <Button
                            asChild
                            size='lg'
                            className='group w-full sm:w-auto'>
                            <Link href={`/${selectedService.slug}`}>
                              Get Started Now
                              <ArrowRight className='ml-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
                            </Link>
                          </Button>
                          <Button
                            variant='outline'
                            size='lg'
                            className='w-full sm:w-auto'>
                            Request Quote
                          </Button>
                        </div>
                      </div>

                      <div className='mt-4 text-center'>
                        <p className='text-slate-500 text-xs'>
                          {currentIndex + 1} of {filteredServices.length}{' '}
                          services
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </ComponentWrapper>
  );
};

export default ServicesBrowser;
