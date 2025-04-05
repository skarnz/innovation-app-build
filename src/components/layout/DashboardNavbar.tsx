import React from 'react';
import BuildLogo from '@/components/BuildLogo';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Bell, User } from 'lucide-react'; // Added Bell, User
import { Link } from 'react-router-dom'; // Use react-router-dom Link

export const DashboardNavbar: React.FC = () => {
  // TODO: Implement actual search, notifications, user state/dropdown

  return (
    <nav className="h-16 bg-sidebar text-sidebar-foreground border-b border-sidebar-border flex items-center sticky top-0 z-40 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo */}
        <Link to="/app/dashboard" aria-label="Dashboard" className="flex items-center">
          <BuildLogo className="h-6 w-auto" />
        </Link>

        {/* Center: Search (Placeholder) */}
        <div className="flex-1 flex justify-center px-4 lg:px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search projects..." 
              className="pl-10 h-9 bg-sidebar-accent border-sidebar-border"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link to="/app/project/setup">
            <Button variant="default" size="sm" className="hidden sm:flex">
              <Plus size={16} className="mr-1" />
              New Project
            </Button>
          </Link>
          {/* Placeholder Notification Button */}
          <Button variant="ghost" size="icon">
            <Bell size={18} />
            <span className="sr-only">Notifications</span>
          </Button>
          {/* Placeholder User Button/Dropdown */}
          <Button variant="ghost" size="icon">
            <User size={18} />
             <span className="sr-only">User Menu</span>
          </Button>
           {/* Optional Login button if needed based on auth state */}
           {/* <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link> */}
        </div>
      </div>
    </nav>
  );
}; 