'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Globe,
  ShoppingCart,
  Database,
  Layers,
  Headphones,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Users,
  Calendar,
  Zap,
  Shield,
  Settings,
  Mail,
  Phone,
  Building,
  User,
  MessageSquare,
  Star,
  Target,
  Palette,
  Search,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import ComponentWrapper from '../common/component-wrapper';

// Service configuration
const services = [
  {
    id: 'wordpress',
    name: 'WordPress',
    icon: Globe,
    description: 'Custom WordPress websites and themes',
    basePrice: 2500,
    color: 'from-blue-600 to-blue-700',
    bgColor:
      'from-blue-50/50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20',
    features: [
      'Custom themes',
      'Plugin development',
      'CMS setup',
      'SEO optimization',
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: Zap,
    description: 'Modern React framework applications',
    basePrice: 4000,
    color: 'from-purple-600 to-purple-700',
    bgColor:
      'from-purple-50/50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20',
    features: [
      'SSR/SSG',
      'API routes',
      'Performance optimization',
      'Modern architecture',
    ],
  },
  {
    id: 'react',
    name: 'React',
    icon: Code,
    description: 'Interactive web applications',
    basePrice: 3500,
    color: 'from-emerald-600 to-emerald-700',
    bgColor:
      'from-emerald-50/50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/20',
    features: [
      'Component library',
      'State management',
      'Responsive design',
      'Testing',
    ],
  },
  {
    id: 'mern',
    name: 'MERN Stack',
    icon: Database,
    description: 'Full-stack web applications',
    basePrice: 6000,
    color: 'from-orange-600 to-orange-700',
    bgColor:
      'from-orange-50/50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/20',
    features: [
      'MongoDB',
      'Express.js',
      'React',
      'Node.js',
      'Full authentication',
    ],
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: ShoppingCart,
    description: 'E-commerce solutions',
    basePrice: 3000,
    color: 'from-green-600 to-green-700',
    bgColor:
      'from-green-50/50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20',
    features: [
      'Custom themes',
      'App development',
      'Payment integration',
      'Inventory management',
    ],
  },
  {
    id: 'headless',
    name: 'Headless CMS',
    icon: Layers,
    description: 'Decoupled content management',
    basePrice: 5000,
    color: 'from-indigo-600 to-indigo-700',
    bgColor:
      'from-indigo-50/50 to-indigo-100/50 dark:from-indigo-950/20 dark:to-indigo-900/20',
    features: [
      'API-first',
      'Multi-platform',
      'Scalable architecture',
      'Content delivery',
    ],
  },
];

// Project complexity options
const complexityOptions = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Simple website with standard features',
    multiplier: 1,
    icon: Star,
    features: [
      'Up to 10 pages',
      'Basic functionality',
      'Standard design',
      '2-4 weeks',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Enhanced features and custom functionality',
    multiplier: 1.5,
    icon: Target,
    features: [
      'Up to 25 pages',
      'Custom features',
      'Advanced design',
      '4-8 weeks',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Complex application with advanced features',
    multiplier: 2.5,
    icon: Sparkles,
    features: [
      'Unlimited pages',
      'Complex integrations',
      'Custom architecture',
      '8+ weeks',
    ],
  },
];

// Additional features
const additionalFeatures = [
  { id: 'seo', name: 'SEO Optimization', price: 800, icon: Search },
  { id: 'mobile-app', name: 'Mobile App', price: 5000, icon: Smartphone },
  { id: 'cms', name: 'Custom CMS', price: 2000, icon: Settings },
  {
    id: 'ecommerce',
    name: 'E-commerce Integration',
    price: 3000,
    icon: ShoppingCart,
  },
  { id: 'auth', name: 'User Authentication', price: 1500, icon: Shield },
  { id: 'api', name: 'API Development', price: 2500, icon: Database },
  { id: 'analytics', name: 'Analytics Setup', price: 500, icon: Target },
  { id: 'hosting', name: 'Hosting & Deployment', price: 300, icon: Globe },
];

// Timeline options
const timelineOptions = [
  { id: 'asap', name: 'ASAP (Rush Job)', multiplier: 1.5, icon: Zap },
  { id: 'standard', name: 'Standard Timeline', multiplier: 1, icon: Calendar },
  { id: 'flexible', name: 'Flexible Timeline', multiplier: 0.9, icon: Clock },
];

interface FormData {
  // Contact Information
  name: string;
  email: string;
  phone: string;
  company: string;

  // Project Details
  selectedService: string;
  complexity: string;
  timeline: string;
  additionalFeatures: string[];

  // Project Description
  projectDescription: string;
  specificRequirements: string;

  // Budget
  budgetRange: string;
}

const EstimatePrice = ({ serviceId }: { serviceId: string }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    selectedService: serviceId,
    complexity: 'basic',
    timeline: 'standard',
    additionalFeatures: [],
    projectDescription: '',
    specificRequirements: '',
    budgetRange: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Calculate estimated price
  const calculatePrice = () => {
    if (!formData.selectedService || !formData.complexity) return 0;

    const service = services.find((s) => s.id === formData.selectedService);
    const complexity = complexityOptions.find(
      (c) => c.id === formData.complexity,
    );
    const timeline = timelineOptions.find((t) => t.id === formData.timeline);

    if (!service || !complexity || !timeline) return 0;

    let basePrice =
      service.basePrice * complexity.multiplier * timeline.multiplier;

    // Add additional features
    const featuresPrice = formData.additionalFeatures.reduce(
      (total, featureId) => {
        const feature = additionalFeatures.find((f) => f.id === featureId);
        return total + (feature?.price || 0);
      },
      0,
    );

    return Math.round(basePrice + featuresPrice);
  };

  // Update estimated price when form data changes
  React.useEffect(() => {
    setEstimatedPrice(calculatePrice());
  }, [
    formData.selectedService,
    formData.complexity,
    formData.timeline,
    formData.additionalFeatures,
  ]);

  const handleServiceSelect = (serviceId: string) => {
    setFormData((prev) => ({ ...prev, selectedService: serviceId }));
  };

  const handleComplexitySelect = (complexityId: string) => {
    setFormData((prev) => ({ ...prev, complexity: complexityId }));
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalFeatures: prev.additionalFeatures.includes(featureId)
        ? prev.additionalFeatures.filter((id) => id !== featureId)
        : [...prev.additionalFeatures, featureId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form Data:', formData);
    console.log('Estimated Price:', estimatedPrice);
  };

  const selectedService = services.find(
    (s) => s.id === formData.selectedService,
  );
  const selectedComplexity = complexityOptions.find(
    (c) => c.id === formData.complexity,
  );

  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <motion.div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl container'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center'>
            <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
              <Sparkles className='mr-2 w-4 h-4 text-blue-600' />
              Get Your Custom Quote
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Development Services
              </span>
            </h1>

            <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-lg'>
              Tell us about your project and get an instant estimate. Every
              project is unique, and we'll provide a detailed quote within 24
              hours.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Step 1: Service Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
              <div className='mb-6'>
                <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                  Choose Your Technology Stack
                </h2>
                <p className='text-slate-600 dark:text-slate-300'>
                  Select the technology that best fits your project requirements
                </p>
              </div>

              <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleServiceSelect(service.id)}
                    className={cn(
                      'cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 group',
                      formData.selectedService === service.id
                        ? 'bg-white dark:bg-slate-800 border-blue-500 shadow-lg'
                        : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600',
                    )}>
                    {/* Service Icon & Badge */}
                    <div className='flex justify-between items-start mb-4'>
                      <div
                        className={cn(
                          'p-3 rounded-lg bg-gradient-to-r',
                          service.color,
                        )}>
                        <service.icon className='w-6 h-6 text-white' />
                      </div>

                      {formData.selectedService === service.id && (
                        <CheckCircle className='w-6 h-6 text-blue-600' />
                      )}
                    </div>

                    {/* Service Info */}
                    <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-lg'>
                      {service.name}
                    </h3>
                    <p className='mb-4 text-slate-600 dark:text-slate-300 text-sm'>
                      {service.description}
                    </p>

                    {/* Starting Price */}
                    <div className='mb-4'>
                      <span className='text-slate-500 text-xs'>
                        Starting from
                      </span>
                      <div className='font-bold text-slate-900 dark:text-white text-xl'>
                        ${service.basePrice.toLocaleString()}
                      </div>
                    </div>

                    {/* Features */}
                    <div className='space-y-1'>
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className='flex items-center gap-2'>
                          <CheckCircle className='w-3 h-3 text-green-600' />
                          <span className='text-slate-600 dark:text-slate-400 text-xs'>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Step 2: Project Complexity */}
            <AnimatePresence>
              {formData.selectedService && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                  <div className='mb-6'>
                    <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                      Project Complexity
                    </h2>
                    <p className='text-slate-600 dark:text-slate-300'>
                      Choose the complexity level that matches your project
                      scope
                    </p>
                  </div>

                  <div className='gap-6 grid grid-cols-1 md:grid-cols-3'>
                    {complexityOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleComplexitySelect(option.id)}
                        className={cn(
                          'cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 relative',
                          formData.complexity === option.id
                            ? 'bg-white dark:bg-slate-800 border-blue-500 shadow-lg'
                            : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300',
                        )}>
                        {/* Multiplier Badge */}
                        <div className='top-4 right-4 absolute'>
                          <Badge
                            className={cn(
                              'text-xs',
                              option.multiplier > 1
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-green-100 text-green-800',
                            )}>
                            {option.multiplier > 1 ? '+' : ''}
                            {((option.multiplier - 1) * 100).toFixed(0)}%
                          </Badge>
                        </div>

                        <div className='mb-4'>
                          <option.icon className='mb-3 w-8 h-8 text-blue-600' />
                          <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-xl'>
                            {option.name}
                          </h3>
                          <p className='text-slate-600 dark:text-slate-300 text-sm'>
                            {option.description}
                          </p>
                        </div>

                        <div className='space-y-2'>
                          {option.features.map((feature, idx) => (
                            <div key={idx} className='flex items-center gap-2'>
                              <CheckCircle className='w-3 h-3 text-green-600' />
                              <span className='text-slate-600 dark:text-slate-400 text-xs'>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {formData.complexity === option.id && (
                          <CheckCircle className='top-4 left-4 absolute w-6 h-6 text-blue-600' />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Additional Features */}
            <AnimatePresence>
              {formData.complexity && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                  <div className='mb-6'>
                    <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                      Additional Features
                    </h2>
                    <p className='text-slate-600 dark:text-slate-300'>
                      Select any additional features you need for your project
                    </p>
                  </div>

                  <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                    {additionalFeatures.map((feature) => (
                      <motion.div
                        key={feature.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleFeatureToggle(feature.id)}
                        className={cn(
                          'cursor-pointer p-4 rounded-lg border-2 transition-all duration-300',
                          formData.additionalFeatures.includes(feature.id)
                            ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-500'
                            : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300',
                        )}>
                        <div className='flex justify-between items-start mb-2'>
                          <feature.icon
                            className={cn(
                              'w-5 h-5',
                              formData.additionalFeatures.includes(feature.id)
                                ? 'text-blue-600'
                                : 'text-slate-500',
                            )}
                          />

                          {formData.additionalFeatures.includes(feature.id) && (
                            <CheckCircle className='w-5 h-5 text-blue-600' />
                          )}
                        </div>

                        <h4 className='mb-1 font-semibold text-slate-900 dark:text-white text-sm'>
                          {feature.name}
                        </h4>
                        <p className='font-semibold text-blue-600 text-sm'>
                          +${feature.price.toLocaleString()}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Timeline & Contact */}
            <AnimatePresence>
              {formData.complexity && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className='gap-8 grid grid-cols-1 lg:grid-cols-2'>
                  {/* Timeline Selection */}
                  <div className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                    <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-xl'>
                      Project Timeline
                    </h3>

                    <div className='space-y-3'>
                      {timelineOptions.map((option) => (
                        <label key={option.id} className='block'>
                          <input
                            type='radio'
                            name='timeline'
                            value={option.id}
                            checked={formData.timeline === option.id}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                timeline: e.target.value,
                              }))
                            }
                            className='sr-only'
                          />
                          <div
                            className={cn(
                              'flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
                              formData.timeline === option.id
                                ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-500'
                                : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300',
                            )}>
                            <option.icon className='w-5 h-5 text-blue-600' />
                            <div className='flex-1'>
                              <div className='font-semibold text-slate-900 dark:text-white text-sm'>
                                {option.name}
                              </div>
                              {option.multiplier !== 1 && (
                                <div className='text-slate-500 text-xs'>
                                  {option.multiplier > 1 ? '+' : ''}
                                  {((option.multiplier - 1) * 100).toFixed(0)}%
                                  pricing adjustment
                                </div>
                              )}
                            </div>
                            {formData.timeline === option.id && (
                              <CheckCircle className='w-5 h-5 text-blue-600' />
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                    <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-xl'>
                      Contact Information
                    </h3>

                    <div className='space-y-4'>
                      <div className='gap-4 grid grid-cols-1 sm:grid-cols-2'>
                        <div>
                          <Label
                            htmlFor='name'
                            className='text-slate-700 dark:text-slate-300'>
                            Full Name *
                          </Label>
                          <Input
                            id='name'
                            type='text'
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className='bg-white/50 dark:bg-slate-800/50'
                            required
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor='email'
                            className='text-slate-700 dark:text-slate-300'>
                            Email Address *
                          </Label>
                          <Input
                            id='email'
                            type='email'
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className='bg-white/50 dark:bg-slate-800/50'
                            required
                          />
                        </div>
                      </div>

                      <div className='gap-4 grid grid-cols-1 sm:grid-cols-2'>
                        <div>
                          <Label
                            htmlFor='phone'
                            className='text-slate-700 dark:text-slate-300'>
                            Phone Number
                          </Label>
                          <Input
                            id='phone'
                            type='tel'
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            className='bg-white/50 dark:bg-slate-800/50'
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor='company'
                            className='text-slate-700 dark:text-slate-300'>
                            Company Name
                          </Label>
                          <Input
                            id='company'
                            type='text'
                            value={formData.company}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                company: e.target.value,
                              }))
                            }
                            className='bg-white/50 dark:bg-slate-800/50'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 5: Project Description */}
            <AnimatePresence>
              {formData.name && formData.email && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                  <h3 className='mb-6 font-bold text-slate-900 dark:text-white text-2xl'>
                    Tell Us About Your Project
                  </h3>

                  <div className='space-y-6'>
                    <div>
                      <Label
                        htmlFor='description'
                        className='text-slate-700 dark:text-slate-300 text-base'>
                        Project Description *
                      </Label>
                      <p className='mb-2 text-slate-500 text-sm'>
                        Describe your project goals, target audience, and key
                        features you envision
                      </p>
                      <Textarea
                        id='description'
                        value={formData.projectDescription}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            projectDescription: e.target.value,
                          }))
                        }
                        placeholder='e.g., We need an e-commerce website for selling handmade jewelry. We want to showcase our products beautifully, accept online payments, and manage inventory...'
                        className='bg-white/50 dark:bg-slate-800/50 min-h-[120px]'
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor='requirements'
                        className='text-slate-700 dark:text-slate-300 text-base'>
                        Specific Requirements
                      </Label>
                      <p className='mb-2 text-slate-500 text-sm'>
                        Any specific features, integrations, or technical
                        requirements
                      </p>
                      <Textarea
                        id='requirements'
                        value={formData.specificRequirements}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            specificRequirements: e.target.value,
                          }))
                        }
                        placeholder='e.g., Integration with existing CRM, multi-language support, specific payment gateways, custom user roles...'
                        className='bg-white/50 dark:bg-slate-800/50 min-h-[100px]'
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor='budget'
                        className='text-slate-700 dark:text-slate-300 text-base'>
                        Budget Range
                      </Label>
                      <p className='mb-2 text-slate-500 text-sm'>
                        What's your expected budget range for this project?
                      </p>
                      <select
                        id='budget'
                        value={formData.budgetRange}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            budgetRange: e.target.value,
                          }))
                        }
                        className='bg-white/50 dark:bg-slate-800/50 p-3 border border-slate-200 dark:border-slate-700 rounded-lg w-full'>
                        <option value=''>Select budget range</option>
                        <option value='under-5k'>Under $5,000</option>
                        <option value='5k-10k'>$5,000 - $10,000</option>
                        <option value='10k-25k'>$10,000 - $25,000</option>
                        <option value='25k-50k'>$25,000 - $50,000</option>
                        <option value='50k-plus'>$50,000+</option>
                        <option value='discuss'>Prefer to discuss</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Price Estimate & Submit */}
            <AnimatePresence>
              {estimatedPrice > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 shadow-lg p-6 md:p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl'>
                  <div className='flex md:flex-row flex-col justify-between items-start md:items-center gap-6'>
                    <div>
                      <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                        Estimated Project Cost
                      </h3>
                      <p className='mb-4 text-slate-600 dark:text-slate-300'>
                        This is a preliminary estimate. Final pricing will be
                        provided after our consultation.
                      </p>

                      {selectedService && selectedComplexity && (
                        <div className='space-y-2 text-sm'>
                          <div className='flex items-center gap-2'>
                            <selectedService.icon className='w-4 h-4 text-slate-500' />
                            <span className='text-slate-600 dark:text-slate-400'>
                              {selectedService.name} • {selectedComplexity.name}
                            </span>
                          </div>
                          {formData.additionalFeatures.length > 0 && (
                            <div className='text-slate-500'>
                              +{formData.additionalFeatures.length} additional
                              features
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className='text-center md:text-right'>
                      <div className='mb-2 text-slate-500 text-sm'>
                        Starting from
                      </div>
                      <div className='font-bold text-3xl md:text-4xl'>
                        <span className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent'>
                          ${estimatedPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className='text-slate-500 text-xs'>
                        *Final price may vary based on detailed requirements
                      </div>
                    </div>
                  </div>

                  <div className='flex sm:flex-row flex-col gap-4 mt-8'>
                    <Button
                      type='submit'
                      size='lg'
                      className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 border-0 text-white'>
                      <MessageSquare className='mr-2 w-5 h-5' />
                      Get Detailed Quote
                      <ArrowRight className='ml-2 w-5 h-5' />
                    </Button>

                    <Button
                      type='button'
                      variant='outline'
                      size='lg'
                      className='bg-white/80 dark:bg-slate-800/80 px-8 py-6'>
                      <Phone className='mr-2 w-5 h-5' />
                      Schedule Call
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='flex flex-wrap justify-center items-center gap-6 mt-12 text-center'>
            <div className='flex items-center gap-2'>
              <Shield className='w-5 h-5 text-green-600' />
              <span className='text-slate-600 dark:text-slate-300 text-sm'>
                0 Vulnerabilities Guarantee
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Clock className='w-5 h-5 text-blue-600' />
              <span className='text-slate-600 dark:text-slate-300 text-sm'>
                24hr Quote Response
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Star className='w-5 h-5 text-yellow-500' />
              <span className='text-slate-600 dark:text-slate-300 text-sm'>
                5-Star Client Rating
              </span>
            </div>
          </motion.div>
        </motion.div>
      </ComponentWrapper>
    </section>
  );
};

export default EstimatePrice;
