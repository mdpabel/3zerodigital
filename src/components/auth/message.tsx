import { CheckCircle2Icon, CrossIcon, TriangleAlert } from 'lucide-react';
import React from 'react';

const Message = ({
  message,
  type,
}: {
  type: 'error' | 'success' | 'init';
  message: string;
}) => {
  console.log({
    message,
    type,
  });

  if (type === 'success') {
    return (
      <div
        className='flex items-center space-x-2 bg-green-50 dark:bg-gray-800 p-4 rounded-lg text-green-800 text-sm dark:text-green-400'
        role='alert'>
        <CheckCircle2Icon />
        <span className='sr-only'>Info</span>
        <div>
          <span className='font-medium'>Success: </span> {message}
        </div>
      </div>
    );
  }
  return (
    <div
      className='flex items-center space-x-2 bg-red-50 dark:bg-gray-800 p-4 rounded-lg text-red-800 text-sm dark:text-red-400'
      role='alert'>
      <TriangleAlert />
      <span className='sr-only'>Info</span>
      <div>
        <span className='font-medium'>Error: </span> {message}
      </div>
    </div>
  );
};

export default Message;
