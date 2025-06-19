import React from 'react';
import { 
  User, 
  Settings, 
  BookOpen, 
  Heart, 
  MessageSquare, 
  TrendingUp,
  Award,
  Calendar,
  Download,
  Users
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { MembershipBadge } from '../components/MembershipBadge';
import { PremiumLock } from '../components/PremiumLock';
import { Button } from '../components/ui/Button';

export function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access your dashboard</h1>
          <Button>Sign In</Button>
        </div>
      </div>
    );
  }

  const stats = [
    { name: 'Reviews Read', value: '127', icon: BookOpen },
    { name: 'Saved Products', value: '24', icon: Heart },
    { name: 'Community Posts', value: user.membership === 'free' ? '0' : '8', icon: MessageSquare },
    { name: 'Referrals', value: '3', icon: Users },
  ];

  const recentActivity = [
    { action: 'Read review', item: 'iPhone 15 Pro Max', time: '2 hours ago' },
    { action: 'Saved product', item: 'MacBook Air M3', time: '1 day ago' },
    { action: 'Posted comment', item: 'Best Laptops 2024', time: '3 days ago', premium: true },
    { action: 'Downloaded guide', item: 'Smartphone Buying Guide', time: '1 week ago', vip: true },
  ];

  const recommendations = [
    { title: 'iPhone 15 vs Samsung Galaxy S24', category: 'Smartphones', premium: false },
    { title: 'Best Gaming Laptops Under $1000', category: 'Laptops', premium: true },
    { title: 'Smart Home Setup Guide 2024', category: 'Smart Home', vip: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                  <p className="text-gray-600">Member since {new Date(user.memberSince).toLocaleDateString()}</p>
                  <div className="mt-2">
                    <MembershipBadge tier={user.membership} />
                  </div>
                </div>
              </div>
              
              {user.membership === 'free' && (
                <div className="text-right">
                  <Button variant="premium" size="sm">
                    Upgrade to Premium
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">Unlock all features</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}: {activity.item}
                          {activity.premium && user.membership === 'free' && (
                            <span className="ml-2 text-xs text-purple-600">(Premium)</span>
                          )}
                          {activity.vip && user.membership !== 'vip' && (
                            <span className="ml-2 text-xs text-yellow-600">(VIP)</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Products
                </Button>
                
                {user.membership !== 'free' ? (
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Guides
                  </Button>
                ) : (
                  <PremiumLock
                    requiredTier="premium"
                    title="Download Guides"
                    description="Download exclusive buying guides and tutorials"
                    showUpgrade={false}
                  >
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download Guides
                    </Button>
                  </PremiumLock>
                )}

                {user.membership === 'vip' ? (
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Consultation
                  </Button>
                ) : (
                  <PremiumLock
                    requiredTier="vip"
                    title="VIP Consultation"
                    description="Schedule 1-on-1 expert consultations"
                    showUpgrade={false}
                  >
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  </PremiumLock>
                )}
              </div>
            </div>

            {/* Membership Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Membership Status</h2>
              </div>
              <div className="p-6">
                <div className="text-center">
                  <MembershipBadge tier={user.membership} size="lg" />
                  
                  <div className="mt-4">
                    {user.membership === 'free' && (
                      <div>
                        <p className="text-sm text-gray-600 mb-4">
                          Upgrade to unlock premium features and exclusive content.
                        </p>
                        <Button variant="premium" size="sm" className="w-full">
                          Upgrade Now
                        </Button>
                      </div>
                    )}
                    
                    {user.membership === 'premium' && (
                      <div>
                        <p className="text-sm text-gray-600 mb-4">
                          You're enjoying Premium benefits! Consider VIP for even more features.
                        </p>
                        <Button variant="vip" size="sm" className="w-full">
                          Upgrade to VIP
                        </Button>
                      </div>
                    )}
                    
                    {user.membership === 'vip' && (
                      <div>
                        <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          You're a VIP member with access to all premium features!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    {rec.premium && user.membership === 'free' ? (
                      <PremiumLock
                        requiredTier="premium"
                        title={rec.title}
                        description="This content requires Premium membership"
                        showUpgrade={false}
                      >
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">{rec.title}</h3>
                          <p className="text-sm text-gray-600">{rec.category}</p>
                        </div>
                      </PremiumLock>
                    ) : rec.vip && user.membership !== 'vip' ? (
                      <PremiumLock
                        requiredTier="vip"
                        title={rec.title}
                        description="This content requires VIP membership"
                        showUpgrade={false}
                      >
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">{rec.title}</h3>
                          <p className="text-sm text-gray-600">{rec.category}</p>
                        </div>
                      </PremiumLock>
                    ) : (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">{rec.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{rec.category}</p>
                        <Button variant="outline" size="sm">
                          Read Now
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}