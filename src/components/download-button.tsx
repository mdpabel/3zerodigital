'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Download as DownloadIcon } from 'lucide-react';

type ButtonSize = React.ComponentProps<typeof Button>['size'];
type ButtonVariant = React.ComponentProps<typeof Button>['variant'];

interface DownloadButtonProps {
  href: string; // /api/downloads/template/[id]
  label?: string; // button text
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
}

export default function DownloadButton({
  href,
  label = 'Download',
  size = 'sm',
  variant,
  className,
}: DownloadButtonProps) {
  const [loading, setLoading] = React.useState(false);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // support cmd/ctrl click to open in new tab
    if (e.metaKey || e.ctrlKey) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    e.preventDefault();
    setLoading(true);

    // start download in same tab (lets browser handle the file)
    window.location.href = href;

    // best-effort: if user cancels/blocked, stop spinner after a few seconds
    const t = setTimeout(() => setLoading(false), 8000);
    // clear timeout if unmounted
    return () => clearTimeout(t);
  };

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      aria-live='polite'>
      {loading ? (
        <>
          <Loader2 className='mr-2 w-4 h-4 animate-spin' />
          Preparing…
        </>
      ) : (
        <>
          <DownloadIcon className='mr-2 w-4 h-4' />
          {label}
        </>
      )}
    </Button>
  );
}
