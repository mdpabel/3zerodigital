// components/services/mern/tech-integration.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { Database, Server, Code, Smartphone } from 'lucide-react';

const MERNTechIntegration = () => {
  const stack = [
    {
      name: 'MongoDB',
      description: 'NoSQL database for flexible data storage',
      icon: Database,
      color: 'from-green-500 to-green-600',
      features: ['Document-based', 'Scalable', 'JSON-like'],
    },
    {
      name: 'Express.js',
      description: 'Fast, unopinionated web framework',
      icon: Server,
      color: 'from-gray-700 to-gray-800',
      features: ['RESTful APIs', 'Middleware', 'Fast routing'],
    },
    {
      name: 'React',
      description: 'Component-based UI library',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      features: ['Virtual DOM', 'Reusable components', 'State management'],
    },
    {
      name: 'Node.js',
      description: 'JavaScript runtime for server-side',
      icon: Smartphone,
      color: 'from-green-600 to-green-700',
      features: ['Non-blocking I/O', 'NPM ecosystem', 'Real-time apps'],
    },
  ];

  return (
    <section className='bg-gray-50 dark:bg-gray-900 py-16'>
      <ComponentWrapper className='px-4'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>
            Full-Stack MERN Development
          </h2>
          <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
            Complete JavaScript ecosystem for modern web applications
          </p>
        </div>

        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-4 mb-12'>
          {stack.map((tech, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden'>
              <div
                className={`bg-gradient-to-r ${tech.color} p-6 text-white text-center`}>
                <tech.icon className='mx-auto mb-3 w-12 h-12' />
                <h3 className='font-bold text-lg'>{tech.name}</h3>
              </div>
              <div className='p-6'>
                <p className='mb-4 text-gray-600 dark:text-gray-400 text-sm'>
                  {tech.description}
                </p>
                <ul className='space-y-2'>
                  {tech.features.map((feature, idx) => (
                    <li key={idx} className='flex items-center gap-2 text-sm'>
                      <div className='bg-green-500 rounded-full w-2 h-2'></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <div className='inline-block bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg'>
            <h3 className='mb-4 font-bold text-xl'>Why Choose MERN Stack?</h3>
            <div className='gap-6 grid md:grid-cols-3 text-left'>
              <div>
                <h4 className='mb-2 font-medium'>Single Language</h4>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  JavaScript everywhere
                </p>
              </div>
              <div>
                <h4 className='mb-2 font-medium'>Rapid Development</h4>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Faster time to market
                </p>
              </div>
              <div>
                <h4 className='mb-2 font-medium'>Scalable</h4>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Grows with your business
                </p>
              </div>
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default MERNTechIntegration;
