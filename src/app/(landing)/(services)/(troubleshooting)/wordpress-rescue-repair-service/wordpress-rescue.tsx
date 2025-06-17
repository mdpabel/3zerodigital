// components/services/troubleshooting/wordpress-rescue.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { LifeBuoy, Database, Code, Shield } from 'lucide-react';

const WordPressRescueService = () => {
  const rescueScenarios = [
    {
      scenario: 'Website Crashed',
      causes: ['Plugin conflicts', 'Theme errors', 'Memory limits'],
      fixTime: '2-4 hours',
      successRate: '99.2%',
    },
    {
      scenario: 'Malware Infection',
      causes: ['Backdoor files', 'Malicious code', 'Compromised admin'],
      fixTime: '4-8 hours',
      successRate: '98.7%',
    },
    {
      scenario: 'Database Corruption',
      causes: ['Server issues', 'Plugin errors', 'Manual changes'],
      fixTime: '3-6 hours',
      successRate: '97.5%',
    },
    {
      scenario: 'Hacked Website',
      causes: ['Weak passwords', 'Outdated software', 'Vulnerabilities'],
      fixTime: '6-12 hours',
      successRate: '96.8%',
    },
  ];

  const rescueFeatures = [
    {
      title: 'Emergency Response',
      desc: '24/7 availability for critical issues',
    },
    { title: 'Complete Backup', desc: 'Full site backup before any changes' },
    {
      title: 'Root Cause Analysis',
      desc: 'Identify and fix underlying issues',
    },
    {
      title: 'Prevention Setup',
      desc: 'Security measures to prevent future issues',
    },
  ];

  return (
    <section className='bg-gradient-to-br from-red-50 dark:from-red-900/20 to-orange-50 dark:to-orange-900/20 py-16'>
      <ComponentWrapper>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>
            WordPress Emergency Rescue
          </h2>
          <p className='mx-auto max-w-2xl'>
            Fast WordPress recovery with zero data loss - your site back online
            in hours, not days
          </p>
        </div>

        {/* Rescue Scenarios */}
        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-4 mb-12'>
          {rescueScenarios.map((scenario, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg'>
              <h3 className='mb-3 font-bold text-red-600'>
                {scenario.scenario}
              </h3>

              <div className='mb-4'>
                <div className='mb-2 text-sm'>Common causes:</div>
                <ul className='space-y-1'>
                  {scenario.causes.map((cause, idx) => (
                    <li key={idx} className='text-gray-500 text-xs'>
                      • {cause}
                    </li>
                  ))}
                </ul>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Fix Time:</span>
                  <span className='font-medium'>{scenario.fixTime}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Success Rate:</span>
                  <span className='font-bold text-green-600'>
                    {scenario.successRate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Response Process */}
        <div className='bg-white dark:bg-gray-800 shadow-lg mb-12 p-8 rounded-lg'>
          <h3 className='mb-8 font-bold text-2xl text-center'>
            Emergency Response Process
          </h3>
          <div className='gap-6 grid md:grid-cols-4'>
            {[
              { step: '1', title: 'Immediate Assessment', time: '15 min' },
              { step: '2', title: 'Site Backup & Analysis', time: '30 min' },
              { step: '3', title: 'Issue Resolution', time: '2-6 hours' },
              { step: '4', title: 'Testing & Handover', time: '30 min' },
            ].map((process, index) => (
              <div key={index} className='text-center'>
                <div className='flex justify-center items-center bg-red-600 mx-auto mb-3 rounded-full w-12 h-12 font-bold text-white'>
                  {process.step}
                </div>
                <h4 className='mb-2 font-bold'>{process.title}</h4>
                <div className='text-sm'>{process.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rescue Features */}
        <div className='gap-6 grid md:grid-cols-4'>
          {[
            {
              icon: LifeBuoy,
              title: 'Emergency Response',
              desc: '24/7 availability for critical issues',
            },
            {
              icon: Database,
              title: 'Complete Backup',
              desc: 'Full site backup before any changes',
            },
            {
              icon: Code,
              title: 'Root Cause Analysis',
              desc: 'Identify and fix underlying issues',
            },
            {
              icon: Shield,
              title: 'Prevention Setup',
              desc: 'Security measures to prevent future issues',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <feature.icon className='mx-auto mb-4 w-12 h-12 text-red-600' />
              <h3 className='mb-2 font-bold'>{feature.title}</h3>
              <p className='text-sm'>{feature.desc}</p>
            </div>
          ))}
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default WordPressRescueService;
