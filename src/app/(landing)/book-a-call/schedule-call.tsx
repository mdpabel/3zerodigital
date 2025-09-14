'use client';

import * as React from 'react';
import ComponentWrapper from '@/components/common/component-wrapper';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

type ScheduleCallProps = {
  /** Your Calendly booking link (without theme params) */
  url?: string;
  /** px or CSS string */
  height?: number | string;

  /** Light theme overrides */
  primaryColor?: string; // e.g. '#2563eb'
  textColor?: string; // e.g. '#0f172a'
  backgroundColor?: string; // e.g. '#ffffff'

  /** Dark theme overrides */
  darkPrimaryColor?: string; // e.g. '#7c3aed'
  darkTextColor?: string; // e.g. '#e5e7eb'
  darkBackgroundColor?: string; // e.g. '#0b1220'

  className?: string;
};

/** Detect Tailwind's `dark` class toggles so colors follow site theme */
function useIsDark(): boolean {
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains('dark'));
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);
  return isDark;
}

declare global {
  interface Window {
    Calendly?: { initInlineWidget?: (opts: any) => void };
  }
}

export default function ScheduleCall({
  url = 'https://calendly.com/3zerodigital-info/30min',
  height = 720,

  // sensible brandy defaults
  primaryColor = '#2563eb',
  textColor = '#0f172a',
  backgroundColor = '#ffffff',

  darkPrimaryColor = '#7c3aed',
  darkTextColor = '#e5e7eb',
  darkBackgroundColor = '#0b1220',

  className,
}: ScheduleCallProps) {
  const isDark = useIsDark();
  const [loaded, setLoaded] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  // Pick colors based on theme (props can override)
  const colors = React.useMemo(() => {
    return {
      primary:
        (isDark ? darkPrimaryColor : primaryColor) ||
        (isDark ? '#7c3aed' : '#2563eb'),
      text:
        (isDark ? darkTextColor : textColor) ||
        (isDark ? '#e5e7eb' : '#0f172a'),
      bg:
        (isDark ? darkBackgroundColor : backgroundColor) ||
        (isDark ? '#0b1220' : '#ffffff'),
    };
  }, [
    isDark,
    primaryColor,
    textColor,
    backgroundColor,
    darkPrimaryColor,
    darkTextColor,
    darkBackgroundColor,
  ]);

  // Inject Calendly assets once
  React.useEffect(() => {
    if (!document.getElementById('calendly-widget-css')) {
      const l = document.createElement('link');
      l.id = 'calendly-widget-css';
      l.rel = 'stylesheet';
      l.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(l);
    }
    if (!document.getElementById('calendly-widget-script')) {
      const s = document.createElement('script');
      s.id = 'calendly-widget-script';
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // Build themed Calendly URL (hex WITHOUT '#')
  const themedUrl = React.useMemo(() => {
    const strip = (hex: string) => hex.replace('#', '');
    const u = new URL(url);
    u.searchParams.set('primary_color', strip(colors.primary));
    u.searchParams.set('text_color', strip(colors.text));
    u.searchParams.set('background_color', strip(colors.bg));
    // Optional extras:
    // u.searchParams.set('hide_event_type_details', '1');
    // u.searchParams.set('hide_landing_page_details', '1');
    return u.toString();
  }, [url, colors.primary, colors.text, colors.bg]);

  // Detect when iframe is ready -> fade in & hide our loader
  React.useEffect(() => {
    if (!wrapRef.current) return;
    let iframe: HTMLIFrameElement | null = null;
    let obs: MutationObserver | null = null;

    const attach = () => {
      iframe =
        wrapRef.current?.querySelector<HTMLIFrameElement>(
          '.calendly-inline-widget iframe',
        ) ?? null;
      if (iframe) {
        const onLoad = () => setLoaded(true);
        iframe.addEventListener('load', onLoad);
        const t = window.setTimeout(() => setLoaded(true), 4000); // safety
        return () => {
          iframe?.removeEventListener('load', onLoad);
          window.clearTimeout(t);
        };
      }
    };

    obs = new MutationObserver(() => {
      const cleanup = attach();
      if (cleanup && iframe) {
        obs?.disconnect();
        return cleanup;
      }
    });
    obs.observe(wrapRef.current, { childList: true, subtree: true });

    const cleanup = attach();
    return () => {
      obs?.disconnect();
      cleanup?.();
    };
  }, [themedUrl]);

  return (
    <section className='relative py-10 overflow-hidden'>
      <ComponentWrapper>
        <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl container'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-6 text-center'>
            <Badge className='inline-flex items-center gap-2 bg-white/80 hover:bg-white/80 dark:bg-slate-800/80 dark:hover:bg-slate-800/80 backdrop-blur-md mb-6 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 font-medium text-black dark:text-white text-sm'>
              <Sparkles className='w-4 h-4 text-blue-600' />
              Free 30-Minute Consultation
            </Badge>

            <h1 className='mb-3 font-bold text-3xl md:text-4xl lg:text-5xl'>
              <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
                Schedule Your Call
              </span>
            </h1>

            <p className='mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-lg'>
              Book a free consultation to discuss your project. No commitments,
              just expert advice tailored to your needs.
            </p>

            {/* Top loader (shows until iframe is ready) */}
            {!loaded && (
              <div className='mx-auto mt-6 max-w-4xl'>
                <div
                  className='flex justify-center items-center gap-3 shadow-sm p-3 border rounded-lg text-sm'
                  style={{
                    backgroundColor: isDark
                      ? 'rgba(2,6,23,0.55)'
                      : 'rgba(255,255,255,0.7)',
                    borderColor: isDark
                      ? 'rgba(51,65,85,0.6)'
                      : 'rgba(226,232,240,0.6)',
                    color: isDark ? '#e5e7eb' : '#334155',
                  }}>
                  <div className='border-2 border-current/60 border-t-transparent rounded-full w-5 h-5 animate-spin' />
                  <span>Loading scheduler…</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Calendly container (matches background) */}
        <div
          ref={wrapRef}
          className={className}
          style={{
            backgroundColor: colors.bg, // 👈 page/container bg
            borderRadius: 12,
            overflow: 'hidden',
            minHeight: typeof height === 'number' ? `${height}px` : height,
          }}
          aria-busy={!loaded}>
          {/* Calendly widget (gets its own bg via URL params) */}
          <div
            className={`calendly-inline-widget transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            data-url={themedUrl}
            style={{ minWidth: '320px', height }}
          />
        </div>
      </ComponentWrapper>
    </section>
  );
}
