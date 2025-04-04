
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3 glass-card bg-navy/70' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="font-orbitron text-gradient text-xl font-bold">BUILD</Link>
        </div>
        
        {!isMobile ? (
          <div className="flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white underline-animation">Features</a>
            <a href="#about" className="text-white/80 hover:text-white underline-animation">About</a>
            <Link to="/pricing" className="text-white/80 hover:text-white underline-animation">Pricing</Link>
            <Link to="/dashboard" className="text-white/80 hover:text-white underline-animation">Dashboard</Link>
            <div className="relative group">
              <button className="btn-primary ml-4">Log in</button>
              <div className="absolute right-0 mt-2 w-48 bg-navy-light border border-white/10 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <Link to="/login" className="block px-4 py-2 text-sm text-white hover:bg-white/5">Log in</Link>
                <Link to="/signup" className="block px-4 py-2 text-sm text-white hover:bg-white/5">Sign up</Link>
                <div className="border-t border-white/10 my-1"></div>
                <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/5 flex items-center">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4373 21.879V14.89H7.89931V12H10.4373V9.797C10.4373 7.291 11.9323 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1913C13.9503 8.562 13.5633 9.333 13.5633 10.124V12H16.3363L15.8933 14.89H13.5633V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" fill="currentColor"/></svg>
                  Continue with Google
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/5 flex items-center">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/></svg>
                  Continue with GitHub
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button 
            className="text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-navy-light bg-opacity-98 z-40 pt-20 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col items-center space-y-8 py-10">
            <a 
              href="#features" 
              className="text-white/80 hover:text-white text-xl py-2 w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-white/80 hover:text-white text-xl py-2 w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <Link
              to="/pricing" 
              className="text-white/80 hover:text-white text-xl py-2 w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/dashboard" 
              className="text-white/80 hover:text-white text-xl py-2 w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/login"
              className="btn-primary w-3/4 text-center mt-6" 
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
            <Link 
              to="/signup"
              className="border border-white/20 w-3/4 text-center py-3 px-8 rounded-full text-white mt-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
