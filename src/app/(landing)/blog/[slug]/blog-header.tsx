'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye, Heart, User } from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readingTime: number;
  category: {
    name: string;
    color: string;
  };
  featuredImage: string;
  views: number;
  likes: number;
}

interface BlogHeaderProps {
  post: BlogPost;
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
      <div className='mb-6'>
        <Badge
          className={`bg-${post.category.color}-100 dark:bg-${post.category.color}-900/20 text-${post.category.color}-800 dark:text-${post.category.color}-300 px-3 py-1`}>
          {post.category.name}
        </Badge>
      </div>

      {/* Title */}
      <h1 className='mb-6 font-bold text-slate-900 dark:text-white text-4xl md:text-5xl lg:text-6xl leading-tight'>
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className='mb-8 max-w-4xl text-slate-600 dark:text-slate-300 text-xl leading-relaxed'>
        {post.excerpt}
      </p>

      {/* Meta Information */}
      <div className='flex flex-wrap items-center gap-6 mb-8 text-slate-600 dark:text-slate-300'>
        <div className='flex items-center gap-2'>
          <Calendar className='w-4 h-4' />
          <span className='text-sm'>{formatDate(post.publishedAt)}</span>
        </div>

        <div className='flex items-center gap-2'>
          <Clock className='w-4 h-4' />
          <span className='text-sm'>{post.readingTime} min read</span>
        </div>

        <div className='flex items-center gap-2'>
          <Eye className='w-4 h-4' />
          <span className='text-sm'>{post.views.toLocaleString()} views</span>
        </div>

        <div className='flex items-center gap-2'>
          <Heart className='w-4 h-4' />
          <span className='text-sm'>{post.likes} likes</span>
        </div>
      </div>

      {/* Author Info */}
      <div className='flex items-center gap-4 mb-8'>
        <div className='relative rounded-full w-12 h-12 overflow-hidden'>
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            fill
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
      </div>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='relative mb-8 rounded-2xl w-full h-96 md:h-[500px] overflow-hidden'>
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
      </motion.div>
    </motion.div>
  );
};

export default BlogHeader;
