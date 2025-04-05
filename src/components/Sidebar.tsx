import React, { useEffect, useRef, useState } from 'react';
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
  Unlock,
  Settings,
  LifeBuoy,
  Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from '@/components/ThemeToggle';
import { sidebarNavItems, NavItem } from '@/config/sidebarNav';
import { Badge } from "@/components/ui/badge";

interface NavLinkProps {
  item: NavItem;
  isOpen: boolean;
  projectId?: string;
}

const NavLink = ({ item, isOpen, projectId }: NavLinkProps) => {
  const location = useLocation();
  const path = projectId ? `/app/project/${projectId}${item.to}` : item.to;
  const isActive = location.pathname === path || (item.pathPrefix && location.pathname.startsWith(item.pathPrefix));

  return (
    <TooltipProvider delayDuration={isOpen ? 10000 : 100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            to={path}
            className={cn(
              "flex items-center gap-3 py-2.5 transition-colors relative",
              isOpen ? "px-4" : "px-3 justify-center",
              isActive 
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && !isOpen && (
               <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary rounded-r-full"></div>
            )}
            {isActive && isOpen && (
               <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary rounded-r-full"></div>
            )}
            <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
            {isOpen && <span className="flex-grow text-sm font-medium truncate">{item.label}</span>}
            {isOpen && item.number !== undefined && (
              <span className="flex items-center justify-center w-5 h-5 text-xs bg-input rounded-full text-muted-foreground">
                {item.number}
              </span>
            )}
          </Link>
        </TooltipTrigger>
        {!isOpen && (
          <TooltipContent side="right" className="bg-popover text-popover-foreground border-border">
            {item.label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

interface CategoryToggleProps {
  item: NavItem;
  isOpen: boolean;
  projectId?: string;
}

const CategoryToggle = ({ item, isOpen, projectId }: CategoryToggleProps) => {
  const location = useLocation();
  const initialIsActive = item.pathPrefix && location.pathname.startsWith(projectId ? `/app/project/${projectId}${item.pathPrefix}` : item.pathPrefix);
  const [isExpanded, setIsExpanded] = useState(initialIsActive);

  useEffect(() => {
      const currentlyActive = item.pathPrefix && location.pathname.startsWith(projectId ? `/app/project/${projectId}${item.pathPrefix}` : item.pathPrefix);
      if (currentlyActive) {
          setIsExpanded(true);
      }
  }, [location.pathname, item.pathPrefix, projectId]);

  if (!isOpen) return null;

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center justify-between w-full gap-3 py-2.5 px-4 text-sm font-medium transition-colors", 
          initialIsActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          <span className="w-5 h-5">{item.icon}</span>
          <span className="flex-grow text-left truncate">{item.label}</span>
          {item.number !== undefined && (
             <span className="flex items-center justify-center w-5 h-5 text-xs bg-input rounded-full text-muted-foreground">
               {item.number}
             </span>
          )}
        </div>
        {isExpanded ? <ChevronUp size={16} className="text-muted-foreground"/> : <ChevronDown size={16} className="text-muted-foreground"/>}
      </button>
      
      {isExpanded && (
        <div className="ml-5 mt-1 border-l border-border pl-5 py-1 space-y-1">
          {item.children?.map((childItem: any, index: number) => (
            <NavLink key={childItem.to || `child-${index}`} item={childItem} isOpen={isOpen} projectId={projectId} />
          ))}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  isOpen: boolean;
  projectId?: string;
}

export default function Sidebar({ isOpen, projectId }: SidebarProps) {
  const location = useLocation();
  let currentSection = "";

  return (
    <div 
      className={cn(
        "h-screen bg-card flex flex-col border-r border-border fixed top-0 left-0 z-40 transition-width duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className={cn(
          "h-16 border-b border-border flex items-center shrink-0",
          isOpen ? "px-4 justify-start" : "px-4 justify-center"
        )}>
         {isOpen ? (
             <span className="text-lg font-orbitron text-foreground uppercase tracking-wider">BUILD</span> 
         ) : (
             <span title="BUILD Menu" className="text-primary">
                <LayoutDashboard size={20} /> 
             </span>
         )}
       </div>

      <nav className={cn("flex-grow overflow-y-auto overflow-x-hidden py-2", isOpen ? "px-2" : "px-0 flex flex-col items-center gap-1")}>
        {sidebarNavItems.map((item, index) => {
          const isNewSection = item.section && item.section !== currentSection && isOpen;
          if (item.section && item.section !== currentSection) {
              currentSection = item.section;
          }

          if (item.section === 'OTHER') return null;

          return (
            <React.Fragment key={item.to || item.label || `item-${index}`}>
              {isNewSection && item.section !== 'MAIN' && item.section !== 'PROJECT' && (
                 <h2 className="text-xs font-semibold text-muted-foreground uppercase mt-4 mb-1 px-4">
                   {item.section}
                 </h2>
              )}
              {item.children ? (
                 <CategoryToggle item={item} isOpen={isOpen} projectId={projectId} />
              ) : (
                 <NavLink item={item} isOpen={isOpen} projectId={projectId} />
              ) }
            </React.Fragment>
          );
        })}
      </nav>

       <div className={cn("mt-auto border-t border-border p-2 shrink-0", isOpen ? "px-2 space-y-1" : "flex flex-col items-center gap-1")}>
           {sidebarNavItems.filter(item => item.section === 'OTHER').map(item => (
             <NavLink key={item.to} item={item} isOpen={isOpen} projectId={projectId} />
           ))}
        </div>
    </div>
  );
}
