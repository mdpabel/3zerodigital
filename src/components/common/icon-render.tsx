import React from 'react';
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaShopify,
  FaWordpress,
  FaShieldAlt,
  FaUserCircle,
  FaUser,
  FaRocket,
  FaBug,
  FaExclamationTriangle,
  FaEnvelope,
  FaFacebook,
  FaLink,
  FaServer,
  FaCode,
  FaCube,
  FaImage,
  FaPlay,
  FaCrown,
  FaDollarSign,
  FaStethoscope,
  FaGavel,
  FaShoppingCart,
  FaHeart,
} from 'react-icons/fa';

// Map of icon names to actual React components from react-icons
const iconMapping: { [key: string]: React.ElementType } = {
  FaReact,
  FaNodeJs,
  FaJs,
  FaShopify,
  FaWordpress,
  FaShieldAlt,
  FaRocket,
  FaBug,
  FaExclamationTriangle,
  FaEnvelope,
  FaFacebook,
  FaLink,
  FaServer,
  FaCode,
  FaCube,
  FaImage,
  FaPlay,
  FaCrown,
  FaUserCircle,
  FaUser,
  FaDollarSign,
  FaStethoscope,
  FaGavel,
  FaShoppingCart,
  FaHeart,
};

// Component to render the correct icon based on the name
interface IconProps {
  iconName: string;
}

const IconRenderer: React.FC<IconProps> = ({ iconName }) => {
  const IconComponent = iconMapping[iconName];

  // Render the icon if it exists, otherwise return null or a default icon
  return IconComponent ? <IconComponent /> : <FaExclamationTriangle />;
};

export default IconRenderer;

import {
  Code,
  Megaphone,
  Wrench,
  AlertTriangle,
  Video,
  HelpCircle,
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon = ({ name, className }: CategoryIconProps) => {
  const icons: Record<string, JSX.Element> = {
    Development: <Code className={className} />,
    Marketing: <Megaphone className={className} />,
    Maintenance: <Wrench className={className} />,
    Troubleshooting: <AlertTriangle className={className} />,
    'Graphics & Video': <Video className={className} />,
  };

  return icons[name] || <HelpCircle className={className} />;
};
