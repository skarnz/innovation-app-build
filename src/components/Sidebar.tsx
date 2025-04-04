import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Home, 
  Search, 
  BarChart2, 
  Target, 
  Mic, 
  Rocket, 
  MessageSquare, 
  Wrench,
  FileText,
  Layers3,
  TextQuote,
  Package,
  Megaphone,
  Monitor,
  HeartHandshake,
  CloudCog,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Handshake,
  Lightbulb,
  HelpCircle,
  Clock,
  Share2,
  MessageCircle,
  Video,
  PenTool,
  Box,
  Activity,
  Cpu,
  User,
  GitBranch,
  Database,
  Lock,
  Unlock
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  number?: number;
};

const NavLink = ({ icon, label, to, active, number }: NavLinkProps) => (
  <Link 
    to={to}
    className={cn(
      "flex items-center gap-3 py-3 px-4 w-full text-sm font-medium transition-colors",
      active ? "text-white" : "text-white/60 hover:text-white/80"
    )}
  >
    <span className="flex-shrink-0">{icon}</span>
    <span className="flex-grow">{label}</span>
    {number !== undefined && (
      <span className="flex items-center justify-center w-5 h-5 text-xs bg-navy-light rounded-full">
        {number}
      </span>
    )}
  </Link>
);

interface SidebarProps {
  isOpen: boolean;
}

const CategoryToggle = ({ label, pathPrefix, icon, number = null, children }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(pathPrefix);
  const [isExpanded, setIsExpanded] = useState(isActive);

  useEffect(() => {
    setIsExpanded(location.pathname.startsWith(pathPrefix));
  }, [location.pathname, pathPrefix]);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center justify-between w-full gap-3 py-3 px-4 text-sm font-medium transition-colors", 
          isActive ? "text-white" : "text-white/60 hover:text-white/80"
        )}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
          {number !== null && (
             <span className="flex items-center justify-center w-5 h-5 text-xs bg-navy-light rounded-full">
               {number}
             </span>
          )}
        </div>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isExpanded && (
        <div className="ml-8 border-l border-white/20 pl-3 py-1">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={sidebarRef}
      className={cn(
        "w-64 h-screen bg-navy-light flex flex-col border-r border-white/10 fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-lg font-orbitron text-white uppercase">MAIN</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        <div className="py-2">
          <NavLink 
            icon={<Home size={18} />} 
            label="Dashboard" 
            to="/dashboard" 
            active={location.pathname === '/dashboard'}
          />
        </div>
        
        <CategoryToggle 
           label="Project Management"
           pathPrefix="/project"
           icon={null}
        >
            <NavLink 
                icon={<div className="w-5 h-5 flex items-center justify-center"><span className="text-white/70">📄</span></div>} 
                label="Overview" 
                to="/project/overview" 
                active={location.pathname === '/project/overview'}
              />
              <NavLink 
                icon={<FileText size={16} className="text-white/70" />} 
                label="Files" 
                to="/project/files" 
                active={location.pathname === '/project/files'}
              />
        </CategoryToggle>
        
        <div className="p-4 border-t border-white/10">
          <h2 className="text-lg font-orbitron text-white uppercase mb-2">PHASES</h2>
          
          <CategoryToggle 
             label="Ideation"
             pathPrefix="/project/ideate"
             icon={<Lightbulb size={18} />} 
             number={1}
          >
              <NavLink 
                  icon={<Search size={16} />} 
                  label="Idea Discovery" 
                  to="/project/ideate" 
                  active={location.pathname === '/project/ideate'}
                />
                <NavLink 
                  icon={<Sparkles size={16} />} 
                  label="Counter-Intuition" 
                  to="/project/ideate/counter-intuition" 
                  active={location.pathname === '/project/ideate/counter-intuition'}
                />
          </CategoryToggle>

          <CategoryToggle 
             label="Validation"
             pathPrefix="/project/validate"
             icon={<ShieldCheck size={18} />} 
             number={2}
          >
               <NavLink label="Validation Setup" to="/project/validate" active={location.pathname === '/project/validate'} icon={<div className="w-4 h-4" />} />
               <NavLink label="Score" to="/project/score" active={location.pathname === '/project/score'} icon={<div className="w-4 h-4" />}/>
          </CategoryToggle>

          <CategoryToggle 
             label="MVP Spec"
             pathPrefix="/project/mvp"
             icon={<Package size={18} />} 
             number={4}
          >
               <NavLink label="Core Features" to="/project/mvp" active={location.pathname === '/project/mvp'} icon={<div className="w-4 h-4" />} />
          </CategoryToggle>

          <CategoryToggle 
             label="Prototyping"
             pathPrefix="/project/prototype"
             icon={<Target size={18} />} 
             number={5}
          >
               <NavLink label="UX Prototype" to="/project/prototype" active={location.pathname === '/project/prototype'} icon={<div className="w-4 h-4" />} />
          </CategoryToggle>

          <CategoryToggle 
             label="Marketing"
             pathPrefix="/project/marketing"
             icon={<Megaphone size={18} />} 
             number={7}
          >
               <NavLink label="Timeline" to="/project/marketing" active={location.pathname === '/project/marketing'} icon={<div className="w-4 h-4" />} />
          </CategoryToggle>

        </div>

         <div className="p-4 border-t border-white/10 mt-auto">
            <h2 className="text-lg font-orbitron text-white uppercase mb-2">OTHER</h2>
             <NavLink 
                icon={<MessageCircle size={18} />} 
                label="Chat with Founder" 
                to="/chat" 
                active={location.pathname === '/chat'}
            />
             <NavLink 
                icon={<HelpCircle size={18} />} 
                label="Support Documentation" 
                to="/support" 
                active={location.pathname === '/support'}
            />
         </div>

      </div>
    </div>
  );
}
