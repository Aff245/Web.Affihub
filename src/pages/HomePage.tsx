import React, { useState } from 'react';
import { 
  Star, 
  TrendingUp, 
  Users, 
  Shield, 
  Crown, 
  Zap,
  ArrowRight,
  Lock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { PremiumLock } from '../components/PremiumLock';
import { AuthModal } from '../components/Auth/AuthModal';

export function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const featuredReviews = [
    {
      id: 1,
      title: "iPhone 15 Pro Max Complete Review",
      category: "Smartphones",
      rating: 4.8,
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300",
      excerpt: "Comprehensive analysis of Apple's latest flagship with detailed performance benchmarks...",
      premium: false
    },
    {
      id: 2,
      title: "Best Gaming Laptops 2024: Expert Analysis",
      category: "Laptops",
      rating: 4.9,
      image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=300",
      excerpt: "In-depth comparison of top gaming laptops with exclusive performance data...",
      premium: true
    },
    {
      id: 3,
      title: "Smart Home Setup: Complete VIP Guide",
      category: "Smart Home",
      rating: 5.0,
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300",
      excerpt: "Step-by-step guide with exclusive supplier contacts and bulk pricing...",
      premium: false,
      vip: true
    }
  ];

  const stats = [
    { icon: Star, value: "10,000+", label: "Product Reviews" },
    { icon: Users, value: "50,000+", label: "Happy Members" },
    { icon: TrendingUp, value: "98%", label: "Accuracy Rate" },
    { icon: Shield, value: "100%", label: "Unbiased Reviews" }
  ];

  const membershipBenefits = [
    {
      tier: "free",
      title: "Free Membership",
      features: ["Basic product reviews", "Limited daily searches", "Standard newsletter"],
      icon: Zap,
      color: "gray"
    },
    {
      tier: "premium",
      title: "Premium Membership",
      features: ["Unlimited access", "Premium reviews", "Ad-free experience", "Priority support"],
      icon: Star,
      color: "purple",
      popular: true
    },
    {
      tier: "vip",
      title: "VIP Membership",
      features: ["All Premium features", "1-on-1 consultations", "Exclusive deals", "VIP community"],
      icon: Crown,
      color: "yellow"
    }
  ];

  const canAccessContent = (contentTier?: string) => {
    if (!contentTier) return true;
    if (!isAuthenticated || !user) return false;
    
    if (contentTier === 'premium') {
      return user.membership === 'premium' || user.membership === 'vip';
    }
    
    if (contentTier === 'vip') {
      return user.membership === 'vip';
    }
    
    return true;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover the Best
              <span className="text-blue-600"> Products</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get expert, unbiased reviews and recommendations from our premium community of product experts. Make smarter buying decisions with AffiHub.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!isAuthenticated ? (
                <>
                  <Button 
                    size="lg" 
                    className="px-8"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="px-8">
                    View Pricing
                  </Button>
                </>
              ) : (
                <Button size="lg" className="px-8">
                  Explore Reviews
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Member count */}
            <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white" />
                ))}
              </div>
              <span>Join 50,000+ members making smarter purchases</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Reviews</h2>
            <p className="text-xl text-gray-600">Expert analysis of the latest and greatest products</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredReviews.map((review) => {
              const hasAccess = canAccessContent(review.premium ? 'premium' : review.vip ? 'vip' : undefined);
              
              return (
                <div key={review.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={review.image} 
                      alt={review.title}
                      className="w-full h-48 object-cover"
                    />
                    {review.premium && (
                      <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Premium
                      </div>
                    )}
                    {review.vip && (
                      <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        VIP
                      </div>
                    )}
                    {!hasAccess && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">{review.category}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{review.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h3>
                    
                    {hasAccess ? (
                      <>
                        <p className="text-gray-600 mb-4">{review.excerpt}</p>
                        <Button variant="outline" size="sm">
                          Read Full Review
                        </Button>
                      </>
                    ) : (
                      <PremiumLock
                        requiredTier={review.vip ? 'vip' : 'premium'}
                        title="Premium Content"
                        description="This review requires a premium membership to access."
                        showUpgrade={true}
                        onUpgrade={() => {/* Handle upgrade */}}
                      >
                        <p className="text-gray-600 mb-4">{review.excerpt}</p>
                      </PremiumLock>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Membership</h2>
            <p className="text-xl text-gray-600">Unlock features that match your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const isCurrentTier = user?.membership === benefit.tier;
              
              return (
                <div key={index} className={`
                  relative bg-white rounded-lg border-2 p-8 text-center
                  ${benefit.popular ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
                  ${isCurrentTier ? 'ring-2 ring-green-200 border-green-500' : ''}
                `}>
                  {benefit.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {isCurrentTier && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Your Plan
                      </span>
                    </div>
                  )}

                  <div className={`
                    inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
                    ${benefit.color === 'purple' ? 'bg-purple-100' : 
                      benefit.color === 'yellow' ? 'bg-yellow-100' : 'bg-gray-100'}
                  `}>
                    <Icon className={`h-8 w-8 ${
                      benefit.color === 'purple' ? 'text-purple-600' :
                      benefit.color === 'yellow' ? 'text-yellow-600' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  
                  <ul className="space-y-2 mb-6">
                    {benefit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-start text-left">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrentTier ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      variant={benefit.color === 'yellow' ? 'vip' : benefit.color === 'purple' ? 'premium' : 'primary'}
                      className="w-full"
                    >
                      {benefit.tier === 'free' ? 'Get Started' : `Upgrade to ${benefit.title}`}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Make Smarter Purchases?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who trust AffiHub for unbiased product reviews and recommendations.
          </p>
          
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="primary"
                className="px-8"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Start Free Today
              </Button>
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-gray-900">
                View Pricing
              </Button>
            </div>
          ) : (
            <Button size="lg" className="px-8">
              Explore Premium Reviews
            </Button>
          )}
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="register"
      />
    </div>
  );
}