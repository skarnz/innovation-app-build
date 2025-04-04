import React from 'react';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import BuildLogo from '@/components/BuildLogo';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, Check, Layers, RefreshCcw, Zap } from 'lucide-react';
// Linter error on next/link, using standard <a> tag for now
// import Link from 'next/link';
// Import ThreeScene if/when implemented
// import { ThreeScene } from '@/components/ThreeScene';

// --- Hero Section ---
const HeroSection = () => (
  <section id="hero" className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24 text-center relative z-10">
    {/* Content adapted from 8uild/components/Hero.tsx (not read, but typical hero structure) */}
    <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient animate-text-shimmer mb-6">
      Unleash Your Entrepreneurial Vision
    </h1>
    <p className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-8">
      Build your startup with AI-powered tools and a guided, step-by-step process from concept to launch.
    </p>
    <div className="flex justify-center gap-4">
      {/* Changed Link to a tag */}
      <a href="/signup">
        {/* Using btn-primary utility defined in index.css which includes hover-glow */}
        <button className="btn-primary">
          Start Building Now
          <ArrowRight size={18} />
        </button>
      </a>
      {/* Optional: Secondary button example */}
      {/* <Link href="#features"><Button variant="outline">Learn More</Button></Link> */}
    </div>
  </section>
);

// --- Features Section ---
const featuresData = [
  {
    icon: <Zap className="text-electric-blue" size={28} />,
    title: "Brainstorm",
    description: "Leverage AI-powered ideation tools to generate and refine innovative concepts."
  },
  {
    icon: <BarChart2 className="text-electric-blue" size={28} />,
    title: "Uncover",
    description: "Use data-driven insights to identify market gaps and opportunities."
  },
  {
    icon: <Check className="text-electric-blue" size={28} />, // Changed from 8uild file (Validate) for better flow
    title: "Validate",
    description: "Test your ideas with real users through integrated feedback and survey tools."
  },
  {
    icon: <RefreshCcw className="text-electric-blue" size={28} />,
    title: "Innovate",
    description: "Design solutions with cutting-edge prototyping and visualization tools."
  },
  {
    icon: <ArrowRight className="text-electric-blue" size={28} />,
    title: "Launch",
    description: "Develop go-to-market strategies and prepare for successful product launches."
  },
  {
    icon: <Layers className="text-electric-blue" size={28} />,
    title: "Disrupt",
    description: "Challenge the status quo with transformative business models and technologies."
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-16 md:py-24 relative z-10">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-gradient text-3xl md:text-4xl font-orbitron font-bold mb-6">
          Accelerate Your Next Big Idea
        </h2>
        <p className="text-lg text-white/70">
          BUILD provides all the tools needed to take your concept from ideation to launch
          with a streamlined, data-driven approach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            // Using glass-card and hover-glow utilities from index.css
            className="glass-card p-8 hover-glow transition-all duration-500 group"
          >
            {/* Icon styling from 8uild */}
            <div className="mb-4 p-3 bg-white/5 rounded-full inline-block">
              {feature.icon}
            </div>
            <h3 className="text-xl font-orbitron font-semibold mb-3 text-white/90 group-hover:text-gradient transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- About Section ---
const aboutPoints = [
  {
    num: "1",
    color: "electric-blue",
    title: "Our Story",
    description: "Founded in 2024 by a team of entrepreneurs and AI experts who understood the challenges of bringing new ideas to market."
  },
  {
    num: "2",
    color: "electric-purple",
    title: "Our Mission",
    description: "To democratize innovation by providing entrepreneurs with the tools, insights, and methodologies they need to succeed."
  },
  {
    num: "3",
    color: "green-500", // Keeping green for variety as in 8uild
    title: "Our Technology",
    description: "We leverage advanced AI and machine learning to analyze markets, generate ideas, and provide data-driven insights."
  }
];

const AboutSection = () => (
  <section id="about" className="py-16 md:py-24 relative z-10 overflow-hidden">
    <div className="container mx-auto px-4">
      {/* Recreating the blurred background blobs from 8uild */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-electric-blue/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-electric-purple/10 blur-[100px] pointer-events-none"></div>

      <div className="glass-card p-10 md:p-16 relative"> {/* Apply glass-card to main container */}
        <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
          <h2 className="text-gradient text-3xl md:text-4xl font-orbitron font-bold mb-6">
            About BUILD
          </h2>
          <p className="text-lg text-white/70 mb-8">
            We're on a mission to help entrepreneurs and innovators turn their ideas into reality. Our platform combines cutting-edge AI technology with proven entrepreneurial methodologies to streamline the journey from concept to launch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {aboutPoints.map((point) => (
            <div key={point.num} className="text-center">
              <div className={`w-16 h-16 rounded-full bg-${point.color}/10 flex items-center justify-center mx-auto mb-4`}>
                <span className={`text-${point.color} text-2xl font-bold`}>{point.num}</span>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-white/90">{point.title}</h3>
              <p className="text-white/70">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// --- CTA Section ---
const ctaFeatures = [
  "AI-powered ideation tools",
  "Market validation & insights",
  "Interactive prototyping",
  "Business model analysis",
  "Launch strategy builder"
];

// Helper function for smooth scroll to top (used by skewed button)
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const CTASection = () => (
  <section id="cta" className="py-16 md:py-24 relative z-10">
    <div className="container mx-auto px-4">
      <div className="glass-card p-10 md:p-16 relative overflow-hidden">
        {/* Recreating blurred blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-electric-blue/10 blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-electric-purple/10 blur-[100px] pointer-events-none"></div>

        <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Left Side: Text and Skewed Button */}
          <div>
            <h2 className="text-gradient text-3xl md:text-4xl font-orbitron font-bold mb-6">
              Ready to BUILD Your Future?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Join thousands of entrepreneurs and innovators who are creating the next generation of groundbreaking products.
            </p>
            {/* Skewed Button Implementation from 8uild */}
            {/* Note: This uses specific Tailwind classes and structure for the effect */}
            {/* Changed Link to a tag */}
            <a href="/signup">
              <button
                // onClick={scrollToTop} // Original 8uild scrolled to top, changed to link
                className="relative inline-flex items-center group overflow-hidden transform -skew-x-12 shadow-lg hover:shadow-electric-blue/40 transition-shadow duration-300"
              >
                {/* Gradient background */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-electric-blue to-electric-purple opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
                {/* Text Content - skewed back */}
                <span className="relative px-8 py-3 text-white font-medium skew-x-12 flex items-center gap-2">
                  Start Building Now
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </a>
          </div>

          {/* Right Side: Feature Checklist Card */}
          <div className="flex justify-center md:justify-end">
            <div className="glass-card p-6 md:p-8 w-full max-w-sm shadow-xl border border-white/10">
              <h4 className="font-orbitron text-lg text-white/90 mb-4 text-center">What You Get:</h4>
              <div className="space-y-3">
                {ctaFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* Check icon styling from 8uild */}
                    <div className="p-1 rounded-full bg-electric-blue/20 mt-1 flex-shrink-0">
                      <Check size={14} className="text-electric-blue" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Footer Section ---
const FooterSection = () => (
  <footer id="footer" className="bg-navy-light py-12 relative z-10 border-t border-white/10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* Left: Logo & Copyright */}
        <div className="text-center md:text-left mb-6 md:mb-0 flex-shrink-0">
          {/* Changed Link to a tag */}
          <a href="/" className="inline-block mb-2">
            {/* Using BuildLogo component might be better if it exists and is styled */}
            <span className="font-orbitron text-gradient text-2xl font-bold">BUILD</span>
          </a>
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Innovation Platform. All rights reserved.
          </p>
        </div>

        {/* Right: Links Columns */}
        <div className="flex flex-wrap justify-center md:justify-end gap-8 lg:gap-16 text-center md:text-left">
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-medium mb-1">Product</h4>
            {/* Changed Link to a tag */}
            <a href="#features" className="text-white/60 hover:text-white text-sm underline-animation">Features</a>
            <a href="#pricing" className="text-white/60 hover:text-white text-sm underline-animation">Pricing</a>
            <a href="#" className="text-white/60 hover:text-white text-sm underline-animation">Integrations</a> { /* Placeholder link */}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-medium mb-1">Resources</h4>
            <a href="#" className="text-white/60 hover:text-white text-sm underline-animation">Documentation</a> { /* Placeholder link */}
            <a href="#" className="text-white/60 hover:text-white text-sm underline-animation">Guides</a> { /* Placeholder link */}
            <a href="/api/docs" className="text-white/60 hover:text-white text-sm underline-animation">API</a> { /* Placeholder link */}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-medium mb-1">Company</h4>
            <a href="#about" className="text-white/60 hover:text-white text-sm underline-animation">About</a>
            <a href="#" className="text-white/60 hover:text-white text-sm underline-animation">Blog</a> { /* Placeholder link */}
            <a href="#" className="text-white/60 hover:text-white text-sm underline-animation">Contact</a> { /* Placeholder link */}
          </div>
        </div>
      </div>
    </div>
  </footer>
);


// --- Main Page Component ---
export default function IndexPage() {
  return (
    // Apply base styles using classes from index.css (Phase A)
    <div className="flex flex-col min-h-screen bg-navy text-foreground font-inter">
      <LandingNavbar />

      {/* Uncomment if/when ThreeScene is implemented and imported */}
      {/* <ThreeScene /> */}

      {/* Add pt-16 (navbar height) to main to avoid overlap */}
      <main className="flex-grow pt-16">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <CTASection />
      </main>

      <FooterSection />
    </div>
  );
}
