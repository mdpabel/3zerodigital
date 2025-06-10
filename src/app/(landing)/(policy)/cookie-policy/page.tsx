import { FaCookieBite, FaShieldAlt } from 'react-icons/fa';
import { genMetaData } from '@/app/seo';

export const dynamic = 'force-static';

export const metadata = genMetaData({
  title: 'Cookie Policy',
  url: '/cookie-policy',
});

const CookiePolicy = () => {
  return (
    <div className='px-6 py-12 md:py-20'>
      <div className='mx-auto max-w-5xl'>
        <h1 className='font-bold text-3xl text-center text-gray-900 md:text-5xl dark:text-white'>
          Cookie Policy
        </h1>
        <p className='mt-4 text-center text-lg dark:text-gray-300'>
          Last Updated: <span className='font-semibold'>November 9, 2024</span>
        </p>
        <div className='space-y-10 mt-8'>
          {/* Section 1 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaCookieBite className='inline-block mr-2' />
              1. What Are Cookies?
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Cookies are small text files that are stored on your device when
              you visit our website. They allow us to recognize your browser and
              capture and remember certain information.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaCookieBite className='inline-block mr-2' />
              2. Types of Cookies We Use
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We use the following types of cookies on our website:
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>
                <strong>Essential Cookies</strong>: These cookies are necessary
                for the operation of our website, such as remembering your login
                information or preferences.
              </li>
              <li>
                <strong>Performance Cookies</strong>: These cookies help us
                understand how visitors interact with our website by collecting
                anonymous data. They help improve the functionality and user
                experience.
              </li>
              <li>
                <strong>Functional Cookies</strong>: These cookies allow our
                website to remember your preferences, such as language or
                region, to enhance your experience.
              </li>
              <li>
                <strong>Advertising Cookies</strong>: These cookies track your
                browsing habits to deliver more relevant advertisements to you,
                based on your interests.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaCookieBite className='inline-block mr-2' />
              3. How We Use Cookies
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We use cookies for several purposes, including:
            </p>
            <ul className='space-y-2 mt-4 text-gray-700 dark:text-gray-300 list-disc list-inside'>
              <li>To analyze website traffic and improve user experience.</li>
              <li>To enable social media features.</li>
              <li>To provide personalized content and advertisements.</li>
              <li>To remember user preferences and settings across visits.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaShieldAlt className='inline-block mr-2' />
              4. Managing Cookies
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              You can control and manage cookies through your browser settings.
              You can choose to disable cookies, but please note that this may
              affect the functionality of the website.
            </p>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Most browsers allow you to block cookies or set notifications when
              a cookie is being used. Refer to your browser's help section for
              more details.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              <FaCookieBite className='inline-block mr-2' />
              5. Third-Party Cookies
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We may also use third-party cookies for analytics, advertising,
              and social media features. These third parties may collect
              information about your activities on our site and other websites.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              6. Changes to This Cookie Policy
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We may update our Cookie Policy from time to time. Any changes
              will be posted on this page, along with the updated date.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className='font-semibold text-2xl text-gray-800 dark:text-gray-200'>
              7. Contact Us
            </h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              If you have any questions about our Cookie Policy, feel free to
              reach out to us:
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

export default CookiePolicy;
