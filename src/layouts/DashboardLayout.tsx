import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
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
    <div className="flex min-h-screen bg-navy-darkest"> {/* Ensure main background */} 
      {/* Render the single Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
      
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
               <TooltipTrigger> 
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="bg-navy-light/50 backdrop-blur-sm text-white hover:bg-navy-light hover:text-white rounded-full h-8 w-8"
                  >
                    {isSidebarOpen ? <PanelLeft size={16} /> : <PanelRight size={16} />}
                  </Button>
               </TooltipTrigger>
               <TooltipContent side="right" className="bg-navy-darkest text-white border-navy-medium">
                 {isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
               </TooltipContent>
             </Tooltip>
           </TooltipProvider>
        </div>

        {/* TopBar position also depends on isSidebarOpen */}
        <TopBar
            isAuthenticated={isAuthenticated}
            user={user}
            isLoadingAuth={isLoadingAuth}
            isSidebarOpen={isSidebarOpen} 
        />

        <main className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8 mt-[70px]">
           <Outlet />
        </main>

        <AiAgent />
      </div>
    </div>
  );
};

export default DashboardLayout;
