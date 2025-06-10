import {
  FaShieldAlt,
  FaUserCheck,
  FaLaptopCode,
  FaHandshake,
  FaMoneyBillWave,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { genMetaData } from '@/app/seo';

export const dynamic = 'force-static';

export const metadata = genMetaData({
  title: 'Terms of Service',
  url: '/terms-of-service',
});

const TermsOfService = () => {
  return (
    <div className='px-6 py-12 md:py-20'>
      <div className='mx-auto max-w-5xl'>
        <h1 className='font-bold text-3xl text-center text-gray-900 md:text-5xl dark:text-white'>
          Terms of Service (ToS)
        </h1>
        <p className='mt-4 text-center text-lg dark:text-gray-300'>
          Effective Date:{' '}
          <span className='font-semibold'>November 9, 2024</span> <br />
          Last Updated: <span className='font-semibold'>November 9, 2024</span>
        </p>
        <div className='space-y-10 mt-8'>
          {/* Section 1 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaShieldAlt className='inline-block mr-2' />
              1. Our Commitment
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              At <strong>3Zero Digital</strong>, our mission is to strive for
              "zero vulnerability, zero downtime, and zero error." While
              achieving absolute perfection may not always be feasible, we are
              committed to providing exceptional services and continuously
              improving our offerings.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaUserCheck className='inline-block mr-2' />
              2. Eligibility
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Our services are intended for users of all ages. However, if you
              are under the age of 18, we recommend parental or guardian
              supervision when using our services.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaLaptopCode className='inline-block mr-2' />
              3. Services We Offer
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We provide a wide range of services categorized under the
              following sections:
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>
                <strong>Development</strong>: WordPress, Shopify,
                frontend/backend, MERN stack, and custom WP theme development.
              </li>
              <li>
                <strong>Maintenance</strong>: Malware removal, speed
                optimization, security enhancements, backups, and more.
              </li>
              <li>
                <strong>Troubleshooting</strong>: Fixing 404/500 errors, white
                screens, and mixed content issues.
              </li>
              <li>
                <strong>Marketing</strong>: SEO, social media, email campaigns,
                backlink building, and content marketing.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaHandshake className='inline-block mr-2' />
              4. Use of Third-Party Services
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We leverage trusted third-party tools, including:
            </p>
            <ul className='mt-4 ml-10 text-gray-700 dark:text-gray-300 list-disc'>
              <li>Stripe for payment processing</li>
              <li>Resend for email communications</li>
              <li>Tawk.to for live chat support</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaExclamationTriangle className='inline-block mr-2' />
              5. Your Responsibilities
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              By using our services, you agree to:
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>Provide accurate and truthful information.</li>
              <li>Comply with applicable laws and our guidelines.</li>
              <li>
                Avoid harmful activities, such as compromising systems or
                spreading malicious content.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaMoneyBillWave className='inline-block mr-2' />
              6. Payment and Refunds
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              All payments are securely processed via Stripe or other authorized
              gateways. Refunds are issued based on our refund policy.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              7. Limitation of Liability
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We aim to provide reliable services but cannot guarantee 100%
              uptime or immunity from vulnerabilities. Our liability is limited
              to the amount you paid for the affected service.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              8. Changes to Terms
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We may update these Terms at any time. Changes will be posted on
              our website, and continued use of our services indicates
              acceptance of updated Terms.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              9. Contact Us
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              For questions about these Terms:
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300'>
              <li>
                <strong>Email:</strong>{' '}
                <a
                  href='mailto:support@3zerodigital.com'
                  className='text-blue-600 dark:text-blue-400 underline'>
                  support@3zerodigital.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong> +44 7878 798374
              </li>
              <li>
                <strong>Address:</strong> Suite A 82 James Carter Road,
                Mildenhall, Bury St. Edmunds, England, United Kingdom, IP28 7DE
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
