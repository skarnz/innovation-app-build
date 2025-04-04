import Link from 'next/link';
import React from 'react';
// Assuming BuildLogo component exists or will be created at this path
import { BuildLogo } from '@/components/BuildLogo';
import { Button } from '@/components/ui/button';
// Import a hook to check auth status if needed for Dashboard link
// import { useAuth } from '@/hooks/useAuth';

export const LandingNavbar: React.FC = () => {
  // const { isAuthenticated } = useAuth(); // Example

  // Smooth scroll handler
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Calculate offset based on navbar height (e.g., 64px for h-16)
      const offsetTop = targetElement.offsetTop - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-navy/80 backdrop-blur-md border-b border-white/10 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" aria-label="Homepage">
          <BuildLogo className="h-6 w-auto" /> {/* Apply gradient styles within BuildLogo */}
        </Link>

        {/* Center/Right: Links - Hidden on mobile, need menu toggle */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#features" onClick={(e) => handleScroll(e, 'features')} className="text-sm font-medium text-white/80 hover:text-white underline-animation">
            Features
          </Link>
          <Link href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-sm font-medium text-white/80 hover:text-white underline-animation">
            About
          </Link>
          <Link href="#pricing" onClick={(e) => handleScroll(e, 'pricing')} className="text-sm font-medium text-white/80 hover:text-white underline-animation">
            Pricing
          </Link>
          {/* TODO: Add condition based on auth status if needed */}
          {/* {isAuthenticated && ( */}
          <Link href="/dashboard" className="text-sm font-medium text-white/80 hover:text-white underline-animation">
            Dashboard
          </Link>
          {/* )} */}
        </div>

        {/* Right: Button & Mobile Menu Placeholder */}
        <div className="flex items-center">
          <div className="hidden md:block">
            <Link href="/signup"> {/* Link to signup or login */}
              <Button size="sm" className="bg-electric-blue hover:bg-electric-blue/90 text-white rounded-full px-5 py-1.5">
                Get Started
              </Button>
            </Link>
          </div>
          {/* Placeholder for mobile menu button */}
          <div className="md:hidden">
            {/* Add Hamburger Menu Button here later */}
            <button className="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 