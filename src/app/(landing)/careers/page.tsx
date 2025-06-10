import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { jobs } from './data';
import { genMetaData } from '@/app/seo';

export const metadata = genMetaData({
  title: 'Careers',
  url: '/careers',
});

export default async function CareerPage() {
  return (
    <div className='mx-auto px-4 py-12 p-4 max-w-5xl'>
      <section className='mb-16 text-center'>
        <h1 className='mb-4 font-bold text-4xl'>
          Join Our Team at 3 Zero Digital
        </h1>
        <p className='mx-auto max-w-3xl text-muted-foreground text-xl'>
          At 3 Zero Digital, we're committed to achieving 0 Vulnerability, 0
          Downtime, and 0 Error. Join us and be part of a team that is
          transforming digital experiences with precision and excellence.
        </p>
      </section>

      <section className='mb-16'>
        <h2 className='mb-8 font-semibold text-3xl'>
          Why Work With 3 Zero Digital
        </h2>
        <div className='gap-8 grid md:grid-cols-3'>
          {[
            {
              title: 'Excellence',
              description:
                'Be part of a team that strives for 0 Vulnerability, 0 Downtime, and 0 Error in everything we do.',
            },
            {
              title: 'Innovation',
              description:
                'Work on groundbreaking solutions that push the boundaries of digital technology.',
            },
            {
              title: 'Impact',
              description:
                'Make a significant impact on the digital world by providing flawless, error-free services to clients globally.',
            },
          ].map((perk, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{perk.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{perk.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='mb-16'>
        <h2 className='mb-8 font-semibold text-3xl'>Open Positions</h2>
        <div className='gap-6 grid md:grid-cols-2'>
          {jobs.map((job) => (
            <Card key={job.id} className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.department}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2 mb-4'>
                  <Badge variant='secondary'>{job.department}</Badge>
                  <Badge variant='secondary'>{job.location}</Badge>
                  <Badge variant='outline'>{job.type}</Badge>
                </div>
                <Link
                  href={`/careers/${job.slug}`}
                  className='font-medium text-sm hover:underline'>
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
