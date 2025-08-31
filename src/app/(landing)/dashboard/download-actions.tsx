'use client';

import DownloadButton from '@/components/download-button';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function DownloadActions({
  templateId,
  liveUrl,
}: {
  templateId: string;
  liveUrl?: string | null;
}) {
  return (
    <div className='flex flex-wrap items-center gap-2'>
      {liveUrl && (
        <Button variant='outline' size='sm' asChild>
          <a href={liveUrl} target='_blank' rel='noopener noreferrer'>
            <ExternalLink className='mr-2 w-4 h-4' />
            Live Preview
          </a>
        </Button>
      )}

      <DownloadButton
        href={`/api/downloads/template/${templateId}`}
        size='sm'
      />
    </div>
  );
}
