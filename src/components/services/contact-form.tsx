'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  User,
  Building,
  MessageSquare,
  Send,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Shield,
  Clock,
  Star,
  Globe,
  Code,
  TrendingUp,
  Video,
  Palette,
  Settings,
  Headphones,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ComponentWrapper from '../common/component-wrapper';

// Service options for the dropdown
const serviceOptions = [
  { value: 'web-development', label: 'Web Development', icon: Code },
  { value: 'seo-marketing', label: 'SEO & Marketing', icon: TrendingUp },
  { value: 'video-editing', label: 'Video Editing', icon: Video },
  { value: 'graphics-design', label: 'Graphics & Design', icon: Palette },
  { value: 'maintenance', label: 'Website Maintenance', icon: Settings },
  { value: 'consultation', label: 'Free Consultation', icon: Headphones },
  { value: 'other', label: 'Other Services', icon: Globe },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);

    // Handle form submission logic here
    console.log('Contact form submitted:', formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <section className='relative py-16 md:py-24 overflow-hidden'>
        <ComponentWrapper>
          <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl container'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className='bg-white/70 dark:bg-slate-800/70 shadow-xl backdrop-blur-md p-8 md:p-12 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl text-center'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className='flex justify-center items-center bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mb-6 p-4 rounded-full w-20 h-20'>
                <CheckCircle className='w-10 h-10 text-white' />
              </motion.div>

              <h2 className='mb-4 font-bold text-slate-900 dark:text-white text-3xl'>
                Message Sent Successfully!
              </h2>

              <p className='mb-6 text-slate-600 dark:text-slate-300 text-lg'>
                Thank you for reaching out to us. We'll get back to you within
                24 hours with a personalized response.
              </p>

              <div className='flex sm:flex-row flex-col justify-center items-center gap-4 mb-8'>
                <div className='flex items-center gap-2 text-slate-600 dark:text-slate-300'>
                  <Clock className='w-5 h-5 text-blue-600' />
                  <span className='text-sm'>Response within 24 hours</span>
                </div>
                <div className='flex items-center gap-2 text-slate-600 dark:text-slate-300'>
                  <Shield className='w-5 h-5 text-green-600' />
                  <span className='text-sm'>Your data is secure</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    service: '',
                    message: '',
                  });
                }}
                className='bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white'>
                Send Another Message
              </Button>
            </motion.div>
          </div>
        </ComponentWrapper>
      </section>
    );
  }

  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl container'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center'>
            <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
              <Sparkles className='mr-2 w-4 h-4 text-blue-600' />
              Get In Touch
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Contact Us
              </span>
            </h1>

            <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Ready to start your project? Have a question? We'd love to hear
              from you. Send us a message and we'll respond within 24 hours.
            </p>
          </motion.div>

          <div className='gap-8 grid grid-cols-1 lg:grid-cols-3'>
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='lg:col-span-2'>
              <form
                onSubmit={handleSubmit}
                className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <div className='space-y-6'>
                  {/* Name & Email Row */}
                  <div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
                    <div>
                      <Label
                        htmlFor='name'
                        className='flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300'>
                        <User className='w-4 h-4' />
                        Full Name *
                      </Label>
                      <Input
                        id='name'
                        type='text'
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        placeholder='John Doe'
                        className='bg-white/50 dark:bg-slate-800/50'
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor='email'
                        className='flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300'>
                        <Mail className='w-4 h-4' />
                        Email Address *
                      </Label>
                      <Input
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        placeholder='john@company.com'
                        className='bg-white/50 dark:bg-slate-800/50'
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
                    <div>
                      <Label
                        htmlFor='phone'
                        className='flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300'>
                        <Phone className='w-4 h-4' />
                        Phone Number
                      </Label>
                      <Input
                        id='phone'
                        type='tel'
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange('phone', e.target.value)
                        }
                        placeholder='+1 (555) 123-4567'
                        className='bg-white/50 dark:bg-slate-800/50'
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor='company'
                        className='flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300'>
                        <Building className='w-4 h-4' />
                        Company Name
                      </Label>
                      <Input
                        id='company'
                        type='text'
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange('company', e.target.value)
                        }
                        placeholder='Your Company Inc.'
                        className='bg-white/50 dark:bg-slate-800/50'
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <Label
                      htmlFor='service'
                      className='flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300'>
                      <Globe className='w-4 h-4' />
                      Service Interested In
                    </Label>
                    <select
                      id='service'
                      value={formData.service}
                      onChange={(e) =>
                        handleInputChange('service', e.target.value)
                      }
                      className='bg-white/50 dark:bg-slate-800/50 p-3 border border-slate-200 dark:border-slate-700 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full'>
                      <option value=''>Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <Label
                      htmlFor='message'
                      className='flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300'>
                      <MessageSquare className='w-4 h-4' />
                      Message *
                    </Label>
                    <Textarea
                      id='message'
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange('message', e.target.value)
                      }
                      placeholder='Tell us about your project, goals, timeline, and any specific requirements...'
                      className='bg-white/50 dark:bg-slate-800/50 min-h-[120px]'
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className='pt-4'>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      size='lg'
                      className='bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 border-0 w-full text-white'>
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            className='mr-2 border-2 border-white/30 border-t-white rounded-full w-5 h-5'
                          />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className='mr-2 w-5 h-5' />
                          Send Message
                          <ArrowRight className='ml-2 w-5 h-5' />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='space-y-6'>
              {/* Contact Info Card */}
              <div className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-xl'>
                  Let's Talk
                </h3>

                <div className='space-y-4'>
                  <div className='flex items-start gap-3'>
                    <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg'>
                      <Mail className='w-4 h-4 text-white' />
                    </div>
                    <div>
                      <p className='font-medium text-slate-900 dark:text-white text-sm'>
                        Email Us
                      </p>
                      <p className='text-slate-600 dark:text-slate-300 text-sm'>
                        hello@3zerodigital.com
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <div className='bg-gradient-to-r from-emerald-600 to-green-600 p-2 rounded-lg'>
                      <Phone className='w-4 h-4 text-white' />
                    </div>
                    <div>
                      <p className='font-medium text-slate-900 dark:text-white text-sm'>
                        Call Us
                      </p>
                      <p className='text-slate-600 dark:text-slate-300 text-sm'>
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <div className='bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-lg'>
                      <Clock className='w-4 h-4 text-white' />
                    </div>
                    <div>
                      <p className='font-medium text-slate-900 dark:text-white text-sm'>
                        Response Time
                      </p>
                      <p className='text-slate-600 dark:text-slate-300 text-sm'>
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className='bg-gradient-to-br from-blue-50/50 dark:from-blue-950/20 to-purple-50/50 dark:to-purple-950/20 backdrop-blur-md p-6 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl'>
                <h4 className='mb-4 font-bold text-slate-900 dark:text-white'>
                  Why Choose 3Zero Digital?
                </h4>

                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='w-4 h-4 text-green-600' />
                    <span className='text-slate-600 dark:text-slate-300 text-sm'>
                      0 Vulnerabilities Guarantee
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='w-4 h-4 text-green-600' />
                    <span className='text-slate-600 dark:text-slate-300 text-sm'>
                      24/7 Support & Monitoring
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='w-4 h-4 text-green-600' />
                    <span className='text-slate-600 dark:text-slate-300 text-sm'>
                      Free Consultation Call
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='w-4 h-4 text-green-600' />
                    <span className='text-slate-600 dark:text-slate-300 text-sm'>
                      Fast Project Delivery
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='flex flex-wrap justify-center items-center gap-6 mt-12 text-center'>
            <div className='flex items-center gap-2'>
              <Shield className='w-5 h-5 text-green-600' />
              <span className='text-slate-600 dark:text-slate-300 text-sm'>
                Secure & Confidential
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Clock className='w-5 h-5 text-blue-600' />
              <span className='text-slate-600 dark:text-slate-300 text-sm'>
                24hr Response Time
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Star className='w-5 h-5 text-yellow-500' />
              <span className='text-slate-600 dark:text-slate-300 text-sm'>
                5-Star Client Reviews
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <CheckCircle className='w-5 h-5 text-emerald-600' />
              <span className='text-slate-600 dark:text-slate-300 text-sm'>
                Free Consultation
              </span>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default ContactForm;
