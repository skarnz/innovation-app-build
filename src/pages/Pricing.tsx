
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  buttonText, 
  popular = false,
  enterprise = false
}) => {
  return (
    <div className={`glass-card p-8 flex flex-col h-full relative transition-all duration-500 ${popular ? 'border-electric-blue scale-105 hover:scale-110' : 'hover:scale-105'}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-electric-blue text-white text-xs font-bold py-1 px-4 rounded-full">
          MOST POPULAR
        </div>
      )}
      
      <h3 className="text-2xl font-orbitron font-bold mb-2">{name}</h3>
      
      {!enterprise ? (
        <div className="mb-6">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-white/60">/month</span>
        </div>
      ) : (
        <div className="mb-6">
          <span className="text-2xl font-bold">Custom Pricing</span>
        </div>
      )}
      
      <p className="text-white/70 mb-6">{description}</p>
      
      <div className="flex-grow">
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.included ? (
                <Check className="text-electric-blue mt-1 flex-shrink-0" size={18} />
              ) : (
                <X className="text-white/40 mt-1 flex-shrink-0" size={18} />
              )}
              <span className={feature.included ? "text-white/90" : "text-white/40"}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button className={`w-full ${popular ? 'bg-electric-blue text-white hover:bg-electric-blue/90' : enterprise ? 'bg-electric-purple text-white hover:bg-electric-purple/90' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
        {buttonText}
      </Button>
    </div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const tiers = [
    {
      name: "Starter",
      price: isAnnual ? "29" : "39",
      description: "Perfect for individual entrepreneurs just getting started.",
      popular: false,
      enterprise: false,
      buttonText: "Start Free Trial",
      features: [
        { text: "Basic idea generation", included: true },
        { text: "3 projects", included: true },
        { text: "Market analysis", included: true },
        { text: "Community support", included: true },
        { text: "Competitor insights", included: false },
        { text: "Team collaboration", included: false },
        { text: "Advanced AI assistant", included: false },
        { text: "Custom branding", included: false }
      ]
    },
    {
      name: "Pro",
      price: isAnnual ? "79" : "99",
      description: "For founders building their next big product.",
      popular: true,
      enterprise: false,
      buttonText: "Get Started",
      features: [
        { text: "Advanced idea generation", included: true },
        { text: "Unlimited projects", included: true },
        { text: "Detailed market analysis", included: true },
        { text: "Priority support", included: true },
        { text: "Competitor insights", included: true },
        { text: "Team collaboration (up to 5)", included: true },
        { text: "Advanced AI assistant", included: false },
        { text: "Custom branding", included: false }
      ]
    },
    {
      name: "Business",
      price: isAnnual ? "199" : "249",
      description: "For growing teams building multiple products.",
      popular: false,
      enterprise: false,
      buttonText: "Get Started",
      features: [
        { text: "Advanced idea generation", included: true },
        { text: "Unlimited projects", included: true },
        { text: "Detailed market analysis", included: true },
        { text: "Dedicated support", included: true },
        { text: "Competitor insights", included: true },
        { text: "Team collaboration (up to 15)", included: true },
        { text: "Advanced AI assistant", included: true },
        { text: "Custom branding", included: true }
      ]
    },
    {
      name: "Enterprise",
      price: "",
      description: "Custom solutions for large organizations.",
      popular: false,
      enterprise: true,
      buttonText: "Contact Sales",
      features: [
        { text: "All Business features", included: true },
        { text: "Unlimited team members", included: true },
        { text: "Custom integrations", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "On-premise deployment", included: true },
        { text: "Custom AI training", included: true },
        { text: "SLA guarantees", included: true },
        { text: "White labeling", included: true }
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-navy pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-gradient">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Choose the perfect plan to help you build your next big idea
          </p>
          
          {/* Billing toggle */}
          <div className="inline-flex items-center bg-white/5 p-1 rounded-full">
            <button
              className={`py-2 px-4 rounded-full ${isAnnual ? 'bg-electric-blue text-white' : 'text-white/70'}`}
              onClick={() => setIsAnnual(true)}
            >
              Annual <span className="text-xs opacity-80">(Save 20%)</span>
            </button>
            <button
              className={`py-2 px-4 rounded-full ${!isAnnual ? 'bg-electric-blue text-white' : 'text-white/70'}`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
          </div>
        </div>
        
        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
        
        {/* FAQ Section */}
        <div className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-3xl font-orbitron font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Can I change my plan later?</h3>
              <p className="text-white/70">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
              <p className="text-white/70">Yes, all plans come with a 14-day free trial. No credit card required to start.</p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-white/70">We accept all major credit cards, PayPal, and for Enterprise plans, we can arrange invoicing.</p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">How does team collaboration work?</h3>
              <p className="text-white/70">You can invite team members to join your workspace. Each plan has a limit on how many team members you can add.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
