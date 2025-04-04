import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidthClass = "w-64";
  const contentMarginClass = "ml-64";
  const contentMarginClosedClass = "ml-0";

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={cn(
          "flex-grow flex flex-col transition-all duration-300 ease-in-out",
          isSidebarOpen ? contentMarginClass : contentMarginClosedClass
      )}>
        <div className="fixed top-0 left-0 z-50 p-4" style={{ marginLeft: isSidebarOpen ? '16rem' : '0', transition: 'margin-left 0.3s ease-in-out' }}>
           <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="bg-navy-light/50 backdrop-blur-sm text-white hover:bg-navy-light hover:text-white"
           >
             {isSidebarOpen ? <PanelLeft size={18} /> : <PanelRight size={18} />}
           </Button>
        </div>

        <TopBar />

        <main className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8 mt-[70px]">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
