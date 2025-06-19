import React from 'react';
import { Crown, Star, Zap } from 'lucide-react';

interface MembershipBadgeProps {
  tier: 'free' | 'premium' | 'vip';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function MembershipBadge({ tier, size = 'md', showText = true }: MembershipBadgeProps) {
  const configs = {
    free: {
      icon: Zap,
      text: 'Free',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      iconColor: 'text-gray-500'
    },
    premium: {
      icon: Star,
      text: 'Premium',
      bgColor: 'bg-gradient-to-r from-purple-100 to-blue-100',
      textColor: 'text-purple-700',
      iconColor: 'text-purple-600'
    },
    vip: {
      icon: Crown,
      text: 'VIP',
      bgColor: 'bg-gradient-to-r from-yellow-100 to-orange-100',
      textColor: 'text-yellow-700',
      iconColor: 'text-yellow-600'
    }
  };

  const sizes = {
    sm: {
      container: 'px-2 py-1 text-xs',
      icon: 'h-3 w-3',
      gap: 'gap-1'
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      icon: 'h-4 w-4',
      gap: 'gap-1.5'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 'h-5 w-5',
      gap: 'gap-2'
    }
  };

  const config = configs[tier];
  const sizeConfig = sizes[size];
  const Icon = config.icon;

  return (
    <div className={`
      inline-flex items-center rounded-full font-medium
      ${config.bgColor} ${config.textColor} 
      ${sizeConfig.container} ${sizeConfig.gap}
    `}>
      <Icon className={`${config.iconColor} ${sizeConfig.icon}`} />
      {showText && <span>{config.text}</span>}
    </div>
  );
}