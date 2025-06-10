'use client';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { ToastAction } from '../ui/toast';
import { cn } from '@/lib/utils';
import { useCouponPopup } from '@/hooks/use-coupon-popup';

const CouponPopup = () => {
  const { showPopup, closePopup } = useCouponPopup();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!showPopup || !mounted) return; // Don't show if the popup is already closed
    toast('🎉 15% OFF for Palestine!', {
      position: 'bottom-left',
      closeButton: true,
      description:
        'Use code FREEPALESTINE to get 15% off. We encourage you to donate the saved amount to support Palestine 🇵🇸.',
      duration: Number.POSITIVE_INFINITY, // 10 seconds
      className: cn(
        'bottom-1 left-1 flex fixed md:max-w-[420px] max-h-[100px] ',
      ),

      onDismiss: () => {
        closePopup();
      },

      action: (
        <ToastAction
          altText='Copy Coupon'
          onClick={() => {
            navigator.clipboard.writeText('FREEPALESTINE');
            toast('✅ Copied!', {
              description: 'Coupon code "FREEPALESTINE" copied to clipboard.',
              position: 'bottom-left',
              duration: 3000,
            });

            // Close the current toast immediately after the copy action
            toast.dismiss();

            closePopup();
          }}>
          Copy
        </ToastAction>
      ),
    });
  }, [toast, mounted, showPopup]);

  return null;
};

export default CouponPopup;
