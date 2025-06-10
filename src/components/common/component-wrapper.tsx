import { cn } from '@/lib/utils';
import React, { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const ComponentWrapper = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn('mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl', className)}
      {...props}>
      {children}
    </div>
  );
};

export default ComponentWrapper;
