// components/portfolio/template-grid.tsx (Client Component)
'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TemplateWithNestedCategories } from './types';
import TemplateCard from './template-card';

type Props = {
  templates: TemplateWithNestedCategories[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  showLoadMore: boolean;
};

const TemplateGrid = ({
  templates,
  loading,
  hasMore,
  onLoadMore,
  showLoadMore,
}: Props) => {
  // Intersection observer for infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: '200px',
  });

  // Auto-load more when in view
  useEffect(() => {
    if (inView && hasMore && !loading && showLoadMore) {
      onLoadMore();
    }
  }, [inView, hasMore, loading, showLoadMore, onLoadMore]);

  return (
    <>
      {/* Template Grid */}
      <motion.div
        layout
        className='gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <AnimatePresence mode='popLayout'>
          {templates.map((template, index) => (
            <TemplateCard key={template.id} template={template} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Loading Indicator */}
      {loading && (
        <div className='flex justify-center items-center py-8'>
          <Loader2 className='mr-2 w-6 h-6 text-blue-600 animate-spin' />
          <span className='text-slate-600 dark:text-slate-400'>
            Loading more templates...
          </span>
        </div>
      )}

      {/* Load More Trigger (for infinite scroll) */}
      {showLoadMore && hasMore && !loading && (
        <div
          ref={loadMoreRef}
          className='flex justify-center items-center h-20'>
          <div className='bg-gray-200 dark:bg-gray-700 rounded-full w-8 h-8 animate-pulse' />
        </div>
      )}

      {/* No More Results */}
      {showLoadMore && !hasMore && templates.length > 0 && (
        <div className='py-8 text-slate-500 dark:text-slate-400 text-center'>
          <p>You've seen all templates in this category</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && templates.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='py-12 text-center'>
          <div className='mb-4'>
            <Monitor className='mx-auto w-16 h-16 text-slate-400' />
          </div>
          <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
            No templates found
          </h3>
          <p className='mb-6 text-slate-600 dark:text-slate-400'>
            Try selecting a different category to see more results.
          </p>
        </motion.div>
      )}
    </>
  );
};

export default TemplateGrid;
