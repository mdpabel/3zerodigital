'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Download,
  Mail,
  Calendar,
  Shield,
} from 'lucide-react';
import ComponentWrapper from '@/components/common/component-wrapper';

interface PaymentSuccessProps {
  params: { orderId: string };
}

const PaymentSuccess = ({ params }: PaymentSuccessProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const controls = useAnimation();

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    controls.start('visible');
    setIsLoaded(true);

    // Fetch order details
    // Replace with your actual API call
    // fetchOrderDetails(params.orderId);
  }, [controls, params.orderId]);

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
        rotate: [0, 4, -4, 0],
        scale: [1, 1.02, 1],
        transition: {
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        },
      },
    }),
    [],
  );

  // Particle system
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 3,
      })),
    [],
  );

  const nextSteps = useMemo(
    () => [
      {
        icon: Mail,
        title: 'Check Your Email',
        description: 'Order confirmation sent to your inbox',
        color: 'from-blue-500 to-cyan-600',
      },
      {
        icon: Calendar,
        title: 'Track Progress',
        description: 'Monitor your order in the dashboard',
        color: 'from-purple-500 to-pink-600',
      },
      {
        icon: Shield,
        title: 'Guaranteed Quality',
        description: 'Zero vulnerability, zero downtime, zero error',
        color: 'from-emerald-500 to-green-600',
      },
    ],
    [],
  );

  return (
    <div className='relative flex justify-center items-center pt-16 md:pt-10 2xl:pt-0 min-h-screen overflow-hidden'>
      <ComponentWrapper>
        {/* Enhanced animated background */}
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-emerald-50/30 md:from-emerald-50/50 dark:from-emerald-950/20 dark:md:from-emerald-950/30 via-blue-50/20 md:via-blue-50/30 dark:md:via-blue-950/20 dark:via-blue-950/15 to-purple-50/30 md:to-purple-50/50 dark:md:to-purple-950/30 dark:to-purple-950/20' />
        </div>

        {/* Success particles */}
        <div className='absolute inset-0 overflow-hidden'>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className='absolute bg-emerald-400/30 md:bg-emerald-400/40 dark:bg-emerald-300/20 dark:md:bg-emerald-300/30 rounded-full w-1 h-1'
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [-10, -80],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Floating shapes */}
        <motion.div
          variants={floatingVariants}
          animate='animate'
          className='top-20 left-4 md:left-20 absolute bg-gradient-to-br from-emerald-400/20 md:from-emerald-400/40 dark:from-emerald-400/15 dark:md:from-emerald-400/25 to-green-500/20 md:to-green-500/40 dark:md:to-green-500/25 dark:to-green-500/15 backdrop-blur-sm rounded-2xl md:rounded-3xl w-16 md:w-24 h-16 md:h-24 rotate-12'
        />
        <motion.div
          variants={floatingVariants}
          animate='animate'
          className='top-32 md:top-40 right-4 md:right-32 absolute bg-gradient-to-br from-blue-400/25 md:from-blue-400/50 dark:from-blue-400/15 dark:md:from-blue-400/30 to-emerald-500/25 md:to-emerald-500/50 dark:md:to-emerald-500/30 dark:to-emerald-500/15 backdrop-blur-sm rounded-xl md:rounded-2xl w-12 md:w-20 h-12 md:h-20'
          style={{ animationDelay: '2s' }}
        />

        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={controls}
          className='z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center'>
          {/* Success Icon */}
          <motion.div variants={itemVariants} className='mb-6 md:mb-8'>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: 0.3,
              }}
              className='inline-flex justify-center items-center bg-gradient-to-r from-emerald-500 to-green-600 shadow-xl md:shadow-2xl mx-auto mb-4 rounded-full w-16 md:w-20 h-16 md:h-20'>
              <CheckCircle2 className='w-8 md:w-10 h-8 md:h-10 text-white' />
            </motion.div>

            <motion.div className='inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 shadow-lg md:shadow-xl backdrop-blur-md px-4 md:px-6 py-2 md:py-3 border border-slate-200/50 dark:border-slate-700/50 rounded-full'>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}>
                <Sparkles className='w-3 md:w-4 h-3 md:h-4 text-emerald-600' />
              </motion.div>
              <span className='font-medium text-slate-700 dark:text-slate-300 text-xs md:text-sm'>
                Payment Successfully Processed
              </span>
            </motion.div>
          </motion.div>

          {/* Success heading */}
          <motion.h1
            variants={itemVariants}
            className='relative mb-4 md:mb-6 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight'>
            <span className='bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-transparent'>
              Order Confirmed!
            </span>
            <motion.div
              className='absolute -inset-1 bg-gradient-to-r from-emerald-600/10 md:from-emerald-600/20 to-blue-600/10 md:to-blue-600/20 opacity-0 blur-xl rounded-lg'
              animate={{ opacity: isLoaded ? [0, 0.4, 0] : 0 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.h1>

          {/* Order details card */}
          <motion.div
            variants={itemVariants}
            className='bg-white/70 dark:bg-slate-800/70 shadow-xl md:shadow-2xl backdrop-blur-md mx-auto mb-8 md:mb-12 p-6 md:p-8 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl md:rounded-3xl max-w-2xl'>
            <div className='mb-6 text-center'>
              <h2 className='mb-2 font-bold text-slate-800 dark:text-slate-200 text-xl md:text-2xl'>
                Thank you for your order!
              </h2>
              <p className='text-slate-600 dark:text-slate-400 text-base md:text-lg'>
                Your payment has been processed successfully. We'll get started
                on your project right away.
              </p>
            </div>

            {/* Order info */}
            <div className='space-y-4 mb-6 text-left'>
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
                  Payment Method:
                </span>
                <span className='font-semibold text-slate-800 dark:text-slate-200'>
                  Stripe Card
                </span>
              </div>
              <div className='flex justify-between items-center py-3'>
                <span className='text-slate-600 dark:text-slate-400'>
                  Status:
                </span>
                <span className='inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full font-medium text-emerald-700 dark:text-emerald-300 text-sm'>
                  <CheckCircle2 className='w-3 h-3' />
                  Confirmed
                </span>
              </div>
            </div>
          </motion.div>

          {/* Next steps */}
          <motion.div variants={itemVariants} className='mb-8 md:mb-12'>
            <h3 className='mb-6 font-bold text-slate-800 dark:text-slate-200 text-xl md:text-2xl'>
              What happens next?
            </h3>
            <div className='gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-3'>
              {nextSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  className='group bg-white/70 dark:bg-slate-800/70 shadow-lg md:shadow-xl md:hover:shadow-2xl hover:shadow-xl backdrop-blur-md p-6 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl transition-all duration-300'>
                  <div
                    className={`inline-flex items-center justify-center mb-4 p-3 rounded-xl bg-gradient-to-r ${step.color} shadow-lg`}>
                    <step.icon className='w-5 h-5 text-white' />
                  </div>
                  <h4 className='mb-2 font-semibold text-slate-800 dark:text-slate-200 text-lg'>
                    {step.title}
                  </h4>
                  <p className='text-slate-600 dark:text-slate-400 text-sm'>
                    {step.description}
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
                  href='/dashboard/orders'
                  className='flex justify-center items-center gap-3'>
                  View Order Details
                  <ArrowRight className='w-4 md:w-5 h-4 md:h-5 transition-transform group-hover:translate-x-1' />
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

export default PaymentSuccess;
