'use client';

import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import ComponentWrapper from '@/components/common/component-wrapper';
import Logo from './logo';
// import NewsletterSection from './newsletter-section';
import { FaMediumM } from 'react-icons/fa';
import { SiDevdotto } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Book a Call', href: '/book-a-call' },
    { name: 'Submit Ticket', href: '/support/tickets/create' },
    { name: 'System Status', href: '/status' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'GDPR Compliance', href: '/gdpr' },
    { name: 'Refund Policy', href: '/refund-policy' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/3zerodigital.LLC',
    },
    { name: 'Twitter', icon: Twitter, href: 'https://x.com/3ZeroDigital' },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/3zero_digital/',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/3zerodigital',
    },
    {
      name: 'Medium',
      icon: FaMediumM,
      href: 'https://3zerodigitalltd.medium.com/',
    },
    {
      name: 'Dev.to',
      icon: SiDevdotto,
      href: 'https://dev.to/3zerodigital',
    },
  ];

  return (
    <footer>
      {/* Newsletter Section */}
      {/* <NewsletterSection /> */}

      <div className='bg-gray-900'>
        {/* Main Footer Content */}
        <div className='py-12'>
          <ComponentWrapper>
            <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6'>
              {/* Company Info */}
              <div className='lg:col-span-2'>
                <Logo />
                <p className='mt-4 text-gray-400 text-sm leading-relaxed'>
                  3Zero Digital – Delivering cutting-edge web development and
                  WordPress security solutions with a focus on 0 Vulnerability,
                  0 Downtime, 0 Error. Trusted by global clients to build
                  secure, high-performance digital experiences.
                </p>

                {/* Contact Info */}
                <div className='space-y-3 mt-6'>
                  <div className='flex items-center gap-3'>
                    <div>
                      <Phone className='w-4 h-4 text-blue-400' />
                    </div>
                    <span className='text-sm'>+44 7878 798374</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div>
                      <Mail className='w-4 h-4 text-blue-400' />
                    </div>
                    <span className='text-sm'>support@3zerodigital.com</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div>
                      <MapPin className='!w-4 !h-4 text-blue-400' />
                    </div>
                    <span className='text-sm'>
                      Suite A 82 James Carter Road, Mildenhall, Bury St.
                      Edmunds, England, United Kingdom, IP28 7DE
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className='mt-6'>
                  <p className='mb-3 font-medium text-sm'>Follow Us</p>
                  <div className='flex gap-3'>
                    {socialLinks.map((social) => (
                      <Link
                        key={social.name}
                        href={social.href}
                        className='flex justify-center items-center bg-gray-800 hover:bg-blue-600 rounded-full w-8 h-8 transition-colors'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <social.icon className='w-4 h-4' />
                        <span className='sr-only'>{social.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company */}
              <div>
                <h4 className='mb-4 font-semibold text-white'>Company</h4>
                <ul className='space-y-2'>
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className='text-gray-400 hover:text-white text-sm transition-colors'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className='mb-4 font-semibold text-white'>Support</h4>
                <ul className='space-y-2'>
                  {supportLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className='text-gray-400 hover:text-white text-sm transition-colors'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className='mb-4 font-semibold text-white'>Legal</h4>
                <ul className='space-y-2'>
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className='text-gray-400 hover:text-white text-sm transition-colors'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ComponentWrapper>
        </div>

        {/* Bottom Bar */}
        <div className='bg-gray-950 py-4'>
          <ComponentWrapper>
            <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
              <p className='text-gray-400 text-sm'>
                © {currentYear} 3Zero Digital. All rights reserved.
              </p>
              <div className='flex items-center gap-6'>
                <span className='text-gray-400 text-sm'>🔒 SSL Secured</span>
                <span className='text-gray-400 text-sm'>💳 PCI Compliant</span>
                <span className='text-gray-400 text-sm'>🛡️ GDPR Ready</span>
              </div>
            </div>
          </ComponentWrapper>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
