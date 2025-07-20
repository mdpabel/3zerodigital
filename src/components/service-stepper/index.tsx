'use client';

import { useState, useCallback, useMemo } from 'react';
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
import { ServiceStepperProps, ServiceFormData } from './types'; // Updated import
import { STEPS, STEP_VARIANTS } from './constants';
import { authClient } from '@/lib/auth-client';
import { getCustomFieldsData } from './utils';
import { createOrder } from '@/actions/order-actions';

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
  guarantees = [],
}: ServiceStepperProps) => {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  // Processing state for order creation
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate steps based on authentication status
  const availableSteps = useMemo(() => {
    if (isAuthenticated) {
      // Skip step 4 (Account) when user is logged in
      return STEPS.filter((step) => step.id !== 4).map((step, index) => ({
        ...step,
        id: index + 1, // Renumber steps
      }));
    }
    return STEPS;
  }, [isAuthenticated]);

  // Map original step numbers to current step numbers
  const getActualStepNumber = useCallback(
    (displayStep: number) => {
      if (!isAuthenticated) return displayStep;

      // When authenticated, map display steps to actual step IDs
      const stepMapping = {
        1: 1, // Details
        2: 2, // Core Service
        3: 3, // Add-ons
        4: 5, // Review (skip account step)
      };
      return (
        stepMapping[displayStep as keyof typeof stepMapping] || displayStep
      );
    },
    [isAuthenticated],
  );

  const [[currentStep, direction], setStep] = useState([1, 0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [siteCount, setSiteCount] = useState(1);

  const [formData, setFormData] = useState<ServiceFormData>({
    // Updated type
    siteUrl: '',
    siteDescription: '',
    urgencyLevel: 'normal',
    firstName: session?.user?.name?.split(' ')[0] || '',
    lastName: session?.user?.name?.split(' ')[1] || '',
    email: session?.user?.email || '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Dynamic custom fields
    ...customFields.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: field.type === 'checkbox' ? [] : '',
      }),
      {},
    ),
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
      const maxStep = availableSteps.length;
      const clampedStep = Math.max(1, Math.min(newStep, maxStep));
      const newDirection = clampedStep > currentStep ? 1 : -1;
      setStep([clampedStep, newDirection]);
    },
    [currentStep, availableSteps.length],
  );

  // Updated to handle both string and string[] values
  const updateFormData = useCallback(
    (field: string, value: string | string[]) => {
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
      const actualStep = getActualStepNumber(step);

      switch (actualStep) {
        case 1:
          if (requiresSiteUrl && !formData.siteUrl) {
            newErrors.siteUrl = 'Website URL is required';
          }
          if (requiresDescription && !formData.siteDescription) {
            newErrors.siteDescription = 'Description is required';
          }
          // Validate custom fields
          customFields.forEach((field) => {
            if (field.required) {
              const fieldValue = formData[field.id];
              if (field.type === 'checkbox') {
                if (!Array.isArray(fieldValue) || fieldValue.length === 0) {
                  newErrors[field.id] = `${field.label} is required`;
                }
              } else if (
                !fieldValue ||
                (typeof fieldValue === 'string' && !fieldValue.trim())
              ) {
                newErrors[field.id] = `${field.label} is required`;
              }
            }
          });
          break;
        case 4: // Account step (only when not authenticated)
          if (!isAuthenticated) {
            if (!formData.firstName)
              newErrors.firstName = 'First name is required';
            if (!formData.lastName)
              newErrors.lastName = 'Last name is required';
            if (!formData.email) newErrors.email = 'Email is required';
            if (!formData.password) newErrors.password = 'Password is required';
          }
          break;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [
      formData,
      requiresSiteUrl,
      requiresDescription,
      customFields,
      isAuthenticated,
      getActualStepNumber,
    ],
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
      user: session?.user,
    });
  }, [coreService, selectedAddOns, formData, siteCount, session]);

  const handleProceedToPayment = useCallback(async () => {
    try {
      setIsProcessing(true);

      console.log('Creating order with data:');

      const result = await createOrder({
        coreServiceId: coreService.id,
        addOnServiceIds: selectedAddOns,
        siteCount,
        urgencyLevel: formData.urgencyLevel === 'urgent' ? 'URGENT' : 'NORMAL',
        siteUrl: formData.siteUrl || undefined,
        description: formData.siteDescription || undefined,
        customFields: getCustomFieldsData(formData, customFields),
      });

      if (result.success) {
        // Redirect to payment page
        window.location.href = `/checkout/payment/${result.orderId}`;
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      // Show error message to user
      alert(error instanceof Error ? error.message : 'Failed to create order');
    } finally {
      setIsProcessing(false);
    }
  }, [coreService.id, selectedAddOns, siteCount, formData, customFields]);

  const renderCurrentStep = () => {
    const actualStep = getActualStepNumber(currentStep);

    switch (actualStep) {
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
            guarantees={guarantees}
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
        return <StepFourAccount />;
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
            isProcessing={isProcessing}
          />
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === availableSteps.length;
  const isReviewStep = getActualStepNumber(currentStep) === 5;

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
            className='shadow-xl md:shadow-2xl backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl md:rounded-3xl overflow-hidden'>
            <StepperProgress currentStep={currentStep} steps={availableSteps} />

            {/* Step Content Container */}
            <div className='bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 rounded-b-2xl md:rounded-b-3xl overflow-hidden text-transparent'>
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

                {/* Conditionally render navigation based on step */}
                {!isReviewStep && (
                  <StepperNavigation
                    currentStep={currentStep}
                    totalSteps={availableSteps.length}
                    onBack={handleBack}
                    onNext={handleNext}
                    onComplete={handleComplete}
                    isNextDisabled={isProcessing}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default ServiceStepper;
