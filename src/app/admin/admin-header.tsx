// components/admin/admin-header.tsx
'use client';

import { Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function AdminHeader() {
  return (
    <header className='bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 border-b'>
      <div className='flex justify-between items-center px-6 py-4'>
        {/* Search */}
        <div className='flex flex-1 items-center gap-4 max-w-md'>
          <div className='relative flex-1'>
            <Search className='top-1/2 left-3 absolute w-4 h-4 text-slate-400 -translate-y-1/2 transform' />
            <Input
              placeholder='Search anything...'
              className='bg-slate-50 dark:bg-slate-900 pl-10 border-slate-200 dark:border-slate-700'
            />
          </div>
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4'>
          {/* Notifications */}
          <Button variant='ghost' size='sm' className='relative'>
            <Bell className='w-5 h-5' />
            <Badge className='-top-1 -right-1 absolute flex justify-center items-center bg-red-600 p-0 w-5 h-5 text-white text-xs'>
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full'>
                  <User className='w-4 h-4 text-white' />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuItem>
                <User className='mr-2 w-4 h-4' />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 w-4 h-4' />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-red-600'>
                <LogOut className='mr-2 w-4 h-4' />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
