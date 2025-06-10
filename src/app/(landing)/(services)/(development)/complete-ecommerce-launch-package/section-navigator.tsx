'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';

export interface Section {
  id: string;
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

interface SectionNavigatorProps {
  sections: Section[];
  // Offset from the top of the viewport to trigger a section as "active"
  offset?: number;
}

const SectionNavigator = ({
  sections,
  offset = 200,
}: SectionNavigatorProps) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      let currentSection = '';
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            currentSection = section.id;
          }
        }
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection, offset]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    isScrolling.current = true;
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjust for sticky header etc.
        behavior: 'smooth',
      });
    }

    // Allow scroll listener to take over again after smooth scroll finishes
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  return (
    <nav className='hidden top-1/2 left-8 z-40 fixed lg:flex -translate-y-1/2'>
      <div className='relative bg-white/60 dark:bg-slate-800/60 shadow-lg backdrop-blur-md p-3 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl'>
        <ul className='space-y-2'>
          {sections.map((section) => (
            <li key={section.id} className='relative'>
              <a
                href={`#${section.id}`}
                onClick={(e) => handleLinkClick(e, section.id)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 w-full text-left group',
                  activeSection === section.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50',
                )}>
                <section.icon
                  className={cn(
                    'w-5 h-5 transition-transform duration-300',
                    activeSection === section.id
                      ? 'scale-110'
                      : 'group-hover:scale-105',
                  )}
                />
                <span
                  className={cn(
                    'font-medium text-sm',
                    activeSection === section.id ? 'font-semibold' : '',
                  )}>
                  {section.title}
                </span>
              </a>
              {activeSection === section.id && (
                <motion.div
                  layoutId='active-section-highlight'
                  className='-z-10 absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 border-blue-500 border-l-2 rounded-lg'
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SectionNavigator;
