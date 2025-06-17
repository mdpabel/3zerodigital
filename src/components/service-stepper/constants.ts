import { Step } from './types';

export const STEPS: Step[] = [
  { id: 1, name: 'Service Details', description: 'Tell us about your needs' },
  { id: 2, name: 'Core Service', description: 'Your main service package' },
  { id: 3, name: 'Add-ons', description: 'Enhance your service' },
  { id: 4, name: 'Account', description: 'Create account or login' },
  { id: 5, name: 'Review', description: 'Complete your order' },
];

export const STEP_VARIANTS = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    scale: 0.98,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 100 : -100,
    scale: 0.98,
    transition: { duration: 0.3, ease: 'easeInOut' },
  }),
};

export const URGENCY_OPTIONS = [
  {
    id: 'normal' as const,
    name: 'Normal',
    desc: '24-48 hours',
  },
  {
    id: 'urgent' as const,
    name: 'Urgent',
    desc: '4-8 hours',
  },
];
