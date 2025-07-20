'use client';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Facebook, Linkedin, Link } from 'lucide-react';

interface BlogBreadcrumbProps {
  category: {
    name: string;
    slug: string;
  };
  title: string;
}

const BlogBreadcrumb = ({ category, title }: BlogBreadcrumbProps) => {
  return (
    <nav className='flex items-center space-x-2 mb-8 text-slate-600 dark:text-slate-300 text-sm'>
      <Link
        href='/'
        className='flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400'>
        <Home className='w-4 h-4' />
        Home
      </Link>
      <ChevronRight className='w-4 h-4' />
      <Link
        href='/blog'
        className='hover:text-blue-600 dark:hover:text-blue-400'>
        Blog
      </Link>
      <ChevronRight className='w-4 h-4' />
      <Link
        href={`/blog/category/${category.slug}`}
        className='hover:text-blue-600 dark:hover:text-blue-400'>
        {category.name}
      </Link>
      <ChevronRight className='w-4 h-4' />
      <span className='max-w-md text-slate-400 truncate'>{title}</span>
    </nav>
  );
};

interface BlogShareProps {
  post: {
    title: string;
    slug: string;
  };
}

const BlogShare = ({ post }: BlogShareProps) => {
  let shareUrl = '';

  if (typeof window !== 'undefined') {
    shareUrl = `${window.location.origin}/blog/${post.slug}`;
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className='bg-slate-50 dark:bg-slate-900/50 mb-12 p-6 rounded-2xl'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Share2 className='w-5 h-5 text-slate-600 dark:text-slate-300' />
          <span className='font-medium text-slate-900 dark:text-white'>
            Share this article
          </span>
        </div>

        <div className='flex items-center gap-3'>
          <Button variant='outline' size='sm' asChild>
            <a
              href={shareLinks.twitter}
              target='_blank'
              rel='noopener noreferrer'>
              <Twitter className='w-4 h-4' />
            </a>
          </Button>
          <Button variant='outline' size='sm' asChild>
            <a
              href={shareLinks.facebook}
              target='_blank'
              rel='noopener noreferrer'>
              <Facebook className='w-4 h-4' />
            </a>
          </Button>
          <Button variant='outline' size='sm' asChild>
            <a
              href={shareLinks.linkedin}
              target='_blank'
              rel='noopener noreferrer'>
              <Linkedin className='w-4 h-4' />
            </a>
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => navigator.clipboard.writeText(shareUrl)}>
            <Link className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Export both components
export { BlogBreadcrumb, BlogShare };
