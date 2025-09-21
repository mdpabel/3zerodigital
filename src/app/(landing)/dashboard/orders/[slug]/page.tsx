import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Download, ExternalLink } from 'lucide-react';

import { auth } from '@/lib/auth';
import prisma from '@/../prisma/db'; // adjust if your depth differs
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DownloadActions from '../../download-actions';

type PageProps = { params: Promise<{ slug: string }> };

// helpers
const statusLabel = (s: string) =>
  s === 'PENDING'
    ? 'Pending'
    : s === 'CONFIRMED'
      ? 'Active'
      : s === 'IN_PROGRESS'
        ? 'In Progress'
        : s === 'COMPLETED'
          ? 'Completed'
          : s === 'CANCELLED'
            ? 'Cancelled'
            : s === 'REFUNDED'
              ? 'Refunded'
              : s === 'PARTIALLY_REFUNDED'
                ? 'Partially Refunded'
                : s === 'FREE'
                  ? 'Free'
                  : s;

const paymentLabel = (s: string) =>
  s === 'PENDING'
    ? 'Pending'
    : s === 'PROCESSING'
      ? 'Processing'
      : s === 'PAID'
        ? 'Paid'
        : s === 'FAILED'
          ? 'Failed'
          : s === 'CANCELLED'
            ? 'Cancelled'
            : s === 'REFUNDED'
              ? 'Refunded'
              : s === 'PARTIALLY_REFUNDED'
                ? 'Partially Refunded'
                : s;

const money = (n: number, c = 'USD') =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: c }).format(
    n || 0,
  );

const dstr = (d?: Date | null) =>
  d ? new Date(d).toISOString().slice(0, 10) : '—';

export default async function OrderDetailsPage({ params }: PageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) notFound();

  const { slug } = await params;

  const order = await prisma.order.findFirst({
    where: {
      userId,
      OR: [{ id: slug }, { orderNumber: slug }],
    },
    include: {
      orderItems: {
        include: { service: { select: { name: true } } },
      },
      TemplateOrderItem: {
        include: {
          template: true,
        },
      },
      payments: true,
      user: { select: { name: true, email: true } },
    },
  });

  if (!order) notFound();

  const currency =
    order.payments.find((p) => p.status === 'PAID')?.currency ||
    order.payments[0]?.currency ||
    'USD';

  const itemsCount = order.orderItems.length + order.TemplateOrderItem.length;

  const firstDownload = order.TemplateOrderItem.find((t) => t.template?.fileUrl)
    ?.template?.fileUrl;

  const firstPaidAt =
    order.payments
      .map((p) => p.paidAt)
      .filter(Boolean)
      .sort((a, b) => (a! < b! ? -1 : 1))[0] || null;

  return (
    <div className='space-y-8 mx-auto max-w-4xl'>
      {/* header */}
      <div className='space-y-2'>
        <Link
          href='/dashboard/orders'
          className='inline-flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm hover:underline'>
          <ArrowLeft className='w-4 h-4' /> Back to Orders
        </Link>
        <h1 className='font-bold text-2xl'>
          Order {order.orderNumber || order.id}
        </h1>
        <p className='text-gray-600 dark:text-gray-400 text-sm'>
          Placed on {dstr(order.createdAt)} · {itemsCount} item
          {itemsCount === 1 ? '' : 's'}
        </p>
        <div className='flex flex-wrap gap-2 pt-1'>
          <Badge variant='secondary'>{statusLabel(order.status)}</Badge>
          <Badge variant='secondary'>{paymentLabel(order.paymentStatus)}</Badge>
        </div>
      </div>

      {/* quick actions */}
      <div className='flex flex-wrap gap-2'>
        {(order.paymentStatus === 'PENDING' ||
          order.paymentStatus === 'FAILED') && (
          <Button asChild>
            <Link href={`/dashboard/orders/${order.id}/pay`}>
              <CreditCard className='mr-2 w-4 h-4' /> Pay Now
            </Link>
          </Button>
        )}

        <DownloadActions
          templateId={order.TemplateOrderItem[0]?.template.id || ''}
          liveUrl={order.TemplateOrderItem[0]?.template.liveUrl || ''}
        />
      </div>

      {/* items */}
      <section className='space-y-3'>
        <h2 className='font-semibold text-lg'>Items</h2>
        <div className='border border-gray-200 dark:border-gray-800 rounded-lg overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead className='bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300'>
              <tr>
                <th className='px-4 py-2 text-left'>Item</th>
                <th className='px-4 py-2 text-right'>Qty</th>
                <th className='px-4 py-2 text-right'>Unit</th>
                <th className='px-4 py-2 text-right'>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((it) => (
                <tr
                  key={it.id}
                  className='border-gray-100 dark:border-gray-800 border-t'>
                  <td className='px-4 py-2'>{it.service?.name ?? 'Service'}</td>
                  <td className='px-4 py-2 text-right'>{it.quantity}</td>
                  <td className='px-4 py-2 text-right'>
                    {money(it.unitPrice, currency)}
                  </td>
                  <td className='px-4 py-2 font-medium text-right'>
                    {money(it.totalPrice, currency)}
                  </td>
                </tr>
              ))}
              {order.TemplateOrderItem.map((it) => (
                <tr
                  key={it.id}
                  className='border-gray-100 dark:border-gray-800 border-t'>
                  <td className='px-4 py-2'>
                    {it.template?.name ?? 'Template'}
                    <div className='flex gap-3 mt-1 text-blue-600 dark:text-blue-300 text-xs'>
                      {it.template?.liveUrl && (
                        <a
                          href={it.template.liveUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center gap-1'>
                          <ExternalLink className='w-3 h-3' /> Live Preview
                        </a>
                      )}
                      {it.template?.fileUrl && (
                        <a
                          href={it.template.fileUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center gap-1'>
                          <Download className='w-3 h-3' /> Download
                        </a>
                      )}
                    </div>
                  </td>
                  <td className='px-4 py-2 text-right'>{it.quantity}</td>
                  <td className='px-4 py-2 text-right'>
                    {money(it.unitPrice, currency)}
                  </td>
                  <td className='px-4 py-2 font-medium text-right'>
                    {money(it.totalPrice, currency)}
                  </td>
                </tr>
              ))}
              {itemsCount === 0 && (
                <tr>
                  <td
                    className='px-4 py-4 text-gray-500 dark:text-gray-400 text-center'
                    colSpan={4}>
                    No items in this order.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* summary */}
      <section className='space-y-3'>
        <h2 className='font-semibold text-lg'>Summary</h2>
        <div className='p-4 border border-gray-200 dark:border-gray-800 rounded-lg text-sm'>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 dark:text-gray-400'>Subtotal</span>
            <span>{money(order.subtotalAmount, currency)}</span>
          </div>
          <div className='flex justify-between items-center mt-1'>
            <span className='text-gray-600 dark:text-gray-400'>Tax</span>
            <span>{money(order.taxAmount || 0, currency)}</span>
          </div>
          <div className='flex justify-between items-center mt-1'>
            <span className='text-gray-600 dark:text-gray-400'>Discount</span>
            <span>-{money(order.discountAmount || 0, currency)}</span>
          </div>
          <div className='bg-gray-200 dark:bg-gray-800 my-2 h-px' />
          <div className='flex justify-between items-center text-base'>
            <span className='font-medium'>Total</span>
            <span className='font-semibold'>
              {money(order.totalAmount, currency)}
            </span>
          </div>
        </div>
      </section>

      {/* payments */}
      <section className='space-y-3'>
        <h2 className='font-semibold text-lg'>Payments</h2>
        {order.payments.length === 0 ? (
          <p className='text-gray-600 dark:text-gray-400 text-sm'>
            No payments yet.
          </p>
        ) : (
          <div className='border border-gray-200 dark:border-gray-800 rounded-lg overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300'>
                <tr>
                  <th className='px-4 py-2 text-left'>Amount</th>
                  <th className='px-4 py-2 text-left'>Status</th>
                  <th className='px-4 py-2 text-left'>Method</th>
                  <th className='px-4 py-2 text-left'>Paid</th>
                  <th className='px-4 py-2 text-left'>Refunded</th>
                </tr>
              </thead>
              <tbody>
                {order.payments.map((p) => (
                  <tr
                    key={p.id}
                    className='border-gray-100 dark:border-gray-800 border-t'>
                    <td className='px-4 py-2'>
                      {money(p.amount, p.currency || currency)}
                    </td>
                    <td className='px-4 py-2'>{paymentLabel(p.status)}</td>
                    <td className='px-4 py-2'>
                      {p.paymentMethod?.replace('_', ' ')}
                    </td>
                    <td className='px-4 py-2'>{dstr(p.paidAt)}</td>
                    <td className='px-4 py-2'>{dstr(p.refundedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* timeline & customer */}
      <section className='gap-6 grid md:grid-cols-2'>
        <div className='space-y-3'>
          <h2 className='font-semibold text-lg'>Timeline</h2>
          <div className='p-4 border border-gray-200 dark:border-gray-800 rounded-lg text-sm'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600 dark:text-gray-400'>Created</span>
              <span>{dstr(order.createdAt)}</span>
            </div>
            {firstPaidAt && (
              <div className='flex justify-between items-center mt-1'>
                <span className='text-gray-600 dark:text-gray-400'>Paid</span>
                <span>{dstr(firstPaidAt)}</span>
              </div>
            )}
            {order.completedAt && (
              <div className='flex justify-between items-center mt-1'>
                <span className='text-gray-600 dark:text-gray-400'>
                  Completed
                </span>
                <span>{dstr(order.completedAt)}</span>
              </div>
            )}
            {order.cancelledAt && (
              <div className='flex justify-between items-center mt-1'>
                <span className='text-gray-600 dark:text-gray-400'>
                  Cancelled
                </span>
                <span>{dstr(order.cancelledAt)}</span>
              </div>
            )}
          </div>
        </div>

        <div className='space-y-3'>
          <h2 className='font-semibold text-lg'>Customer</h2>
          <div className='p-4 border border-gray-200 dark:border-gray-800 rounded-lg text-sm'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600 dark:text-gray-400'>Name</span>
              <span className='font-medium'>
                {order.customerName || order.user?.name || '—'}
              </span>
            </div>
            <div className='flex justify-between items-center mt-1'>
              <span className='text-gray-600 dark:text-gray-400'>Email</span>
              <span className='font-medium'>
                {order.customerEmail || order.user?.email}
              </span>
            </div>
            {order.customerPhone && (
              <div className='flex justify-between items-center mt-1'>
                <span className='text-gray-600 dark:text-gray-400'>Phone</span>
                <span className='font-medium'>{order.customerPhone}</span>
              </div>
            )}
            {(order.deliveryEmail || order.deliveryPhone) && (
              <>
                <div className='bg-gray-200 dark:bg-gray-800 my-2 h-px' />
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 dark:text-gray-400'>
                    Delivery Email
                  </span>
                  <span className='font-medium'>
                    {order.deliveryEmail || '—'}
                  </span>
                </div>
                <div className='flex justify-between items-center mt-1'>
                  <span className='text-gray-600 dark:text-gray-400'>
                    Delivery Phone
                  </span>
                  <span className='font-medium'>
                    {order.deliveryPhone || '—'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
