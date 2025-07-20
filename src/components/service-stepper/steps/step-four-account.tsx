'use client';
import React, { useState } from 'react';
import LoginForm from '@/app/(landing)/(auth)/login/login-form';
import SignUpForm from '@/app/(landing)/(auth)/signup/sign-up-form';

const StepFourAccount = () => {
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  const handleAuthModeSwitch = (mode: 'signup' | 'login') => {
    setAuthMode(mode);
  };

  return (
    <div>
      {authMode === 'login' ? (
        <LoginForm mode='place-order' />
      ) : (
        <SignUpForm mode='place-order' />
      )}

      {/* Custom mode switch button */}
      <div className='mt-6 text-center'>
        <button
          type='button'
          onClick={() =>
            handleAuthModeSwitch(authMode === 'signup' ? 'login' : 'signup')
          }
          className='text-blue-600 hover:text-blue-800 dark:hover:text-blue-300 dark:text-blue-400 text-sm underline transition-colors'>
          {authMode === 'signup'
            ? 'Already have an account? Login instead'
            : "Don't have an account? Create one"}
        </button>
      </div>
    </div>
  );
};

export default StepFourAccount;
