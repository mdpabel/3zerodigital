import type { Metadata } from 'next';
// import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';
import Providers from './providers';
import { siteMetadata } from './metadata';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import PixelTracker from '@/components/common/pixel-tracker';
import Head from 'next/head';
import { SubtleGradientBackground } from '@/components/common/section-backgrounds';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: `Custom Web Development & Security Agency | 3Zero Digital`,
  description: siteMetadata.description,
  openGraph: {
    title: `Custom Web Development & Security Agency.`,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: siteMetadata.url,
    types: {
      'application/rss+xml': `${siteMetadata.url}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: `Custom Web Development & Security Agency.`,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

// export const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   display: 'swap',
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={cn('scroll-smooth')} suppressHydrationWarning>
      {/* <head>
        <PixelTracker />
      </head> */}
      <body>
        <Providers>
          <SubtleGradientBackground>{children}</SubtleGradientBackground>
        </Providers>
        <Toaster />
        <GoogleTagManager gtmId='GTM-NMFF2J6X' />
      </body>
    </html>
  );
}
