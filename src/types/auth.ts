export interface User {
  id: string;
  email: string;
  name: string;
  membership: 'free' | 'premium' | 'vip';
  memberSince: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  upgradeMembership: (tier: 'premium' | 'vip') => Promise<boolean>;
}

export interface MembershipTier {
  id: 'free' | 'premium' | 'vip';
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}