// components/portfolio/template-card.tsx (Client Component)
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, ExternalLink, CheckCircle, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TemplateWithNestedCategories } from './types';

type Props = {
  template: TemplateWithNestedCategories;
  index: number;
};

// Color mapping for different categories
const getCategoryColor = (categoryName: string) => {
  const colorMap: Record<string, string> = {
    'E-commerce': 'from-blue-600 to-blue-700',
    Restaurant: 'from-orange-600 to-orange-700',
    Healthcare: 'from-emerald-600 to-emerald-700',
    Corporate: 'from-purple-600 to-purple-700',
    Portfolio: 'from-pink-600 to-pink-700',
    'Non-Profit': 'from-green-600 to-green-700',
    Blog: 'from-indigo-600 to-indigo-700',
    Education: 'from-yellow-600 to-yellow-700',
    'Real Estate': 'from-teal-600 to-teal-700',
    Fitness: 'from-red-600 to-red-700',
    Business: 'from-slate-600 to-slate-700',
    Technology: 'from-cyan-600 to-cyan-700',
    Creative: 'from-rose-600 to-rose-700',
    Fashion: 'from-fuchsia-600 to-fuchsia-700',
    Travel: 'from-emerald-500 to-teal-600',
    Finance: 'from-blue-700 to-indigo-700',
  };

  const fallbackColors = [
    'from-blue-600 to-blue-700',
    'from-purple-600 to-purple-700',
    'from-emerald-600 to-emerald-700',
    'from-orange-600 to-orange-700',
    'from-pink-600 to-pink-700',
  ];

  return (
    colorMap[categoryName] ||
    fallbackColors[categoryName.charCodeAt(0) % fallbackColors.length]
  );
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

const TemplateCard = ({ template, index }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(false);

  // Get template categories
  const templateCategories = template.categories.map(
    (categoryRelation) => categoryRelation.category,
  );
  const primaryCategory = templateCategories[0];
  const categoryName = primaryCategory?.name || 'Uncategorized';
  const color = getCategoryColor(categoryName);

  // Price calculations
  const currentPrice =
    template.salePrice > 0 ? template.salePrice : template.price;
  const hasDiscount =
    template.salePrice > 0 && template.salePrice < template.price;
  const discountPercentage = hasDiscount
    ? Math.round(((template.price - template.salePrice) / template.price) * 100)
    : 0;

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        layout: { duration: 0.3 },
      }}
      whileHover={{
        y: -8,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      }}
      onHoverStart={() => setHoveredItem(true)}
      onHoverEnd={() => setHoveredItem(false)}
      className='group relative bg-white/70 dark:bg-slate-800/70 shadow-lg hover:shadow-2xl backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300'>
      {/* Project Image */}
      <div className='relative bg-gradient-to-br from-slate-100 dark:from-slate-700 to-slate-200 dark:to-slate-800 h-48 md:h-56 overflow-hidden'>
        {template.images.length > 0 ? (
          <>
            {!imageLoaded && (
              <div className='absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse' />
            )}
            <Image
              src={template.images[0]}
              alt={template.name}
              fill
              className={cn(
                'object-cover transition-all duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0',
                hoveredItem ? 'scale-105' : 'scale-100',
              )}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              onLoad={() => setImageLoaded(true)}
            />
          </>
        ) : (
          // Fallback placeholder
          <div className='flex justify-center items-center w-full h-full'>
            <div
              className={cn(
                'bg-gradient-to-r shadow-lg p-4 rounded-2xl',
                color,
              )}>
              <Monitor className='w-8 h-8 text-white' />
            </div>
          </div>
        )}

        {/* Category Badges */}
        <div className='top-4 left-4 absolute flex flex-wrap gap-1'>
          {templateCategories.slice(0, 2).map((category, idx) => (
            <Badge
              key={category.id}
              className={cn(
                'bg-gradient-to-r shadow-lg border-0 text-white text-xs',
                idx === 0 ? color : 'from-slate-600 to-slate-700',
              )}>
              {category.name}
            </Badge>
          ))}
          {templateCategories.length > 2 && (
            <Badge className='bg-slate-600/80 shadow-lg border-0 text-white text-xs'>
              +{templateCategories.length - 2}
            </Badge>
          )}
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className='top-4 right-4 absolute'>
            <Badge className='bg-gradient-to-r from-red-600 to-red-700 shadow-lg border-0 text-white'>
              {discountPercentage}% OFF
            </Badge>
          </div>
        )}

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: hoveredItem ? 1 : 0,
          }}
          className='absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-4'>
          <div className='flex gap-2'>
            <Button
              asChild
              size='sm'
              className='bg-white/90 hover:bg-white text-black'>
              <Link
                href={template.liveUrl}
                target='_blank'
                className='flex items-center gap-2'>
                <Eye className='w-4 h-4' />
                Preview
              </Link>
            </Button>
            <Button
              asChild
              size='sm'
              variant='outline'
              className='bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/30 text-white'>
              <Link
                href={`/templates/${template.slug}`}
                className='flex items-center gap-2'>
                <ExternalLink className='w-4 h-4' />
                Details
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Project Info */}
      <div className='p-6'>
        {/* Title & Description */}
        <div className='mb-4'>
          <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
            {template.name}
          </h3>
          {template.description && (
            <p
              className='text-slate-600 dark:text-slate-300 text-sm line-clamp-2 leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: template.description,
              }}
            />
          )}
        </div>

        {/* Features/Tech badges */}
        <div className='mb-4'>
          <div className='flex flex-wrap gap-2'>
            <Badge
              variant='outline'
              className='bg-slate-50/50 dark:bg-slate-900/50 text-xs'>
              Responsive
            </Badge>
            <Badge
              variant='outline'
              className='bg-slate-50/50 dark:bg-slate-900/50 text-xs'>
              Modern Design
            </Badge>
            <Badge
              variant='outline'
              className='bg-slate-50/50 dark:bg-slate-900/50 text-xs'>
              Fast Loading
            </Badge>
          </div>
        </div>

        {/* Key Features */}
        <div className='mb-4'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <CheckCircle className='flex-shrink-0 w-3 h-3 text-green-600 dark:text-green-400' />
              <span className='text-slate-600 dark:text-slate-400 text-xs'>
                Mobile Optimized
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='flex-shrink-0 w-3 h-3 text-green-600 dark:text-green-400' />
              <span className='text-slate-600 dark:text-slate-400 text-xs'>
                SEO Ready
              </span>
            </div>
          </div>
        </div>

        {/* Price & Purchase */}
        <div className='flex justify-between items-center pt-4 border-slate-200/30 dark:border-slate-700/30 border-t'>
          <div className='flex items-center gap-2'>
            {hasDiscount && (
              <span className='text-slate-400 text-sm line-through'>
                ${template.price}
              </span>
            )}
            <span className='font-bold text-slate-900 dark:text-white text-lg'>
              {currentPrice === 0 ? 'Free' : `$${currentPrice}`}
            </span>
          </div>
          <Button
            asChild
            size='sm'
            className={cn('bg-gradient-to-r border-0 text-white', color)}>
            <Link href={`/templates/${template.slug}`}>View Template</Link>
          </Button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div
        className={cn(
          '-z-50 absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 rounded-2xl md:rounded-3xl transition-opacity duration-300',
          color,
        )}
      />
    </motion.div>
  );
};

export default TemplateCard;
