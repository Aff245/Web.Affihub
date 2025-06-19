import React, { useState } from 'react';
import { Check, Crown, Star, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { MembershipTier } from '../types/auth';

export function PricingPage() {
  const { user, isAuthenticated, upgradeMembership, loading } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [upgrading, setUpgrading] = useState<string | null>(null);

  const tiers: MembershipTier[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      features: [
        'Access to basic product reviews',
        'Limited daily searches (10 per day)',
        'Standard newsletter',
        'Community access (read-only)',
        'Basic product comparisons'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingPeriod === 'monthly' ? 9.99 : 99.99,
      period: billingPeriod === 'monthly' ? 'per month' : 'per year',
      popular: true,
      features: [
        'Unlimited access to all reviews',
        'Exclusive premium reviews with detailed analysis',
        'Early access to new product reviews',
        'Ad-free browsing experience',
        'Priority email support',
        'Advanced product comparison tools',
        'Detailed buying guides and tutorials',
        'Comment and interact in community'
      ]
    },
    {
      id: 'vip',
      name: 'VIP',
      price: billingPeriod === 'monthly' ? 19.99 : 199.99,
      period: billingPeriod === 'monthly' ? 'per month' : 'per year',
      features: [
        'All Premium features included',
        'Personal product recommendations',
        'Direct 1-on-1 expert consultations',
        'Exclusive VIP deals and discount codes',
        'VIP-only community access',
        'Custom product review requests',
        'Monthly video calls with experts',
        'Beta access to new features',
        'Dedicated account manager'
      ]
    }
  ];

  const handleUpgrade = async (tierId: 'premium' | 'vip') => {
    if (!isAuthenticated) {
      // Redirect to auth
      return;
    }

    setUpgrading(tierId);
    try {
      const success = await upgradeMembership(tierId);
      if (success) {
        // Success feedback could be shown here
      }
    } catch (error) {
      console.error('Upgrade failed:', error);
    } finally {
      setUpgrading(null);
    }
  };

  const getTierIcon = (tierId: string) => {
    switch (tierId) {
      case 'free': return Zap;
      case 'premium': return Star;
      case 'vip': return Crown;
      default: return Zap;
    }
  };

  const isCurrentPlan = (tierId: string) => {
    return user?.membership === tierId;
  };

  const canUpgrade = (tierId: string) => {
    if (!isAuthenticated) return true;
    if (tierId === 'free') return false;
    if (tierId === 'premium') return user?.membership === 'free';
    if (tierId === 'vip') return user?.membership !== 'vip';
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Membership Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock premium features and get the most out of AffiHub with our flexible membership options.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => {
            const Icon = getTierIcon(tier.id);
            const isCurrent = isCurrentPlan(tier.id);
            const canUp = canUpgrade(tier.id);

            return (
              <div
                key={tier.id}
                className={`
                  relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl
                  ${tier.popular ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
                  ${isCurrent ? 'ring-2 ring-green-200 border-green-500' : ''}
                `}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {isCurrent && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Icon className={`h-8 w-8 ${
                        tier.id === 'premium' ? 'text-purple-600' :
                        tier.id === 'vip' ? 'text-yellow-600' : 'text-gray-600'
                      }`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ${tier.price}
                      </span>
                      {tier.price > 0 && (
                        <span className="text-gray-500 ml-1">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                      )}
                    </div>
                    
                    {billingPeriod === 'yearly' && tier.price > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        Save ${((tier.price / 12) * 2).toFixed(2)}/month
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="space-y-3">
                    {isCurrent ? (
                      <Button variant="outline" className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : canUp ? (
                      <Button
                        variant={tier.id === 'vip' ? 'vip' : tier.id === 'premium' ? 'premium' : 'primary'}
                        className="w-full"
                        loading={upgrading === tier.id}
                        onClick={() => tier.id !== 'free' && handleUpgrade(tier.id as 'premium' | 'vip')}
                      >
                        {tier.id === 'free' ? 'Get Started' : `Upgrade to ${tier.name}`}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        {user?.membership === 'vip' && tier.id === 'premium' ? 'Downgrade' : 'Not Available'}
                      </Button>
                    )}
                    
                    {tier.price > 0 && (
                      <p className="text-xs text-gray-500 text-center">
                        Cancel anytime. No hidden fees.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Our Free plan gives you access to basic features forever. You can upgrade to Premium or VIP anytime.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and other secure payment methods through Stripe.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}