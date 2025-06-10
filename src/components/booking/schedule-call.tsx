'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Code,
  TrendingUp,
  Video,
  Palette,
  Settings,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import ComponentWrapper from '../common/component-wrapper';

// Service options
const serviceOptions = [
  { value: 'web-development', label: 'Web Development', icon: Code },
  { value: 'seo-marketing', label: 'SEO & Marketing', icon: TrendingUp },
  { value: 'video-editing', label: 'Video Editing', icon: Video },
  { value: 'graphics-design', label: 'Graphics & Design', icon: Palette },
  { value: 'maintenance', label: 'Website Maintenance', icon: Settings },
  { value: 'consultation', label: 'General Consultation', icon: Headphones },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface BookingData {
  date: Date | null;
  timeSlot: string;
}

const ScheduleCall = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isSelectable = isCurrentMonth && !isPast && !isWeekend;

      days.push({
        date,
        isCurrentMonth,
        isPast,
        isWeekend,
        isSelectable,
        isSelected:
          selectedDate && date.toDateString() === selectedDate.toDateString(),
      });
    }

    return days;
  };

  // Fetch available time slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date: Date) => {
    setLoadingSlots(true);
    try {
      const response = await fetch(
        `/api/bookings/available-slots?date=${date.toISOString()}`,
      );
      const data = await response.json();
      setAvailableSlots(data.availableSlots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot('');
    setCurrentStep(2);
  };

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
    setCurrentStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: selectedDate.toISOString(),
          timeSlot: selectedTimeSlot,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      if (response.ok) {
        setBookingComplete(true);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to book call');
      }
    } catch (error) {
      console.error('Error booking call:', error);
      alert('Failed to book call. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  if (bookingComplete) {
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
                Call Scheduled Successfully!
              </h2>

              <p className='mb-6 text-slate-600 dark:text-slate-300 text-lg'>
                We've sent you a confirmation email with all the details. We're
                excited to discuss your project!
              </p>

              <div className='bg-slate-50/50 dark:bg-slate-900/50 mb-8 p-6 border border-slate-200/30 dark:border-slate-700/30 rounded-xl'>
                <h3 className='mb-3 font-semibold text-slate-900 dark:text-white'>
                  Call Details:
                </h3>
                <div className='space-y-2 text-slate-600 dark:text-slate-300'>
                  <p>
                    <strong>Date:</strong>{' '}
                    {selectedDate && formatDate(selectedDate)}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedTimeSlot}
                  </p>
                  <p>
                    <strong>Duration:</strong> 30 minutes
                  </p>
                </div>
              </div>

              <Button
                onClick={() => {
                  setBookingComplete(false);
                  setCurrentStep(1);
                  setSelectedDate(null);
                  setSelectedTimeSlot('');
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
                Schedule Another Call
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
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl container'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center'>
            <Badge className='bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
              <Sparkles className='mr-2 w-4 h-4 text-blue-600' />
              Free 30-Minute Consultation
            </Badge>

            <h1 className='mb-4 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Schedule Your Call
              </span>
            </h1>

            <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              Book a free consultation to discuss your project. No commitments,
              just expert advice tailored to your needs.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='flex justify-center items-center gap-4 mb-12'>
            {[1, 2, 3].map((step) => (
              <div key={step} className='flex items-center'>
                <div
                  className={cn(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-all',
                    currentStep >= step
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                      : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700',
                  )}>
                  {currentStep > step ? (
                    <CheckCircle className='w-5 h-5' />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={cn(
                      'w-12 h-0.5 mx-2',
                      currentStep > step
                        ? 'bg-blue-600'
                        : 'bg-slate-200 dark:bg-slate-700',
                    )}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode='wait'>
            {/* Step 1: Date Selection */}
            {currentStep === 1 && (
              <motion.div
                key='step1'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <div className='mb-6 text-center'>
                  <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                    Choose a Date
                  </h2>
                  <p className='text-slate-600 dark:text-slate-300'>
                    Select a date for your consultation (weekdays only)
                  </p>
                </div>

                {/* Calendar Header */}
                <div className='flex justify-between items-center mb-6'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={prevMonth}
                    className='bg-white/50 dark:bg-slate-800/50'>
                    <ChevronLeft className='w-4 h-4' />
                  </Button>

                  <h3 className='font-bold text-slate-900 dark:text-white text-xl'>
                    {currentMonth.toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h3>

                  <Button
                    variant='outline'
                    size='sm'
                    onClick={nextMonth}
                    className='bg-white/50 dark:bg-slate-800/50'>
                    <ChevronRight className='w-4 h-4' />
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className='gap-2 grid grid-cols-7 mb-4'>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (day) => (
                      <div
                        key={day}
                        className='p-2 font-semibold text-slate-500 text-sm text-center'>
                        {day}
                      </div>
                    ),
                  )}
                </div>

                <div className='gap-2 grid grid-cols-7'>
                  {generateCalendarDays().map((day, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        day.isSelectable && handleDateSelect(day.date)
                      }
                      disabled={!day.isSelectable}
                      className={cn(
                        'p-3 text-sm rounded-lg transition-all',
                        day.isSelectable
                          ? 'hover:bg-blue-50 dark:hover:bg-blue-950/20 text-slate-900 dark:text-white cursor-pointer'
                          : 'text-slate-300 dark:text-slate-600 cursor-not-allowed',
                        day.isSelected &&
                          'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
                        !day.isCurrentMonth && 'opacity-30',
                      )}>
                      {day.date.getDate()}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Time Selection */}
            {currentStep === 2 && selectedDate && (
              <motion.div
                key='step2'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <div className='mb-6 text-center'>
                  <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                    Choose a Time
                  </h2>
                  <p className='text-slate-600 dark:text-slate-300'>
                    Available times for {formatDate(selectedDate)}
                  </p>
                </div>

                <div className='flex justify-center mb-6'>
                  <Button
                    variant='outline'
                    onClick={() => setCurrentStep(1)}
                    className='bg-white/50 dark:bg-slate-800/50'>
                    <ChevronLeft className='mr-2 w-4 h-4' />
                    Change Date
                  </Button>
                </div>

                {loadingSlots ? (
                  <div className='flex justify-center items-center py-12'>
                    <Loader2 className='w-8 h-8 text-blue-600 animate-spin' />
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className='py-12 text-center'>
                    <Clock className='mx-auto mb-4 w-12 h-12 text-slate-400' />
                    <p className='text-slate-600 dark:text-slate-300'>
                      No available slots for this date. Please choose another
                      date.
                    </p>
                  </div>
                ) : (
                  <div className='gap-3 grid grid-cols-2 md:grid-cols-4'>
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleTimeSlotSelect(slot)}
                        className={cn(
                          'p-4 rounded-lg border-2 transition-all font-medium',
                          selectedTimeSlot === slot
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                            : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-blue-300 text-slate-700 dark:text-slate-300',
                        )}>
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Contact Form */}
            {currentStep === 3 && (
              <motion.div
                key='step3'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
                <div className='mb-6 text-center'>
                  <h2 className='mb-2 font-bold text-slate-900 dark:text-white text-2xl'>
                    Your Details
                  </h2>
                  <p className='text-slate-600 dark:text-slate-300'>
                    Tell us about yourself and your project
                  </p>
                </div>

                {/* Selected Date/Time Summary */}
                <div className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 mb-8 p-4 border border-blue-200/50 dark:border-blue-800/50 rounded-xl'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='font-semibold text-slate-900 dark:text-white'>
                        {selectedDate && formatDate(selectedDate)} at{' '}
                        {selectedTimeSlot}
                      </p>
                      <p className='text-slate-600 dark:text-slate-300 text-sm'>
                        30-minute consultation call
                      </p>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setCurrentStep(2)}
                      className='bg-white/50 dark:bg-slate-800/50'>
                      Change
                    </Button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
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
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
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
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder='john@company.com'
                        className='bg-white/50 dark:bg-slate-800/50'
                        required
                      />
                    </div>
                  </div>

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
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
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
                          setFormData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        placeholder='Your Company Inc.'
                        className='bg-white/50 dark:bg-slate-800/50'
                      />
                    </div>
                  </div>

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
                        setFormData((prev) => ({
                          ...prev,
                          service: e.target.value,
                        }))
                      }
                      className='bg-white/50 dark:bg-slate-800/90 p-3 border border-slate-200 dark:border-slate-700 rounded-lg w-full'>
                      <option value=''>Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label
                      htmlFor='message'
                      className='flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300'>
                      <MessageSquare className='w-4 h-4' />
                      Project Details
                    </Label>
                    <Textarea
                      id='message'
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder='Tell us about your project, goals, timeline, and any specific requirements...'
                      className='bg-white/50 dark:bg-slate-800/50 min-h-[100px]'
                    />
                  </div>

                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    size='lg'
                    className='bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 border-0 w-full text-white'>
                    {isSubmitting ? (
                      <>
                        <Loader2 className='mr-2 w-5 h-5 animate-spin' />
                        Scheduling Call...
                      </>
                    ) : (
                      <>
                        <Calendar className='mr-2 w-5 h-5' />
                        Schedule Call
                        <ArrowRight className='ml-2 w-5 h-5' />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default ScheduleCall;
