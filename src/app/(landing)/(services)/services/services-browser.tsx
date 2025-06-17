'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';
import { Service, Category } from '@prisma/client';
import ServiceCard from './service-card';
import { Wrench } from 'lucide-react';

// We now expect services to come with their categories nested
type ServiceWithCategories = Service & { categories: Category[] };

type Props = {
  services: ServiceWithCategories[];
  categories: Category[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ServicesBrowser = ({ services, categories }: Props) => {
  // Default to the slug of the first category, or an empty string if none exist
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.slug || '',
  );

  // Filter services on the client side based on the active category.
  // useMemo ensures this only re-runs when the active category or services prop changes.
  const filteredServices = useMemo(() => {
    if (!activeCategory) return [];
    return services.filter((service) =>
      service.categories.some((cat) => cat.slug === activeCategory),
    );
  }, [services, activeCategory]);

  // This function is now synchronous and simply updates the state
  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug);
  };

  return (
    <ComponentWrapper>
      <div className='relative py-20 md:py-28'>
        {/* Background Glow */}
        <div
          aria-hidden='true'
          className='top-0 -z-10 absolute inset-x-0 bg-gradient-to-br from-blue-500/10 dark:from-blue-400/5 to-purple-500/5 dark:to-purple-500/5 blur-3xl m-auto rounded-full w-full max-w-4xl h-[400px]'
        />

        {/* Page Header */}
        <motion.div
          initial='hidden'
          animate='visible'
          variants={containerVariants}
          className='mx-auto mb-12 max-w-3xl text-center'>
          <motion.h1
            variants={itemVariants}
            className='font-bold text-4xl sm:text-5xl md:text-6xl'>
            <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
              Our Digital Solutions
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className='mt-4 text-slate-600 dark:text-slate-300 text-lg'>
            Explore our full range of services, crafted to deliver performance,
            security, and uncompromising quality.
          </motion.p>
        </motion.div>

        {/* Filters (No "All" button) */}
        <div className='mb-12'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-8'>
            {categories.map((category) => (
              <motion.div key={category.slug} variants={itemVariants}>
                <Button
                  onClick={() => handleCategoryChange(category.slug)}
                  variant={
                    activeCategory === category.slug ? 'default' : 'ghost'
                  }
                  className={cn(
                    'transition-all duration-300',
                    activeCategory === category.slug &&
                      'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg',
                  )}>
                  {category.name}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className='gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          <AnimatePresence mode='popLayout'>
            {filteredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Simplified Empty State */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='py-12 text-center'>
            <Wrench className='mx-auto w-16 h-16 text-slate-400' />
            <h3 className='mt-4 font-bold text-slate-900 dark:text-white text-xl'>
              No Services Found
            </h3>
            <p className='mt-2 text-slate-600 dark:text-slate-400'>
              There are no services available in this category.
            </p>
          </motion.div>
        )}
      </div>
    </ComponentWrapper>
  );
};

export default ServicesBrowser;
