'use client';

import { motion } from 'framer-motion';
import {
  CreditCard,
  Shield,
  Lock,
  ArrowLeft,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ComponentWrapper from '@/components/common/component-wrapper';
import Link from 'next/link';
import React from 'react';
import { Prisma } from '@prisma/client';
import { createStripeSession } from '@/actions/order-actions';
import { useRouter } from 'next/navigation';

type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        service: true;
      };
    };
    user: true;
  };
}>;

const PaymentPage = ({ order }: { order: OrderWithRelations }) => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<
    'stripe' | 'paypal' | null
  >(null);
  const [processingPayment, setProcessingPayment] = React.useState(false);

  const handlePayment = async (method: 'stripe' | 'paypal') => {
    setProcessingPayment(true);
    try {
      if (method === 'stripe') {
        const { sessionId, success, url } = await createStripeSession(order.id);
        if (success && url) {
          router.push(url);
        }
      }
      // TODO: Implement actual payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.location.href = `/checkout/success/${order.id}`;
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessingPayment(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <section className='relative py-8 md:py-16 min-h-screen overflow-hidden'>
      <ComponentWrapper>
        {/* Background Effects */}
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 md:from-blue-50/50 dark:from-blue-950/20 dark:md:from-blue-950/30 via-purple-50/20 md:via-purple-50/30 dark:md:via-purple-950/20 dark:via-purple-950/15 to-teal-50/30 md:to-teal-50/50 dark:md:to-teal-950/30 dark:to-teal-950/20' />
        </div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl'>
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className='mb-8 md:mb-12 text-center'>
            <div className='inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 shadow-lg backdrop-blur-md mb-6 px-4 md:px-6 py-2 md:py-3 border border-slate-200/50 dark:border-slate-700/50 rounded-full'>
              <Lock className='w-4 h-4 text-green-600' />
              <span className='font-medium text-slate-700 dark:text-slate-300 text-xs md:text-sm'>
                Secure Payment
              </span>
            </div>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Complete Your Order
              </span>
            </h1>

            <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Choose your preferred payment method to secure your digital
              solution
            </p>
          </motion.div>

          <div className='gap-6 md:gap-8 grid grid-cols-1 lg:grid-cols-3'>
            {/* Payment Methods */}
            <motion.div
              variants={itemVariants}
              className='space-y-6 lg:col-span-2'>
              <div className='bg-white/80 dark:bg-slate-800/80 shadow-xl backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl md:rounded-3xl'>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-xl md:text-2xl'>
                  Payment Method
                </h2>

                <div className='space-y-4'>
                  {/* Stripe Payment */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPaymentMethod('stripe')}
                    className={`group relative flex items-center justify-between rounded-xl md:rounded-2xl border-2 p-4 md:p-6 cursor-pointer transition-all duration-300 ${
                      selectedPaymentMethod === 'stripe'
                        ? 'border-blue-500 bg-blue-500/5'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
                    }`}>
                    <div className='flex items-center gap-4'>
                      <div className='bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg p-3 rounded-xl'>
                        <CreditCard className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-slate-900 dark:text-white text-lg'>
                          Credit/Debit Card
                        </h3>
                        <p className='text-slate-600 dark:text-slate-300 text-sm'>
                          Powered by Stripe • Secure & Fast
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedPaymentMethod === 'stripe'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300 group-hover:border-slate-400 dark:border-slate-600'
                      }`}>
                      {selectedPaymentMethod === 'stripe' && (
                        <CheckCircle className='w-5 h-5 text-white' />
                      )}
                    </div>
                  </motion.div>

                  {/* PayPal Payment */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPaymentMethod('paypal')}
                    className={`group relative flex items-center justify-between rounded-xl md:rounded-2xl border-2 p-4 md:p-6 cursor-pointer transition-all duration-300 ${
                      selectedPaymentMethod === 'paypal'
                        ? 'border-blue-500 bg-blue-500/5'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
                    }`}>
                    <div className='flex items-center gap-4'>
                      <div className='bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg p-3 rounded-xl'>
                        <svg
                          className='w-6 h-6 text-white'
                          viewBox='0 0 24 24'
                          fill='currentColor'>
                          <path d='M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a.2.2 0 0 1 .028-.004c.9 0 1.705-.318 2.168-1.102C24.266 4.708 24 3.616 24 2.443 24 1.093 23.707.243 22.717.09c-.198-.03-.4-.045-.604-.045H15.19c-.524 0-.968.382-1.05.9L12.028 9.05h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437z' />
                        </svg>
                      </div>
                      <div>
                        <h3 className='font-semibold text-slate-900 dark:text-white text-lg'>
                          PayPal
                        </h3>
                        <p className='text-slate-600 dark:text-slate-300 text-sm'>
                          Pay with your PayPal account
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedPaymentMethod === 'paypal'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300 group-hover:border-slate-400 dark:border-slate-600'
                      }`}>
                      {selectedPaymentMethod === 'paypal' && (
                        <CheckCircle className='w-5 h-5 text-white' />
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Payment Button */}
                <motion.div
                  className='mt-8'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: selectedPaymentMethod ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}>
                  <Button
                    onClick={() =>
                      selectedPaymentMethod &&
                      handlePayment(selectedPaymentMethod)
                    }
                    disabled={!selectedPaymentMethod || processingPayment}
                    size='lg'
                    className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 shadow-xl hover:shadow-2xl w-full h-14 font-semibold text-lg transition-all duration-300'>
                    {processingPayment ? (
                      <>
                        <Loader2 className='mr-2 w-5 h-5 animate-spin' />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className='mr-2 w-5 h-5' />
                        Pay ${order.totalAmount}
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Security Info */}
                <div className='flex justify-center items-center gap-6 mt-6 pt-6 border-slate-200/80 dark:border-slate-700/60 border-t'>
                  <div className='flex items-center gap-2'>
                    <Shield className='w-4 h-4 text-green-600' />
                    <span className='text-green-600 text-xs'>256-bit SSL</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Lock className='w-4 h-4 text-blue-600' />
                    <span className='text-blue-600 text-xs'>PCI Compliant</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div variants={itemVariants} className='space-y-6'>
              <div className='bg-gradient-to-br from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 shadow-xl backdrop-blur-md p-6 md:p-8 border border-blue-200 dark:border-blue-800 rounded-2xl md:rounded-3xl'>
                <h3 className='mb-6 font-bold text-slate-900 dark:text-white text-xl'>
                  Order Summary
                </h3>

                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between items-center text-sm'>
                    <span className='text-slate-600 dark:text-slate-300'>
                      Order
                    </span>
                    <span className='font-medium'>#{order.orderNumber}</span>
                  </div>

                  {order.siteUrl && (
                    <div className='flex justify-between items-center text-sm'>
                      <span className='text-slate-600 dark:text-slate-300'>
                        Website
                      </span>
                      <span className='font-medium break-all'>
                        {order.siteUrl}
                      </span>
                    </div>
                  )}

                  <div className='flex justify-between items-center text-sm'>
                    <span className='text-slate-600 dark:text-slate-300'>
                      Sites
                    </span>
                    <span className='font-medium'>{order.siteCount}</span>
                  </div>

                  <div className='flex justify-between items-center text-sm'>
                    <span className='text-slate-600 dark:text-slate-300'>
                      Priority
                    </span>
                    <Badge
                      variant={
                        order.urgencyLevel === 'URGENT'
                          ? 'destructive'
                          : 'secondary'
                      }>
                      {order.urgencyLevel}
                    </Badge>
                  </div>
                </div>

                <div className='space-y-3 mb-6'>
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className='flex justify-between items-center'>
                      <span className='text-slate-600 dark:text-slate-300 text-sm'>
                        {item.service.name}{' '}
                        {item.quantity > 1 && `× ${item.quantity}`}
                      </span>
                      <span className='font-semibold'>${item.totalPrice}</span>
                    </div>
                  ))}
                </div>

                <div className='mb-6 pt-4 border-slate-200 dark:border-slate-700 border-t'>
                  <div className='flex justify-between items-center'>
                    <span className='font-bold text-slate-900 dark:text-white text-xl'>
                      Total
                    </span>
                    <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-transparent text-2xl'>
                      ${order.totalAmount}
                    </span>
                  </div>
                </div>

                <div className='text-slate-500 dark:text-slate-400 text-xs text-center'>
                  <p>You will receive an email confirmation</p>
                  <p>after successful payment</p>
                </div>
              </div>

              {/* Back Button */}
              <Button asChild variant='outline' className='w-full'>
                <Link
                  href='/'
                  className='flex justify-center items-center gap-2'>
                  <ArrowLeft className='w-4 h-4' />
                  Back to Services
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Gradient Overlays */}
        <div className='absolute inset-0 bg-gradient-to-t from-white/30 md:from-white/40 dark:from-[#030712]/50 dark:md:from-[#030712]/60 via-transparent to-transparent pointer-events-none' />
        <div className='absolute inset-0 bg-gradient-to-b from-white/15 md:from-white/20 dark:from-[#030712]/25 dark:md:from-[#030712]/30 via-transparent to-transparent pointer-events-none' />
      </ComponentWrapper>
    </section>
  );
};

export default PaymentPage;
