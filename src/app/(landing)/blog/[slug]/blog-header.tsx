'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye, Heart, User } from 'lucide-react';
import Image from 'next/image';
import { WordPressPost } from '@/lib/wordpress';

interface BlogHeaderProps {
  post: WordPressPost;
}

const BlogHeader = ({ post }: BlogHeaderProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='mb-12'>
      {/* Category Badge */}
      <div className='flex flex-wrap gap-2 mb-6'>
        {post.categories.map((category) => (
          <Badge
            key={category.id}
            className={`bg-${category.name}-100 dark:bg-${category.name}-900/20 text-${category.name}-800 dark:text-${category.name}-300 px-3 py-1`}>
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className='mb-6 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl lg:text-5xl leading-tight'>
        {post.title}
      </h1>

      {/* Meta Information */}
      <div className='flex flex-wrap items-center gap-6 mb-8 text-slate-600 dark:text-slate-300'>
        <div className='flex items-center gap-2'>
          <Calendar className='w-4 h-4' />
          <span className='text-sm'>{formatDate(post.date)}</span>
        </div>

        <div className='flex items-center gap-2'>
          <Clock className='w-4 h-4' />
          <span className='text-sm'>7 min read</span>
        </div>

        {/* <div className='flex items-center gap-2'>
          <Eye className='w-4 h-4' />
          <span className='text-sm'>{post.views.toLocaleString()} views</span>
        </div> */}

        {/* <div className='flex items-center gap-2'>
          <Heart className='w-4 h-4' />
          <span className='text-sm'>{post.likes} likes</span>
        </div> */}
      </div>

      {/* Author Info */}
      {/* <div className='flex items-center gap-4 mb-8'>
        <div className='relative rounded-full w-12 h-12 overflow-hidden'>
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className='object-cover'
          />
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <User className='w-4 h-4 text-slate-500' />
            <span className='font-medium text-slate-900 dark:text-white'>
              {post.author.name}
            </span>
          </div>
          <p className='text-slate-600 dark:text-slate-300 text-sm'>
            {post.author.bio}
          </p>
        </div> 
      </div> */}

      {/* Featured Image */}
      {post.featuredImage?.url && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='relative mb-8 rounded-2xl w-full h-96 md:h-[500px] overflow-hidden'>
          <img
            src={post.featuredImage?.url || '/images/not-found-image.jpg'}
            alt={post.title}
            className='object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
        </motion.div>
      )}
    </motion.div>
  );
};

export default BlogHeader;
