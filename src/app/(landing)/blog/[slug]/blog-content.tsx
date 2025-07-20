'use client';

import { Badge } from '@/components/ui/badge';
import { WordPressPost } from '@/lib/wordpress';

interface BlogPost {
  content: string;
  tags: Array<{
    name: string;
    slug: string;
  }>;
  updatedAt: string;
}

interface BlogContentProps {
  post: WordPressPost;
}

const BlogContent = ({ post }: BlogContentProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md mb-12 p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
      {/* Blog Content */}
      <div
        className='dark:prose-blockquote:bg-blue-950/20 prose-blockquote:bg-blue-50 dark:prose-invert prose-blockquote:my-8 prose-li:my-2 prose-ol:my-6 prose-ul:my-6 prose-h2:mt-12 prose-h3:mt-8 prose-h2:mb-6 prose-h3:mb-4 prose-p:mb-6 prose-blockquote:p-6 prose-blockquote:border-blue-500 prose-blockquote:border-l-4 prose-blockquote:rounded-r-xl max-w-none prose-headings:font-bold dark:prose-a:text-blue-400 dark:prose-blockquote:text-blue-100 dark:prose-headings:text-white dark:prose-li:text-slate-300 dark:prose-ol:text-slate-300 dark:prose-p:text-slate-300 dark:prose-strong:text-white prose-a:text-blue-600 prose-blockquote:text-blue-900 prose-headings:text-slate-900 prose-li:text-slate-600 prose-ol:text-slate-600 prose-p:text-slate-600 prose-strong:text-slate-900 prose-h3:text-2xl prose-h2:text-3xl hover:prose-a:underline prose-a:no-underline prose-blockquote:italic prose-p:leading-relaxed prose prose-slate'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Last Updated */}
      <div className='mt-12 pt-6 border-slate-200 dark:border-slate-700 border-t'>
        <p className='text-slate-500 text-sm'>
          Last updated: {formatDate(post.date)}
        </p>
      </div>

      {/* Tags */}
      <div className='mt-6'>
        <h4 className='mb-4 font-semibold text-slate-900 dark:text-white'>
          Tags:
        </h4>
        <div className='flex flex-wrap gap-2'>
          {post.tags.map((tag, idx) => (
            <Badge
              key={idx}
              variant='secondary'
              className='bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer'>
              #{tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogContent;
