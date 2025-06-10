// components/services/seo/ecommerce-ranking.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { ShoppingCart, TrendingUp, Target, DollarSign } from 'lucide-react';

const EcommerceRankingSystem = () => {
  const productCategories = [
    { category: 'Electronics', products: 1250, avgRank: 3.2, revenue: '+180%' },
    { category: 'Fashion', products: 890, avgRank: 2.8, revenue: '+220%' },
    {
      category: 'Home & Garden',
      products: 567,
      avgRank: 4.1,
      revenue: '+145%',
    },
    { category: 'Sports', products: 423, avgRank: 3.7, revenue: '+165%' },
  ];

  const optimizations = [
    { title: 'Product Schema Markup', impact: '+45% CTR' },
    { title: 'Category Page Optimization', impact: '+78% Visibility' },
    { title: 'Image SEO & Alt Tags', impact: '+92% Image Traffic' },
    { title: 'Internal Linking Strategy', impact: '+67% Page Authority' },
  ];

  return (
    <section className='py-16'>
      <ComponentWrapper>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>
            E-commerce SEO Performance
          </h2>
          <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
            Drive more qualified traffic and boost product sales with targeted
            SEO
          </p>
        </div>

        {/* Category Performance */}
        <div className='gap-6 grid md:grid-cols-4 mb-12'>
          {productCategories.map((cat, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg'>
              <div className='flex items-center gap-2 mb-4'>
                <ShoppingCart className='w-6 h-6 text-purple-600' />
                <h3 className='font-bold'>{cat.category}</h3>
              </div>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Products:</span>
                  <span className='font-medium'>{cat.products}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Avg. Rank:</span>
                  <span className='font-medium text-green-600'>
                    #{cat.avgRank}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Revenue:</span>
                  <span className='font-bold text-blue-600'>{cat.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Optimizations */}
        <div className='bg-gradient-to-r from-purple-600 to-blue-600 mb-12 p-8 rounded-lg text-white'>
          <h3 className='mb-8 font-bold text-2xl text-center'>
            E-commerce SEO Optimizations
          </h3>
          <div className='gap-6 grid md:grid-cols-4'>
            {optimizations.map((opt, index) => (
              <div key={index} className='text-center'>
                <div className='bg-white/20 mb-3 p-4 rounded-lg'>
                  <div className='font-bold'>{opt.title}</div>
                </div>
                <div className='font-bold text-yellow-300'>{opt.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Dashboard */}
        <div className='gap-6 grid md:grid-cols-3'>
          {[
            {
              icon: Target,
              title: 'Product Visibility',
              value: '+156%',
              desc: 'Search impressions',
            },
            {
              icon: TrendingUp,
              title: 'Organic Traffic',
              value: '+234%',
              desc: 'Qualified visitors',
            },
            {
              icon: DollarSign,
              title: 'Revenue Growth',
              value: '+189%',
              desc: 'From organic search',
            },
          ].map((result, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <result.icon className='mx-auto mb-4 w-12 h-12 text-purple-600' />
              <div className='mb-2 font-bold text-purple-600 text-3xl'>
                {result.value}
              </div>
              <h3 className='mb-1 font-bold'>{result.title}</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                {result.desc}
              </p>
            </div>
          ))}
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default EcommerceRankingSystem;
