import { AdminBreadcrumb } from './admin-breadcrumb';
import { AdminHeader } from './admin-header';
import { AdminSidebar } from './admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-slate-50 dark:bg-slate-900 min-h-screen'>
      <AdminSidebar />
      <div className='lg:pl-72'>
        <AdminHeader />
        <main className='py-6'>
          <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
            <AdminBreadcrumb />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
