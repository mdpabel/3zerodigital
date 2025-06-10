import SignUpForm from '@/components/auth/sign-up-form';
import { genMetaData } from '@/app/seo';

export const dynamic = 'force-static';

export const metadata = genMetaData({
  title: 'Signup',
  url: '/signup',
});

const Signup = () => {
  return <SignUpForm />;
};

export default Signup;
