'use client';

import DownloadButton from '@/components/download-button';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, LifeBuoy } from 'lucide-react'; // Importing icons
import { buildVercelDeployUrl } from '@/lib/vercel-deploy';
import Link from 'next/link';

export default function DownloadActions({
  templateId,
  liveUrl,
}: {
  templateId: string;
  liveUrl?: string | null;
}) {
  const deployUrl = liveUrl
    ? buildVercelDeployUrl({ repoUrl: liveUrl })
    : undefined;

  return (
    <div className='flex flex-col gap-4'>
      {/* First Row - Deploy with Vercel and Download Button */}
      <div className='flex flex-wrap items-center gap-3'>
        {/* Deploy with Vercel (GitHub Repo URL) */}
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

        {/* Download Button */}
        <DownloadButton
          href={`/api/downloads/template/${templateId}`}
          size='sm'
          className='bg-gray-700 hover:bg-gray-600 text-white transition-all'
        />
      </div>

      {/* Second Row - Docs & Video, Hire Us Links with Icons */}
      <div className='flex flex-wrap items-center gap-4 mt-4'>
        {/* Docs and Video Guide with Icon */}
        <Link
          href='/docs'
          className='flex items-center font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 dark:text-gray-300 text-sm'>
          <BookOpen className='mr-2 w-4 h-4' />
          Docs & Video Guide
        </Link>

        {/* Separator */}
        <span className='text-gray-400'>|</span>

        {/* Hire Us with Icon and Animation */}
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
