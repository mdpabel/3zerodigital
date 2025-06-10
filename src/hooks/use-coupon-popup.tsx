'use client';
import { useState, useEffect } from 'react';

export function useCouponPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the popup has been closed before (from localStorage)
    const popupClosed = localStorage.getItem('couponPopupClosed');

    // Show the popup if it hasn't been closed before
    if (popupClosed !== 'true') {
      setShowPopup(true);
    }
  }, []);

  const closePopup = () => {
    // Mark the popup as closed in localStorage
    localStorage.setItem('couponPopupClosed', 'true');
    setShowPopup(false);
  };

  return { showPopup, closePopup };
}
