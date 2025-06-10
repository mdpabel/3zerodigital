// components/services/shopify/conversion-optimizer.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { TrendingUp, ShoppingCart, CreditCard, Users } from 'lucide-react';

const ShopifyConversionOptimizer = () => {
  const optimizations = [
    {
      title: 'Cart Abandonment Recovery',
      before: '68% abandonment rate',
      after: '45% abandonment rate',
      improvement: '+34% recovery',
      icon: ShoppingCart,
    },
    {
      title: 'Checkout Flow Optimization',
      before: '3.2% conversion rate',
      after: '5.8% conversion rate',
      improvement: '+81% increase',
      icon: CreditCard,
    },
    {
      title: 'Product Page UX',
      before: '2.1 min average time',
      after: '4.3 min average time',
      improvement: '+105% engagement',
      icon: Users,
    },
  ];

  return (
    <section className='bg-gradient-to-br from-green-50 dark:from-green-900/20 to-emerald-50 dark:to-emerald-900/20 py-16'>
      <ComponentWrapper>
        <div className='mx-auto px-4 container'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 font-bold text-3xl'>
              Conversion Rate Optimization
            </h2>
            <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
              Data-driven improvements that turn visitors into customers
            </p>
          </div>

          <div className='gap-8 grid lg:grid-cols-3'>
            {optimizations.map((opt, index) => (
              <div
                key={index}
                className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg'>
                <div className='flex items-center gap-3 mb-4'>
                  <opt.icon className='w-8 h-8 text-green-600' />
                  <h3 className='font-bold'>{opt.title}</h3>
                </div>

                <div className='space-y-3'>
                  <div className='flex justify-between items-center bg-red-50 dark:bg-red-900/20 p-3 rounded'>
                    <span className='text-sm'>Before:</span>
                    <span className='font-medium text-red-600'>
                      {opt.before}
                    </span>
                  </div>

                  <div className='flex justify-between items-center bg-green-50 dark:bg-green-900/20 p-3 rounded'>
                    <span className='text-sm'>After:</span>
                    <span className='font-medium text-green-600'>
                      {opt.after}
                    </span>
                  </div>

                  <div className='bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-center'>
                    <TrendingUp className='inline mr-2 w-5 h-5 text-blue-600' />
                    <span className='font-bold text-blue-600'>
                      {opt.improvement}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-12 text-center'>
            <div className='inline-block bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg'>
              <h3 className='mb-2 font-bold text-2xl'>Average Results</h3>
              <div className='mb-2 font-bold text-green-600 text-4xl'>
                +127%
              </div>
              <p className='text-gray-600 dark:text-gray-400'>
                Revenue increase within 90 days
              </p>
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default ShopifyConversionOptimizer;
