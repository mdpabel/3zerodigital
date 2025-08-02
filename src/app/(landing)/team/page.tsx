'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ComponentWrapper from '@/components/common/component-wrapper';
import Image from 'next/image';
import Link from 'next/link';

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

export default function TeamPage() {
  return (
    <ComponentWrapper className='py-16'>
      <div className='mb-12 text-center'>
        <h1 className='mb-2 font-bold text-primary text-4xl'>Meet the Team</h1>
        <p className='mx-auto max-w-2xl text-muted-foreground text-lg'>
          The minds behind 3Zero Digital’s mission: 0 Vulnerability, 0 Downtime,
          0 Error.
        </p>
      </div>

      <div className='gap-8 grid sm:grid-cols-2 lg:grid-cols-3'>
        {teamMembers.map((member) => (
          <Card
            key={member.id}
            className='bg-gray-900 shadow-lg border border-muted/20'>
            <CardContent className='flex flex-col items-center p-6 text-center'>
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
                className='mb-4 border border-primary rounded-full object-cover'
              />
              <h3 className='font-semibold text-foreground text-xl'>
                {member.name}
              </h3>
              <p className='mb-2 text-muted-foreground'>{member.role}</p>
              <p className='mb-4 text-muted-foreground text-sm'>{member.bio}</p>
              <ul className='flex flex-wrap justify-center gap-2 mb-4'>
                {member.specialties.map((skill, i) => (
                  <li
                    key={i}
                    className='bg-muted px-2 py-1 rounded-full text-muted-foreground text-xs'>
                    {skill}
                  </li>
                ))}
              </ul>
              <div className='flex gap-4'>
                {member.social.linkedin && (
                  <Link href={member.social.linkedin} target='_blank'>
                    <Linkedin className='w-4 h-4 text-muted-foreground hover:text-primary' />
                  </Link>
                )}
                {member.social.twitter && (
                  <Link href={member.social.twitter} target='_blank'>
                    <Twitter className='w-4 h-4 text-muted-foreground hover:text-primary' />
                  </Link>
                )}
                {member.social.github && (
                  <Link href={member.social.github} target='_blank'>
                    <Github className='w-4 h-4 text-muted-foreground hover:text-primary' />
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ComponentWrapper>
  );
}
