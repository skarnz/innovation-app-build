import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { DashboardNavbar } from '@/components/layout/DashboardNavbar';
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAuthStatus } from '@/lib/api';
import AiAgent from '@/components/AiAgent';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define a type for the user object if available, otherwise use any/unknown
interface User {
  id: string;
  username: string;
  // Add other relevant user properties
}

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open
  // Add state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const { projectId } = useParams(); // Get projectId from the route

  // Fetch auth status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const status = await getAuthStatus();
        setIsAuthenticated(status.isAuthenticated);
        setUser(status.user);
      } catch (error) {
        console.error("Error fetching auth status:", error);
        // Handle error appropriately, maybe set an error state
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    checkAuthStatus();
  }, []); // Empty dependency array ensures this runs only once on mount

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Define widths and margins based on single sidebar state
  const sidebarOpenWidthRem = 16; // w-64 -> 16rem
  const sidebarClosedWidthRem = 5; // w-20 -> 5rem
  const contentMarginOpenClass = "ml-64";
  const contentMarginClosedClass = "ml-20";

  return (
    <div className="flex min-h-screen bg-background"> {/* Use theme background */} 
      {/* Render the single Sidebar */}
      <Sidebar isOpen={isSidebarOpen} projectId={projectId} />
      
      {/* Apply dynamic margin based on isOpen state */}
      <div className={cn(
          "flex-grow flex flex-col transition-all duration-300 ease-in-out", // Transition margin
          isSidebarOpen ? contentMarginOpenClass : contentMarginClosedClass
      )}>
        {/* Position toggle button relative to the edge of the *single* sidebar */}
        <div 
           className="fixed top-4 z-[60] transition-all duration-300 ease-in-out"
           // Calculate left position based on sidebar's current state (width)
           style={{ left: `calc(${isSidebarOpen ? sidebarOpenWidthRem : sidebarClosedWidthRem}rem - 1.25rem)` }}
        >
           <TooltipProvider delayDuration={100}>
             <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    // Use theme colors
                    className="bg-card/50 backdrop-blur-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full h-8 w-8 border border-border"
                  >
                    {isSidebarOpen ? <PanelLeft size={16} /> : <PanelRight size={16} />}
                  </Button>
               </TooltipTrigger>
               {/* Use theme colors */}
               <TooltipContent side="right" className="bg-popover text-popover-foreground border-border">
                 {isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
               </TooltipContent>
             </Tooltip>
           </TooltipProvider>
        </div>

        {/* Render the new DashboardNavbar */}
        <DashboardNavbar />

        {/* Adjust top margin based on navbar height (h-16 -> mt-16) */}
        <main className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8 mt-16">
           <Outlet />
        </main>

        <AiAgent />
      </div>
    </div>
  );
};

export default DashboardLayout;
