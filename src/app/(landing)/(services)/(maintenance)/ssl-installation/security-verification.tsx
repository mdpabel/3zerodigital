// components/services/ssl/security-verification.tsx
import { Lock, Shield, Globe, CheckCircle } from 'lucide-react';

const SSLSecurityVerification = () => {
  return (
    <section className='py-16'>
      {/* Benefits */}
      <div className='gap-6 grid md:grid-cols-4'>
        {[
          {
            icon: Shield,
            title: 'Data Encryption',
            desc: '256-bit encryption',
          },
          { icon: Globe, title: 'SEO Boost', desc: 'Google ranking factor' },
          {
            icon: CheckCircle,
            title: 'Trust Badge',
            desc: 'Visitor confidence',
          },
          { icon: Lock, title: '99.9% Uptime', desc: 'Reliable protection' },
        ].map((benefit, index) => (
          <div key={index} className='text-center'>
            <benefit.icon className='mx-auto mb-4 w-12 h-12 text-green-600' />
            <h3 className='mb-2 font-bold'>{benefit.title}</h3>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              {benefit.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SSLSecurityVerification;
