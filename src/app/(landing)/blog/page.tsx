'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  Tag,
  Clock,
  Eye,
  Share2,
  BookOpen,
  TrendingUp,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ComponentWrapper from '@/components/common/component-wrapper';
import Image from 'next/image';
import Link from 'next/link';

// Types for WordPress data
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
}

interface BlogPageProps {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
}

// Sample data - replace with actual WordPress data
const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Complete Guide to Website Security in 2025',
    excerpt:
      'Learn essential security practices to protect your website from cyber threats and keep your data safe.',
    content: '',
    slug: 'complete-guide-website-security-2025',
    featuredImage: '/api/placeholder/600/400',
    author: {
      name: 'John Smith',
      avatar: '/api/placeholder/40/40',
    },
    publishedDate: '2025-01-15',
    readTime: '8 min read',
    category: 'Security',
    tags: ['Security', 'Web Development', 'Best Practices'],
    views: 1234,
  },
  {
    id: 2,
    title: 'How to Optimize Your Website for Google Core Web Vitals',
    excerpt:
      'Improve your website performance and SEO rankings by optimizing for Core Web Vitals metrics.',
    content: '',
    slug: 'optimize-website-core-web-vitals',
    featuredImage: '/api/placeholder/600/400',
    author: {
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/40/40',
    },
    publishedDate: '2025-01-12',
    readTime: '6 min read',
    category: 'SEO',
    tags: ['SEO', 'Performance', 'Google'],
    views: 987,
  },
  {
    id: 3,
    title: 'Building Modern E-commerce Websites with NextJS',
    excerpt:
      'Discover how to create fast, scalable e-commerce websites using NextJS and modern web technologies.',
    content: '',
    slug: 'building-ecommerce-websites-nextjs',
    featuredImage: '/api/placeholder/600/400',
    author: {
      name: 'Mike Chen',
      avatar: '/api/placeholder/40/40',
    },
    publishedDate: '2025-01-10',
    readTime: '12 min read',
    category: 'Development',
    tags: ['NextJS', 'E-commerce', 'React'],
    views: 756,
  },
];

const BlogPage: React.FC<BlogPageProps> = ({
  posts = samplePosts,
  categories = ['All', 'Security', 'SEO', 'Development', 'Design', 'Marketing'],
  tags = [
    'Security',
    'SEO',
    'NextJS',
    'React',
    'Performance',
    'Google',
    'E-commerce',
  ],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');

  // Filter posts based on search and filters
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <section className='relative py-16 md:py-24 min-h-screen overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center'>
            <Badge className='bg-blue-100 dark:bg-blue-900/20 mb-6 px-4 py-2 border border-blue-200/50 dark:border-blue-800/50 font-medium text-blue-800 dark:text-blue-300 text-sm'>
              <BookOpen className='mr-2 w-4 h-4' />
              Knowledge Hub
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Latest Insights & Tutorials
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Stay updated with the latest trends, best practices, and expert
              insights in web development, SEO, and digital marketing
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md mb-12 p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
            <div className='items-end gap-6 grid grid-cols-1 md:grid-cols-12'>
              {/* Search */}
              <div className='md:col-span-4'>
                <label className='block mb-2 font-medium text-slate-700 dark:text-slate-300 text-sm'>
                  Search Articles
                </label>
                <div className='relative'>
                  <Search className='top-3 left-3 absolute w-5 h-5 text-slate-400' />
                  <Input
                    type='text'
                    placeholder='Search for articles...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='bg-white/80 dark:bg-slate-800/80 pl-10'
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className='md:col-span-3'>
                <label className='block mb-2 font-medium text-slate-700 dark:text-slate-300 text-sm'>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='bg-white/80 dark:bg-slate-800/80 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg w-full text-slate-900 dark:text-slate-100'>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div className='md:col-span-3'>
                <label className='block mb-2 font-medium text-slate-700 dark:text-slate-300 text-sm'>
                  Tag
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className='bg-white/80 dark:bg-slate-800/80 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg w-full text-slate-900 dark:text-slate-100'>
                  <option value=''>All Tags</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <div className='md:col-span-2'>
                <Button
                  variant='outline'
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedTag('');
                  }}
                  className='bg-white/80 dark:bg-slate-800/80 w-full'>
                  <Filter className='mr-2 w-4 h-4' />
                  Clear
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='mb-16'>
              <h2 className='mb-8 font-bold text-slate-900 dark:text-white text-2xl'>
                Featured Article
              </h2>

              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden'>
                <div className='gap-8 grid grid-cols-1 lg:grid-cols-2'>
                  <div className='relative lg:order-2'>
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      width={600}
                      height={400}
                      className='w-full h-64 lg:h-full object-cover'
                    />
                    <div className='top-4 right-4 absolute'>
                      <Badge className='bg-blue-600 text-white'>
                        <TrendingUp className='mr-1 w-3 h-3' />
                        Featured
                      </Badge>
                    </div>
                  </div>

                  <div className='lg:order-1 p-8'>
                    <div className='mb-4'>
                      <Badge variant='outline' className='mb-2'>
                        {featuredPost.category}
                      </Badge>
                      <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                          {featuredPost.title}
                        </Link>
                      </h3>
                      <p className='mb-6 text-slate-600 dark:text-slate-300 text-lg'>
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-4 mb-6 text-slate-500 dark:text-slate-400 text-sm'>
                      <div className='flex items-center gap-2'>
                        <User className='w-4 h-4' />
                        <span>{featuredPost.author.name}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Calendar className='w-4 h-4' />
                        <span>
                          {new Date(
                            featuredPost.publishedDate,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Clock className='w-4 h-4' />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Eye className='w-4 h-4' />
                        <span>{featuredPost.views.toLocaleString()} views</span>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-2 mb-6'>
                      {featuredPost.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant='secondary'
                          className='text-xs'>
                          <Tag className='mr-1 w-3 h-3' />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      asChild
                      className='bg-blue-600 hover:bg-blue-700 text-white'>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Read Full Article
                        <ArrowRight className='ml-2 w-4 h-4' />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Posts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mb-16'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='font-bold text-slate-900 dark:text-white text-2xl'>
                Latest Articles
              </h2>
              <Badge variant='outline'>
                {filteredPosts.length} article
                {filteredPosts.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            {otherPosts.length > 0 ? (
              <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {otherPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className='group bg-white/70 dark:bg-slate-800/70 hover:shadow-lg backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300'>
                    <div className='relative'>
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={400}
                        height={250}
                        className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className='top-4 left-4 absolute'>
                        <Badge variant='secondary'>{post.category}</Badge>
                      </div>
                    </div>

                    <div className='p-6'>
                      <h3 className='mb-3 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-lg transition-colors'>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className='mb-4 text-slate-600 dark:text-slate-300 text-sm'>
                        {post.excerpt}
                      </p>

                      <div className='flex flex-wrap items-center gap-3 mb-4 text-slate-500 dark:text-slate-400 text-xs'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-3 h-3' />
                          <span>
                            {new Date(post.publishedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='w-3 h-3' />
                          <span>{post.readTime}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Eye className='w-3 h-3' />
                          <span>{post.views}</span>
                        </div>
                      </div>

                      <div className='flex flex-wrap gap-1 mb-4'>
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant='outline'
                            className='text-xs'>
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant='outline' className='text-xs'>
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className='flex justify-between items-center'>
                        <Button variant='outline' size='sm' asChild>
                          <Link href={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className='ml-1 w-3 h-3' />
                          </Link>
                        </Button>

                        <Button variant='ghost' size='sm'>
                          <Share2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-12 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-center'>
                <BookOpen className='mx-auto mb-4 w-12 h-12 text-slate-400' />
                <h3 className='mb-2 font-semibold text-slate-900 dark:text-white text-lg'>
                  No articles found
                </h3>
                <p className='text-slate-600 dark:text-slate-300'>
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl text-center'>
            <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl'>
              Stay Updated with Latest Insights
            </h3>
            <p className='mb-6 text-slate-600 dark:text-slate-300'>
              Subscribe to our newsletter and never miss our latest articles,
              tutorials, and industry insights
            </p>
            <div className='flex sm:flex-row flex-col justify-center gap-4 mx-auto max-w-md'>
              <Input
                type='email'
                placeholder='Enter your email'
                className='flex-1 bg-white/80 dark:bg-slate-800/80'
              />
              <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
                Subscribe
                <ArrowRight className='ml-2 w-4 h-4' />
              </Button>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default BlogPage;
