// components/portfolio/template-filters.tsx (Client Component)
'use client';

import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TemplateCategory } from './types';

type Props = {
  categories: TemplateCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  resultsCount: number;
  loading?: boolean;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const TemplateFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
  resultsCount,
  loading = false,
}: Props) => {
  const categoryOptions = ['All', ...categories.map((cat) => cat.name)];

  return (
    <div className='mb-12 md:mb-16'>
      {/* Filter Buttons */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='flex justify-center items-center gap-4 md:gap-6 mb-8'>
        <motion.div variants={itemVariants} className='flex items-center gap-2'>
          <Filter className='w-4 h-4 text-slate-500' />
          {/* <span className='font-medium text-slate-700 dark:text-slate-300 text-sm'>
            Category:
          </span> */}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='flex flex-wrap justify-center gap-2'>
          {categoryOptions.map((category) => (
            <Button
              key={category}
              onClick={() => onCategoryChange(category)}
              disabled={loading}
              variant={activeCategory === category ? 'default' : 'ghost'}
              size='sm'
              className={cn(
                'p-5 transition-all duration-300',
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md',
                loading && 'opacity-50 cursor-not-allowed',
              )}>
              {category}
            </Button>
          ))}
        </motion.div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className='text-center'>
        <p className='text-slate-600 dark:text-slate-400'>
          {loading ? (
            <span className='flex justify-center items-center gap-2'>
              <span className='border-2 border-t-transparent border-blue-600 rounded-full w-4 h-4 animate-spin' />
              Loading templates...
            </span>
          ) : (
            <>
              Showing {resultsCount} template{resultsCount !== 1 ? 's' : ''}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
};

export default TemplateFilters;
