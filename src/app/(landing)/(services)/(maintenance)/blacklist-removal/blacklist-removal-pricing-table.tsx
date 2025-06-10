'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
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

// All supported blacklist providers with icons
const allSupportedProviders = [
  { name: 'Google Safe Browsing', icon: Search, category: 'Critical' },
  { name: 'Microsoft Defender', icon: Shield, category: 'Critical' },
  { name: 'Kaspersky', icon: Lock, category: 'High' },
  { name: 'Symantec', icon: Award, category: 'High' },
  { name: 'McAfee', icon: Shield, category: 'High' },
  { name: 'Norton', icon: Lock, category: 'Medium' },
  { name: 'Sophos', icon: Shield, category: 'Medium' },
  { name: 'Webroot', icon: Globe, category: 'Medium' },
  { name: 'Malwarebytes', icon: Shield, category: 'Medium' },
  { name: 'ESET', icon: Lock, category: 'Medium' },
  { name: 'Avast', icon: Shield, category: 'Medium' },
  { name: 'AVG', icon: Lock, category: 'Medium' },
  { name: 'BitDefender', icon: Shield, category: 'High' },
  { name: 'F-Secure', icon: Lock, category: 'Medium' },
  { name: 'Trend Micro', icon: Shield, category: 'High' },
  { name: 'Fortinet', icon: Network, category: 'High' },
  { name: 'Panda', icon: Shield, category: 'Medium' },
  { name: 'DrWeb', icon: Bug, category: 'Medium' },
  { name: 'ClamAV', icon: Server, category: 'Medium' },
  { name: 'Spamhaus', icon: Mail, category: 'High' },
  { name: 'Sucuri', icon: Globe, category: 'Medium' },
  { name: 'Clean-MX', icon: Database, category: 'Medium' },
  { name: 'Netcraft', icon: Globe, category: 'Medium' },
  { name: 'PhishLabs', icon: Eye, category: 'Medium' },
  { name: 'CrowdStrike', icon: Shield, category: 'High' },
  { name: 'FireEye', icon: Zap, category: 'High' },
  { name: 'Cylance', icon: Lock, category: 'High' },
  { name: 'Cybereason', icon: Shield, category: 'High' },
  { name: 'SentinelOne', icon: Eye, category: 'High' },
  { name: 'Trustwave', icon: Globe, category: 'Medium' },
  { name: 'Baidu', icon: Search, category: 'Medium' },
  { name: 'Yandex', icon: Search, category: 'Medium' },
  { name: 'Qihoo360', icon: Shield, category: 'Medium' },
  { name: 'Tencent', icon: Shield, category: 'Medium' },
  { name: 'Alibaba', icon: Globe, category: 'Medium' },
  { name: 'Ahnlab', icon: Lock, category: 'Medium' },
  { name: 'Hauri', icon: Shield, category: 'Medium' },
  { name: 'K7', icon: Lock, category: 'Medium' },
  { name: 'Quick Heal', icon: Shield, category: 'Medium' },
  { name: 'Bkav', icon: Lock, category: 'Medium' },
  { name: 'Jiangmin', icon: Shield, category: 'Medium' },
  { name: 'Rising', icon: TrendingUp, category: 'Medium' },
  { name: 'VBA32', icon: Lock, category: 'Medium' },
  { name: 'Zillya', icon: Shield, category: 'Medium' },
  { name: 'ZoneAlarm', icon: Shield, category: 'Medium' },
  { name: 'Emsisoft', icon: Lock, category: 'Medium' },
  { name: 'GData', icon: Database, category: 'Medium' },
  { name: 'Ikarus', icon: Shield, category: 'Medium' },
  { name: 'Vipre', icon: Lock, category: 'Medium' },
  { name: 'VirIT', icon: Bug, category: 'Medium' },
  // Add more providers as needed...
];

// Pricing structure based on blacklist count
const pricingTiers = [
  {
    min: 1,
    max: 3,
    price: 199,
    name: 'Basic Removal',
    description: 'Perfect for small websites',
  },
  {
    min: 4,
    max: 8,
    price: 299,
    name: 'Standard Removal',
    description: 'Most common for business sites',
  },
  {
    min: 9,
    max: 15,
    price: 449,
    name: 'Comprehensive Removal',
    description: 'For seriously affected websites',
  },
  {
    min: 16,
    max: 999,
    price: 699,
    name: 'Enterprise Removal',
    description: 'Complete reputation recovery',
  },
];

// Add-on services
const addOnServices = [
  {
    id: 'malware-cleanup',
    name: 'Complete Malware Removal',
    price: 399,
    icon: Shield,
    description: 'Full malware scanning and cleanup',
    popular: true,
  },
  {
    id: 'ssl-setup',
    name: 'SSL Certificate Installation',
    price: 149,
    icon: Lock,
    description: 'Install and configure SSL certificate',
  },
  {
    id: 'security-audit',
    name: 'Security Vulnerability Audit',
    price: 249,
    icon: Eye,
    description: 'Comprehensive security assessment',
  },
  {
    id: 'monitoring',
    name: 'Blacklist Monitoring (6 months)',
    price: 199,
    icon: Settings,
    description: 'Continuous monitoring across 100+ blacklists',
  },
  {
    id: 'seo-recovery',
    name: 'SEO Impact Recovery',
    price: 399,
    icon: TrendingUp,
    description: 'Restore search rankings and organic traffic',
  },
  {
    id: 'email-deliverability',
    name: 'Email Deliverability Fix',
    price: 299,
    icon: Mail,
    description: 'Email server blacklist removal',
  },
];

const BlacklistRemovalPricing = () => {
  const [blacklistCount, setBlacklistCount] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [showAllProviders, setShowAllProviders] = useState(false);

  // Calculate pricing based on blacklist count
  const calculatePrice = () => {
    const tier = pricingTiers.find(
      (t) => blacklistCount >= t.min && blacklistCount <= t.max,
    );
    return { price: tier?.price || 699, tier };
  };

  const handleCountChange = (value: string) => {
    const num = parseInt(value) || 0;
    setBlacklistCount(Math.max(1, Math.min(999, num)));
  };

  const incrementCount = () => {
    setBlacklistCount((prev) => Math.min(999, prev + 1));
  };

  const decrementCount = () => {
    setBlacklistCount((prev) => Math.max(1, prev - 1));
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

  // Get providers by category for display
  const providersByCategory = {
    Critical: allSupportedProviders.filter((p) => p.category === 'Critical'),
    High: allSupportedProviders.filter((p) => p.category === 'High'),
    Medium: allSupportedProviders.filter((p) => p.category === 'Medium'),
  };

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
            <Badge className='bg-red-100 dark:bg-red-900/20 mb-6 px-4 py-2 border border-red-200/50 dark:border-red-800/50 font-medium text-red-800 dark:text-red-300 text-sm'>
              <AlertTriangle className='mr-2 w-4 h-4' />
              Professional Blacklist Removal
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-red-900 dark:via-red-100 to-slate-900 dark:to-white text-transparent'>
                Remove Your Site from Blacklists
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-3xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Tell us how many blacklists your website is on, and we'll remove
              it from all of them with our{' '}
              <strong>zero compromise guarantee</strong>.
            </p>

            {/* Trust Indicators */}
            <div className='flex flex-wrap justify-center items-center gap-6 mb-8'>
              <div className='flex items-center gap-2'>
                <Shield className='w-5 h-5 text-green-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  99.2% Success Rate
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-5 h-5 text-blue-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  24-72 Hour Removal
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Award className='w-5 h-5 text-purple-600' />
                <span className='text-slate-600 dark:text-slate-300 text-sm'>
                  100+ Providers Supported
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className='gap-8 grid grid-cols-1 lg:grid-cols-3'>
            {/* Blacklist Count Input - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='lg:col-span-2'>
              <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <div className='mb-8'>
                  <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                    How Many Blacklists?
                  </h2>
                  <p className='text-slate-600 dark:text-slate-300'>
                    Enter the number of security providers that have blacklisted
                    your website. Not sure? We can help you check.
                  </p>
                </div>

                {/* Count Input */}
                <div className='mb-8'>
                  <div className='flex justify-center items-center gap-4 mb-6'>
                    <Button
                      variant='outline'
                      size='lg'
                      onClick={decrementCount}
                      disabled={blacklistCount <= 1}
                      className='bg-white/50 dark:bg-slate-800/50 p-0 w-12 h-12'>
                      <Minus className='w-6 h-6' />
                    </Button>

                    <div className='relative'>
                      <Input
                        type='number'
                        min='1'
                        max='999'
                        value={blacklistCount}
                        onChange={(e) => handleCountChange(e.target.value)}
                        className='bg-white/50 dark:bg-slate-800/50 px-6 py-4 border-2 rounded-xl w-32 font-bold text-2xl text-center'
                      />
                    </div>

                    <Button
                      variant='outline'
                      size='lg'
                      onClick={incrementCount}
                      disabled={blacklistCount >= 999}
                      className='bg-white/50 dark:bg-slate-800/50 p-0 w-12 h-12'>
                      <Plus className='w-6 h-6' />
                    </Button>
                  </div>

                  <div className='text-center'>
                    <p className='text-slate-600 dark:text-slate-300 text-sm'>
                      blacklist{blacklistCount !== 1 ? 's' : ''} detected
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
                          {tierItem.min}-
                          {tierItem.max === 999 ? '999+' : tierItem.max}{' '}
                          blacklists
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Free Blacklist Check CTA */}
                <div className='bg-blue-50/50 dark:bg-blue-950/20 p-6 border border-blue-200/30 dark:border-blue-800/30 rounded-lg text-center'>
                  <h4 className='mb-2 font-semibold text-blue-800 dark:text-blue-300'>
                    Not Sure How Many Blacklists?
                  </h4>
                  <p className='mb-4 text-blue-700 dark:text-blue-300 text-sm'>
                    We can scan your website across 100+ blacklist databases for
                    free
                  </p>
                  <Button
                    variant='outline'
                    className='bg-white/80 dark:bg-slate-800/80'>
                    <Search className='mr-2 w-4 h-4' />
                    Get Free Blacklist Check
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
                  <div className='inline-flex justify-center items-center bg-gradient-to-r from-red-600 to-orange-600 mb-4 rounded-2xl w-16 h-16'>
                    <Shield className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                    Professional Blacklist Removal
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-sm'>
                    Complete removal service with verification
                  </p>
                </div>

                {/* What's Included */}
                <div className='mb-6'>
                  <h4 className='mb-3 font-semibold text-slate-900 dark:text-white text-sm'>
                    What's Included
                  </h4>
                  <div className='space-y-2'>
                    {[
                      'Professional blacklist removal',
                      'Submission to all affected providers',
                      'Follow-up until removal confirmed',
                      'Removal verification report',
                      '30-day reoccurrence monitoring',
                      'Email support throughout process',
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
                      {blacklistCount} blacklist
                      {blacklistCount !== 1 ? 's' : ''}
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
                      '100% removal or money back',
                      '24-72 hour turnaround',
                      '30-day monitoring included',
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
                  className='bg-gradient-to-r from-red-600 to-orange-600 mb-4 py-6 border-0 w-full text-white'
                  size='lg'>
                  <Shield className='mr-2 w-5 h-5' />
                  Remove {blacklistCount} Blacklist
                  {blacklistCount !== 1 ? 's' : ''}
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

          {/* Supported Providers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-16'>
            <div className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
              <div className='mb-8 text-center'>
                <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                  100+ Supported Security Providers
                </h3>
                <p className='text-slate-600 dark:text-slate-300'>
                  We can remove your website from any of these blacklist
                  databases
                </p>
              </div>

              {/* Category Tabs */}
              <div className='mb-8'>
                <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
                  {Object.entries(providersByCategory).map(
                    ([category, providers]) => (
                      <div
                        key={category}
                        className='bg-white/50 dark:bg-slate-800/50 p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-xl'>
                        <div className='mb-4 text-center'>
                          <Badge
                            className={cn(
                              'mb-2',
                              category === 'Critical' &&
                                'bg-red-100 text-red-800',
                              category === 'High' &&
                                'bg-orange-100 text-orange-800',
                              category === 'Medium' &&
                                'bg-yellow-100 text-yellow-800',
                            )}>
                            {category} Impact
                          </Badge>
                          <h4 className='font-semibold text-slate-900 dark:text-white'>
                            {providers.length} Providers
                          </h4>
                        </div>

                        <div className='gap-3 grid grid-cols-2 lg:grid-cols-3'>
                          {(showAllProviders
                            ? providers
                            : providers.slice(0, 6)
                          ).map((provider, idx) => (
                            <div
                              key={idx}
                              className='flex flex-col items-center gap-1 bg-white/50 dark:bg-slate-900/20 p-2 rounded-lg'>
                              <provider.icon className='w-5 h-5 text-slate-600 dark:text-slate-400' />
                              <span className='text-slate-700 dark:text-slate-300 text-xs text-center leading-tight'>
                                {provider.name}
                              </span>
                            </div>
                          ))}
                        </div>

                        {!showAllProviders && providers.length > 6 && (
                          <div className='mt-3 text-center'>
                            <span className='text-slate-500 dark:text-slate-400 text-xs'>
                              +{providers.length - 6} more
                            </span>
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className='text-center'>
                <Button
                  variant='outline'
                  onClick={() => setShowAllProviders(!showAllProviders)}
                  className='bg-white/50 dark:bg-slate-800/50'>
                  <Eye className='mr-2 w-4 h-4' />
                  {showAllProviders ? 'Show Less' : 'View All Providers'}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Add-on Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md mt-8 p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
            <h3 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
              Recommended Add-on Services
            </h3>
            <p className='mb-8 text-slate-600 dark:text-slate-300'>
              Often blacklisting is caused by security issues. These services
              address root causes and prevent future problems.
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
                className='bg-gradient-to-r from-red-50 dark:from-red-950/20 to-orange-50 dark:to-orange-950/20 mt-8 p-8 border border-red-200/50 dark:border-red-800/50 rounded-2xl'>
                <div className='flex md:flex-row flex-col justify-between items-start md:items-center gap-6'>
                  <div>
                    <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                      Total Investment
                    </h3>
                    <div className='space-y-1 text-sm'>
                      <div className='text-slate-600 dark:text-slate-300'>
                        Blacklist Removal: {blacklistCount} provider
                        {blacklistCount !== 1 ? 's' : ''}
                      </div>
                      <div className='text-slate-600 dark:text-slate-300'>
                        Add-on Services: {selectedAddOns.length} selected
                      </div>
                    </div>
                  </div>

                  <div className='text-center md:text-right'>
                    <div className='font-bold text-3xl md:text-4xl'>
                      <span className='bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 text-transparent'>
                        ${calculateTotal().toLocaleString()}
                      </span>
                    </div>
                    <div className='text-slate-500 text-xs'>
                      *Includes 30-day monitoring
                    </div>
                  </div>
                </div>

                <div className='flex sm:flex-row flex-col gap-4 mt-8'>
                  <Button
                    size='lg'
                    className='flex-1 bg-gradient-to-r from-red-600 to-orange-600 px-8 py-6 border-0 text-white'>
                    <AlertTriangle className='mr-2 w-5 h-5' />
                    Start Complete Recovery
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
                Zero Reoccurrence Guarantee
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Users className='w-5 h-5 text-blue-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                5,000+ Sites Restored
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Clock className='w-5 h-5 text-purple-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                24/7 Emergency Support
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Award className='w-5 h-5 text-orange-600' />
              <span className='text-slate-600 dark:text-slate-300'>
                Industry-Leading Success Rate
              </span>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default BlacklistRemovalPricing;
