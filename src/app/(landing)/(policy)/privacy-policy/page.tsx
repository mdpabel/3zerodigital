import { FaUserShield, FaCookieBite, FaRegEdit, FaLock } from 'react-icons/fa';
import { genMetaData } from '@/app/seo';

export const dynamic = 'force-static';

export const metadata = genMetaData({
  title: 'Privacy Policy',
  url: '/privacy-policy',
});

const PrivacyPolicy = () => {
  return (
    <div className='px-6 py-12 md:py-20'>
      <div className='mx-auto max-w-5xl'>
        <h1 className='font-bold text-3xl text-center text-gray-900 md:text-5xl dark:text-white'>
          Privacy Policy
        </h1>
        <p className='mt-4 text-center text-lg dark:text-gray-300'>
          Last Updated: <span className='font-semibold'>November 9, 2024</span>
        </p>
        <div className='space-y-10 mt-8'>
          {/* Section 1 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaUserShield className='inline-block mr-2' />
              1. Information We Collect
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              At <strong>3Zero Digital</strong>, we collect the following types
              of information:
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>
                <strong>Personal Information</strong>: We collect your name,
                email address, and billing details when you sign up, contact us,
                or complete a payment transaction.
              </li>
              <li>
                <strong>Technical Information</strong>: We collect your IP
                address, browser type, and device information when you use our
                site, including during visits, sign-ups, and sign-ins.
              </li>
              <li>
                <strong>Other Information</strong>: Feedback, queries, or
                details you share with us.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaRegEdit className='inline-block mr-2' />
              2. How We Use Your Information
            </h2>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>To provide and improve our services.</li>
              <li>To respond to your questions and requests.</li>
              <li>To process payments securely.</li>
              <li>
                To send updates or promotional emails (you can opt-out anytime).
              </li>
              <li>
                To analyze website performance and enhance user experience.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaLock className='inline-block mr-2' />
              3. Sharing Your Information
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We do not sell your personal information. However, we may share
              your data with:
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>
                <strong>Service Providers</strong>: We may share your data with
                third-party service providers, including:
                <ul className='ml-10 list-disc'>
                  <li>Stripe for payment processing</li>
                  <li>Email platforms for communication</li>
                  <li>Tawk.to for live chat support</li>
                  <li>Resend for email notifications</li>
                </ul>
              </li>
              <li>
                <strong>Legal Authorities</strong>: When required by law.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaCookieBite className='inline-block mr-2' />
              4. Cookies and Tracking
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We use cookies to enhance functionality and analyze traffic. You
              can disable cookies through your browser settings, but some
              features may not work as intended.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              5. How We Protect Your Information
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We implement strong security measures to keep your data safe,
              including:
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>Encrypted connections (SSL).</li>
              <li>Restricting access to sensitive information.</li>
              <li>Regularly monitoring systems for vulnerabilities.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              6. Your Rights
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              You have the right to access, update, or delete your data. Contact
              us to exercise your rights.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              7. Changes to This Policy
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We may update this Privacy Policy. Any changes will be reflected
              with a new "Last Updated" date.
            </p>
          </section>

          {/* Section 8 */}
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

export default PrivacyPolicy;
