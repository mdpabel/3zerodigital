'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Animation variants for the main container to orchestrate the children's animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time delay between each child animating in
    },
  },
};

// Animation variants for individual items (badge, subtitle)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Specific variants for the title to animate word by word
const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // Faster stagger for a fluid, typing-like effect
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
};

interface StepperHeaderProps {
  title: string;
  subtitle: string;
  emergencyService?: boolean;
}

const StepperHeader = ({
  title,
  subtitle,
  emergencyService = false,
}: StepperHeaderProps) => {
  const words = title.split(' ');

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='mb-8 md:mb-12 text-center'>
      {emergencyService && (
        <motion.div variants={itemVariants}>
          <Badge className='bg-gradient-to-r from-red-500 to-orange-400 shadow-lg mb-4 md:mb-6 px-4 py-2 border-0 font-semibold text-white text-sm animate-pulse'>
            <AlertTriangle className='mr-2 w-4 h-4' />
            Emergency Service
          </Badge>
        </motion.div>
      )}

      <motion.h1
        variants={titleContainerVariants}
        className='mb-4 md:mb-6 font-bold text-2xl md:text-3xl lg:text-4xl'>
        <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className='inline-block'>
              {word}&nbsp;
            </motion.span>
          ))}
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className='mx-auto px-4 max-w-2xl text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed'>
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default StepperHeader;
