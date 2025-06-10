import React from 'react';

import Quiz from '';
import Video from '@/components/common/video';

import Script from 'next/script';
import ServiceHero from '@/components/common/Hero';
import TroubleshootingPricing from '../pricing-table';
import ErrorResolutionDashboard from '../error-dashboard';

export const dynamic = 'force-static';

const slug = 'email-deliverability-issues';

const issues = [
  'Blacklisted IP addresses',
  'Spammy content or keywords',
  'Incorrect DNS settings (SPF, DKIM, DMARC)',
  'Poor sender reputation',
  'Lack of email authentication protocols',
  'High bounce rates',
  'Low engagement rates (open/click-through rates)',
  'Email content flagged as suspicious',
];

const EmailDeliverabilityIssues = async () => {
  return (
    <div>
      <ServiceHero
        title='Email Deliverability Issues'
        subtitle='Get Your Emails Delivered'
        description='Resolve email deliverability issues, improve inbox placement, and avoid spam filters or blacklisting.'
        badge='Email Experts'
        backgroundGradient='from-blue-600/20 via-yellow-600/10 to-emerald-600/20 dark:from-blue-900/30 dark:via-yellow-900/20 dark:to-emerald-900/30'
        primaryColor='from-blue-600 to-emerald-600'
        secondaryColor='from-yellow-500 to-blue-600'
        features={[
          {
            icon: 'Mail',
            text: 'Inbox Placement',
            description: 'Improve deliverability',
            color: 'from-blue-500 to-emerald-600',
          },
          {
            icon: 'Shield',
            text: 'Spam Protection',
            description: 'Avoid blacklists & spam',
            color: 'from-yellow-500 to-blue-600',
          },
          {
            icon: 'CheckCircle',
            text: 'Authentication',
            description: 'SPF, DKIM, DMARC setup',
            color: 'from-emerald-500 to-green-600',
          },
        ]}
        stats={[
          { value: '99%', label: 'Inbox Rate', icon: 'Mail' },
          { value: '100+', label: 'Domains Fixed', icon: 'CheckCircle' },
          { value: '24/7', label: 'Support', icon: 'Headphones' },
        ]}
        ctaPrimary={{
          text: 'Fix Email Issues',
          href: '/contact?service=email',
        }}
        ctaSecondary={{
          text: 'Learn About Email',
          href: '/blog/email-deliverability',
        }}
      />

      <TroubleshootingPricing
        price='$55'
        name='email-deliverability'
        productId=''
      />

      <ErrorResolutionDashboard />
    </div>
  );
};

export default EmailDeliverabilityIssues;
