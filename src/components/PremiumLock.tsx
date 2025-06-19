import React from 'react';
import { Lock, Crown, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';

interface PremiumLockProps {
  requiredTier: 'premium' | 'vip';
  children: React.ReactNode;
  title?: string;
  description?: string;
  showUpgrade?: boolean;
  onUpgrade?: () => void;
}

export function PremiumLock({ 
  requiredTier, 
  children, 
  title, 
  description, 
  showUpgrade = true,
  onUpgrade 
}: PremiumLockProps) {
  const { user, isAuthenticated } = useAuth();

  const hasAccess = () => {
    if (!isAuthenticated || !user) return false;
    
    if (requiredTier === 'premium') {
      return user.membership === 'premium' || user.membership === 'vip';
    }
    
    if (requiredTier === 'vip') {
      return user.membership === 'vip';
    }
    
    return false;
  };

  if (hasAccess()) {
    return <>{children}</>;
  }

  const tierConfig = {
    premium: {
      icon: Star,
      name: 'Premium',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    vip: {
      icon: Crown,
      name: 'VIP',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  };

  const config = tierConfig[requiredTier];
  const Icon = config.icon;

  return (
    <div className={`
      relative overflow-hidden rounded-lg border-2 border-dashed 
      ${config.borderColor} ${config.bgColor} p-8 text-center
    `}>
      <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm" />
      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          <div className={`
            inline-flex items-center justify-center w-16 h-16 
            rounded-full bg-white shadow-lg ${config.color}
          `}>
            <Lock className="h-6 w-6" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title || `${config.name} Content`}
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {description || `This content is exclusively available to ${config.name} members. Upgrade your membership to unlock this feature.`}
        </p>
        
        {showUpgrade && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Icon className={`h-4 w-4 ${config.color}`} />
              <span>Requires {config.name} Membership</span>
            </div>
            
            <Button 
              variant={requiredTier === 'vip' ? 'vip' : 'premium'}
              onClick={onUpgrade}
              className="px-6"
            >
              Upgrade to {config.name}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}