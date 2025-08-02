'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useAnimation, useInView, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Shield,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { useRef } from 'react';
import ComponentWrapper from '@/components/common/component-wrapper';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  const controls = useAnimation();

  // Spring animations for smooth mouse following (desktop only)
  const springX = useSpring(0, { stiffness: 150, damping: 25 });
  const springY = useSpring(0, { stiffness: 150, damping: 25 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      setIsLoaded(true);
    }
  }, [isInView, controls]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      springX.set(clientX - 192);
      springY.set(clientY - 192);
    },
    [springX, springY],
  );

  useEffect(() => {
    // Only add mouse tracking on desktop
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  // Memoized animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, scale: 0.98 },
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

  // Reduced particle system for mobile
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 3,
      })),
    [],
  );

  // UPDATED: Feature highlights now reflect the 3Zero motto
  const features = useMemo(
    () => [
      {
        icon: Shield,
        text: '0 Vulnerability',
        color: 'from-emerald-500 to-green-600',
        description: 'Ironclad Protection',
        delay: 0.1,
      },
      {
        icon: Activity,
        text: '0 Downtime',
        color: 'from-blue-500 to-cyan-600',
        description: 'Uninterrupted Availability',
        delay: 0.2,
      },
      {
        icon: CheckCircle2,
        text: '0 Error',
        color: 'from-purple-500 to-pink-600',
        description: 'Flawless Execution',
        delay: 0.3,
      },
    ],
    [],
  );

  return (
    <div className='relative flex justify-center items-center pt-16 md:pt-10 2xl:pt-0 min-h-screen overflow-hidden'>
      <ComponentWrapper>
        {/* Enhanced animated background */}
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 md:from-blue-50/50 dark:from-blue-950/20 dark:md:from-blue-950/30 via-purple-50/20 md:via-purple-50/30 dark:md:via-purple-950/20 dark:via-purple-950/15 to-teal-50/30 md:to-teal-50/50 dark:md:to-teal-950/30 dark:to-teal-950/20' />
        </div>

        {/* Reduced particle system for mobile */}
        <div className='absolute inset-0 overflow-hidden'>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className='absolute bg-blue-400/20 md:bg-blue-400/30 dark:bg-blue-300/15 dark:md:bg-blue-300/20 rounded-full w-1 h-1'
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [-10, -60],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
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

        {/* Enhanced cursor glow - desktop only */}
        <motion.div
          className='hidden md:block z-0 fixed rounded-full w-64 md:w-96 h-64 md:h-96 pointer-events-none'
          style={{
            background:
              'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 70%)',
            filter: 'blur(30px)',
            x: springX,
            y: springY,
          }}
        />

        {/* Simplified floating shapes - fewer on mobile */}
        <motion.div
          variants={floatingVariants}
          animate='animate'
          className='top-20 left-4 md:left-20 absolute bg-gradient-to-br from-blue-400/20 md:from-blue-400/40 dark:from-blue-400/15 dark:md:from-blue-400/25 to-purple-500/20 md:to-purple-500/40 dark:md:to-purple-500/25 dark:to-purple-500/15 backdrop-blur-sm rounded-2xl md:rounded-3xl w-16 md:w-24 h-16 md:h-24 rotate-12'
          style={{ animationDelay: '0s' }}
        />
        <motion.div
          variants={floatingVariants}
          animate='animate'
          className='top-32 md:top-40 right-4 md:right-32 absolute bg-gradient-to-br from-teal-400/25 md:from-teal-400/50 dark:from-teal-400/15 dark:md:from-teal-400/30 to-blue-500/25 md:to-blue-500/50 dark:md:to-blue-500/30 dark:to-blue-500/15 backdrop-blur-sm rounded-xl md:rounded-2xl w-12 md:w-20 h-12 md:h-20'
          style={{ animationDelay: '2s' }}
        />

        {/* Main content */}
        <motion.div
          ref={heroRef}
          variants={containerVariants}
          initial='hidden'
          animate={controls}
          className='z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center'>
          {/* Enhanced badge */}
          <motion.div variants={itemVariants} className='mb-6 md:mb-8'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 shadow-lg md:shadow-xl md:hover:shadow-2xl hover:shadow-xl backdrop-blur-md px-4 md:px-6 py-2 md:py-3 border border-slate-200/50 dark:border-slate-700/50 rounded-full transition-all duration-300'>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}>
                <Sparkles className='w-3 md:w-4 h-3 md:h-4 text-blue-600' />
              </motion.div>
              <span className='font-medium text-slate-700 dark:text-slate-300 text-xs md:text-sm'>
                Zero Compromises Digital Solutions
              </span>
            </motion.div>
          </motion.div>

          {/* Enhanced main heading - much better mobile sizing */}
          <motion.h1
            variants={itemVariants}
            className='relative mb-6 md:mb-8 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight'>
            <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
              3Zero Digital
            </span>
            <motion.div
              className='absolute -inset-1 bg-gradient-to-r from-blue-600/10 md:from-blue-600/20 to-purple-600/10 md:to-purple-600/20 opacity-0 blur-xl rounded-lg'
              animate={{ opacity: isLoaded ? [0, 0.3, 0] : 0 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.h1>

          {/* Enhanced subheading - better mobile text sizing */}
          <motion.p
            variants={itemVariants}
            className='mx-auto mb-8 md:mb-12 max-w-4xl text-slate-600 dark:text-slate-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed'>
            Empowering Digital Solutions with{' '}
            <motion.span
              className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-transparent'
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}>
              Zero Compromises
            </motion.span>
          </motion.p>

          {/* Enhanced feature highlights - mobile optimized layout */}
          <motion.div
            variants={itemVariants}
            className='flex sm:flex-row flex-col flex-wrap justify-center gap-3 md:gap-6 mb-8 md:mb-16'>
            {features.map((feature) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  transition: { type: 'spring', stiffness: 300 },
                }}
                className='group relative flex items-center gap-3 md:gap-4 bg-white/70 dark:bg-slate-800/70 shadow-lg md:shadow-xl md:hover:shadow-2xl hover:shadow-xl backdrop-blur-md px-4 md:px-8 py-3 md:py-4 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl md:rounded-3xl w-full sm:w-auto transition-all duration-300 cursor-pointer'>
                <div
                  className={`p-2 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-r ${feature.color} shadow-md md:shadow-lg group-hover:shadow-lg md:group-hover:shadow-xl transition-shadow duration-300`}>
                  <feature.icon className='w-4 md:w-6 h-4 md:h-6 text-white' />
                </div>
                <div className='text-left'>
                  <span className='block font-bold text-slate-800 dark:text-slate-200 text-base md:text-lg'>
                    {feature.text}
                  </span>
                  <span className='block text-slate-600 dark:text-slate-400 text-xs md:text-sm'>
                    {feature.description}
                  </span>
                </div>

                {/* Hover glow effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 md:from-blue-500/10 to-purple-500/5 md:to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl md:rounded-3xl transition-opacity duration-300' />
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced description - better mobile sizing */}
          <motion.p
            variants={itemVariants}
            className='mx-auto mb-8 md:mb-12 px-2 md:px-0 max-w-3xl text-slate-600 dark:text-slate-400 text-base md:text-lg lg:text-xl leading-relaxed'>
            Top-tier custom web development and website security solutions that
            ensure your business achieves optimal digital performance with
            uncompromising quality and cutting-edge technology.
          </motion.p>

          {/* Enhanced CTA Buttons - better mobile layout */}
          <motion.div
            variants={itemVariants}
            className='flex sm:flex-row flex-col justify-center items-center gap-4 md:gap-6 mb-8 md:mb-16 px-2'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group relative w-full sm:w-auto'>
              <Button
                asChild
                size='lg'
                className='relative shadow-xl md:shadow-2xl md:group-hover:shadow-blue-500/25 group-hover:shadow-xl px-8 md:px-10 py-6 md:py-7 w-full sm:w-auto overflow-hidden font-semibold text-base md:text-lg transition-all duration-300'>
                <Link
                  href='/services'
                  className='flex justify-center items-center gap-3'>
                  Get Started
                  <ArrowRight className='w-4 md:w-5 h-4 md:h-5 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
              <div className='-z-10 absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 md:group-hover:opacity-30 group-hover:opacity-20 blur-xl rounded-lg transition-opacity duration-300' />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group relative w-full sm:w-auto'>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='bg-white/80 hover:bg-white/90 dark:bg-slate-800/80 dark:hover:bg-slate-700/90 shadow-lg md:shadow-xl md:hover:shadow-2xl hover:shadow-xl backdrop-blur-md px-8 md:px-10 py-6 md:py-7 border-2 border-slate-200/50 dark:border-slate-700/30 w-full sm:w-auto font-semibold text-base md:text-lg transition-all duration-300'>
                <Link
                  href='/book-a-call'
                  className='flex justify-center items-center gap-2'>
                  Book a Call
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced gradient overlays */}
        <div className='absolute inset-0 bg-gradient-to-t from-white/30 md:from-white/40 dark:from-[#030712]/50 dark:md:from-[#030712]/60 via-transparent to-transparent pointer-events-none' />
        <div className='absolute inset-0 bg-gradient-to-b from-white/15 md:from-white/20 dark:from-[#030712]/25 dark:md:from-[#030712]/30 via-transparent to-transparent pointer-events-none' />
      </ComponentWrapper>
    </div>
  );
};

export default Hero;
