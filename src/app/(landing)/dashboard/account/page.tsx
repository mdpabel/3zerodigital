import { headers } from 'next/headers';
import Link from 'next/link';
import { auth } from '@/lib/auth';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import prisma from '@/../prisma/db';

const money = (n: number, c = 'USD') =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: c }).format(
    n || 0,
  );
const dstr = (d: Date) => d.toISOString().slice(0, 10);

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className='space-y-2'>
        <h1 className='font-bold text-3xl'>Account</h1>
        <p className='text-gray-600 dark:text-gray-400 text-sm'>
          Please sign in to view your account.
        </p>
      </div>
    );
  }

  // Fetch user & quick stats
  const [user, ordersCount, lastOrder, paidAgg, providersCount] =
    await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          name: true,
          email: true,
          image: true,
          createdAt: true,
          role: true,
          banned: true,
          banReason: true,
          banExpires: true,
          emailVerified: true,
        },
      }),
      prisma.order.count({ where: { userId } }),
      prisma.order.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      }),
      prisma.payment.aggregate({
        where: { order: { userId }, status: 'PAID' },
        _sum: { amount: true },
      }),
      prisma.account.count({ where: { userId } }),
    ]);

  const lifetimeSpend = money(paidAgg._sum.amount || 0, 'USD'); // adjust currency logic if needed

  const initials =
    user?.name
      ?.split(' ')
      .map((n) => n[0]?.toUpperCase())
      .slice(0, 2)
      .join('') || 'U';

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='font-bold text-3xl'>Account</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400 text-sm'>
          Manage your profile and view account details.
        </p>
      </div>

      {/* Banned banner */}
      {user?.banned && (
        <Card className='border-rose-300 dark:border-rose-800'>
          <CardContent className='p-4 text-sm'>
            <p className='font-medium text-rose-700 dark:text-rose-300'>
              Your account is currently restricted.
            </p>
            {user.banReason && (
              <p className='text-rose-700/80 dark:text-rose-300/80'>
                Reason: {user.banReason}
              </p>
            )}
            {user.banExpires && (
              <p className='text-rose-700/80 dark:text-rose-300/80'>
                Until: {dstr(user.banExpires)}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className='gap-8 grid lg:grid-cols-3'>
        {/* Profile (edit basics) */}
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              action='/api/account'
              method='post'
              className='gap-6 grid sm:grid-cols-2'>
              <div className='sm:col-span-2'>
                <div className='flex items-center gap-4'>
                  <Avatar className='w-12 h-12'>
                    <AvatarImage
                      src={user?.image || ''}
                      alt={user?.name || ''}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className='text-gray-600 dark:text-gray-400 text-sm'>
                    JPG/PNG, square recommended.
                  </div>
                </div>
              </div>

              <div className='sm:col-span-2'>
                <Label htmlFor='image'>Avatar URL</Label>
                <Input
                  id='image'
                  name='image'
                  defaultValue={user?.image || ''}
                />
              </div>

              <div>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' name='name' defaultValue={user?.name || ''} />
              </div>

              <div>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' value={user?.email || ''} disabled />
              </div>

              <input type='hidden' name='_method' value='PATCH' />
              <div className='sm:col-span-2'>
                <Button type='submit'>Save changes</Button>
              </div>

              <p className='sm:col-span-2 text-gray-500 dark:text-gray-400 text-xs'>
                This form expects a PATCH handler at <code>/api/account</code>{' '}
                that updates <code>name</code> and <code>image</code>.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Account summary */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3 text-sm'>
            <Row
              label='Member since'
              value={user ? dstr(user.createdAt) : '—'}
            />
            <Row
              label='Email verified'
              value={user?.emailVerified ? 'Yes' : 'No'}
            />
            <Row label='Role' value={user?.role || 'customer'} />
            <Row label='Providers linked' value={String(providersCount)} />
            <div className='bg-gray-200 dark:bg-gray-800 h-px' />
            <Row label='Total orders' value={String(ordersCount)} />
            <Row label='Lifetime spend' value={lifetimeSpend} />
            <Row
              label='Last order'
              value={lastOrder ? dstr(lastOrder.createdAt) : '—'}
            />
          </CardContent>
        </Card>
      </div>

      {/* Security */}
      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 text-sm'>
          {/* Change password */}
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-medium'>Change password</p>
              <p className='text-gray-600 dark:text-gray-400'>
                Update your password. You’ll be signed out on other devices.
              </p>
            </div>
            <Button asChild>
              <Link href='/dashboard/account/security'>Change</Link>
            </Button>
          </div>

          {/* 2FA */}
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-medium'>Two-factor authentication</p>
              <p className='text-gray-600 dark:text-gray-400'>
                Add an extra layer of security to your account.
              </p>
            </div>
            <Button variant='outline' asChild>
              <Link href='/dashboard/account/security'>Manage</Link>
            </Button>
          </div>

          {/* Connected accounts */}
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-medium'>Connected accounts</p>
              <p className='text-gray-600 dark:text-gray-400'>
                View and disconnect OAuth providers.
              </p>
            </div>
            <Button variant='outline' asChild>
              <Link href='/dashboard/account/connections'>Manage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between items-center'>
      <span className='text-gray-600 dark:text-gray-400'>{label}</span>
      <span className='font-medium'>{value}</span>
    </div>
  );
}
