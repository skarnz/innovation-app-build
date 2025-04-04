import React from 'react';
// import { FiSearch, FiPlus, FiBell, FiUser } from 'react-icons/fi'; // Old import
import { Search, Plus, Bell, User } from 'lucide-react'; // Use lucide-react icons
import { Button } from "@/components/ui/button"; // Use ShadCN Button
import { Input } from "@/components/ui/input"; // Use ShadCN Input

// import './TopBar.css'; // We'll use Tailwind classes primarily

const TopBar: React.FC = () => {
  return (
    // Use Tailwind for fixed positioning and styling 
    // Adjust `left-64` based on actual sidebar width/state if dynamic
    <header className="fixed top-0 h-[70px] left-64 right-0 z-30 flex items-center justify-between px-4 md:px-6 lg:px-8 bg-navy-darkest border-b border-navy-medium">
      <div className="flex-1">
         {/* Left side - could hold Breadcrumbs later */}
         {/* <h1 className="text-xl font-semibold text-slate-light">Dashboard</h1> */}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs">
          {/* Use Lucide icon */}
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-dark" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8 w-full bg-navy-dark border-navy-medium text-slate-light placeholder:text-slate-dark"
          />
        </div>
        
        {/* New Project Button */}
        <Button className="bg-accent-blue hover:bg-accent-purple text-navy-darkest font-semibold">
          {/* Use Lucide icon */}
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
        
        {/* User Actions */}
        <div className="flex items-center gap-2">
          {/* Use Lucide icons */}
          <Button variant="ghost" size="icon" className="rounded-full text-slate-medium hover:text-slate-light hover:bg-navy-dark">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-slate-medium hover:text-slate-light hover:bg-navy-dark">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopBar; 