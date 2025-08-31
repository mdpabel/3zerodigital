'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  FileImage,
  User as UserIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';

interface AccountLayoutProps {
  children: ReactNode;
}

const NAV = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { title: 'Downloads', href: '/dashboard/downloads', icon: FileImage },
  { title: 'Account', href: '/dashboard/account', icon: UserIcon },
] as const;

export default function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className='bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <ComponentWrapper className='pt-6'>
        <div className='gap-6 grid lg:grid-cols-[72px_1fr]'>
          {/* Mobile: light chips */}
          <div className='lg:hidden'>
            <nav className='flex gap-2 pb-1 overflow-x-auto'>
              {NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap',
                      active
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-300',
                    )}
                    aria-current={active ? 'page' : undefined}>
                    <item.icon className='w-4 h-4' />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop: ultra-compact left rail */}
          <aside className='hidden lg:block relative'>
            <div className='top-8 sticky'>
              <div className='flex justify-center items-center h-[calc(100vh-8rem)]'>
                <nav aria-label='Dashboard'>
                  <ul className='flex flex-col items-center gap-2'>
                    {NAV.map((item) => {
                      const active = isActive(item.href);
                      return (
                        <li key={item.href} className='relative'>
                          {/* active indicator bar */}
                          {active && (
                            <span
                              aria-hidden
                              className='top-1/2 -left-3 absolute bg-blue-600 rounded-full w-1 h-8 -translate-y-1/2'
                            />
                          )}
                          <Link
                            href={item.href}
                            title={item.title}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                              'group relative place-items-center grid rounded-xl w-10 h-10 transition-colors',
                              active
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                            )}>
                            <item.icon className='w-4 h-4' />
                            {/* hover label bubble */}
                            <span
                              className={cn(
                                'top-1/2 left-12 absolute opacity-0 shadow px-2 py-1 rounded-md text-xs -translate-y-1/2 pointer-events-none',
                                active
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-900 text-white',
                                'group-hover:opacity-100',
                              )}>
                              {item.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className='min-w-0'>{children}</main>
        </div>
      </ComponentWrapper>
    </div>
  );
}
