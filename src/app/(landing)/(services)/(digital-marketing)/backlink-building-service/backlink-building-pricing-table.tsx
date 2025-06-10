'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Shield,
  CheckCircle,
  Phone,
  MessageSquare,
  ArrowRight,
  Search,
  Globe,
  Lock,
  Eye,
  Settings,
  Mail,
  Zap,
  TrendingUp,
  FileCheck,
  Clock,
  Award,
  Users,
  Star,
  Database,
  Minus,
  Plus,
  Server,
  Bug,
  HardDrive,
  Cpu,
  MonitorSpeaker,
  Wifi,
  Router,
  Network,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ComponentWrapper from '@/components/common/component-wrapper';

// Pricing structure for backlink building
const pricingTiers = [
  {
    min: 1,
    max: 10,
    price: 199,
    name: 'Starter Package',
    description: 'Perfect for small businesses',
  },
  {
    min: 11,
    max: 30,
    price: 399,
    name: 'Professional Package',
    description: 'Most common for growing businesses',
  },
  {
    min: 31,
    max: 50,
    price: 699,
    name: 'Enterprise Package',
    description: 'For large-scale link building',
  },
  {
    min: 51,
    max: 999,
    price: 999,
    name: 'Premium Package',
    description: 'Complete SEO transformation',
  },
];

// Add-on services
const addOnServices = [
  {
    id: 'content-writing',
    name: 'Professional Content Writing',
    price: 199,
    icon: Sparkles,
    description: 'High-quality content for your backlinks',
    popular: true,
  },
  {
    id: 'seo-audit',
    name: 'SEO Audit & Optimization',
    price: 299,
    icon: Search,
    description: 'Comprehensive SEO assessment',
  },
  {
    id: 'local-citations',
    name: 'Local Citation Building',
    price: 149,
    icon: Database,
    description: 'Boost local SEO presence',
  },
  {
    id: 'social-signals',
    name: 'Social Signal Boost',
    price: 99,
    icon: TrendingUp,
    description: 'Increase social media presence',
  },
  {
    id: 'content-distribution',
    name: 'Content Distribution Network',
    price: 399,
    icon: Globe,
    description: 'Wide content distribution',
  },
];

const BacklinkBuildingPricing = () => {
  const [backlinkCount, setBacklinkCount] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Calculate pricing based on backlink count
  const calculatePrice = () => {
    const tier = pricingTiers.find(
      (t) => backlinkCount >= t.min && backlinkCount <= t.max,
    );
    return { price: tier?.price || 999, tier };
  };

  const handleCountChange = (value: string) => {
    const num = parseInt(value) || 0;
    setBacklinkCount(Math.max(1, Math.min(999, num)));
  };

  const incrementCount = () => {
    setBacklinkCount((prev) => Math.min(999, prev + 1));
  };

  const decrementCount = () => {
    setBacklinkCount((prev) => Math.max(1, prev - 1));
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId],
    );
  };

  const calculateTotal = () => {
    const { price } = calculatePrice();
    const addOnPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOnServices.find((service) => service.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    return price + addOnPrice;
  };

  const { price: basePrice, tier } = calculatePrice();

  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl container'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-16 text-center'>
            <Badge className='bg-blue-100 dark:bg-blue-900/20 mb-6 px-4 py-2 border border-blue-200/50 dark:border-blue-800/50 font-medium text-blue-800 dark:text-blue-300 text-sm'>
              <Sparkles className='mr-2 w-4 h-4' />
              High-Quality Backlink Building
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Build High Authority Backlinks
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Tell us how many high-quality backlinks you need, and we'll help
              you boost your search rankings with our{' '}
              <strong>proven link building strategies</strong>.
            </p>

            {/* Trust Indicators */}
            <div className='flex flex-wrap justify-center items-center gap-6 mb-8'>
              <div className='flex items-center gap-2'>
                <TrendingUp className='w-5 h-5 text-green-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  100% White-Hat Methods
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-5 h-5 text-blue-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  7-14 Day Delivery
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Award className='w-5 h-5 text-purple-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  1000+ Active Partners
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className='gap-8 grid grid-cols-1 lg:grid-cols-3'>
            {/* Backlink Count Input - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='lg:col-span-2'>
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <div className='mb-8'>
                  <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                    How Many Backlinks?
                  </h2>
                  <p className='text-slate-600 dark:text-slate-300'>
                    Enter the number of high-quality backlinks you want to
                    build. Not sure? We can help you determine the right amount.
                  </p>
                </div>

                {/* Count Input */}
                <div className='mb-8'>
                  <div className='flex justify-center items-center gap-4 mb-6'>
                    <Button
                      variant='outline'
                      size='lg'
                      onClick={decrementCount}
                      disabled={backlinkCount <= 1}
                      className='bg-white/50 dark:bg-slate-800/50 p-0 w-12 h-12'>
                      <Minus className='w-6 h-6' />
                    </Button>

                    <div className='relative'>
                      <Input
                        type='number'
                        min='1'
                        max='999'
                        value={backlinkCount}
                        onChange={(e) => handleCountChange(e.target.value)}
                        className='bg-white/50 dark:bg-slate-800/50 px-6 py-4 border-2 rounded-xl w-32 font-bold text-2xl text-center'
                      />
                    </div>

                    <Button
                      variant='outline'
                      size='lg'
                      onClick={incrementCount}
                      disabled={backlinkCount >= 999}
                      className='bg-white/50 dark:bg-slate-800/50 p-0 w-12 h-12'>
                      <Plus className='w-6 h-6' />
                    </Button>
                  </div>

                  <div className='text-center'>
                    <p className='text-slate-600 dark:text-slate-300 text-sm'>
                      backlinks
                    </p>
                  </div>
                </div>

                {/* Pricing Tiers Display */}
                <div className='mb-8'>
                  <h3 className='mb-4 font-semibold text-slate-900 dark:text-white text-lg'>
                    Pricing Tiers
                  </h3>
                  <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                    {pricingTiers.map((tierItem) => (
                      <div
                        key={tierItem.name}
                        className={cn(
                          'p-4 rounded-lg border-2 transition-all duration-300',
                          tier === tierItem
                            ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-500'
                            : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
                        )}>
                        <div className='flex justify-between items-start mb-2'>
                          <div>
                            <h4 className='font-semibold text-slate-900 dark:text-white text-sm'>
                              {tierItem.name}
                            </h4>
                            <p className='text-slate-600 dark:text-slate-300 text-xs'>
                              {tierItem.description}
                            </p>
                          </div>
                          <div className='text-right'>
                            <div className='font-bold text-slate-900 dark:text-white'>
                              ${tierItem.price}
                            </div>
                            {tier === tierItem && (
                              <Badge className='bg-blue-600 text-white text-xs'>
                                Selected
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className='text-slate-500 dark:text-slate-400 text-xs'>
                          {tierItem.min}-{' '}
                          {tierItem.max === 999 ? '999+' : tierItem.max}{' '}
                          backlinks
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Free Consultation CTA */}
                <div className='bg-blue-50/50 dark:bg-blue-950/20 p-6 border border-blue-200/30 dark:border-blue-800/30 rounded-lg text-center'>
                  <h4 className='mb-2 font-semibold text-blue-800 dark:text-blue-300'>
                    Not Sure How Many Backlinks You Need?
                  </h4>
                  <p className='mb-4 text-blue-700 dark:text-blue-300 text-sm'>
                    We can help you determine the right number of backlinks for
                    your SEO goals
                  </p>
                  <Button
                    variant='outline'
                    className='bg-white/80 dark:bg-slate-800/80'>
                    <Search className='mr-2 w-4 h-4' />
                    Get Free Consultation
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Price Summary - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='lg:col-span-1'>
              {/* Service Package */}
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md mb-6 p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <div className='mb-6 text-center'>
                  <div className='inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 mb-4 rounded-2xl w-16 h-16'>
                    <TrendingUp className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                    Backlink Building Service
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-sm'>
                    High-quality backlinks from authoritative sources
                  </p>
                </div>

                {/* What's Included */}
                <div className='mb-6'>
                  <h4 className='mb-3 font-semibold text-slate-900 dark:text-white text-sm'>
                    What's Included
                  </h4>
                  <div className='space-y-2'>
                    {[
                      'High-authority backlinks',
                      'Manual outreach and acquisition',
                      'DR 50+ guaranteed websites',
                      '1-year link guarantee',
                      'Detailed reporting',
                      'SEO strategy consultation',
                    ].map((feature, idx) => (
                      <div key={idx} className='flex items-start gap-2'>
                        <CheckCircle className='flex-shrink-0 mt-0.5 w-4 h-4 text-green-600 dark:text-green-400' />
                        <span className='text-slate-600 dark:text-slate-300 text-xs'>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Pricing */}
                <div className='bg-slate-50/50 dark:bg-slate-900/50 mb-6 p-4 border border-slate-200/30 dark:border-slate-700/30 rounded-lg'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-slate-600 dark:text-slate-300 text-sm'>
                      {backlinkCount} backlinks
                    </span>
                    <span className='font-bold text-slate-900 dark:text-white text-lg'>
                      ${basePrice}
                    </span>
                  </div>
                  {tier && (
                    <div className='text-center'>
                      <Badge className='bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'>
                        {tier.name}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Guarantees */}
                <div className='bg-green-50/50 dark:bg-green-950/20 mb-6 p-4 border border-green-200/30 dark:border-green-800/30 rounded-lg'>
                  <h4 className='mb-2 font-semibold text-green-800 dark:text-green-300 text-sm'>
                    Our Guarantee
                  </h4>
                  <div className='space-y-1'>
                    {[
                      '100% white-hat methods',
                      '1-year link replacement guarantee',
                      'DR 50+ guaranteed',
                      '7-14 day delivery time',
                    ].map((guarantee, idx) => (
                      <div key={idx} className='flex items-center gap-2'>
                        <Shield className='w-3 h-3 text-green-600' />
                        <span className='text-green-700 dark:text-green-300 text-xs'>
                          {guarantee}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  className='bg-gradient-to-r from-blue-600 to-purple-600 mb-4 py-6 border-0 w-full text-white'
                  size='lg'>
                  <TrendingUp className='mr-2 w-5 h-5' />
                  Build {backlinkCount} Backlinks
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>

                <div className='flex gap-2'>
                  <Button variant='outline' size='sm' className='flex-1'>
                    <Phone className='mr-1 w-4 h-4' />
                    Call
                  </Button>
                  <Button variant='outline' size='sm' className='flex-1'>
                    <MessageSquare className='mr-1 w-4 h-4' />
                    Chat
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Add-on Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md mt-8 p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
            <h3 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
              Recommended Add-on Services
            </h3>
            <p className='mb-8 text-slate-600 dark:text-slate-300'>
              Enhance your backlink building campaign with these additional
              services
            </p>

            <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {addOnServices.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddOnToggle(service.id)}
                  className={cn(
                    'cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 relative',
                    selectedAddOns.includes(service.id)
                      ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-500'
                      : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300',
                  )}>
                  {service.popular && (
                    <div className='top-2 right-2 absolute'>
                      <Badge className='bg-orange-100 text-orange-800 text-xs'>
                        <Star className='mr-1 w-3 h-3' />
                        Popular
                      </Badge>
                    </div>
                  )}

                  <div className='flex justify-between items-start mb-3'>
                    <service.icon
                      className={cn(
                        'w-6 h-6',
                        selectedAddOns.includes(service.id)
                          ? 'text-blue-600'
                          : 'text-slate-500',
                      )}
                    />

                    {selectedAddOns.includes(service.id) && (
                      <CheckCircle className='w-5 h-5 text-blue-600' />
                    )}
                  </div>

                  <h4 className='mb-2 font-semibold text-slate-900 dark:text-white text-sm'>
                    {service.name}
                  </h4>
                  <p className='mb-3 text-slate-600 dark:text-slate-300 text-xs'>
                    {service.description}
                  </p>
                  <p className='font-bold text-blue-600'>+${service.price}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final Summary */}
          <AnimatePresence>
            {selectedAddOns.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 mt-8 p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl'>
                <div className='flex md:flex-row flex-col justify-between items-start md:items-center gap-6'>
                  <div>
                    <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                      Total Investment
                    </h3>
                    <div className='space-y-1 text-sm'>
                      <div className='text-slate-600 dark:text-slate-300'>
                        Backlink Building: {backlinkCount} backlinks
                      </div>
                      <div className='text-slate-600 dark:text-slate-300'>
                        Add-on Services: {selectedAddOns.length} selected
                      </div>
                    </div>
                  </div>

                  <div className='text-center md:text-right'>
                    <div className='font-bold text-3xl md:text-4xl'>
                      <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent'>
                        ${calculateTotal().toLocaleString()}
                      </span>
                    </div>
                    <div className='text-slate-500 text-xs'>
                      *Includes 1-year link guarantee
                    </div>
                  </div>
                </div>

                <div className='flex sm:flex-row flex-col gap-4 mt-8'>
                  <Button
                    size='lg'
                    className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 border-0 text-white'>
                    <TrendingUp className='mr-2 w-5 h-5' />
                    Start Backlink Campaign
                    <ArrowRight className='ml-2 w-5 h-5' />
                  </Button>

                  <Button
                    variant='outline'
                    size='lg'
                    className='bg-white/80 dark:bg-slate-800/80 px-8 py-6'>
                    <Phone className='mr-2 w-5 h-5' />
                    Talk to Expert
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='flex flex-wrap justify-center items-center gap-8 mt-16 text-center'>
            <div className='flex items-center gap-2'>
              <Shield className='w-5 h-5 text-green-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                100% White-Hat Guarantee
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Users className='w-5 h-5 text-blue-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                10,000+ Successful Campaigns
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Clock className='w-5 h-5 text-purple-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                7-14 Day Delivery
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Award className='w-5 h-5 text-orange-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                98% Client Satisfaction
              </span>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default BacklinkBuildingPricing;
