import UpdatePasswordForm from '@/components/auth/update-password-form';
import React, { Suspense } from 'react';

const UpdatePassword = () => {
  return (
    <Suspense>
      <UpdatePasswordForm />
    </Suspense>
  );
};

export default UpdatePassword;
