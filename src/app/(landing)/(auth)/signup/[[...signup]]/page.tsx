import { genMetaData } from '@/app/seo';
import SignUpForm from '../sign-up-form';

export const dynamic = 'force-static';

export const metadata = genMetaData({
  title: 'Signup',
  url: '/signup',
});

const Signup = () => {
  return <SignUpForm />;
};

export default Signup;
