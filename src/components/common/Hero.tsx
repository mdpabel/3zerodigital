'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { motion, useAnimation, useInView, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  Code,
  Database,
  Search,
  TrendingUp,
  Video,
  Settings,
  Globe,
  Star,
  Users,
  Clock,
  Award,
  Target,
  Rocket,
  BarChart3,
  Play,
  Wrench,
  Palette,
  Brush,
  Camera,
  Monitor,
  Smartphone,
  Laptop,
  Server,
  Lock,
  Eye,
  MousePointer,
  Megaphone,
  PieChart,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  ShoppingCart,
  CreditCard,
  Truck,
  Package,
  Heart,
  ThumbsUp,
  Share2,
  Download,
  Upload,
  Edit,
  Save,
  Trash,
  Plus,
  Minus,
  X,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  Calendar,
  MapPin,
  Home,
  Building,
  Car,
  Plane,
  Ship,
  Train,
  LucideIcon,
  Layers,
  Headphones,
  LayoutDashboard,
  DollarSign,
  Facebook,
  RefreshCw,
  Move,
  Link2Off,
  FileSearch,
  Smile,
  ServerCrash,
  UserCheck,
  PenTool,
  Layout,
  PlayCircle,
  Linkedin,
  BarChart2,
} from 'lucide-react';
import {
  FaCode,
  FaShieldAlt,
  FaBolt,
  FaGlobe,
  FaLayerGroup,
  FaShoppingCart,
  FaChartLine,
  FaCreditCard,
  FaHeadphones,
  FaTachometerAlt,
  FaDatabase,
  FaCog,
  FaServer,
  FaReact,
  FaDesktop,
  FaDollarSign,
  FaFacebook,
  FaLinkedin,
  FaSearch,
  FaUsers,
  FaStar,
  FaVideo,
  FaPlay,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaFileAlt,
  FaPalette,
  FaPen,
  FaSmile,
  FaLink,
  FaSync,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowsAlt,
  FaUnlink,
  FaUserCheck,
  FaChartBar,
  FaPlayCircle,
} from 'react-icons/fa';
import { useRef } from 'react';
import ComponentWrapper from '../common/component-wrapper';

// Combined icon mapping - Lucide icons + React Icons
const iconMap: Record<string, LucideIcon | React.ComponentType<any>> = {
  // Tech & Development (Lucide)
  Code,
  Database,
  Server,
  Monitor,
  Smartphone,
  Laptop,
  Globe,
  Rocket,
  Settings,
  Wrench,
  Layers,
  LayoutDashboard,

  // Tech & Development (React Icons)
  React: FaReact,

  // Security & Performance
  Shield,
  Lock,
  Zap,
  Eye,

  // Marketing & Analytics
  Search,
  TrendingUp,
  BarChart3,
  BarChart2,
  Target,
  MousePointer,
  Megaphone,
  PieChart,

  // Media & Design
  Video,
  Play,
  PlayCircle,
  Palette,
  Brush,
  Camera,
  PenTool,
  Layout,

  // Social & Communication
  Users,
  Star,
  Heart,
  ThumbsUp,
  Share2,
  Mail,
  Phone,
  MessageSquare,
  Facebook,
  Linkedin,

  // E-commerce
  ShoppingCart,
  CreditCard,
  Truck,
  Package,

  // General
  Clock,
  Award,
  CheckCircle,
  Calendar,
  MapPin,
  Home,
  Building,
  FileText,
  Headphones,
  DollarSign,
  Smile,

  // Actions & Status
  Download,
  Upload,
  Edit,
  Save,
  Trash,
  Plus,
  Minus,
  X,
  Check,
  Info,
  HelpCircle,
  RefreshCw,
  Move,

  // Troubleshooting specific
  Link2Off,
  FileSearch,
  ServerCrash,
  UserCheck,
  Link,

  // Transport
  Car,
  Plane,
  Ship,
  Train,

  // React Icons alternatives (for better compatibility)
  FaCode,
  FaShieldAlt,
  FaBolt,
  FaGlobe,
  FaLayerGroup,
  FaShoppingCart,
  FaChartLine,
  FaCreditCard,
  FaHeadphones,
  FaTachometerAlt,
  FaDatabase,
  FaCog,
  FaServer,
  FaReact,
  FaDesktop,
  FaDollarSign,
  FaFacebook,
  FaLinkedin,
  FaSearch,
  FaUsers,
  FaStar,
  FaVideo,
  FaPlay,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaFileAlt,
  FaPalette,
  FaPen,
  FaSmile,
  FaLink,
  FaSync,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowsAlt,
  FaUnlink,
  FaUserCheck,
  FaChartBar,
  FaPlayCircle,
};

// Service configuration types
interface ServiceFeature {
  icon: string; // Icon name as string
  text: string;
  description: string;
  color: string;
}

interface ServiceStat {
  value: string;
  label: string;
  icon: string; // Icon name as string
}

interface CTAButton {
  text: string;
  href: string;
}

interface ServiceHeroProps {
  // Basic Info
  title: string;
  subtitle: string;
  description: string;
  badge: string;

  // Styling
  backgroundGradient: string;
  primaryColor: string;
  secondaryColor: string;

  // Content
  features: ServiceFeature[];
  stats: ServiceStat[];

  // CTAs
  ctaPrimary: CTAButton;
  ctaSecondary: CTAButton;

  // Optional
  className?: string;
  showZeroBadges?: boolean;
  heroImage?: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  subtitle,
  description,
  badge,
  backgroundGradient,
  primaryColor,
  secondaryColor,
  features,
  stats,
  ctaPrimary,
  ctaSecondary,
  className = '',
  showZeroBadges = true,
  heroImage,
}) => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  const controls = useAnimation();

  // Spring animations for smooth mouse following (desktop only)
  const springX = useSpring(0, { stiffness: 150, damping: 25 });
  const springY = useSpring(0, { stiffness: 150, damping: 25 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      springX.set(clientX - 192);
      springY.set(clientY - 192);
    },
    [springX, springY],
  );

  useEffect(() => {
    // Only add mouse tracking on desktop
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  // Helper function to get icon component
  const getIcon = (iconName: string): React.ComponentType<any> => {
    const IconComponent = iconMap[iconName];
    if (IconComponent) {
      return IconComponent;
    }
    // Fallback to CheckCircle if icon not found
    return CheckCircle;
  };

  // Animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.25, 0, 1],
        },
      },
    }),
    [],
  );

  const floatingVariants = useMemo(
    () => ({
      animate: {
        y: [-10, 10, -10],
        rotate: [0, 4, -4, 0],
        scale: [1, 1.02, 1],
        transition: {
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        },
      },
    }),
    [],
  );

  // Particles for background animation
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 3,
      })),
    [],
  );

  return (
    <div
      className={`relative flex justify-center items-center pt-16 md:pt-10 2xl:pt-0 min-h-screen overflow-hidden ${className}`}>
      <ComponentWrapper>
        {/* Animated background with service-specific gradient */}
        <div className='absolute inset-0'>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient}`}
          />
        </div>

        {/* Particle system */}
        <div className='absolute inset-0 overflow-hidden'>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className='absolute bg-blue-400/20 md:bg-blue-400/30 dark:bg-blue-300/15 dark:md:bg-blue-300/20 rounded-full w-1 h-1'
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [-10, -60],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Enhanced cursor glow - desktop only */}
        <motion.div
          className='hidden md:block z-0 fixed rounded-full w-64 md:w-96 h-64 md:h-96 pointer-events-none'
          style={{
            background: `radial-gradient(circle, ${primaryColor.includes('blue') ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)'} 0%, rgba(147, 51, 234, 0.05) 50%, transparent 70%)`,
            filter: 'blur(30px)',
            x: springX,
            y: springY,
          }}
        />

        {/* Floating shapes with service-specific colors */}
        <motion.div
          variants={floatingVariants}
          animate='animate'
          className={`top-20 left-4 md:left-20 absolute bg-gradient-to-br ${primaryColor}/20 md:${primaryColor}/40 dark:${primaryColor}/15 dark:md:${primaryColor}/25 backdrop-blur-sm rounded-2xl md:rounded-3xl w-16 md:w-24 h-16 md:h-24 rotate-12`}
          style={{ animationDelay: '0s' }}
        />
        <motion.div
          variants={floatingVariants}
          animate='animate'
          className={`top-32 md:top-40 right-4 md:right-32 absolute bg-gradient-to-br ${secondaryColor}/25 md:${secondaryColor}/50 dark:${secondaryColor}/15 dark:md:${secondaryColor}/30 backdrop-blur-sm rounded-xl md:rounded-2xl w-12 md:w-20 h-12 md:h-20`}
          style={{ animationDelay: '2s' }}
        />

        {/* Main content */}
        <motion.div
          ref={heroRef}
          variants={containerVariants}
          initial='hidden'
          animate={controls}
          className='z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center'>
          {/* Service badge */}
          <motion.div variants={itemVariants} className='mb-6 md:mb-8'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 shadow-lg md:shadow-xl md:hover:shadow-2xl hover:shadow-xl backdrop-blur-md px-4 md:px-6 py-2 md:py-3 border border-slate-200/50 dark:border-slate-700/50 rounded-full transition-all duration-300'>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}>
                <Sparkles className='w-3 md:w-4 h-3 md:h-4 text-blue-600' />
              </motion.div>
              <span className='font-medium text-slate-700 dark:text-slate-300 text-xs md:text-sm'>
                {badge}
              </span>
            </motion.div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className='relative mb-4 md:mb-6 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight'>
            <span className='bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white text-transparent'>
              {title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className='mb-6 md:mb-8 font-semibold text-slate-700 dark:text-slate-300 text-xl sm:text-2xl md:text-3xl'>
            {subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className='mx-auto mb-8 md:mb-12 max-w-4xl text-slate-600 dark:text-slate-300 text-lg sm:text-xl lg:text-xl md:text-2xl leading-relaxed'>
            {description}
          </motion.p>

          {/* Feature highlights */}
          {features && features.length > 0 && (
            <motion.div
              variants={itemVariants}
              className='flex sm:flex-row flex-col flex-wrap justify-center gap-3 md:gap-6 mb-8 md:mb-12'>
              {features.map((feature, index) => {
                const FeatureIcon = getIcon(feature.icon);
                return (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      transition: { type: 'spring', stiffness: 300 },
                    }}
                    className='group relative flex items-center gap-3 md:gap-4 bg-white/70 dark:bg-slate-800/70 shadow-lg md:shadow-xl md:hover:shadow-2xl hover:shadow-xl backdrop-blur-md px-4 md:px-8 py-3 md:py-4 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl md:rounded-3xl w-full sm:w-auto transition-all duration-300 cursor-pointer'>
                    <div
                      className={`p-2 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-r ${feature.color} shadow-md md:shadow-lg group-hover:shadow-lg md:group-hover:shadow-xl transition-shadow duration-300`}>
                      <FeatureIcon className='w-4 md:w-6 h-4 md:h-6 text-white' />
                    </div>
                    <div className='text-left'>
                      <span className='block font-bold text-slate-800 dark:text-slate-200 text-base md:text-lg'>
                        {feature.text}
                      </span>
                      <span className='block text-slate-600 dark:text-slate-400 text-xs md:text-sm'>
                        {feature.description}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <motion.div
              variants={itemVariants}
              className='flex sm:flex-row flex-col justify-center gap-6 md:gap-12 mb-8 md:mb-12'>
              {stats.map((stat, index) => {
                const StatIcon = getIcon(stat.icon);
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    className='text-center'>
                    <div className='flex justify-center mb-2'>
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${secondaryColor} shadow-lg`}>
                        <StatIcon className='w-6 h-6 text-white' />
                      </div>
                    </div>
                    <div className='font-bold text-slate-900 dark:text-white text-2xl md:text-3xl'>
                      {stat.value}
                    </div>
                    <div className='text-slate-600 dark:text-slate-400 text-sm md:text-base'>
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className='flex sm:flex-row flex-col justify-center items-center gap-4 md:gap-6 mb-8 md:mb-16 px-2'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group relative w-full sm:w-auto'>
              <Button
                asChild
                size='lg'
                className={`relative shadow-xl md:shadow-2xl md:group-hover:shadow-blue-500/25 group-hover:shadow-xl px-8 md:px-10 py-6 md:py-7 w-full sm:w-auto overflow-hidden font-semibold text-base md:text-lg transition-all duration-300 bg-gradient-to-r ${primaryColor} border-0 text-white`}>
                <Link
                  href={ctaPrimary?.href || '#'}
                  className='flex justify-center items-center gap-3'>
                  {ctaPrimary?.text || 'Get Started'}
                  <ArrowRight className='w-4 md:w-5 h-4 md:h-5 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group relative w-full sm:w-auto'>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='bg-white/80 hover:bg-white/90 dark:bg-slate-800/80 dark:hover:bg-slate-700/90 shadow-lg md:shadow-xl md:hover:shadow-2xl hover:shadow-xl backdrop-blur-md px-8 md:px-10 py-6 md:py-7 border-2 border-slate-200/50 dark:border-slate-700/30 w-full sm:w-auto font-semibold text-base md:text-lg transition-all duration-300'>
                <Link
                  href={ctaSecondary?.href || '#'}
                  className='flex justify-center items-center gap-2'>
                  {ctaSecondary?.text || 'Learn More'}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* 3Zero Promise badges */}
          {showZeroBadges && (
            <motion.div
              variants={itemVariants}
              className='flex sm:flex-row flex-col flex-wrap justify-center gap-2 md:gap-4'>
              <Badge className='bg-gradient-to-r from-emerald-600 to-green-600 px-3 py-1 border-0 text-white text-xs md:text-sm'>
                <Shield className='mr-1 w-3 h-3' />0 Vulnerabilities
              </Badge>
              <Badge className='bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 border-0 text-white text-xs md:text-sm'>
                <Zap className='mr-1 w-3 h-3' />0 Downtime
              </Badge>
              <Badge className='bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 border-0 text-white text-xs md:text-sm'>
                <CheckCircle className='mr-1 w-3 h-3' />0 Errors
              </Badge>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced gradient overlays */}
        <div className='absolute inset-0 bg-gradient-to-t from-white/30 md:from-white/40 dark:from-[#030712]/50 dark:md:from-[#030712]/60 via-transparent to-transparent pointer-events-none' />
        <div className='absolute inset-0 bg-gradient-to-b from-white/15 md:from-white/20 dark:from-[#030712]/25 dark:md:from-[#030712]/30 via-transparent to-transparent pointer-events-none' />
      </ComponentWrapper>
    </div>
  );
};

export default ServiceHero;
