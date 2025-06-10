// components/services/ads/google-ads-dashboard.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { MousePointer, TrendingUp, Target, DollarSign } from 'lucide-react';

const GoogleAdsDashboard = () => {
  const campaignTypes = [
    {
      type: 'Search Campaigns',
      impressions: '125K',
      clicks: '3.2K',
      ctr: '2.56%',
      cpc: '$1.23',
      conversions: 156,
      roas: '425%',
    },
    {
      type: 'Display Campaigns',
      impressions: '890K',
      clicks: '2.1K',
      ctr: '0.24%',
      cpc: '$0.67',
      conversions: 89,
      roas: '312%',
    },
    {
      type: 'Shopping Campaigns',
      impressions: '67K',
      clicks: '1.8K',
      ctr: '2.69%',
      cpc: '$0.89',
      conversions: 234,
      roas: '567%',
    },
  ];

  const optimizations = [
    { title: 'Keyword Research', impact: '+45% Quality Score' },
    { title: 'Ad Copy Testing', impact: '+67% CTR' },
    { title: 'Landing Page Optimization', impact: '+89% Conversion Rate' },
    { title: 'Bid Management', impact: '+34% ROAS' },
  ];

  return (
    <section className='py-16'>
      <ComponentWrapper>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>
            Google Ads Performance Dashboard
          </h2>
          <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
            Data-driven campaigns that maximize ROI and drive qualified traffic
          </p>
        </div>

        {/* Campaign Performance */}
        <div className='space-y-6 mb-12'>
          {campaignTypes.map((campaign, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg'>
              <h3 className='mb-4 font-bold text-xl'>{campaign.type}</h3>
              <div className='gap-4 grid grid-cols-2 md:grid-cols-6'>
                <div className='text-center'>
                  <div className='font-bold text-blue-600 text-2xl'>
                    {campaign.impressions}
                  </div>
                  <div className='text-gray-600 text-sm'>Impressions</div>
                </div>
                <div className='text-center'>
                  <div className='font-bold text-green-600 text-2xl'>
                    {campaign.clicks}
                  </div>
                  <div className='text-gray-600 text-sm'>Clicks</div>
                </div>
                <div className='text-center'>
                  <div className='font-bold text-purple-600 text-2xl'>
                    {campaign.ctr}
                  </div>
                  <div className='text-gray-600 text-sm'>CTR</div>
                </div>
                <div className='text-center'>
                  <div className='font-bold text-orange-600 text-2xl'>
                    {campaign.cpc}
                  </div>
                  <div className='text-gray-600 text-sm'>CPC</div>
                </div>
                <div className='text-center'>
                  <div className='font-bold text-red-600 text-2xl'>
                    {campaign.conversions}
                  </div>
                  <div className='text-gray-600 text-sm'>Conversions</div>
                </div>
                <div className='text-center'>
                  <div className='font-bold text-green-600 text-2xl'>
                    {campaign.roas}
                  </div>
                  <div className='text-gray-600 text-sm'>ROAS</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optimization Strategies */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 mb-12 p-8 rounded-lg text-white'>
          <h3 className='mb-8 font-bold text-2xl text-center'>
            Campaign Optimizations
          </h3>
          <div className='gap-6 grid md:grid-cols-4'>
            {optimizations.map((opt, index) => (
              <div key={index} className='text-center'>
                <div className='bg-white/20 mb-3 p-6 rounded-lg'>
                  <h4 className='font-bold'>{opt.title}</h4>
                </div>
                <div className='font-bold text-yellow-300'>{opt.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className='gap-6 grid md:grid-cols-4'>
          {[
            {
              icon: MousePointer,
              title: 'Click-Through Rate',
              value: '3.45%',
              desc: 'Above industry avg',
            },
            {
              icon: Target,
              title: 'Quality Score',
              value: '8.9/10',
              desc: 'Excellent rating',
            },
            {
              icon: TrendingUp,
              title: 'Conversion Rate',
              value: '12.3%',
              desc: 'High performance',
            },
            {
              icon: DollarSign,
              title: 'Return on Ad Spend',
              value: '485%',
              desc: 'Strong ROI',
            },
          ].map((metric, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <metric.icon className='mx-auto mb-4 w-12 h-12 text-blue-600' />
              <div className='mb-2 font-bold text-blue-600 text-3xl'>
                {metric.value}
              </div>
              <h3 className='mb-1 font-bold'>{metric.title}</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default GoogleAdsDashboard;
