import { Suspense } from 'react';
import ResetPasswordForm from './reset-password-form';

const page = () => {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default page;
