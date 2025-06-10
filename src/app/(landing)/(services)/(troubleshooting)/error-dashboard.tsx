// components/services/troubleshooting/error-dashboard.tsx
import ComponentWrapper from '@/components/common/component-wrapper';
import { AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';

const ErrorResolutionDashboard = () => {
  const commonErrors = [
    {
      error: '404 Not Found',
      frequency: '34%',
      avgFixTime: '2 hours',
      severity: 'medium',
    },
    {
      error: '500 Internal Server',
      frequency: '23%',
      avgFixTime: '4 hours',
      severity: 'high',
    },
    {
      error: '403 Forbidden',
      frequency: '18%',
      avgFixTime: '1 hour',
      severity: 'medium',
    },
    {
      error: 'SSL Mixed Content',
      frequency: '15%',
      avgFixTime: '3 hours',
      severity: 'high',
    },
    {
      error: 'Database Connection',
      frequency: '10%',
      avgFixTime: '6 hours',
      severity: 'critical',
    },
  ];

  const resolutionStats = [
    { metric: 'Average Resolution Time', value: '2.5 hours', trend: '-45%' },
    { metric: 'First-Time Fix Rate', value: '94%', trend: '+12%' },
    { metric: 'Customer Satisfaction', value: '98.5%', trend: '+5%' },
    { metric: 'Zero Downtime Fixes', value: '87%', trend: '+23%' },
  ];

  return (
    <section className='py-16'>
      <ComponentWrapper>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-3xl'>
            Error Resolution Dashboard
          </h2>
          <p className='mx-auto max-w-2xl'>
            Fast, reliable troubleshooting with zero data loss guarantee
          </p>
        </div>

        {/* Common Errors */}
        <div className='bg-white dark:bg-gray-800 shadow-lg mb-12 p-8 rounded-lg'>
          <h3 className='mb-6 font-bold text-xl'>
            Common Website Errors We Fix
          </h3>
          <div className='space-y-4'>
            {commonErrors.map((error, index) => (
              <div
                key={index}
                className='flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
                <div className='flex items-center gap-4'>
                  <div
                    className={`w-4 h-4 rounded-full ${
                      error.severity === 'critical'
                        ? 'bg-red-500'
                        : error.severity === 'high'
                          ? 'bg-orange-500'
                          : 'bg-yellow-500'
                    }`}></div>
                  <span className='font-medium'>{error.error}</span>
                </div>
                <div className='flex items-center gap-6 text-sm'>
                  <span>Frequency: {error.frequency}</span>
                  <span className='font-medium text-blue-600'>
                    Avg Fix: {error.avgFixTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Statistics */}
        <div className='gap-6 grid md:grid-cols-4 mb-12'>
          {resolutionStats.map((stat, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <div className='mb-2 font-bold text-green-600 text-3xl'>
                {stat.value}
              </div>
              <h3 className='mb-2 font-medium'>{stat.metric}</h3>
              <div className='font-medium text-green-600 text-sm'>
                {stat.trend} vs last month
              </div>
            </div>
          ))}
        </div>

        {/* Troubleshooting Process */}
        <div className='gap-6 grid md:grid-cols-4'>
          {[
            {
              icon: AlertTriangle,
              title: 'Issue Detection',
              desc: 'Automated monitoring & alerts',
            },
            {
              icon: Clock,
              title: 'Rapid Response',
              desc: '< 30 minutes response time',
            },
            {
              icon: Shield,
              title: 'Safe Resolution',
              desc: 'Zero data loss guarantee',
            },
            {
              icon: CheckCircle,
              title: 'Verification',
              desc: 'Complete testing & validation',
            },
          ].map((step, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center'>
              <step.icon className='mx-auto mb-4 w-12 h-12 text-red-600' />
              <h3 className='mb-2 font-bold'>{step.title}</h3>
              <p className='text-sm'>{step.desc}</p>
            </div>
          ))}
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default ErrorResolutionDashboard;
