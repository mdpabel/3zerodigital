import { genMetaData } from '@/app/seo';
import ComponentWrapper from '@/components/common/component-wrapper';
import ContactForm from '@/components/services/contact-form';

export const dynamic = 'force-static';

export const metadata = genMetaData({
  title: 'Contact us',
  url: '/contact',
});

const ContactPage = () => {
  return (
    <ComponentWrapper>
      <ContactForm />
    </ComponentWrapper>
  );
};

export default ContactPage;
