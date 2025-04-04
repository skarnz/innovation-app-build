
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BuildLogo from './BuildLogo';
import LoginDropdown from './LoginDropdown';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';

const CustomNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const isHomePage = location.pathname === '/';
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || !isHomePage ? 'bg-navy/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <BuildLogo small />
          </Link>
          
          {isMobile ? (
            <>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              {isMenuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-navy-light backdrop-blur-md p-4 shadow-lg">
                  <div className="flex flex-col gap-4">
                    <Link to="/pricing" className="text-white hover:text-electric-blue transition-colors">
                      Pricing
                    </Link>
                    <a href="/#about" className="text-white hover:text-electric-blue transition-colors">
                      About
                    </a>
                    <Link to="/login" className="text-white hover:text-electric-blue transition-colors">
                      Log in
                    </Link>
                    <Link to="/signup">
                      <Button className="w-full bg-electric-blue hover:bg-electric-blue/90">
                        Sign up
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/pricing" className="text-white hover:text-electric-blue transition-colors">
                Pricing
              </Link>
              <a href="/#about" className="text-white hover:text-electric-blue transition-colors">
                About
              </a>
              <LoginDropdown />
              <Link to="/signup">
                <Button className="bg-electric-blue hover:bg-electric-blue/90">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
