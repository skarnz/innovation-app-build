
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Github, User } from 'lucide-react';

const LoginDropdown = () => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };
  
  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 300); // Add 300ms delay before closing
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger 
        asChild 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button variant="ghost" className="text-white hover:text-electric-blue hover:bg-transparent">
          Log in
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-navy-light border-white/10 w-60"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-3 border-b border-white/10">
          <Link to="/login">
            <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/5">
              Log in with email
            </Button>
          </Link>
        </div>
        
        <div className="p-3 space-y-2">
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
            <Link to="/login" className="w-full flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4373 21.879V14.89H7.89931V12H10.4373V9.797C10.4373 7.291 11.9323 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1913C13.9503 8.562 13.5633 9.333 13.5633 10.124V12H16.3363L15.8933 14.89H13.5633V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" fill="currentColor"/>
                </svg>
              </div>
              <span>Continue with Google</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
            <Link to="/login" className="w-full flex items-center gap-2">
              <Github size={16} />
              <span>Continue with GitHub</span>
            </Link>
          </DropdownMenuItem>
        </div>
        
        <div className="p-3 pt-1 border-t border-white/10">
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
            <Link to="/signup" className="w-full flex items-center gap-2">
              <User size={16} />
              <span>Create account</span>
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoginDropdown;
