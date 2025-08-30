// components/dashboard/dashboard-layout.tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  ShoppingBag,
  Headphones,
  CreditCard,
  Download,
  Settings,
  Bell,
  Heart,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AccountLayoutProps {
  children: ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: User,
    },
    {
      title: 'Orders',
      href: '/dashboard/orders',
      icon: ShoppingBag,
    },
    {
      title: 'Support Tickets',
      href: '/dashboard/tickets',
      icon: Headphones,
    },
    {
      title: 'Billing & Payments',
      href: '/dashboard/billing',
      icon: CreditCard,
    },
    {
      title: 'Downloads',
      href: '/dashboard/downloads',
      icon: Download,
    },
    {
      title: 'Wishlist',
      href: '/dashboard/wishlist',
      icon: Heart,
    },
    {
      title: 'Activity Log',
      href: '/dashboard/activity',
      icon: Clock,
    },
    {
      title: 'Notifications',
      href: '/dashboard/notifications',
      icon: Bell,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];

  return (
    <div className='bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <div className='mx-auto px-4 py-8 container'>
        <div className='flex lg:flex-row flex-col gap-8'>
          {/* Sidebar */}
          <div className='lg:w-64'>
            <div className='bg-white dark:bg-gray-800 shadow p-6 rounded-lg'>
              {/* User Profile Summary */}
              <div className='flex items-center gap-4 mb-6 pb-6 border-b'>
                <Avatar className='w-12 h-12'>
                  <AvatarImage src='/avatars/user.jpg' />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold'>John Doe</h3>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    Premium Member
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className='space-y-2'>
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                      pathname === item.href
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                    )}>
                    <item.icon className='w-4 h-4' />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
