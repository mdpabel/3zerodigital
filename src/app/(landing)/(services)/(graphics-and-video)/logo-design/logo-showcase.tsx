// components/services/design/logo-showcase.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { Palette, Eye, Award, Zap } from 'lucide-react';
import Image from 'next/image';

const LogoDesignShowcase = () => {
  const logoStyles = [
    {
      style: 'Minimalist',
      description: 'Clean, simple, timeless',
      examples: 3,
    },
    { style: 'Vintage', description: 'Classic, retro-inspired', examples: 4 },
    { style: 'Modern', description: 'Contemporary, sleek', examples: 5 },
    { style: 'Playful', description: 'Fun, creative, energetic', examples: 3 },
  ];

  const designProcess = [
    {
      step: 'Brand Discovery',
      duration: '1-2 days',
      deliverable: 'Brand brief & strategy',
    },
    {
      step: 'Concept Development',
      duration: '2-3 days',
      deliverable: '5-8 initial concepts',
    },
    {
      step: 'Refinement',
      duration: '2-3 days',
      deliverable: '3 refined options',
    },
    {
      step: 'Finalization',
      duration: '1-2 days',
      deliverable: 'Final logo package',
    },
  ];

  return (
    <section className='py-16'>
      <ComponentWrapper>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>Professional Logo Design</h2>
          <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>
            Create a memorable brand identity that resonates with your target
            audience
          </p>
        </div>

        {/* Logo Styles */}
        <div className='gap-6 grid md:grid-cols-4 mb-12'>
          {logoStyles.map((style, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <div className='flex justify-center items-center bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4 rounded-full w-16 h-16'>
                <Palette className='w-8 h-8 text-white' />
              </div>
              <h3 className='mb-2 font-bold'>{style.style}</h3>
              <p className='mb-3 text-gray-600 dark:text-gray-400 text-sm'>
                {style.description}
              </p>
              <div className='font-medium text-purple-600'>
                {style.examples} concepts included
              </div>
            </div>
          ))}
        </div>

        {/* Design Process */}
        <div className='bg-gray-50 dark:bg-gray-900 mb-12 p-8 rounded-lg'>
          <h3 className='mb-8 font-bold text-2xl text-center'>
            Our Design Process
          </h3>
          <div className='gap-6 grid md:grid-cols-4'>
            {designProcess.map((process, index) => (
              <div key={index} className='text-center'>
                <div className='flex justify-center items-center bg-purple-600 mx-auto mb-4 rounded-full w-12 h-12 font-bold text-white'>
                  {index + 1}
                </div>
                <h4 className='mb-2 font-bold'>{process.step}</h4>
                <div className='mb-2 text-gray-600 dark:text-gray-400 text-sm'>
                  {process.duration}
                </div>
                <div className='font-medium text-sm'>{process.deliverable}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo Package Includes */}
        <div className='bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg'>
          <h3 className='mb-8 font-bold text-xl text-center'>
            Complete Logo Package Includes
          </h3>
          <div className='gap-6 grid md:grid-cols-4'>
            {[
              {
                icon: Eye,
                title: 'High-Resolution Files',
                desc: 'PNG, SVG, PDF formats',
              },
              {
                icon: Palette,
                title: 'Color Variations',
                desc: 'Full color, black, white',
              },
              {
                icon: Award,
                title: 'Style Guide',
                desc: 'Usage guidelines & specs',
              },
              {
                icon: Zap,
                title: 'Unlimited Revisions',
                desc: "Until you're 100% satisfied",
              },
            ].map((include, index) => (
              <div key={index} className='text-center'>
                <include.icon className='mx-auto mb-4 w-12 h-12 text-purple-600' />
                <h4 className='mb-2 font-bold'>{include.title}</h4>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  {include.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default LogoDesignShowcase;
