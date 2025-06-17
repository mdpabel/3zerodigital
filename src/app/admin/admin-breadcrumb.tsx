// components/admin/admin-breadcrumb.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export function AdminBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Remove 'admin' from segments for cleaner breadcrumb
  const breadcrumbSegments = segments.slice(1);

  const generateBreadcrumb = () => {
    let path = '/admin';
    const breadcrumbs = [
      { name: 'Dashboard', href: '/admin', current: pathname === '/admin' },
    ];

    breadcrumbSegments.forEach((segment, index) => {
      path += `/${segment}`;
      const isLast = index === breadcrumbSegments.length - 1;
      const name = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

      breadcrumbs.push({
        name,
        href: path,
        current: isLast,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumb();

  if (pathname === '/admin') return null;

  return (
    <nav className='flex mb-6' aria-label='Breadcrumb'>
      <ol className='flex items-center space-x-2'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className='flex items-center'>
            {index > 0 && <ChevronRight className='w-4 h-4 text-slate-400' />}
            <Link
              href={breadcrumb.href}
              className={`ml-2 text-sm font-medium ${
                breadcrumb.current
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}>
              {breadcrumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
