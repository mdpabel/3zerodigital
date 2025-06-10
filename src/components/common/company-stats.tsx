'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Globe,
  Shield,
  Award,
  Clock,
  TrendingUp,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ComponentWrapper from '../common/component-wrapper';

const stats = [
  {
    id: 1,
    number: '500+',
    label: 'Projects Delivered',
    description: 'Successful websites and applications launched',
    icon: Globe,
    color: 'from-blue-600 to-blue-700',
    zeroStat: '0 failed launches',
  },
  {
    id: 2,
    number: '99.99%',
    label: 'Uptime Average',
    description: 'Across all client websites we maintain',
    icon: Clock,
    color: 'from-emerald-600 to-emerald-700',
    zeroStat: '0 extended downtime',
  },
  {
    id: 3,
    number: '0',
    label: 'Security Breaches',
    description: 'Zero successful attacks on our clients',
    icon: Shield,
    color: 'from-purple-600 to-purple-700',
    zeroStat: '0 vulnerabilities exploited',
  },
  {
    id: 4,
    number: '150+',
    label: 'Happy Clients',
    description: 'Businesses trusting us with their digital presence',
    icon: Users,
    color: 'from-orange-600 to-orange-700',
    zeroStat: '0 unsatisfied customers',
  },
  {
    id: 5,
    number: '2.1s',
    label: 'Average Load Time',
    description: 'Optimized performance across all projects',
    icon: TrendingUp,
    color: 'from-red-600 to-red-700',
    zeroStat: '0 slow-loading sites',
  },
  {
    id: 6,
    number: '24/7',
    label: 'Monitoring',
    description: 'Continuous surveillance and support',
    icon: Award,
    color: 'from-indigo-600 to-indigo-700',
    zeroStat: '0 unmonitored sites',
  },
];

const CompanyStats = () => {
  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 md:mb-16 text-center'>
            <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
              <Sparkles className='mr-2 w-4 h-4' />
              By The Numbers
            </Badge>

            <h2 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Proven Track Record
              </span>
            </h2>

            <p className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Numbers don't lie. See how our 3zero commitment translates into
              real results for our clients
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className='gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className='group relative bg-white/70 dark:bg-slate-800/70 shadow-lg hover:shadow-2xl backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl transition-all duration-300'>
                {/* Background gradient on hover */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300',
                    stat.color.replace('600', '50').replace('700', '100') +
                      '/50 dark:' +
                      stat.color.replace('600', '950').replace('700', '900') +
                      '/20',
                  )}
                />

                <div className='relative'>
                  {/* Icon */}
                  <div
                    className={cn(
                      'inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-r shadow-lg',
                      stat.color,
                    )}>
                    <stat.icon className='w-8 h-8 text-white' />
                  </div>

                  {/* Main Stat */}
                  <div className='mb-4'>
                    <div className='mb-2 font-bold text-slate-900 dark:text-white text-4xl md:text-5xl'>
                      {stat.number}
                    </div>
                    <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                      {stat.label}
                    </h3>
                    <p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed'>
                      {stat.description}
                    </p>
                  </div>

                  {/* Zero Achievement */}
                  <div className='bg-slate-50/50 dark:bg-slate-900/50 p-3 border border-slate-200/30 dark:border-slate-700/30 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <CheckCircle className='w-4 h-4 text-green-600 dark:text-green-400' />
                      <span className='font-semibold text-slate-900 dark:text-white text-sm'>
                        {stat.zeroStat}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default CompanyStats;
