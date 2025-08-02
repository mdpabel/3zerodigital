'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Heart,
  Globe,
  Shield,
  Code,
  TrendingUp,
  Clock,
  Star,
  Coffee,
  Lightbulb,
  Rocket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';
import Image from 'next/image';

// Team members data
const teamMembers = [
  {
    id: 1,
    name: 'MD Pabel',
    role: 'CEO & Founder',
    image: '/images/team/mdpabel.jpg',
    bio: 'Full-stack developer with 7+ years of freelancing, 3000+ sites secured, and deep experience in WordPress security and modern web stacks.',
    specialties: ['Web Development', 'WordPress Security', 'Project Strategy'],
    social: {
      linkedin: 'https://www.linkedin.com/in/mdpabe1/',
      twitter: 'https://twitter.com/mdpabel',
      github: 'https://github.com/mdpabel',
    },
  },
  {
    id: 4,
    name: 'Munem Sahriar',
    role: 'CIO',
    image: '/images/team/muneem.png',
    bio: 'Chief Information Officer and core team member. Turned down international opportunities to contribute to 3 Zero’s vision of secure, scalable digital solutions.',
    specialties: ['Information Management', 'Security', 'System Design'],
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    id: 2,
    name: 'Md Nasrullah',
    role: 'COO',
    image: '/images/team/rony.png',
    bio: 'Co-founder with strong operational leadership. Brings a solid background in full-stack development and coordination across teams.',
    specialties: ['Operations', 'Team Management', 'Full Stack Development'],
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    id: 3,
    name: 'Mohtamim Nayeem',
    role: 'CTO',
    image: '/images/team/nayeem.png',
    bio: 'Chief Technology Officer with extensive freelance and job experience, having secured 3000+ websites. Leads our technical vision and development standards.',
    specialties: ['Security', 'Infrastructure', 'Architecture'],
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    id: 6,
    name: 'Shahab Uddin Chowdhury',
    role: 'CTO',
    image: '/images/team/parvez.png',
    bio: 'Chief Technology Officer with extensive freelance and job experience, having secured 3000+ websites. Leads our technical vision and development standards.',
    specialties: ['Security', 'Infrastructure', 'Architecture'],
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
];

// Company values
const values = [
  {
    icon: Shield,
    title: 'Zero Compromises',
    description:
      'We maintain our commitment to zero vulnerabilities, zero downtime, and zero errors in everything we deliver.',
  },
  {
    icon: Heart,
    title: 'Client-Focused',
    description:
      'Your success is our success. We prioritize your business goals and work tirelessly to achieve them.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We stay ahead of technology trends and continuously innovate to provide cutting-edge solutions.',
  },
  {
    icon: Star,
    title: 'Excellence',
    description:
      'We strive for perfection in every project, ensuring the highest quality standards in all our work.',
  },
];

// Company stats
const stats = [
  { label: 'Projects Completed', value: '500+', icon: Rocket },
  { label: 'Happy Clients', value: '200+', icon: Users },
  { label: 'Years Experience', value: '8+', icon: Clock },
  { label: 'Team Members', value: '15+', icon: Coffee },
];

const AboutUsPage = () => {
  return (
    <section className='relative py-16 md:py-24 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl container'>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-20 text-center'>
            <Badge className='bg-blue-100 dark:bg-blue-900/20 mb-6 px-4 py-2 border border-blue-200/50 dark:border-blue-800/50 font-medium text-blue-800 dark:text-blue-300 text-sm'>
              <Users className='mr-2 w-4 h-4' />
              About 3Zero Digital
            </Badge>

            <h1 className='mb-6 font-bold text-3xl md:text-4xl lg:text-6xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Building Digital Excellence
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-4xl text-slate-600 dark:text-slate-300 text-lg md:text-xl'>
              We're a passionate team of developers, designers, and digital
              strategists committed to delivering
              <strong>
                {' '}
                zero vulnerabilities, zero downtime, and zero errors
              </strong>{' '}
              in every project we undertake.
            </p>

            <div className='flex sm:flex-row flex-col justify-center gap-4'>
              <Button
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 text-white'>
                <Target className='mr-2 w-5 h-5' />
                Our Services
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='bg-white/80 dark:bg-slate-800/80'>
                <Users className='mr-2 w-5 h-5' />
                Meet the Team
              </Button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 mb-20 p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl'>
            <div className='gap-8 grid grid-cols-2 md:grid-cols-4'>
              {stats.map((stat, index) => (
                <div key={index} className='text-center'>
                  <div className='inline-flex justify-center items-center bg-blue-600 mb-4 rounded-full w-12 h-12'>
                    <stat.icon className='w-6 h-6 text-white' />
                  </div>
                  <div className='font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                    {stat.value}
                  </div>
                  <div className='text-slate-600 dark:text-slate-400 text-sm'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='mb-20'>
            <div className='items-center gap-12 grid grid-cols-1 lg:grid-cols-2'>
              <div>
                <h2 className='mb-6 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl'>
                  Our Story
                </h2>
                <div className='space-y-4 text-slate-600 dark:text-slate-300'>
                  <p className='text-lg'>
                    Founded in 2017, 3Zero Digital emerged from a simple yet
                    powerful vision: to create web solutions that never
                    compromise on quality, security, or performance.
                  </p>
                  <p>
                    Our journey began when our founder, Alex Johnson,
                    experienced firsthand the frustration of working with
                    agencies that delivered subpar websites with security
                    vulnerabilities and performance issues. This sparked the
                    idea for a company that would operate differently.
                  </p>
                  <p>
                    We built our foundation on three core principles:{' '}
                    <strong>zero vulnerabilities</strong>,
                    <strong> zero downtime</strong>, and{' '}
                    <strong>zero errors</strong>. These aren't just marketing
                    slogans—they're the measurable standards we hold ourselves
                    to in every project.
                  </p>
                  <p>
                    Today, we're proud to have helped over 200 businesses
                    establish a strong, secure, and high-performing online
                    presence.
                  </p>
                </div>
              </div>

              <div className='relative'>
                <div className='bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl'>
                  <div className='bg-white/10 backdrop-blur-md p-6 border border-white/20 rounded-xl'>
                    <h3 className='mb-4 font-bold text-white text-xl'>
                      Our Mission
                    </h3>
                    <p className='mb-6 text-blue-100'>
                      To empower businesses with digital solutions that are
                      secure, reliable, and performant, enabling them to focus
                      on what they do best while we handle their digital
                      presence.
                    </p>
                    <div className='flex items-center gap-2 text-blue-100'>
                      <Sparkles className='w-5 h-5' />
                      <span className='font-medium'>
                        Zero compromises, maximum impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mb-20'>
            <div className='mb-12 text-center'>
              <h2 className='mb-4 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl'>
                Our Values
              </h2>
              <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-lg'>
                These core values guide every decision we make and every
                solution we deliver
              </p>
            </div>

            <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className='bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-center'>
                  <div className='inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 mb-4 rounded-full w-12 h-12'>
                    <value.icon className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='mb-3 font-bold text-slate-900 dark:text-white text-lg'>
                    {value.title}
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-sm'>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='mb-20'>
            <div className='mb-12 text-center'>
              <h2 className='mb-4 font-bold text-slate-900 dark:text-white text-3xl md:text-4xl'>
                Meet Our Team
              </h2>
              <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-lg'>
                The talented individuals behind our success
              </p>
            </div>

            <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className='group bg-white/70 dark:bg-slate-800/70 hover:shadow-lg backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300'>
                  <div className='relative'>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='bottom-4 left-4 absolute'>
                      <Badge className='bg-blue-600 text-white'>
                        {member.role}
                      </Badge>
                    </div>
                  </div>

                  <div className='p-6'>
                    <h3 className='mb-2 font-bold text-slate-900 dark:text-white text-lg'>
                      {member.name}
                    </h3>
                    <p className='mb-4 text-slate-600 dark:text-slate-300 text-sm'>
                      {member.bio}
                    </p>

                    <div className='mb-4'>
                      <h4 className='mb-2 font-semibold text-slate-900 dark:text-white text-sm'>
                        Specialties:
                      </h4>
                      <div className='flex flex-wrap gap-1'>
                        {member.specialties.map((specialty, idx) => (
                          <Badge
                            key={idx}
                            variant='outline'
                            className='text-xs'>
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <Button variant='outline' size='sm' className='flex-1'>
                        Connect
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='bg-gradient-to-r from-blue-50 dark:from-blue-950/20 to-purple-50 dark:to-purple-950/20 p-8 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl text-center'>
            <h3 className='mb-4 font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
              Ready to Work with Us?
            </h3>
            <p className='mb-8 text-slate-600 dark:text-slate-300 text-lg'>
              Let's discuss how we can help you achieve your digital goals with
              our zero-compromise approach
            </p>
            <div className='flex sm:flex-row flex-col justify-center gap-4'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 border-0 text-white'>
                <Target className='mr-2 w-5 h-5' />
                Start Your Project
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='bg-white/80 dark:bg-slate-800/80 px-8 py-6'>
                <Users className='mr-2 w-5 h-5' />
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </ComponentWrapper>
    </section>
  );
};

export default AboutUsPage;
