'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComponentWrapper from '@/components/common/component-wrapper';
import StepperHeader from './stepper-header';
import StepperProgress from './stepper-progress';
import StepperNavigation from './stepper-navigation';
import StepOneDetails from './steps/step-one-details';
import StepTwoCoreService from './steps/step-two-core-service';
import StepThreeAddons from './steps/step-three-addons';
import StepFourAccount from './steps/step-four-account';
import StepFiveReview from './steps/step-five-review';
import { ServiceStepperProps, FormData, StepperState } from './types';
import { STEPS, STEP_VARIANTS } from './constants';
import { CardBackground } from '../common/section-backgrounds';

const ServiceStepper = ({
  coreService,
  addOnServices,
  title,
  subtitle,
  emergencyService = false,
  allowMultipleSites = true,
  requiresSiteUrl = true,
  requiresDescription = true,
  customFields = [],
}: ServiceStepperProps) => {
  const [[currentStep, direction], setStep] = useState([1, 0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [siteCount, setSiteCount] = useState(1);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [userExists, setUserExists] = useState<boolean | null>(null);

  const [formData, setFormData] = useState<FormData>({
    siteUrl: '',
    siteDescription: '',
    urgencyLevel: 'normal',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Dynamic custom fields
    ...customFields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {}),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddOnToggle = useCallback((addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId],
    );
  }, []);

  const changeStep = useCallback(
    (newStep: number) => {
      const newDirection = newStep > currentStep ? 1 : -1;
      setStep([newStep, newDirection]);
    },
    [currentStep],
  );

  const checkUserExists = useCallback(async (email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    // For demo: assume user exists if email contains 'existing'
    return email.includes('existing');
  }, []);

  const handleEmailBlur = useCallback(async () => {
    if (formData.email && formData.email.includes('@')) {
      const exists = await checkUserExists(formData.email);
      setUserExists(exists);
      setAuthMode(exists ? 'login' : 'signup');
    }
  }, [formData.email, checkUserExists]);

  const updateFormData = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    },
    [errors],
  );

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: Record<string, string> = {};

      switch (step) {
        case 1:
          if (requiresSiteUrl && !formData.siteUrl) {
            newErrors.siteUrl = 'Website URL is required';
          }
          if (requiresDescription && !formData.siteDescription) {
            newErrors.siteDescription = 'Description is required';
          }
          // Validate custom fields
          customFields.forEach((field) => {
            if (field.required && !formData[field.id]) {
              newErrors[field.id] = `${field.label} is required`;
            }
          });
          break;
        case 4:
          if (!formData.firstName)
            newErrors.firstName = 'First name is required';
          if (!formData.lastName) newErrors.lastName = 'Last name is required';
          if (!formData.email) newErrors.email = 'Email is required';
          if (authMode === 'signup') {
            if (!formData.password) newErrors.password = 'Password is required';
            if (formData.password.length < 6)
              newErrors.password = 'Password must be at least 6 characters';
            if (formData.password !== formData.confirmPassword) {
              newErrors.confirmPassword = 'Passwords do not match';
            }
          } else {
            if (!formData.password) newErrors.password = 'Password is required';
          }
          break;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData, authMode, requiresSiteUrl, requiresDescription, customFields],
  );

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      changeStep(currentStep + 1);
    }
  }, [currentStep, validateStep, changeStep]);

  const handleBack = useCallback(() => {
    changeStep(currentStep - 1);
  }, [currentStep, changeStep]);

  const handleComplete = useCallback(() => {
    // Handle order completion
    console.log('Order completed:', {
      coreService,
      selectedAddOns,
      formData,
      siteCount,
    });
  }, [coreService, selectedAddOns, formData, siteCount]);

  const handleProceedToPayment = useCallback(() => {
    // Handle payment process
    console.log('Proceeding to payment...');
  }, []);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOneDetails
            formData={formData}
            errors={errors}
            siteCount={siteCount}
            allowMultipleSites={allowMultipleSites}
            requiresSiteUrl={requiresSiteUrl}
            requiresDescription={requiresDescription}
            customFields={customFields}
            onUpdateFormData={updateFormData}
            onUpdateSiteCount={setSiteCount}
          />
        );
      case 2:
        return (
          <StepTwoCoreService
            coreService={coreService}
            siteCount={siteCount}
            allowMultipleSites={allowMultipleSites}
          />
        );
      case 3:
        return (
          <StepThreeAddons
            addOnServices={addOnServices}
            selectedAddOns={selectedAddOns}
            onToggleAddOn={handleAddOnToggle}
          />
        );
      case 4:
        return (
          <StepFourAccount
            formData={formData}
            errors={errors}
            authMode={authMode}
            userExists={userExists}
            onUpdateFormData={updateFormData}
            onEmailBlur={handleEmailBlur}
            onToggleAuthMode={() =>
              setAuthMode(authMode === 'signup' ? 'login' : 'signup')
            }
          />
        );
      case 5:
        return (
          <StepFiveReview
            coreService={coreService}
            addOnServices={addOnServices}
            selectedAddOns={selectedAddOns}
            formData={formData}
            siteCount={siteCount}
            allowMultipleSites={allowMultipleSites}
            requiresSiteUrl={requiresSiteUrl}
            onProceedToPayment={handleProceedToPayment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className='relative py-8 md:py-16 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl container'>
          <StepperHeader
            title={title}
            subtitle={subtitle}
            emergencyService={emergencyService}
          />

          {/* Main Stepper Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='shadow-xl md:shadow-2xl backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl md:rounded-3xl overflow-hidden 0'>
            <StepperProgress currentStep={currentStep} />

            {/* Step Content Container */}
            <CardBackground>
              <div className='relative'>
                <div className='min-h-[400px] md:min-h-[500px]'>
                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode='wait'>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={STEP_VARIANTS}
                      initial='hidden'
                      animate='visible'
                      exit='exit'
                      className='p-4 md:p-6 lg:p-8'>
                      {renderCurrentStep()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <StepperNavigation
                  currentStep={currentStep}
                  onBack={handleBack}
                  onNext={handleNext}
                  onComplete={handleComplete}
                  isNextDisabled={false}
                />
              </div>
            </CardBackground>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default ServiceStepper;
