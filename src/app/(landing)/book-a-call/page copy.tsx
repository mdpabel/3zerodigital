import { genMetaData } from '@/app/seo';
import ComponentWrapper from '@/components/common/component-wrapper';
import Title from '@/components/common/title';

export const dynamic = 'force-static';

export const metadata = genMetaData({
  title: 'Book a call',
  url: '/book-a-call',
});

const BookACall: React.FC = () => {
  return (
    <ComponentWrapper>
      <Title
        title='Book a Call'
        subTitle='Schedule a 30-minute call with us. Pick a time that works best for you!'
      />

      {/* Calendly Embed */}
      <div className='bg-gray-50 shadow-lg border-2 border-gray-200 rounded-lg w-full h-[650px] md:h-[800px]'>
        <iframe
          src='https://calendly.com/3zerodigital-info/30min'
          width='100%'
          height='100%'
          frameBorder='0'
          className='rounded-lg'
          title='Schedule a call with us'></iframe>
      </div>
    </ComponentWrapper>
  );
};

export default BookACall;
