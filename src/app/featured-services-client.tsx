'use client';
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Shield,
  Settings,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ComponentWrapper from '@/components/common/component-wrapper';

// Icon mapping for services
const iconMap = {
  Code,
  Shield,
  Settings,
  TrendingUp,
};

interface Service {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number; // This will be converted from Decimal
  originalPrice?: number | null; // This will be converted from Decimal
  features: string[];
  isActive: boolean;
  isPopular: boolean;
  icon?: string | null;
  createdAt: string; // Serialized date
  updatedAt: string; // Serialized date
  deletedAt?: string | null; // Serialized date
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface FeaturedServicesClientProps {
  services: Service[];
}

const FeaturedServicesClient = ({ services }: FeaturedServicesClientProps) => {
  if (!services || services.length === 0) {
    return null;
  }

  // Transform services for display
  const transformedServices = services.map((service, index) => {
    const colors = [
      'from-blue-600 to-blue-700',
      'from-emerald-600 to-emerald-700',
      'from-purple-600 to-purple-700',
      'from-orange-600 to-orange-700',
    ];

    const IconComponent = service.icon
      ? iconMap[service.icon as keyof typeof iconMap] || Code
      : Code;

    return {
      ...service,
      icon: IconComponent,
      color: colors[index % colors.length],
      features: Array.isArray(service.features)
        ? service.features.slice(0, 6)
        : [],
    };
  });

  return (
    <section className='relative py-16 md:py-24'>
      <ComponentWrapper>
        <div className='mx-auto px-4 container'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-16 text-center'>
            <Badge className='bg-blue-100 mb-6 px-4 py-2 border-blue-200 text-blue-700'>
              <Sparkles className='mr-2 w-4 h-4' />
              Our Expertise
            </Badge>

            <h2 className='mb-6 font-bold text-white text-4xl md:text-5xl'>
              Featured Services
            </h2>

            <p className='mx-auto max-w-3xl text-gray-300 text-xl'>
              Professional services built on our foundation of zero
              vulnerabilities, zero downtime, and zero errors
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {transformedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='group'>
                <div className='bg-gray-800/50 hover:bg-gray-800/70 hover:shadow-2xl backdrop-blur-sm p-6 border border-gray-700/50 hover:border-gray-600/50 rounded-2xl h-full transition-all duration-300'>
                  {/* Service Header */}
                  <div className='flex justify-between items-center mb-4'>
                    <div
                      className={cn(
                        'p-3 rounded-xl bg-gradient-to-r shadow-lg',
                        service.color,
                      )}>
                      <service.icon className='w-6 h-6 text-white' />
                    </div>
                    {service.isPopular && (
                      <Badge className='bg-yellow-500/20 border-yellow-500/30 text-yellow-400'>
                        Popular
                      </Badge>
                    )}
                  </div>

                  {/* Service Info */}
                  <div className='mb-6'>
                    <h3 className='mb-2 font-bold text-white group-hover:text-blue-400 text-xl transition-colors'>
                      {service.name}
                    </h3>
                    <p className='text-gray-400 text-sm line-clamp-3 leading-relaxed'>
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  {service.features.length > 0 && (
                    <div className='mb-6'>
                      <div className='space-y-2'>
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className='flex items-center gap-2'>
                            <CheckCircle className='flex-shrink-0 w-4 h-4 text-green-400' />
                            <span className='text-gray-300 text-sm'>
                              {feature}
                            </span>
                          </div>
                        ))}
                        {service.features.length > 3 && (
                          <p className='mt-2 text-gray-500 text-xs'>
                            +{service.features.length - 3} more features
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className='mb-6'>
                    <div className='flex items-baseline gap-2'>
                      <span className='font-bold text-white text-2xl'>
                        ${service.price}
                      </span>
                      {service.originalPrice && (
                        <span className='text-gray-500 text-sm line-through'>
                          ${service.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className='text-gray-400 text-xs'>Starting price</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className='space-y-3'>
                    <Button
                      asChild
                      className={cn(
                        'w-full bg-gradient-to-r text-white border-0',
                        service.color,
                      )}>
                      <Link
                        href='/contact'
                        className='flex justify-center items-center gap-2'>
                        Get Started
                        <ArrowRight className='w-4 h-4' />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant='outline'
                      className='bg-transparent hover:bg-gray-700 border-gray-600 w-full text-gray-300'>
                      <Link href={`/services/${service.slug}`}>Learn More</Link>
                    </Button>
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

export default FeaturedServicesClient;
