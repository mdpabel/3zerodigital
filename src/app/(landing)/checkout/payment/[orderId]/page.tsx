import prisma from '../../../../../../prisma/db';
import PaymentPage from './payment-page';

const Payment = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            service: true,
          },
        },
        user: true,
      },
    });

    if (!order) {
      return (
        <div className='flex justify-center items-center min-h-screen'>
          <div className='space-y-4 text-center'>
            <h2 className='font-bold text-slate-900 dark:text-white text-2xl'>
              Order Not Found
            </h2>
            <p className='text-slate-600 dark:text-slate-300'>
              The order you're looking for doesn't exist.
            </p>
          </div>
        </div>
      );
    }

    // Transform the data to match the expected type
    const transformedOrder = {
      ...order,
      siteUrl: order.siteUrl ?? null, // Replace undefined with null
    };

    return <PaymentPage order={transformedOrder} />;
  } catch (error) {
    console.error('Error fetching order:', error);

    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='space-y-4 text-center'>
          <h2 className='font-bold text-slate-900 dark:text-white text-2xl'>
            Something Went Wrong
          </h2>
          <p className='text-slate-600 dark:text-slate-300'>
            We encountered an error while processing your request. Please try
            again later.
          </p>
        </div>
      </div>
    );
  }
};

export default Payment;
