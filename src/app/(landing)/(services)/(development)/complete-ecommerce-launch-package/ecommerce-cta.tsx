'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ComponentWrapper from '@/components/common/component-wrapper';
import Link from 'next/link';

const EcommerceCTA = () => {
  return (
    <section className='relative bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 py-16 md:py-24 overflow-hidden'>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl container'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center'>
            <h2 className='mb-6 font-bold text-white text-3xl md:text-4xl lg:text-5xl'>
              Ready to Launch Your Store?
            </h2>
            <p className='mx-auto max-w-3xl text-blue-100 text-xl'>
              Join 200+ successful businesses who chose our ecommerce solutions.
              Get started today with our 3Zero guarantee.
            </p>
          </motion.div>

          <div className='gap-8 grid grid-cols-1 lg:grid-cols-3 mb-12'>
            {[
              {
                icon: Calendar,
                title: 'Free Consultation',
                description:
                  'Book a 30-minute strategy call to discuss your ecommerce goals',
                cta: 'Schedule Call',
                href: '/consultation',
              },
              {
                icon: MessageCircle,
                title: 'Get Custom Quote',
                description:
                  'Tell us about your requirements and receive a detailed proposal',
                cta: 'Get Quote',
                href: '/contact?service=ecommerce',
              },
              {
                icon: Phone,
                title: 'Talk to Expert',
                description: 'Speak directly with our ecommerce specialists',
                cta: 'Call Now',
                href: 'tel:+1234567890',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className='bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/20 h-full text-white transition-all duration-300'>
                  <CardContent className='p-6 text-center'>
                    <div className='flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-2xl w-16 h-16'>
                      <item.icon className='w-8 h-8 text-white' />
                    </div>
                    <h3 className='mb-3 font-bold text-xl'>{item.title}</h3>
                    <p className='mb-6 text-blue-100 text-sm'>
                      {item.description}
                    </p>
                    <Button
                      asChild
                      variant='secondary'
                      className='bg-white hover:bg-blue-50 w-full text-blue-600'>
                      <Link
                        href={item.href}
                        className='flex justify-center items-center gap-2'>
                        {item.cta}
                        <ArrowRight className='w-4 h-4' />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-center'>
            <div className='bg-white/10 backdrop-blur-md p-8 border border-white/20 rounded-2xl'>
              <h3 className='mb-4 font-bold text-white text-2xl'>
                Special Launch Offer
              </h3>
              <p className='mb-6 text-blue-100'>
                Get 25% off your first ecommerce project when you sign up this
                month. Plus, free maintenance for the first 3 months!
              </p>
              <div className='flex sm:flex-row flex-col justify-center gap-4'>
                <Button
                  asChild
                  size='lg'
                  className='bg-white hover:bg-blue-50 text-blue-600'>
                  <Link href='/contact?service=ecommerce&offer=launch25'>
                    Claim Offer Now
                  </Link>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='hover:bg-white/10 border-white/30 text-white'>
                  <Link href='/portfolio?category=ecommerce'>
                    View Our Work
                  </Link>
                </Button>
              </div>
              <p className='mt-4 text-blue-200 text-xs'>
                *Offer valid until end of month. Terms and conditions apply.
              </p>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default EcommerceCTA;
