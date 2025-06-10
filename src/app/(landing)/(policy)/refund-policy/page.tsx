import React from 'react';
import { FaRegCheckCircle, FaTools, FaCogs, FaBullhorn } from 'react-icons/fa';
import { genMetaData } from '@/app/seo';

export const dynamic = 'force-static';

export const metadata = genMetaData({
  title: 'Refund Policy',
  url: '/refund-policy',
});

const RefundPolicy: React.FC = () => {
  return (
    <div className='px-6 py-12 md:py-20'>
      <div className='mx-auto max-w-5xl'>
        <h1 className='font-bold text-3xl text-center text-gray-900 md:text-5xl dark:text-white'>
          3Zero Digital Refund Policy
        </h1>
        <p className='mt-4 text-center text-lg dark:text-gray-300'>
          Last Updated: <span className='font-semibold'>November 9, 2024</span>
        </p>
        <p className='mt-4 text-center text-lg dark:text-gray-300'>
          At 3Zero Digital, we aim for customer satisfaction with our services
          and products. Due to the nature of our work, we have specific refund
          policies. Please read the details carefully for different service
          categories.
        </p>
        <div className='space-y-10 mt-8'>
          {/* Maintenance and Troubleshooting Services */}
          <section>
            <h2 className='flex items-center font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaTools className='mr-2 text-green-500' />
              Maintenance and Troubleshooting Services
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Refunds for maintenance and troubleshooting services are
              considered carefully, as these involve immediate work.
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>
                Refunds are granted only if the issue remains unresolved, with
                sufficient proof provided.
              </li>
              <li>
                <span className='font-bold'>No refunds will be issued if:</span>
                <ul className='space-y-2 ml-10 list-disc list-inside'>
                  <li>
                    The issue is resolved, but the client claims
                    dissatisfaction.
                  </li>
                  <li>
                    Third-party interference caused new issues after the
                    resolution.
                  </li>
                  <li>
                    The client did not provide necessary credentials or
                    information for resolution.
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          {/* Development Services */}
          <section>
            <h2 className='flex items-center font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaCogs className='mr-2 text-yellow-500' />
              Development Services
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Development services involve regular updates and approvals, with
              refunds tied to milestones.
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>
                Refunds are not allowed for approved milestones or completed
                project stages.
              </li>
              <li>
                <span className='font-bold'>
                  If a project is canceled midway:
                </span>
                <ul className='space-y-2 ml-10 list-disc list-inside'>
                  <li>
                    Refunds may be issued for uncompleted portions based on work
                    progress.
                  </li>
                  <li>
                    No refunds are provided for approved and delivered work.
                  </li>
                </ul>
              </li>
              <li>
                For custom development, no refunds are allowed after project
                approval and delivery.
              </li>
            </ul>
          </section>

          {/* Marketing Services */}
          <section>
            <h2 className='flex items-center font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaBullhorn className='mr-2 text-red-500' />
              Marketing Services
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Marketing services such as SEO, advertising, and campaign
              management involve ongoing efforts and specific deliverables.
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>
                No refunds are allowed for delivered campaigns or completed
                deliverables.
              </li>
              <li>
                Refunds may be considered for undelivered campaigns if the
                cancellation request is submitted before the campaign start
                date.
              </li>
              <li>
                For performance-based marketing services, refunds are not
                allowed as results depend on various external factors.
              </li>
            </ul>
          </section>

          {/* Products */}
          <section>
            <h2 className='flex items-center font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaRegCheckCircle className='mr-2 text-green-500' />
              Products (e.g., Templates or Digital Downloads)
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Refunds for digital products or campaigns are restricted once
              accessed or delivered.
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>
                Refunds will not be issued for:
                <ul className='space-y-2 ml-10 list-disc list-inside'>
                  <li>
                    Digital products that have been downloaded or accessed.
                  </li>
                  <li>
                    Claims of dissatisfaction when the product matches its
                    description.
                  </li>
                </ul>
              </li>
              <li>
                Refunds are allowed only for technical issues, such as corrupted
                files, if reported within 7 days.
              </li>
              <li>
                For campaigns, no refunds will be processed if:
                <ul className='space-y-2 ml-10 list-disc list-inside'>
                  <li>All campaign services have been delivered.</li>
                  <li>
                    The client failed to provide necessary inputs or caused
                    delays.
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              Contact Information
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              If you have any questions or concerns about our refund policy,
              please contact us at:
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300'>
              <li>
                Email:{' '}
                <a
                  href='mailto:support@3zerodigital.com'
                  className='text-blue-500'>
                  support@3zerodigital.com
                </a>
              </li>
              <li>
                Phone:{' '}
                <span className='text-gray-900 dark:text-white'>
                  (+880) 1234-567890
                </span>
              </li>
              <li>Office Hours: Monday - Friday, 9:00 AM - 6:00 PM (GMT+6)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
