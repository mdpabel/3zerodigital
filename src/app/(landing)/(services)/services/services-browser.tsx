'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const commonProps = { className: className || 'h-8 w-8' };
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

  return (
    <ComponentWrapper>
      <div className='py-20 min-h-screen'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h1 className='mb-6 font-bold text-5xl'>
            <span className='text-white'>Service Explorer</span>
          </h1>

          <div className='flex justify-center gap-3'>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => {
                  setActiveCategory(category.slug);
                  setSelectedService(null);
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-transform transform hover:scale-105 ${
                  activeCategory === category.slug
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:shadow-md'
                }`}>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Split Screen Layout */}
        <div className='gap-0 grid lg:grid-cols-2 bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 rounded-3xl h-[750px] overflow-hidden'>
          {/* Left Side - Service List */}
          <div className='bg-slate-50 dark:bg-slate-700/50 p-8 overflow-y-auto'>
            <div className='mb-6'>
              <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                {categories.find((cat) => cat.slug === activeCategory)?.name}{' '}
                Services
              </h2>
              <p className='text-slate-600 dark:text-slate-300 text-sm'>
                Select a service to view details
              </p>
            </div>

            <div className='space-y-3'>
              <AnimatePresence>
                {filteredServices.map((service, index) => (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedService(service)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedService?.id === service.id
                        ? 'dark:bg-slate-900 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:shadow-md hover:scale-105'
                    }`}>
                    <div className='flex items-center gap-4'>
                      <div
                        className={`p-2 rounded-lg ${
                          selectedService?.id === service.id
                            ? 'bg-white/20'
                            : 'bg-slate-100 dark:bg-slate-700'
                        }`}>
                        <IconComponent
                          name={service.icon || 'Code'}
                          className={`h-5 w-5 ${
                            selectedService?.id === service.id
                              ? 'text-purple-600 bg-white'
                              : 'text-slate-600 dark:text-slate-300'
                          }`}
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='mb-1 font-semibold'>{service.name}</h3>
                        <p
                          className={`text-sm ${
                            selectedService?.id === service.id
                              ? 'text-white/80'
                              : 'text-slate-500'
                          }`}>
                          ${Number(service.price).toFixed(0)} -{' '}
                          {service.description.slice(0, 50)}...
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Service Details */}
          <div className='flex flex-col p-8'>
            <AnimatePresence mode='wait'>
              {selectedService && (
                <motion.div
                  key={selectedService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className='flex flex-col h-full'>
                  {/* Service Header */}
                  <div className='mb-8'>
                    <div className='flex justify-between items-center mb-6'>
                      <div className='flex items-center gap-4'>
                        <div className='bg-purple-600 p-4 rounded-2xl text-white'>
                          <IconComponent
                            name={selectedService.icon || 'Code'}
                          />
                        </div>
                        <div>
                          <h2 className='mb-1 font-bold text-slate-900 dark:text-white text-3xl'>
                            {selectedService.name}
                          </h2>
                          <p className='font-semibold text-purple-600'>
                            Starting from $
                            {Number(selectedService.price).toFixed(0)}
                          </p>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className='flex gap-2'>
                        <button
                          onClick={() => navigateService('prev')}
                          className='bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 p-2 rounded-lg hover:scale-105 transition-transform transform'>
                          <ChevronLeft className='w-5 h-5 text-slate-600 dark:text-slate-300' />
                        </button>
                        <button
                          onClick={() => navigateService('next')}
                          className='bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 p-2 rounded-lg hover:scale-105 transition-transform transform'>
                          <ChevronRight className='w-5 h-5 text-slate-600 dark:text-slate-300' />
                        </button>
                      </div>
                    </div>

                    <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
                      {selectedService.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className='flex-grow mb-8'>
                    <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-xl'>
                      What's Included:
                    </h3>
                    <div className='gap-3 grid'>
                      {Array.isArray(selectedService.features) &&
                        selectedService.features.map((feature, idx) => {
                          const value =
                            typeof feature === 'object' &&
                            feature !== null &&
                            'value' in feature
                              ? (feature as any).value
                              : feature;
                          return value ? (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className='flex items-center text-slate-600 dark:text-slate-300'>
                              <div className='flex-shrink-0 bg-purple-600 mr-4 rounded-full w-3 h-3' />
                              <span>{value}</span>
                            </motion.div>
                          ) : null;
                        })}
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className='pt-6 border-slate-200 dark:border-slate-700 border-t'>
                    <div className='flex sm:flex-row flex-col gap-4'>
                      <Button
                        asChild
                        className='inline-flex flex-1 justify-center items-center bg-purple-600 disabled:opacity-50 shadow-lg px-3 py-2.5 border-0 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-8 font-semibold text-white text-xs whitespace-nowrap hover:scale-105 transition-transform disabled:pointer-events-none transform'>
                        <Link href={`/${selectedService.slug}`}>
                          Get Started Now
                          <ArrowRight className='ml-2 w-4 h-4' />
                        </Link>
                      </Button>
                      <Button
                        variant='outline'
                        className='flex-1 bg-gradient-to-r from-orange-600 to-orange-700'>
                        Request Quote
                      </Button>
                    </div>

                    <div className='mt-4 text-center'>
                      <p className='text-slate-500 text-xs'>
                        {currentIndex + 1} of {filteredServices.length} services
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default ServicesBrowser;
