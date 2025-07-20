'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Circle, File, Laptop, Moon, SearchIcon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useDebounce } from 'use-debounce';

import { cn } from '@/lib/utils';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import { searchDb } from '@/lib/config/search-db';

import { WP_REST_API_Posts } from 'wp-types';
import { Button } from '../ui/button';
import { useIsMac } from '@/hooks/is-mac';
import { Service } from '@prisma/client';

export function SearchMenu({ ...props }: DialogProps) {
  const isMac = useIsMac();
  const [search, setSearch] = React.useState('');
  const [posts, setPosts] = React.useState<WP_REST_API_Posts>([]);
  const [servicesRaw, setServicesRaw] = React.useState<Service[]>([]);
  const [isServiceLoading, setIsServiceLoading] = React.useState(false);
  const [isPostLoading, setIsPostLoading] = React.useState(false);
  const [value] = useDebounce(search, 300);

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  const staticSlugs = React.useMemo(
    () =>
      new Set(
        searchDb.services.flatMap((group) =>
          group.items.map((item) => item.href.replace('/', '')),
        ),
      ),
    [],
  );

  const services = React.useMemo(
    () => servicesRaw.filter((service) => !staticSlugs.has(service.slug)),
    [servicesRaw, staticSlugs],
  );

  React.useEffect(() => {
    if (!value.trim()) {
      setPosts([]);
      setServicesRaw([]);
      return;
    }

    setIsServiceLoading(true);
    setIsPostLoading(true);

    // getPostsWithTagNames({ search: value })
    //   .then(({ posts }) => {
    //     if (Array.isArray(posts)) {
    //       setPosts(posts);
    //     }
    //   })
    //   .catch(console.error)
    //   .finally(() => setIsPostLoading(false));
  }, [value]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const getStatusText = () => {
    if (!search.trim()) return null;

    if (search !== value) {
      return <>⏳ Listening... (waiting for input to settle)</>;
    }

    if (isServiceLoading && isPostLoading) {
      return <>🔄 Searching services and blog posts...</>;
    }

    if (!isServiceLoading && isPostLoading && services.length > 0) {
      return <>✅ Services loaded. 🔄 Searching blog posts...</>;
    }

    if (isServiceLoading && !isPostLoading && posts.length > 0) {
      return <>✅ Blog posts loaded. 🔄 Searching services...</>;
    }

    if (!isServiceLoading && !isPostLoading) {
      if (services.length || posts.length) {
        return <>✅ All results loaded.</>;
      } else {
        return <>✅ Search completed. No dynamic results found.</>;
      }
    }

    return null;
  };

  return (
    <Command className='shadow-sm border rounded-lg'>
      <Button
        variant='secondary'
        className={cn(
          'relative justify-start bg-white dark:bg-[#030712] shadow-none sm:pr-12 pl-2.5 border border-slate-200 dark:border-slate-700 md:!w-40 lg:!w-56 xl:!w-64 h-8 font-normal text-slate-900 dark:text-slate-100',
        )}
        onClick={() => setOpen(true)}
        {...props}>
        <span className='hidden lg:inline-flex'>Search services & blog...</span>
        <span className='lg:hidden inline-flex'>Search...</span>
        <div className='hidden top-1.5 right-1.5 absolute sm:flex gap-1'>
          <CommandMenuKbd>{isMac ? '⌘' : 'Ctrl'}</CommandMenuKbd>
          <CommandMenuKbd className='aspect-square'>K</CommandMenuKbd>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Type a command or search...'
          onValueChange={(val) => setSearch(val)}
        />
        <CommandList>
          {getStatusText() && (
            <div className='flex items-center gap-2 px-4 py-2 text-muted-foreground text-sm'>
              {getStatusText()}
            </div>
          )}

          <CommandEmpty>No results found.</CommandEmpty>

          {/* Static Links */}
          <CommandGroup heading='Links'>
            {searchDb.mainNav.map((navItem) => (
              <CommandItem
                key={navItem.href}
                value={navItem.title}
                onSelect={() => runCommand(() => router.push(navItem.href))}>
                <File className='mr-2 w-4 h-4' />
                {navItem.title}
              </CommandItem>
            ))}
          </CommandGroup>

          {/* Static Services */}
          {searchDb.services.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => runCommand(() => router.push(navItem.href))}>
                  <Circle className='mr-2 w-3 h-3' />
                  {navItem.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          {/* Dynamic Services */}
          {services.length > 0 && (
            <CommandGroup heading='Services'>
              {services.map((service) => (
                <CommandItem
                  key={service.id}
                  value={service.name}
                  onSelect={() =>
                    runCommand(() => router.push(`/services/${service.slug}`))
                  }>
                  <Circle className='mr-2 w-3 h-3' />
                  {service.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Blog Posts */}
          {posts.length > 0 && (
            <CommandGroup heading='Blog Posts'>
              {posts.map((post) => (
                <CommandItem
                  key={post.id}
                  value={post.title.rendered}
                  onSelect={() =>
                    runCommand(() => router.push(`/blog/${post.slug}`))
                  }>
                  <File className='mr-2 w-4 h-4' />
                  {post.title.rendered}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun className='mr-2 w-4 h-4' />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon className='mr-2 w-4 h-4' />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Laptop className='mr-2 w-4 h-4' />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Command>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      className={cn(
        "bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  );
}
