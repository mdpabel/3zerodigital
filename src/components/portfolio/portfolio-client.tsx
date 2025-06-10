// components/portfolio/portfolio-client.tsx (Client Component)
'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ComponentWrapper from '../common/component-wrapper';
import { TemplateWithNestedCategories, TemplateCategory } from './types';
import TemplateFilters from './template-filters';
import TemplateGrid from './template-grid';

type Props = {
  initialTemplates: TemplateWithNestedCategories[];
  categories: TemplateCategory[];
  showFilters?: boolean;
  totalCount?: number;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1],
    },
  },
};

const PortfolioClient = ({
  initialTemplates,
  categories,
  showFilters = false,
  totalCount = 0,
}: Props) => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalCount > initialTemplates.length);

  // Filter templates client-side if no server filtering
  const filteredTemplates = useMemo(() => {
    if (!showFilters || activeCategory === 'All') {
      return templates;
    }

    return templates.filter((template) =>
      template.categories.some((cat) => cat.category.name === activeCategory),
    );
  }, [templates, activeCategory, showFilters]);

  // Handle category change with search reset
  const handleCategoryChange = useCallback(
    async (category: string) => {
      if (!showFilters) return;

      setActiveCategory(category);
      setLoading(true);

      try {
        const response = await fetch(
          `/api/templates?page=1&limit=12&category=${
            category !== 'All' ? encodeURIComponent(category) : ''
          }`,
        );

        if (!response.ok) throw new Error('Failed to fetch templates');

        const data = await response.json();

        setTemplates(data.templates);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error('Error filtering templates:', error);
      } finally {
        setLoading(false);
      }
    },
    [showFilters],
  );

  // Load more templates
  const loadMoreTemplates = useCallback(async () => {
    if (!showFilters || loading || !hasMore) return;

    setLoading(true);
    try {
      const currentPage = Math.ceil(templates.length / 12) + 1;
      const response = await fetch(
        `/api/templates?page=${currentPage}&limit=12&category=${
          activeCategory !== 'All' ? encodeURIComponent(activeCategory) : ''
        }`,
      );

      if (!response.ok) throw new Error('Failed to fetch more templates');

      const data = await response.json();

      setTemplates((prev) => [...prev, ...data.templates]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error loading more templates:', error);
    } finally {
      setLoading(false);
    }
  }, [templates.length, loading, hasMore, showFilters, activeCategory]);

  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Section Header */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            className='mb-12 md:mb-16 text-center'>
            <motion.div variants={itemVariants} className='mb-6'>
              <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
                <Sparkles className='mr-2 w-4 h-4 text-blue-600' />
                Our Work
              </Badge>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className='mb-4 md:mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                {showFilters ? 'All Templates' : 'Featured Templates'}
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed'>
              {showFilters
                ? 'Explore our complete collection of premium website templates built with zero compromises on quality, security, and performance.'
                : `A curated selection of our latest ${filteredTemplates.length} premium website templates built with zero compromises on quality, security, and performance.`}
            </motion.p>
          </motion.div>

          {/* Filters */}
          {showFilters && (
            <TemplateFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              resultsCount={filteredTemplates.length}
              loading={loading}
            />
          )}

          {/* Template Grid */}
          <TemplateGrid
            templates={filteredTemplates}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMoreTemplates}
            showLoadMore={showFilters}
          />

          {/* CTA for homepage */}
          {!showFilters && filteredTemplates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='mt-12 md:mt-16 text-center'>
              <Button
                asChild
                size='lg'
                className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 shadow-xl hover:shadow-2xl px-8 py-6 text-white transition-all duration-300'>
                <Link href='/shop' className='flex items-center gap-3'>
                  Browse All Templates
                  <ExternalLink className='w-5 h-5' />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default PortfolioClient;
