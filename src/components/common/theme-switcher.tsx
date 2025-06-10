'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { MoonStarIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const ThemeSwitcher = ({ className = '' }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const dark = theme === 'dark';

  return (
    <div className={cn('flex justify-center items-center', className)}>
      <div className='flex justify-center items-center'>
        {dark ? (
          <Button
            asChild
            className='border rounded-full'
            size='icon'
            variant='outline'>
            <button
              onClick={() => setTheme('light')}
              name='theme'
              value='light'
              type='submit'
              aria-label='Switch to light mode'>
              <MoonStarIcon />
            </button>
          </Button>
        ) : (
          <Button
            asChild
            className='border rounded-full'
            size='icon'
            variant='outline'>
            <button
              onClick={() => setTheme('dark')}
              name='theme'
              value='dark'
              type='submit'
              aria-label='Switch to dark mode'>
              <SunIcon />
            </button>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
