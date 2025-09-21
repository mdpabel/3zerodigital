import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import prisma from '@/../prisma/db';
import OrdersClient from './orders-client';

// Friendly label for UI (DB enum -> label)
const statusToLabel = (s: string): string => {
  switch (s) {
    case 'PENDING':
      return 'Pending';
    case 'CONFIRMED':
      return 'Active';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'COMPLETED':
      return 'Completed';
    case 'CANCELLED':
      return 'Cancelled';
    case 'REFUNDED':
      return 'Refunded';
    case 'PARTIALLY_REFUNDED':
      return 'Partially Refunded';
    case 'FREE':
      return 'Free';
    default:
      return s;
  }
};

const fmt = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(
    amount || 0,
  );

export type UIOrder = {
  id: string; // display id (orderNumber or id)
  dbId: string; // true DB id (for links)
  service: string; // title
  description: string;
  status: string; // label for badge
  statusRaw: string; // enum for filtering
  date: string; // YYYY-MM-DD
  createdAt: string; // ISO for date filtering
  amount: string;
  deliverables: string[];
  progress?: number;
  downloadUrl?: string | null;
  detailHref: string;
  templateId: string;
  liveUrl: string | null;
  githubRepo: string | null;
  env?: string[];
  templateTitle: string;
  templateImage: string;
};

const OrdersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className='space-y-2'>
        <h1 className='font-semibold text-2xl'>My Orders</h1>
        <p className='text-gray-600 dark:text-gray-400 text-sm'>
          Please sign in to see your orders.
        </p>
      </div>
    );
  }

  const allOrder = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      orderItems: {
        include: {
          service: { select: { name: true, features: true, slug: true } },
        },
      },
      TemplateOrderItem: {
        include: {
          template: true,
        },
      },
      payments: true,
      _count: true,
    },
  });

  const uiOrders: UIOrder[] = allOrder.map((o) => {
    const currency =
      o.payments.find((p) => p.status === 'PAID')?.currency ||
      o.payments[0]?.currency ||
      'USD';

    const serviceNames = o.orderItems
      .map((i) => i.service?.name)
      .filter(Boolean) as string[];
    const templateNames = o.TemplateOrderItem.map(
      (t) => t.template?.name,
    ).filter(Boolean) as string[];
    const allNames = [...serviceNames, ...templateNames];

    const title =
      allNames.length === 0
        ? 'Order'
        : allNames.length <= 2
          ? allNames.join(', ')
          : `${allNames[0]}, ${allNames[1]} + ${allNames.length - 2} more`;

    const description =
      o.description ||
      `Includes ${serviceNames.length} service(s) and ${templateNames.length} template(s).`;

    const deliverables = [
      ...(o.TemplateOrderItem.length > 0
        ? ['Template files', 'Live preview']
        : []),
      ...(o.orderItems.some((i) => i.specifications != null)
        ? ['Specifications']
        : []),
      ...(o.payments.some((p) => p.status === 'PAID') ? ['Receipt'] : []),
    ];

    const progress =
      o.status === 'COMPLETED'
        ? 100
        : o.status === 'IN_PROGRESS'
          ? 60
          : undefined;

    const firstTemplateFile =
      o.TemplateOrderItem.find((t) => !!t.template?.fileUrl)?.template
        ?.fileUrl || null;

    return {
      id: o.orderNumber || o.id,
      dbId: o.id,
      service: title,
      description,
      status: statusToLabel(o.status),
      statusRaw: o.status,
      date: o.createdAt.toISOString().slice(0, 10),
      createdAt: o.createdAt.toISOString(),
      amount: fmt(o.totalAmount, currency),
      deliverables,
      progress,
      downloadUrl: firstTemplateFile,
      detailHref: `/dashboard/orders/${o.id}`,
      liveUrl: o.TemplateOrderItem[0]?.template.liveUrl,
      templateId: o.TemplateOrderItem[0]?.template.id || '',
      githubRepo: o.TemplateOrderItem[0].template.githubRepo,
      env: o.TemplateOrderItem[0]?.template.env,
      templateImage: o.TemplateOrderItem[0].template.images[0],
      templateTitle: o.TemplateOrderItem[0].template.name,
    };
  });

  return <OrdersClient orders={uiOrders} />;
};

export default OrdersPage;
