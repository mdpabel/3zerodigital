import Header from '@/components/layout/header';
import Script from 'next/script';
import { ratingSchema } from './schema-markup';
import Footer from '@/components/layout/footer';
import TawkChat from '@/components/common/tawk-chat';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-[100dvh]'>
      <Header />
      <main className='relative'>{children}</main>
      <TawkChat />
      <Footer />

      <Script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }}
      />
    </div>
  );
}
