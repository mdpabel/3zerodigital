import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface UsePricingProps {
  productId: string;
  price: number;
  origPrice: number;
}

export const usePricing = ({ price, origPrice }: UsePricingProps) => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;
  const totalOriginalPrice = origPrice * quantity;

  const handleIncrease = () => setQuantity((prev) => prev + 1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const setTotalQuantity = (totalQuantity: number) => {
    setQuantity(totalQuantity);
  };

  return {
    quantity,
    totalPrice,
    totalOriginalPrice,
    handleIncrease,
    handleDecrease,
    setTotalQuantity,
  };
};
