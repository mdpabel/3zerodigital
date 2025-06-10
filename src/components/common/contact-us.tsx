import React from 'react';
import { FaWhatsapp, FaFacebookF, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  const contacts = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className='text-2xl text-green-500' />,
      link: 'https://wa.me/+447878798374', // Replace with your WhatsApp number
      description: 'Chat with us on WhatsApp for instant support.',
    },
    {
      name: 'Facebook Page',
      icon: <FaFacebookF className='text-2xl text-blue-600' />,
      link: 'https://facebook.com/3zerodigital.LLC', // Replace with your Facebook page link
      description: 'Visit our Facebook page for updates and inquiries.',
    },
    {
      name: 'Email',
      icon: <FaEnvelope className='text-2xl text-red-500' />,
      link: 'mailto:info@3zerodigital.com', // Replace with your email address
      description: 'Send us an email, and we’ll get back to you soon.',
    },
  ];

  return (
    <div className='px-6 py-16 text-center'>
      <h2 className='mb-6 font-bold text-4xl'>📞 Contact Us</h2>
      <p className='mb-8 text-lg'>
        We’re here to help! Reach out to us through any of the channels below.
      </p>
      <div className='gap-6 grid grid-cols-1 sm:grid-cols-3 mx-auto max-w-5xl'>
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.link}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-lg transition'>
            <div className='flex flex-col items-center'>
              {contact.icon}
              <h3 className='mt-4 font-semibold text-xl'>{contact.name}</h3>
              <p className='mt-2 text-center text-sm'>{contact.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
