// components/admin/admin-sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Code,
  Users,
  FolderOpen,
  MessageSquare,
  BarChart3,
  Settings,
  Star,
  FileText,
  Calendar,
  Shield,
  Menu,
  X,
  LogOut,
  User,
  Bell,
  Search,
  PlusCircle,
  Target,
  Briefcase,
  Mail,
  CreditCard,
  Globe,
  BookTemplate,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'Services',
    href: '/admin/services',
    icon: Code,
    badge: null,
    children: [
      { name: 'All Services', href: '/admin/services' },
      { name: 'Add Service', href: '/admin/services/create' },
      { name: 'Categories', href: '/admin/services/categories' },
    ],
  },
  {
    name: 'Templates',
    href: '/admin/templates',
    icon: BookTemplate,
    badge: null,
    children: [
      { name: 'All Templates', href: '/admin/templates' },
      { name: 'Add Templates', href: '/admin/templates/create' },
      { name: 'Categories', href: '/admin/templates/categories' },
    ],
  },
  {
    name: 'Projects',
    href: '/admin/projects',
    icon: FolderOpen,
    badge: null,
    children: [
      { name: 'All Projects', href: '/admin/projects' },
      { name: 'Add Project', href: '/admin/projects/create' },
      { name: 'Project Status', href: '/admin/projects/status' },
    ],
  },
  {
    name: 'Clients',
    href: '/admin/clients',
    icon: Users,
    badge: null,
    children: [
      { name: 'All Clients', href: '/admin/clients' },
      { name: 'Add Client', href: '/admin/clients/create' },
      { name: 'Client Invoices', href: '/admin/clients/invoices' },
    ],
  },
  {
    name: 'Leads & Contacts',
    href: '/admin/leads',
    icon: Target,
    badge: '3',
    children: [
      { name: 'All Leads', href: '/admin/leads' },
      { name: 'Contact Forms', href: '/admin/leads/contacts' },
      { name: 'Quotes', href: '/admin/leads/quotes' },
    ],
  },
  {
    name: 'Content',
    href: '/admin/content',
    icon: FileText,
    badge: null,
    children: [
      { name: 'Blog Posts', href: '/admin/content/blog' },
      { name: 'Testimonials', href: '/admin/content/testimonials' },
      { name: 'Case Studies', href: '/admin/content/case-studies' },
      { name: 'FAQs', href: '/admin/content/faqs' },
    ],
  },
  {
    name: 'Team',
    href: '/admin/team',
    icon: User,
    badge: null,
    children: [
      { name: 'All Members', href: '/admin/team' },
      { name: 'Add Member', href: '/admin/team/create' },
      { name: 'Roles & Permissions', href: '/admin/team/roles' },
    ],
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    badge: null,
    children: [
      { name: 'Overview', href: '/admin/analytics' },
      { name: 'Website Traffic', href: '/admin/analytics/traffic' },
      { name: 'Conversions', href: '/admin/analytics/conversions' },
      { name: 'Reports', href: '/admin/analytics/reports' },
    ],
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    badge: null,
    children: [
      { name: 'General', href: '/admin/settings' },
      { name: 'Security', href: '/admin/settings/security' },
      { name: 'Integrations', href: '/admin/settings/integrations' },
      { name: 'Backup', href: '/admin/settings/backup' },
    ],
  },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className='lg:hidden'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setIsOpen(true)}
          className='top-4 left-4 z-50 fixed'>
          <Menu className='w-4 h-4' />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-72 transform bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-transform duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}>
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='flex justify-between items-center p-6 border-slate-200 dark:border-slate-700 border-b'>
            <div className='flex items-center gap-3'>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg'>
                <Shield className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='font-bold text-slate-900 dark:text-white text-lg'>
                  3Zero Admin
                </h1>
                <p className='text-slate-500 dark:text-slate-400 text-xs'>
                  Digital Agency Panel
                </p>
              </div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsOpen(false)}
              className='lg:hidden'>
              <X className='w-4 h-4' />
            </Button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 p-4 overflow-y-auto'>
            <ul className='space-y-2'>
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/');
                const isExpanded = expandedItems.includes(item.name);
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <li key={item.name}>
                    <div
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer group',
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700',
                      )}
                      onClick={() =>
                        hasChildren ? toggleExpanded(item.name) : null
                      }>
                      <Link
                        href={item.href}
                        className='flex flex-1 items-center gap-3'
                        onClick={(e) => hasChildren && e.preventDefault()}>
                        <item.icon className='w-5 h-5' />
                        <span className='font-medium'>{item.name}</span>
                        {item.badge && (
                          <Badge className='bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'>
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </div>

                    {/* Children */}
                    {hasChildren && isExpanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='space-y-1 mt-2 ml-8'>
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.href}
                              className={cn(
                                'block p-2 rounded-lg text-sm transition-colors duration-200',
                                pathname === child.href
                                  ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950'
                                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700',
                              )}>
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className='p-4 border-slate-200 dark:border-slate-700 border-t'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full'>
                <User className='w-4 h-4 text-white' />
              </div>
              <div>
                <p className='font-medium text-slate-900 dark:text-white text-sm'>
                  Admin User
                </p>
                <p className='text-slate-500 dark:text-slate-400 text-xs'>
                  admin@3zerodigital.com
                </p>
              </div>
            </div>
            <Button variant='outline' size='sm' className='w-full'>
              <LogOut className='mr-2 w-4 h-4' />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className='lg:hidden z-30 fixed inset-0 bg-black bg-opacity-50'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
