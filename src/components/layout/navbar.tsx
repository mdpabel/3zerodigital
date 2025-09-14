'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';
import SearchMenu from '@/components/common/search-commands';
import Logo from './logo';
import { authClient } from '@/lib/auth-client';
import IconRenderer from '@/components/common/icon-render';

/* ------------------------------------------------------------------ */
/* Config */
/* ------------------------------------------------------------------ */

const SERVICES_URL = '/services'; // or '/#services' if it's an anchor
const FREE_URL = '/free-website';

const supportCategories = [
  {
    title: 'Documentation',
    description: 'Guides and resources',
    iconName: 'FaBookOpen',
    href: '/docs',
  },
  {
    title: 'Book a call',
    description: 'Schedule a one-on-one session',
    iconName: 'FaStethoscope',
    href: '/book-a-call',
  },
  {
    title: 'Contact Us',
    description: 'Get in touch via email',
    iconName: 'FaEnvelope',
    href: '/contact',
  },
];

const exploreCategories = [
  {
    title: 'Blog',
    description: 'Latest news and articles',
    iconName: 'FaBookOpen',
    href: '/blog',
  },
  {
    title: 'Case Studies',
    description: 'Real results from our clients',
    iconName: 'FaChartLine',
    href: '/case-studies',
  },
  {
    title: 'Offers',
    description: 'Current promotions & discounts',
    iconName: 'FaDollarSign',
    href: '/offers',
  },
  {
    title: 'Careers',
    description: 'Join our team',
    iconName: 'FaUser',
    href: '/careers',
  },
];

const blogPost = {
  id: '1',
  title: 'How to Scan If My Site Is Hacked or Blacklisted in 2025',
  url: '/blog/how-to-scan-if-my-site-is-hacked-or-blacklisted-in-2025',
  description:
    'Learn how to quickly scan your website for malware, blacklists, and suspicious behavior in 2025 using free and advanced tools.',
  imageUrl: '/scan.png',
};

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

function MegaMenuItem({
  title,
  items,
  promo,
}: {
  title: string;
  items: {
    title: string;
    description: string;
    iconName: string;
    href: string;
  }[];
  promo: { title: string; description: string; url: string; imageUrl: string };
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className='bg-transparent text-base'>
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent className='!w-[800px]'>
        <div className='flex p-4'>
          {/* Items */}
          <div className='flex-1 space-y-4 pr-4 border-r'>
            {items.map((it) => (
              <NavigationMenuLink key={it.title} asChild>
                <Link
                  href={it.href}
                  className='flex items-center gap-2 hover:bg-accent p-2 rounded-md transition'>
                  <IconRenderer iconName={it.iconName} />
                  <div>
                    <h4 className='font-medium text-base'>{it.title}</h4>
                    <p className='text-muted-foreground text-xs line-clamp-2'>
                      {it.description}
                    </p>
                  </div>
                </Link>
              </NavigationMenuLink>
            ))}
          </div>

          {/* Promo / Blog */}
          <div className='flex-1 pl-4'>
            <NavigationMenuLink asChild>
              <Link
                href={promo.url}
                className='block hover:bg-accent p-2 rounded-md transition'>
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className='mb-2 rounded w-full h-40 object-cover'
                />
                <h4 className='font-medium text-base'>{promo.title}</h4>
                <p className='text-muted-foreground text-xs line-clamp-3'>
                  {promo.description}
                </p>
              </Link>
            </NavigationMenuLink>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile Navbar (simple list) */
/* ------------------------------------------------------------------ */

const MOBILE_LINKS = [
  { title: 'Services', href: SERVICES_URL },
  { title: 'Free Website', href: FREE_URL, highlight: true },
  { title: 'Templates', href: '/templates' },
  { title: 'Contact Us', href: '/contact' },
];

const MobileNavbar = ({ session }: { session: any }) => (
  <div className='md:hidden flex justify-between items-center w-full'>
    {/* Left: Logo */}
    <Logo />

    {/* Right: Search + Menu */}
    <div className='flex items-center gap-1.5'>
      <SearchMenu />

      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon' aria-label='Open menu'>
            <Menu className='w-5 h-5' />
          </Button>
        </SheetTrigger>

        <SheetContent side='right' className='w-[92vw] sm:w-[420px]'>
          <SheetHeader className='mb-2'>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Navigate quickly</SheetDescription>
          </SheetHeader>

          <ScrollArea className='pr-3 h-[70vh]'>
            {/* core links */}
            <nav className='space-y-1.5'>
              {MOBILE_LINKS.map((l) => (
                <SheetClose asChild key={l.title}>
                  <Link
                    href={l.href}
                    className={cn(
                      'block hover:bg-accent px-2 py-2 rounded-md transition',
                      l.highlight &&
                        'font-medium text-emerald-600 dark:text-emerald-400',
                    )}>
                    <span className='inline-flex items-center gap-1.5'>
                      {l.title}
                      {l.highlight && (
                        <span className='bg-emerald-100 dark:bg-emerald-900/40 ml-1 px-1.5 py-0.5 rounded-full font-semibold text-[10px] text-emerald-700 dark:text-emerald-300'>
                          Free
                        </span>
                      )}
                    </span>
                  </Link>
                </SheetClose>
              ))}
            </nav>

            {/* action buttons */}
            <div className='mt-4 pt-4 border-t'>
              {session ? (
                <div className='gap-2 grid grid-cols-2'>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className='bg-gradient-to-r from-indigo-600 to-purple-600 w-full text-white'>
                      <Link href='/dashboard'>Dashboard</Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button
                      className='bg-gradient-to-r from-rose-600 to-red-600 w-full text-white'
                      onClick={async () => {
                        try {
                          await authClient.signOut();
                        } catch {}
                      }}>
                      Logout
                    </Button>
                  </SheetClose>
                </div>
              ) : (
                <div className='gap-2 grid grid-cols-2'>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className='bg-gradient-to-r from-orange-600 to-orange-700 w-full text-white'>
                      <Link href='/login'>Login</Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button
                      asChild
                      className='bg-gradient-to-r from-blue-600 to-indigo-600 w-full text-white'>
                      <Link href='/signup'>Signup</Link>
                    </Button>
                  </SheetClose>
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Desktop Navbar (Services = simple link; Support/Explore = mega) */
/* ------------------------------------------------------------------ */

const DesktopNavbar = ({ session }: { session: any }) => {
  return (
    <div className='hidden md:flex justify-between items-center w-full'>
      <div className='flex items-center gap-4'>
        <div className='mr-4'>
          <Logo />
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            {/* Services — simple link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}
                asChild>
                <Link href={SERVICES_URL}>Services</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Free Website — highlighted link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-transparent text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300',
                )}
                asChild>
                <Link href={FREE_URL}>
                  <span className='inline-flex items-center gap-1.5'>
                    Free Website
                    <span className='bg-emerald-100 dark:bg-emerald-900/40 ml-1 px-1.5 py-0.5 rounded-full font-semibold text-[10px] text-emerald-700 dark:text-emerald-300'>
                      Free
                    </span>
                  </span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Templates — simple link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}
                asChild>
                <Link href='/templates'>Templates</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Support — mega menu */}
            <MegaMenuItem
              title='Support'
              items={supportCategories as any}
              promo={{
                title: blogPost.title,
                description: blogPost.description!,
                url: blogPost.url!,
                imageUrl: blogPost.imageUrl!,
              }}
            />

            {/* Explore — mega menu */}
            <MegaMenuItem
              title='Explore'
              items={exploreCategories as any}
              promo={{
                title: blogPost.title,
                description: blogPost.description!,
                url: blogPost.url!,
                imageUrl: blogPost.imageUrl!,
              }}
            />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className='flex items-center gap-4'>
        <SearchMenu />
        <div className='flex items-center gap-x-2'>
          <Button asChild size='sm' className='w-24'>
            <Link href='/book-a-call'>Book a Call</Link>
          </Button>
          <Button
            asChild
            size='sm'
            className='bg-gradient-to-r from-orange-600 to-orange-700 border-0 w-24 text-white'>
            <Link href={session ? '/dashboard' : '/login'}>
              {session ? 'Dashboard' : 'Login'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main exported Navbar */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const { data: session } = authClient.useSession();

  return (
    <div className='top-0 z-50 sticky bg-white dark:bg-slate-900/50 backdrop-blur-lg border-b border-b-slate-300/50 dark:border-b-slate-700/50'>
      <ComponentWrapper className='flex items-center mx-auto px-4 h-16 container'>
        <MobileNavbar session={session} />
        <DesktopNavbar session={session} />
      </ComponentWrapper>
    </div>
  );
}
