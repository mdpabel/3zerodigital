import { genMetaData } from '@/app/seo';
import UnderDevelopment from '@/components/common/under-development';

export const metadata = genMetaData({
  title: 'Login',
  url: '/resend-verification',
});

const ResendVerificationLink = () => {
  return <UnderDevelopment />;
};

export default ResendVerificationLink;
