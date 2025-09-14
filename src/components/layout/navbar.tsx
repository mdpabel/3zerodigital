'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
import { Menu } from 'lucide-react';

const FREE_URL = '/free-website';
const SERVICES_URL = '/services'; // or '/#services'

type NavLink = { title: string; href: string; highlight?: boolean };

const NAV_LINKS: NavLink[] = [
  { title: 'Services', href: SERVICES_URL },
  { title: 'Free Website', href: FREE_URL, highlight: true },
  { title: 'Templates', href: '/templates' },
  { title: 'Support', href: '/support' },
  { title: 'Explore', href: '/explore' },
];

/* ----------------------------- Mobile Navbar ----------------------------- */
/* Left: Logo • Right: Search + Menu (only two icons on the right) */
const MobileNavbar = ({ session }: { session: any }) => (
  <div className='md:hidden flex justify-between items-center w-full'>
    {/* Left: Logo */}
    <Logo />

    {/* Right: Search + Menu */}
    <div className='flex items-center gap-1.5'>
      {/* Your search trigger/icon lives inside SearchMenu */}
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
            <nav className='space-y-2'>
              {NAV_LINKS.map((l) => (
                <SheetClose asChild key={l.title}>
                  <Link
                    href={l.href}
                    className={cn(
                      'block hover:bg-accent px-2 py-2 rounded-md transition',
                      l.highlight &&
                        'text-emerald-600 dark:text-emerald-400 font-medium',
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

              <div className='mt-3 pt-3 border-t'>
                {session ? (
                  <SheetClose asChild>
                    <Link
                      href='/dashboard'
                      className='block hover:bg-accent px-2 py-2 rounded-md'>
                      Dashboard
                    </Link>
                  </SheetClose>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Link
                        href='/login'
                        className='block hover:bg-accent px-2 py-2 rounded-md'>
                        Login
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href='/signup'
                        className='block hover:bg-accent px-2 py-2 rounded-md'>
                        Signup
                      </Link>
                    </SheetClose>
                  </>
                )}
              </div>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  </div>
);

/* ---------------------------- Desktop Navbar ---------------------------- */
/* Simple links only — Services is a plain link, no submenu */
const DesktopNavbar = ({ session }: { session: any }) => {
  return (
    <div className='hidden md:flex justify-between items-center w-full'>
      <div className='flex items-center gap-4'>
        <div className='mr-4'>
          <Logo />
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            {NAV_LINKS.map((l) => (
              <NavigationMenuItem key={l.title}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent',
                    l.highlight &&
                      'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300',
                  )}
                  asChild>
                  <Link href={l.href}>
                    <span className='inline-flex items-center gap-1.5'>
                      {l.title}
                      {l.highlight && (
                        <span className='bg-emerald-100 dark:bg-emerald-900/40 ml-1 px-1.5 py-0.5 rounded-full font-semibold text-[10px] text-emerald-700 dark:text-emerald-300'>
                          Free
                        </span>
                      )}
                    </span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
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

/* --------------------------------- Main --------------------------------- */

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
