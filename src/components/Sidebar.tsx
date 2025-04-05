import { useEffect, useState } from 'react';
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
import React from 'react';
import { Badge } from "@/components/ui/badge";

// Combined NavLink / IconLink logic
const CombinedNavLink = ({ item, isOpen, projectId }: { item: NavItem, isOpen: boolean, projectId?: string }) => {
  const location = useLocation();
  
  // Add /app prefix and handle :projectId
  const path = item.to.startsWith('/') ? `/app${item.to}` : item.to; // Prepend /app if it's an absolute path
  const finalPath = projectId && path.includes(':projectId') 
                ? path.replace(':projectId', projectId) 
                : path; 
  const prefix = item.pathPrefix?.startsWith('/') ? `/app${item.pathPrefix}` : item.pathPrefix; // Prepend /app to prefix
  const finalPrefix = projectId && prefix?.includes(':projectId')
                ? prefix.replace(':projectId', projectId)
                : prefix;

  // Check activity based on direct path or prefix
  const isActive = (location.pathname === finalPath || 
                   (finalPrefix && location.pathname.startsWith(finalPrefix)));
  const IconComponent = item.icon;

  // Render link with full content if open
  if (isOpen) {
    return (
      <Link
        to={finalPath}
        className={cn(
          "flex items-center gap-3 py-2 px-4 w-full text-sm font-medium transition-colors rounded-md",
          isActive ? "text-white bg-navy-dark" : "text-white/60 hover:text-white/80"
        )}
      >
        <IconComponent size={18} className={cn("flex-shrink-0", isActive ? "text-electric-blue" : "")} />
        <span className="flex-grow truncate">{item.label}</span>
        {/* Display phase number if available */}
        {item.number !== undefined && (
          <span className="flex items-center justify-center text-xs font-mono text-white/50">
            {item.number}
          </span>
        )}
        {/* Display badge if available */}
        {item.badge && (
           <Badge variant="outline" className="ml-auto text-xs bg-accent-blue/20 border-accent-blue/50 text-accent-blue px-1.5 py-0.5">
              {item.badge}
            </Badge>
        )}
      </Link>
    );
  }

  // Render icon-only with tooltip if closed
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={finalPath}
            className={cn(
              "flex items-center justify-center h-10 w-10 rounded-md transition-colors", // Centered icon
              isActive ? "bg-navy-dark text-electric-blue" : "text-white/60 hover:text-white hover:bg-navy-dark"
            )}
          >
            <IconComponent size={20} />
            <span className="sr-only">{item.label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-navy-darkest text-white border-navy-medium">
          {item.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Combined Category Toggle logic
const CombinedCategoryToggle = ({ item, isOpen, projectId }: { item: NavItem, isOpen: boolean, projectId?: string }) => {
    const location = useLocation();

    // Add /app prefix and handle :projectId
    const path = item.to.startsWith('/') ? `/app${item.to}` : item.to; 
    const finalPath = projectId && path.includes(':projectId') 
                 ? path.replace(':projectId', projectId) 
                 : path;
    const prefix = item.pathPrefix?.startsWith('/') ? `/app${item.pathPrefix}` : item.pathPrefix;
    const finalPrefix = projectId && prefix?.includes(':projectId')
                 ? prefix.replace(':projectId', projectId)
                 : prefix;

    const isActive = location.pathname.startsWith(finalPrefix || finalPath);
    const [isExpanded, setIsExpanded] = useState(isActive);
    const IconComponent = item.icon;

    useEffect(() => {
        // Ensure it reflects current path on navigation
        const currentlyActive = location.pathname.startsWith(finalPrefix || finalPath);
        if (currentlyActive) {
            setIsExpanded(true);
        }
    }, [location.pathname, finalPrefix, finalPath, isOpen]); // Updated dependencies

    // Render icon-only if closed
    if (!isOpen) {
        return (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                     to={finalPath}
                     className={cn(
                        "flex items-center justify-center h-10 w-10 rounded-md transition-colors",
                        isActive ? "bg-navy-dark text-electric-blue" : "text-white/60 hover:text-white hover:bg-navy-dark"
                      )}>
                     <IconComponent size={20} />
                     <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-navy-darkest text-white border-navy-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        );
    }
    
    // Render full toggle if open
    return (
        <div className="mb-1">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "flex items-center justify-between w-full gap-3 py-2 px-4 text-sm font-medium transition-colors rounded-md",
                    isActive ? "text-white bg-navy-dark" : "text-white/60 hover:text-white/80"
                )}
            >
                <div className="flex items-center gap-3">
                    <IconComponent size={18} className={cn(isActive ? "text-electric-blue" : "")} />
                    <span className="flex-grow truncate text-left">{item.label}</span> {/* Ensure text aligns left */}
                    {item.number !== undefined && (
                        <span className="flex items-center justify-center text-xs font-mono text-white/50">
                            {item.number}
                        </span>
                    )}
                    {item.badge && (
                        <Badge variant="outline" className="ml-1 text-xs bg-accent-blue/20 border-accent-blue/50 text-accent-blue px-1.5 py-0.5">
                            {item.badge}
                        </Badge>
                    )}
                </div>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isExpanded && (
                <div className="ml-4 mt-1 space-y-1 border-l border-navy-medium pl-4">
                    {item.children?.map((child, index) => (
                        <CombinedNavLink key={child.to || `sub-${index}`} item={child} isOpen={isOpen} projectId={projectId} />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Helper for Appearance/Theme Toggle Item ---
const AppearanceToggleItem = ({ isOpen }: { isOpen: boolean }) => {
    if (isOpen) {
        return (
            <div className={cn(
                "flex items-center justify-between gap-3 py-2 px-4 w-full text-sm font-medium text-white/60", // Mimic NavLink style, adjust as needed
            )}>
                <div className="flex items-center gap-3">
                    <Palette size={18} className="flex-shrink-0" />
                    <span className="flex-grow truncate">Appearance</span>
                </div>
                <ThemeToggle /> {/* Place the toggle itself at the end */} 
            </div>
        );
    }

    // Render icon-only with tooltip if closed
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {/* ThemeToggle likely renders a button, use it directly */}
                     <div className="flex items-center justify-center h-10 w-10">
                        <ThemeToggle />
                     </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-navy-darkest text-white border-navy-medium">
                    Toggle Theme
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
// --- End Helper ---

// Main Sidebar Component
interface SidebarProps {
  isOpen: boolean;
  projectId?: string;
}

export default function Sidebar({ isOpen, projectId }: SidebarProps) {
  let currentSection: string | null = null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen", // Keep fixed positioning
        "bg-navy-light flex flex-col border-r border-navy-medium",
        "transition-all duration-300 ease-in-out", // Transition width
        isOpen ? "w-64" : "w-20" // Control width based on state
      )}
    >
      {/* Header - Conditionally render text or just icon */}
      <div className={cn(
          "p-4 h-[70px] border-b border-navy-medium flex items-center shrink-0", 
          isOpen ? "justify-start" : "justify-center"
        )}>
         {isOpen ? (
             <h2 className="text-lg font-orbitron text-white uppercase tracking-wider">BUILD</h2>
         ) : (
             <span title="Build Menu" className="text-accent-blue">
                {/* Simple placeholder icon when closed */} 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6l6 6"/></svg>
             </span>
         )}
      </div>

      {/* Navigation Area - adapts based on isOpen */}
      <nav className={cn("flex-grow overflow-y-auto overflow-x-hidden py-2", isOpen ? "px-2" : "px-2 flex flex-col items-center gap-1")}> 
        {sidebarNavItems.map((item, index) => {
          if (item.section === 'OTHER') return null;

          const isNewSection = item.section && item.section !== currentSection && isOpen;
          if (item.section && item.section !== currentSection) {
              currentSection = item.section;
          }

          return (
            <React.Fragment key={item.to || item.label || `item-${index}`}>
              {isNewSection && (
                 <h2 className="text-xs font-semibold text-white/50 uppercase mt-4 mb-1 px-2">
                   {item.section}
                 </h2>
              )}
              {item.children ? (
                 <CombinedCategoryToggle item={item} isOpen={isOpen} projectId={projectId} />
              ) : !item.section ? (
                 <CombinedNavLink item={item} isOpen={isOpen} projectId={projectId} />
              ) : null}
            </React.Fragment>
          );
        })}
      </nav>

       {/* Bottom section - Explicitly render bottom links */} 
       <div className={cn("mt-auto border-t border-navy-medium p-2 shrink-0", isOpen ? "px-2 space-y-1" : "flex flex-col items-center gap-1")}> {/* Adjusted padding for open state */} 
           {/* Appearance/Theme Toggle FIRST */} 
           <AppearanceToggleItem isOpen={isOpen} />

           {/* Explicitly find and render Community, Settings, Support */} 
           {sidebarNavItems.find(item => item.label === 'Community') && 
             <CombinedNavLink item={sidebarNavItems.find(item => item.label === 'Community')!} isOpen={isOpen} projectId={projectId} />}
           {sidebarNavItems.find(item => item.label === 'Settings') && 
             <CombinedNavLink item={sidebarNavItems.find(item => item.label === 'Settings')!} isOpen={isOpen} projectId={projectId} />}
          {sidebarNavItems.find(item => item.label === 'Support') && 
             <CombinedNavLink item={sidebarNavItems.find(item => item.label === 'Support')!} isOpen={isOpen} projectId={projectId} />}
        </div>
    </div>
  );
}
