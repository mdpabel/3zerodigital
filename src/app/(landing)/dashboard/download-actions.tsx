'use client';

import DownloadButton from '@/components/download-button';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, LifeBuoy } from 'lucide-react';
import Link from 'next/link';
import slugify from 'slugify';

function sanitizeProjectName(name: string): string {
  return slugify(name, {
    lower: true,
    strict: true, // remove anything not letters, numbers, dashes
    replacement: '-', // collapse invalid chars/spaces into single dash
    trim: true,
  }).slice(0, 100);
}

export default function DownloadActions({
  templateId,
  liveUrl,
  githubRepo, // Repository URL for Vercel
  env = [],
  demoTitle,
  demoDescription,
  demoUrl,
  demoImage,
  title, // Project name
  description, // Repository name or project description
}: {
  templateId: string;
  liveUrl?: string | null;
  githubRepo?: string;
  env?: string[];
  demoTitle?: string;
  demoDescription?: string;
  demoUrl?: string;
  demoImage?: string;
  title?: string;
  description?: string;
}) {
  const baseUrl = 'https://vercel.com/new/clone';

  const params = new URLSearchParams({
    ...(githubRepo && { 'repository-url': githubRepo }),
    ...(env.length > 0 && { env: env.join(',') }),
    ...(title && { 'project-name': sanitizeProjectName(title) }),
    ...(title && { 'repository-name': sanitizeProjectName(title) }),
    ...(demoTitle && { 'demo-title': demoTitle }),
    ...(demoDescription && { 'demo-description': demoDescription }),
    ...(demoUrl && { 'demo-url': demoUrl }),
    ...(demoImage && { 'demo-image': demoImage }),
  });

  const deployUrl = `${baseUrl}?${params.toString()}`;

  return (
    <div className='flex flex-col gap-4'>
      {/* First Row - Deploy with Vercel and Download Button */}
      <div className='flex flex-wrap items-center gap-3'>
        {deployUrl && (
          <Button
            size='sm'
            className='bg-gradient-to-r hover:bg-gradient-to-r from-orange-600 hover:from-orange-500 to-orange-700 hover:to-orange-600 text-white transition-all'
            asChild>
            <a
              href={deployUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center'>
              <ExternalLink className='mr-2 w-4 h-4' />
              Deploy with Vercel
            </a>
          </Button>
        )}

        <DownloadButton
          href={`/api/downloads/template/${templateId}`}
          size='sm'
          className='bg-gray-700 hover:bg-gray-600 text-white transition-all'
        />
      </div>

      {/* Second Row - Docs & Video, Hire Us Links */}
      <div className='flex flex-wrap items-center gap-4 mt-4'>
        <Link
          href='/docs'
          className='flex items-center font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 dark:text-gray-300 text-sm'>
          <BookOpen className='mr-2 w-4 h-4' />
          Docs & Video Guide
        </Link>

        <span className='text-gray-400'>|</span>

        <Link
          href='/website-setup'
          className='group flex items-center font-medium text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-300 text-sm'>
          <LifeBuoy className='mr-2 w-4 h-4 group-hover:animate-pulse' />
          <span className='dark:group-hover:text-blue-400 group-hover:text-blue-600 transition-all'>
            Hire Us
          </span>
        </Link>
      </div>
    </div>
  );
}
