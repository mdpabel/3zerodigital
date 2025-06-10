import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { jobs } from '../data';
import { Metadata } from 'next';

// Get the job based on the slug
const getJob = (slug: string) => {
  const job = jobs.find((j: any) => j.slug === slug);
  if (!job || !job.isActive) {
    notFound(); // Return 404 if job is not found or is inactive
  }
  return job;
};

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const job = getJob(slug);

  return {
    title: job?.title,
    description: job?.description.overview,
    alternates: {
      canonical: `/careers/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);

  return (
    <div className='mx-auto px-4 py-12 max-w-5xl'>
      <h1 className='mb-4 font-bold text-4xl text-center'>{job.title}</h1>
      <div className='flex flex-wrap justify-center gap-4 mb-8'>
        <Badge variant='secondary'>{job.department}</Badge>
        <Badge variant='secondary'>{job.location}</Badge>
        <Badge variant='outline'>{job.type}</Badge>
      </div>
      <div className='mb-8 max-w-none dark:prose-invert prose'>
        <p>{job.description.overview}</p>

        <h2>Responsibilities:</h2>
        <ul>
          {job.description.responsibilities.map(
            (responsibility: string, index: number) => (
              <li key={index}>{responsibility}</li>
            ),
          )}
        </ul>

        <h2>Requirements:</h2>
        <ul>
          {job.description.requirements.map(
            (requirement: string, index: number) => (
              <li key={index}>{requirement}</li>
            ),
          )}
        </ul>

        {job.description.nice_to_have.length > 0 && (
          <>
            <h2>Nice to Have:</h2>
            <ul>
              {job.description.nice_to_have.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                ),
              )}
            </ul>
          </>
        )}

        <h2>Project Details:</h2>
        <p>
          <strong>Timeline:</strong> {job.description.project_details.timeline}
        </p>
        <p>
          <strong>Compensation:</strong>{' '}
          {job.description.project_details.compensation}
        </p>

        <h2>Application Instructions:</h2>
        <p>
          Please submit your resume, portfolio, and a brief description of your
          experience with similar projects to{' '}
          <strong>info@3zerodigital.com</strong>
        </p>
      </div>

      <Button size='lg' asChild>
        <a href='mailto:info@3zerodigital.com' className='text-white'>
          Apply Now
        </a>
      </Button>
    </div>
  );
}
