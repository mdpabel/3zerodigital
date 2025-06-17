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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ComponentWrapper from '@/components/common/component-wrapper';
import Logo from './logo';
import NewsletterSection from './newsletter-section';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const serviceCategories = [
    {
      title: 'Development Services',
      links: [
        { name: 'WordPress Development', href: '/wordpress-development' },
        {
          name: 'Headless WordPress & Next.js',
          href: '/headless-wordpress-nextjs',
        },
        { name: 'Shopify Store Development', href: '/shopify-development' },
        { name: 'MERN Stack Development', href: '/mern-stack-development' },
        {
          name: 'React Frontend Development',
          href: '/react-frontend-development',
        },
        { name: 'Next.js Applications', href: '/nextjs-applications' },
      ],
    },
    {
      title: 'Digital Marketing',
      links: [
        { name: 'SEO Services', href: '/seo-services' },
        { name: 'Google Ads Management', href: '/google-ads' },
        { name: 'Meta Ads (Facebook)', href: '/meta-ads' },
        { name: 'TikTok Ads', href: '/tiktok-ads' },
        { name: 'LinkedIn Ads', href: '/linkedin-ads' },
        { name: 'Local SEO', href: '/local-seo' },
      ],
    },
    {
      title: 'Maintenance & Support',
      links: [
        { name: 'WordPress Maintenance', href: '/wordpress-maintenance' },
        { name: 'Malware Removal', href: '/malware-removal' },
        { name: 'Speed Optimization', href: '/speed-optimization' },
        { name: 'SSL Installation', href: '/ssl-installation' },
        { name: 'Website Migration', href: '/website-migration' },
        { name: 'Security Services', href: '/security-services' },
      ],
    },
    {
      title: 'Graphics & Video',
      links: [
        { name: 'Logo Design', href: '/logo-design' },
        { name: 'Brochure Design', href: '/brochure-design' },
        { name: 'Video Ads Creation', href: '/video-ads' },
        { name: 'Brand Identity', href: '/brand-identity' },
        { name: 'Social Media Graphics', href: '/social-media-graphics' },
      ],
    },
  ];

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
    { name: 'Book a Call', href: '/book-call' },
    { name: 'Submit Ticket', href: '/support/tickets/create' },
    { name: 'System Status', href: '/status' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR Compliance', href: '/gdpr' },
    { name: 'Refund Policy', href: '/refund-policy' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  ];

  return (
    <footer>
      {/* Newsletter Section */}
      <NewsletterSection />

      <div className='bg-gray-900'>
        {/* Main Footer Content */}
        <div className='py-12'>
          <ComponentWrapper>
            <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6'>
              {/* Company Info */}
              <div className='lg:col-span-2'>
                <Logo />
                <p className='mt-4 text-gray-400 text-sm leading-relaxed'>
                  Your trusted partner for web development, digital marketing,
                  and business growth. We deliver cutting-edge solutions that
                  help businesses thrive in the digital world.
                </p>

                {/* Contact Info */}
                <div className='space-y-3 mt-6'>
                  <div className='flex items-center gap-3'>
                    <Phone className='w-4 h-4 text-blue-400' />
                    <span className='text-sm'>+1 (555) 123-4567</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Mail className='w-4 h-4 text-blue-400' />
                    <span className='text-sm'>hello@yourcompany.com</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <MapPin className='w-4 h-4 text-blue-400' />
                    <span className='text-sm'>
                      123 Business Ave, Tech City, TC 12345
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

              {/* Services */}
              {serviceCategories.map((category) => (
                <div key={category.title}>
                  <h4 className='mb-4 font-semibold text-white'>
                    {category.title}
                  </h4>
                  <ul className='space-y-2'>
                    {category.links.map((link) => (
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
              ))}
            </div>

            {/* Additional Links */}
            <div className='mt-12 pt-8 border-gray-800 border-t'>
              <div className='gap-8 grid grid-cols-1 md:grid-cols-3'>
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
