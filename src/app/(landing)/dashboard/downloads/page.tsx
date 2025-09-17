import Link from 'next/link';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import prisma from '@/../prisma/db';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';
import DownloadActions from '../download-actions';

import { buildVercelDeployUrl } from '@/lib/vercel-deploy';

const dstr = (d: Date) => d.toISOString().slice(0, 10);

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);

const isGitRepoUrl = (u?: string | null) =>
  !!u && /^https:\/\/(github\.com|gitlab\.com|bitbucket\.org)\//i.test(u);

export default async function DownloadsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className='space-y-2'>
        <h1 className='font-bold text-3xl'>Downloads</h1>
        <p className='text-gray-600 dark:text-gray-400 text-sm'>
          Please sign in to view your downloads.
        </p>
      </div>
    );
  }

  // Pull only COMPLETED orders
  const items = await prisma.templateOrderItem.findMany({
    where: {
      order: { userId, status: 'COMPLETED' },
      // keep requiring fileKey for zip downloads (if you still provide zips)
      template: { fileKey: { not: '' } },
    },
    orderBy: { order: { createdAt: 'desc' } },
    include: {
      // NOTE: select fileUrl — we will store the GitHub repo URL here
      template: {
        select: {
          id: true,
          name: true,
          fileKey: true,
          fileUrl: true,
          liveUrl: true,
        },
      },
      order: { select: { id: true, orderNumber: true, createdAt: true } },
    },
  });

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex justify-between items-start'>
        <div>
          <h1 className='font-bold text-3xl'>Downloads</h1>
          <p className='mt-2 text-gray-600 dark:text-gray-400 text-sm'>
            Your purchased templates with ready-to-download files — and
            one-click deploy.
          </p>
        </div>
        <Button variant='outline' asChild>
          <Link href='/services'>
            <ShoppingBag className='mr-2 w-4 h-4' />
            Browse Services
          </Link>
        </Button>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <Card>
          <CardContent className='p-8 text-gray-600 dark:text-gray-400 text-sm text-center'>
            No downloads yet. Complete a template purchase to see it here.{' '}
            <Link
              href='/templates'
              className='font-medium text-blue-600 dark:text-blue-300 hover:underline'>
              Explore templates
            </Link>
            .
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {items.map((it) => {
            const tpl = it.template;
            const repoUrl = tpl?.fileUrl; // <-- we treat fileUrl as the GitHub repo URL now
            const canDeploy = isGitRepoUrl(repoUrl);

            const deployUrl =
              canDeploy &&
              buildVercelDeployUrl({
                repoUrl: repoUrl!, // validated above
                projectName: tpl?.name ? slug(tpl.name) : undefined,
                repositoryName: tpl?.name
                  ? `${slug(tpl.name)}-${tpl?.id}`
                  : undefined,
                demoTitle: tpl?.name,
                demoUrl: tpl?.liveUrl || undefined,
              });

            return (
              <Card key={it.id} className='hover:shadow-lg transition-shadow'>
                <CardHeader className='p-6 pb-3'>
                  <CardTitle className='text-base'>
                    {tpl?.name ?? 'Template'}
                  </CardTitle>
                </CardHeader>

                <CardContent className='p-6 pt-0'>
                  <div className='flex md:flex-row flex-col md:justify-between md:items-center gap-4'>
                    <div className='text-gray-600 dark:text-gray-400 text-sm'>
                      <div>
                        Purchased on{' '}
                        <span className='font-medium text-gray-900 dark:text-gray-100'>
                          {dstr(it.order.createdAt)}
                        </span>{' '}
                        from{' '}
                        <Link
                          href={`/dashboard/orders/${it.order.id}`}
                          className='font-medium text-blue-600 dark:text-blue-300 hover:underline'>
                          {it.order.orderNumber || it.order.id}
                        </Link>
                      </div>
                      <div className='mt-1'>
                        Quantity:{' '}
                        <span className='font-medium'>{it.quantity}</span>
                      </div>
                    </div>

                    <div className='flex flex-wrap items-center gap-2'>
                      {/* Deploy with Vercel (built from fileUrl) */}
                      {deployUrl && (
                        <Button size='sm' asChild>
                          <a
                            href={deployUrl}
                            target='_blank'
                            rel='noopener noreferrer'>
                            Deploy on Vercel
                          </a>
                        </Button>
                      )}

                      {/* Zip download (if you still ship zip via R2 with fileKey) */}
                      {tpl?.fileKey ? (
                        <DownloadActions
                          templateId={tpl.id}
                          liveUrl={tpl.liveUrl}
                        />
                      ) : (
                        <Badge className='bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'>
                          No file available
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
