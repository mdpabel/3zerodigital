import headlessPerformance from '@/../public/images/headless-security.png';
import headlessSecurity from '@/../public/images/headless-security.png';
import headlessCost from '@/../public/images/headless-cost.png';
import headlessScale from '@/../public/images/headless-scale.png';
import { FaShieldAlt, FaRocket, FaCloud, FaDollarSign } from 'react-icons/fa';

export const benefits = [
  {
    icon: <FaRocket />,
    title: 'The Power of Speed',
    description:
      'Website speed is critical—not just for user satisfaction, but for your bottom line. With Headless architecture and CDN delivery, we eliminate delays and deliver static content instantly, reducing load times and boosting conversions. By serving pre-rendered pages and optimizing dynamic elements, your site responds faster, improves user experience, and drives business growth.',
    image: headlessPerformance,
  },
  {
    icon: <FaShieldAlt />,
    title: 'Decoupled Security',
    description:
      'Minimize vulnerabilities and reduce the risk of exposing sensitive data by leveraging static hosting and a robust API-first approach. This reduces the potential attack surface, ensuring that your website’s infrastructure remains secure while focusing on securing API routes specifically for safe and controlled interactions.',
    image: headlessSecurity,
  },
  {
    icon: <FaDollarSign />,
    title: 'Cost Efficiency',
    description:
      'Save on hosting costs by using static files and CDN delivery, reducing overheads for scaling. With Headless, you pay only for what you use, making it a cost-effective solution for websites of all sizes.',
    image: headlessCost, // Replace with the correct image for this benefit
  },
  {
    icon: <FaCloud />,
    title: 'Scalable Growth',
    description:
      'Easily scale your website with minimal server resources. With the power of static hosting and CDN distribution, you can handle massive spikes in traffic without worrying about infrastructure.',
    image: headlessScale, // Replace with the correct image for this benefit
  },
];

// List of questions
export const questions = [
  {
    question: 'Is your Lighthouse performance score 98% or higher?',
    options: ['Yes', 'No'],
    correctAnswer: 'Yes',
  },
  {
    question:
      'Does your website’s initial page load happen in under 1.8 seconds?',
    options: ['Yes', 'No'],
    correctAnswer: 'Yes',
  },
  {
    question: 'Is your website optimized for Core Web Vitals?',
    options: ['Yes', 'No'],
    correctAnswer: 'Yes',
  },
  {
    question:
      'Do you use a Content Delivery Network (CDN) for faster global content delivery?',
    options: ['Yes', 'No'],
    correctAnswer: 'Yes',
  },
  {
    question: 'Is your website fully responsive and mobile-friendly?',
    options: ['Yes', 'No'],
    correctAnswer: 'Yes',
  },
  {
    question: 'Have you implemented SSL (HTTPS) across your entire website?',
    options: ['Yes', 'No'],
    correctAnswer: 'Yes',
  },
  {
    question:
      'Is your website built using a modern technologies (like React, Nextjs), scalable architecture?',
    options: ['Yes', 'No'],
    correctAnswer: 'Yes',
  },
  {
    question:
      "Is your website's design modern and in line with current web design trends?",
    options: ['Yes', 'No'],
    correctAnswer: 'Yes',
  },
  {
    question:
      'Is your website optimized to rank higher on search engines like Google?',
    options: ['Yes', 'No'],
    correctAnswer: 'Yes',
  },
];

export const processes = [
  {
    title: 'Consultation & Planning',
    description:
      'Understand your goals, define the scope, and outline features for your WordPress site.',
    icon: '👥',
  },
  {
    title: 'Wireframing & Design',
    description:
      'Visualize the layout with mockups and ensure a user-friendly design.',
    icon: '✏️',
  },
  {
    title: 'Development & Coding',
    description:
      'Bring your design to life with WordPress themes, plugins and functionality.',
    icon: '💻',
  },
  {
    title: 'Content Integration',
    description: 'Upload and optimize content for better user experience.',
    icon: '📄',
  },
  {
    title: 'Testing & Feedback',
    description:
      'Conduct thorough testing and incorporate your feedback before launch.',
    icon: '✅',
  },
  {
    title: 'Deployment & Support',
    description:
      'Launch your site and provide ongoing maintenance and support.',
    icon: '🚀',
  },
];
