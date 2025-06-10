'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, Calendar, Tag } from 'lucide-react';

const BlogSidebar = () => {
  // Mock data
  const popularPosts = [
    {
      title: 'How to Choose the Right SSL Certificate',
      slug: 'choose-right-ssl-certificate',
      views: 1543,
      publishedAt: '2024-01-12',
    },
    {
      title: 'Website Security Best Practices 2024',
      slug: 'website-security-best-practices-2024',
      views: 1287,
      publishedAt: '2024-01-10',
    },
    {
      title: 'Understanding HTTPS vs HTTP',
      slug: 'understanding-https-vs-http',
      views: 956,
      publishedAt: '2024-01-08',
    },
  ];

  const categories = [
    { name: 'Security', count: 15, color: 'green' },
    { name: 'SEO', count: 12, color: 'blue' },
    { name: 'Web Development', count: 23, color: 'purple' },
    { name: 'Performance', count: 8, color: 'orange' },
    { name: 'Business', count: 11, color: 'red' },
  ];

  const tags = [
    'SSL',
    'HTTPS',
    'Security',
    'SEO',
    'Performance',
    'WordPress',
    'Hosting',
    'Optimization',
    'Analytics',
    'Marketing',
  ];

  return (
    <div className='space-y-8'>
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
        <h3 className='flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-white text-lg'>
          <Search className='w-5 h-5' />
          Search Blog
        </h3>

        <div className='relative'>
          <input
            type='text'
            placeholder='Search articles...'
            className='bg-slate-50 dark:bg-slate-900/50 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-slate-900 dark:text-white placeholder-slate-500'
          />
          <Search className='top-3 right-3 absolute w-5 h-5 text-slate-400' />
        </div>
      </motion.div>

      {/* Popular Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
        <h3 className='flex items-center gap-2 mb-6 font-bold text-slate-900 dark:text-white text-lg'>
          <TrendingUp className='w-5 h-5' />
          Popular Posts
        </h3>

        <div className='space-y-4'>
          {popularPosts.map((post, idx) => (
            <div key={idx} className='group cursor-pointer'>
              <h4 className='mb-2 font-medium text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-sm line-clamp-2 transition-colors'>
                {post.title}
              </h4>
              <div className='flex items-center gap-4 text-slate-500 text-xs'>
                <span className='flex items-center gap-1'>
                  <Calendar className='w-3 h-3' />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
                <span>{post.views} views</span>
              </div>
              {idx < popularPosts.length - 1 && (
                <hr className='mt-4 border-slate-200 dark:border-slate-700' />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
        <h3 className='flex items-center gap-2 mb-6 font-bold text-slate-900 dark:text-white text-lg'>
          <Tag className='w-5 h-5' />
          Categories
        </h3>

        <div className='space-y-3'>
          {categories.map((category, idx) => (
            <div
              key={idx}
              className='group flex justify-between items-center cursor-pointer'>
              <div className='flex items-center gap-2'>
                <div
                  className={`w-3 h-3 bg-${category.color}-500 rounded-full`}
                />
                <span className='text-slate-700 dark:group-hover:text-blue-400 dark:text-slate-300 group-hover:text-blue-600 transition-colors'>
                  {category.name}
                </span>
              </div>
              <Badge variant='secondary' className='text-xs'>
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
        <h3 className='mb-6 font-bold text-slate-900 dark:text-white text-lg'>
          Popular Tags
        </h3>

        <div className='flex flex-wrap gap-2'>
          {tags.map((tag, idx) => (
            <Badge
              key={idx}
              variant='secondary'
              className='bg-slate-100 hover:bg-blue-100 dark:bg-slate-700 dark:hover:bg-blue-900/20 text-slate-700 hover:text-blue-700 dark:hover:text-blue-300 dark:text-slate-300 text-xs transition-colors cursor-pointer'>
              #{tag}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='bg-gradient-to-br from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 p-6 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl'>
        <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-lg'>
          Stay Updated
        </h3>
        <p className='mb-4 text-slate-600 dark:text-slate-300 text-sm'>
          Get the latest articles and insights delivered to your inbox.
        </p>

        <div className='space-y-3'>
          <input
            type='email'
            placeholder='Your email address'
            className='bg-white dark:bg-slate-800 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-slate-900 dark:text-white placeholder-slate-500'
          />
          <Button className='bg-gradient-to-r from-blue-600 to-purple-600 w-full text-white'>
            Subscribe
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogSidebar;
