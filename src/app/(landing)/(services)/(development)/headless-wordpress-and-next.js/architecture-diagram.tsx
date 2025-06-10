// components/services/headless/architecture-diagram.tsx
import { Database, Server, Globe, Zap, Shield, Code } from 'lucide-react';

const HeadlessArchitecture = () => {
  return (
    <section className='py-16'>
      <div className='mx-auto px-4 container'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>
            Headless Architecture Benefits
          </h2>
          <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
            Decouple your content management from presentation for ultimate
            flexibility
          </p>
        </div>

        <div className='mx-auto max-w-6xl'>
          {/* Architecture Flow */}
          <div className='flex lg:flex-row flex-col justify-between items-center gap-8 mb-16'>
            <div className='bg-blue-100 dark:bg-blue-900 p-6 rounded-lg text-center'>
              <Database className='mx-auto mb-3 w-12 h-12 text-blue-600' />
              <h3 className='font-bold'>WordPress Backend</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                Content Management
              </p>
            </div>

            <div className='flex-1 text-center'>
              <div className='relative border-gray-300 dark:border-gray-600 border-t-2 border-dashed'>
                <span className='-top-3 left-1/2 absolute bg-white dark:bg-gray-900 px-4 py-1 text-sm -translate-x-1/2 transform'>
                  REST API / GraphQL
                </span>
              </div>
            </div>

            <div className='bg-green-100 dark:bg-green-900 p-6 rounded-lg text-center'>
              <Globe className='mx-auto mb-3 w-12 h-12 text-green-600' />
              <h3 className='font-bold'>Next.js Frontend</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                User Experience
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className='gap-6 grid md:grid-cols-3'>
            {[
              {
                icon: Zap,
                title: '10x Faster Performance',
                description:
                  'Static generation and CDN distribution for lightning speed',
                color: 'text-yellow-600',
              },
              {
                icon: Shield,
                title: 'Enhanced Security',
                description:
                  'Reduced attack surface with separated frontend and backend',
                color: 'text-green-600',
              },
              {
                icon: Code,
                title: 'Developer Experience',
                description:
                  'Modern development workflow with React and TypeScript',
                color: 'text-blue-600',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg'>
                <benefit.icon className={`w-10 h-10 mb-4 ${benefit.color}`} />
                <h3 className='mb-2 font-bold'>{benefit.title}</h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadlessArchitecture;
