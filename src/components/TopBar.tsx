import React from 'react';
// import { FiSearch, FiPlus, FiBell, FiUser } from 'react-icons/fi'; // Old import
import { Search, Plus, Bell, User, LogOut, Github } from 'lucide-react'; // Use lucide-react icons, added LogOut, Github
import { Button } from "@/components/ui/button"; // Use ShadCN Button
import { Input } from "@/components/ui/input"; // Use ShadCN Input
import { cn } from '@/lib/utils'; // Import cn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import DropdownMenu components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"; // Import Avatar components
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { loginWithGithub, logout } from '@/lib/api'; // Import API functions

// import './TopBar.css'; // We'll use Tailwind classes primarily

// Define props interface
interface TopBarProps {
  isAuthenticated: boolean;
  user: { id: string; username: string; /* Add avatarUrl?, etc. */ } | null;
  isLoadingAuth: boolean;
  isSidebarOpen: boolean; // Use this to determine left margin
}

const TopBar: React.FC<TopBarProps> = ({
  isAuthenticated,
  user,
  isLoadingAuth,
  isSidebarOpen // Destructure prop
}) => {

  // Dynamically set the left margin based on sidebar state (width)
  const headerLeftMarginClass = isSidebarOpen ? "left-64" : "left-20"; // Corresponds to ml-64 / ml-20

  return (
    // Use cn to apply dynamic left margin
    <header className={cn(
      "fixed top-0 h-[70px] right-0 z-30 flex items-center justify-between px-4 md:px-6 lg:px-8 bg-navy-darkest border-b border-navy-medium transition-all duration-300 ease-in-out", // Transition left position
      headerLeftMarginClass // Apply dynamic margin class
    )}>
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
        <div className="flex items-center gap-3"> {/* Increased gap slightly */}
          <Button variant="ghost" size="icon" className="rounded-full text-slate-medium hover:text-slate-light hover:bg-navy-dark">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Auth Section */}
          {isLoadingAuth ? (
            <Skeleton className="h-8 w-8 rounded-full bg-navy-dark" /> // Show skeleton while loading
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    {/* Placeholder for AvatarImage if user.avatarUrl exists */}
                    {/* <AvatarImage src={user.avatarUrl} alt={user.username} /> */}
                    <AvatarFallback className="bg-navy-light text-slate-light text-xs">
                      {/* Display initials */}
                      {user.username?.substring(0, 2).toUpperCase() || '??'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-navy-dark/90 backdrop-blur-md border-navy-medium text-slate-light w-56" // Added glass morphism classes and width
              >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.username}</p>
                        {/* <p className="text-xs leading-none text-slate-dark">
                            {user.email} // Add email if available
                        </p> */}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-navy-medium/50" /> {/* Slightly transparent separator */}
                {/* Add other items like Profile, Settings later */}
                {/* <DropdownMenuItem className="hover:bg-navy-light focus:bg-navy-light cursor-pointer">
                    Profile
                </DropdownMenuItem> */}
                <DropdownMenuItem 
                  onClick={logout} 
                  className="hover:bg-navy-light/80 focus:bg-navy-light/80 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button
                variant="outline"
                size="sm"
                onClick={loginWithGithub} // Call login function
                className="border-navy-medium bg-navy-dark text-slate-light hover:bg-navy-light hover:text-slate-light"
             >
                <Github className="mr-2 h-4 w-4" />
                Login
             </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar; 