import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
// import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Providers from './providers';
import { siteMetadata } from './metadata';
import { cn } from '@/lib/utils';
import { SubtleGradientBackground } from '@/components/common/section-backgrounds';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: `Custom Web Development & Security Agency | 3Zero Digital`,
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/favicon-light.png',
        href: '/images/favicon-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/favicon-dark.png',
        href: '/images/favicon-dark.png',
      },
    ],
  },
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
        {/* <GoogleTagManager gtmId='GTM-NMFF2J6X' /> */}
        <Analytics />
      </body>
    </html>
  );
}
