'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  XCircle,
  ArrowLeft,
  RefreshCw,
  MessageCircle,
  CreditCard,
  AlertCircle,
} from 'lucide-react';
import ComponentWrapper from '@/components/common/component-wrapper';

interface PaymentCancelProps {
  params: { orderId: string };
}

const PaymentCancel = ({ params }: PaymentCancelProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
    setIsLoaded(true);
  }, [controls]);

  // Memoized animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.25, 0, 1],
        },
      },
    }),
    [],
  );

  const floatingVariants = useMemo(
    () => ({
      animate: {
        y: [-10, 10, -10],
        rotate: [0, 2, -2, 0],
        scale: [1, 1.01, 1],
        transition: {
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        },
      },
    }),
    [],
  );

  const helpOptions = useMemo(
    () => [
      {
        icon: RefreshCw,
        title: 'Try Again',
        description: 'Retry your payment with the same order',
        color: 'from-blue-500 to-cyan-600',
        action: () => router.push(`/orders/${params.orderId}/checkout`),
      },
      {
        icon: MessageCircle,
        title: 'Contact Support',
        description: 'Get help from our support team',
        color: 'from-purple-500 to-pink-600',
        action: () => router.push('/contact'),
      },
      {
        icon: CreditCard,
        title: 'Payment Issues',
        description: 'Having trouble with your payment method?',
        color: 'from-orange-500 to-red-600',
        action: () => router.push('/help/payment'),
      },
    ],
    [params.orderId, router],
  );

  return (
    <div className='relative flex justify-center items-center pt-16 md:pt-10 2xl:pt-0 min-h-screen overflow-hidden'>
      <ComponentWrapper>
        {/* Enhanced animated background */}
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-red-50/20 md:from-red-50/30 dark:from-red-950/10 dark:md:from-red-950/20 via-orange-50/15 md:via-orange-50/20 dark:md:via-orange-950/10 dark:via-orange-950/8 to-slate-50/30 md:to-slate-50/40 dark:md:to-slate-950/30 dark:to-slate-950/20' />
        </div>

        {/* Floating shapes */}
        <motion.div
          variants={floatingVariants}
          animate='animate'
          className='top-20 left-4 md:left-20 absolute bg-gradient-to-br from-red-400/15 md:from-red-400/25 dark:from-red-400/10 dark:md:from-red-400/15 to-orange-500/15 md:to-orange-500/25 dark:md:to-orange-500/15 dark:to-orange-500/10 backdrop-blur-sm rounded-2xl md:rounded-3xl w-16 md:w-24 h-16 md:h-24 rotate-12'
        />
        <motion.div
          variants={floatingVariants}
          animate='animate'
          className='top-32 md:top-40 right-4 md:right-32 absolute bg-gradient-to-br from-orange-400/20 md:from-orange-400/30 dark:from-orange-400/10 dark:md:from-orange-400/20 to-red-500/20 md:to-red-500/30 dark:md:to-red-500/20 dark:to-red-500/10 backdrop-blur-sm rounded-xl md:rounded-2xl w-12 md:w-20 h-12 md:h-20'
          style={{ animationDelay: '2s' }}
        />

        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={controls}
          className='z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center'>
          {/* Cancel Icon */}
          <motion.div variants={itemVariants} className='mb-6 md:mb-8'>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: 0.3,
              }}
              className='inline-flex justify-center items-center bg-gradient-to-r from-red-500 to-orange-600 shadow-xl md:shadow-2xl mx-auto mb-4 rounded-full w-16 md:w-20 h-16 md:h-20'>
              <XCircle className='w-8 md:w-10 h-8 md:h-10 text-white' />
            </motion.div>

            <motion.div className='inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 shadow-lg md:shadow-xl backdrop-blur-md px-4 md:px-6 py-2 md:py-3 border border-slate-200/50 dark:border-slate-700/50 rounded-full'>
              <AlertCircle className='w-3 md:w-4 h-3 md:h-4 text-orange-600' />
              <span className='font-medium text-slate-700 dark:text-slate-300 text-xs md:text-sm'>
                Payment Cancelled
              </span>
            </motion.div>
          </motion.div>

          {/* Cancel heading */}
          <motion.h1
            variants={itemVariants}
            className='relative mb-4 md:mb-6 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight'>
            <span className='bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-slate-600 text-transparent'>
              Payment Cancelled
            </span>
            <motion.div
              className='absolute -inset-1 bg-gradient-to-r from-red-600/10 md:from-red-600/15 to-orange-600/10 md:to-orange-600/15 opacity-0 blur-xl rounded-lg'
              animate={{ opacity: isLoaded ? [0, 0.3, 0] : 0 }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.h1>

          {/* Message card */}
          <motion.div
            variants={itemVariants}
            className='bg-white/70 dark:bg-slate-800/70 shadow-xl md:shadow-2xl backdrop-blur-md mx-auto mb-8 md:mb-12 p-6 md:p-8 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl md:rounded-3xl max-w-2xl'>
            <div className='mb-6 text-center'>
              <h2 className='mb-2 font-bold text-slate-800 dark:text-slate-200 text-xl md:text-2xl'>
                Your payment was cancelled
              </h2>
              <p className='text-slate-600 dark:text-slate-400 text-base md:text-lg'>
                Don't worry! No charges were made to your account. Your order is
                still available and you can complete the payment whenever you're
                ready.
              </p>
            </div>

            {/* Order info */}
            <div className='space-y-4 text-left'>
              <div className='flex justify-between items-center py-3 border-slate-200/30 dark:border-slate-700/30 border-b'>
                <span className='text-slate-600 dark:text-slate-400'>
                  Order Number:
                </span>
                <span className='font-semibold text-slate-800 dark:text-slate-200'>
                  #{params.orderId.slice(-8).toUpperCase()}
                </span>
              </div>
              <div className='flex justify-between items-center py-3 border-slate-200/30 dark:border-slate-700/30 border-b'>
                <span className='text-slate-600 dark:text-slate-400'>
                  Status:
                </span>
                <span className='inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full font-medium text-orange-700 dark:text-orange-300 text-sm'>
                  <AlertCircle className='w-3 h-3' />
                  Payment Pending
                </span>
              </div>
              <div className='flex justify-between items-center py-3'>
                <span className='text-slate-600 dark:text-slate-400'>
                  Order Expiry:
                </span>
                <span className='font-semibold text-slate-800 dark:text-slate-200'>
                  24 hours
                </span>
              </div>
            </div>
          </motion.div>

          {/* Help options */}
          <motion.div variants={itemVariants} className='mb-8 md:mb-12'>
            <h3 className='mb-6 font-bold text-slate-800 dark:text-slate-200 text-xl md:text-2xl'>
              What would you like to do?
            </h3>
            <div className='gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-3'>
              {helpOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={option.action}
                  className='group bg-white/70 dark:bg-slate-800/70 shadow-lg md:shadow-xl md:hover:shadow-2xl hover:shadow-xl backdrop-blur-md p-6 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl transition-all duration-300 cursor-pointer'>
                  <div
                    className={`inline-flex items-center justify-center mb-4 p-3 rounded-xl bg-gradient-to-r ${option.color} shadow-lg`}>
                    <option.icon className='w-5 h-5 text-white' />
                  </div>
                  <h4 className='mb-2 font-semibold text-slate-800 dark:text-slate-200 text-lg'>
                    {option.title}
                  </h4>
                  <p className='text-slate-600 dark:text-slate-400 text-sm'>
                    {option.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            variants={itemVariants}
            className='flex sm:flex-row flex-col justify-center items-center gap-4 md:gap-6'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group relative w-full sm:w-auto'>
              <Button
                asChild
                size='lg'
                className='relative shadow-xl md:shadow-2xl px-8 md:px-10 py-6 md:py-7 w-full sm:w-auto font-semibold text-base md:text-lg transition-all duration-300'>
                <Link
                  href={`/orders/${params.orderId}/checkout`}
                  className='flex justify-center items-center gap-3'>
                  <RefreshCw className='w-4 md:w-5 h-4 md:h-5' />
                  Complete Payment
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group relative w-full sm:w-auto'>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='bg-white/80 hover:bg-white/90 dark:bg-slate-800/80 dark:hover:bg-slate-700/90 shadow-lg md:shadow-xl backdrop-blur-md px-8 md:px-10 py-6 md:py-7 border-2 border-slate-200/50 dark:border-slate-700/30 w-full sm:w-auto font-semibold text-base md:text-lg transition-all duration-300'>
                <Link
                  href='/'
                  className='flex justify-center items-center gap-2'>
                  <ArrowLeft className='w-4 md:w-5 h-4 md:h-5' />
                  Back to Home
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced gradient overlays */}
        <div className='absolute inset-0 bg-gradient-to-t from-white/30 md:from-white/40 dark:from-[#030712]/50 dark:md:from-[#030712]/60 via-transparent to-transparent pointer-events-none' />
      </ComponentWrapper>
    </div>
  );
};

export default PaymentCancel;
