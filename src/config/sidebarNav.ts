import {
    Home, Search, BarChart2, Target, Mic, Rocket, MessageSquare, Wrench,
    FileText, Layers3, TextQuote, Package, Megaphone, Monitor, HeartHandshake,
    CloudCog, LayoutDashboard, ShieldCheck, Sparkles, TrendingUp, Users,
    Handshake, Lightbulb, HelpCircle, Clock, Share2, MessageCircle, Video,
    PenTool, Box, Activity, Cpu, GitBranch, Database, Lock, Unlock,
    Settings, LifeBuoy, FolderKanban // Added FolderKanban
  } from 'lucide-react';
  import React from 'react';
  
  export interface NavItem {
    label: string;
    icon: React.ElementType; // Use ElementType for component type
    to: string;
    pathPrefix?: string; // For category matching
    children?: NavItem[];
    section?: string; // Optional section title (e.g., RESOURCES, PHASES)
    badge?: string; // Optional badge (e.g., New, Soon)
    number?: number; // For phase numbering
  }
  
  export const sidebarNavItems: NavItem[] = [
    // Main
    { label: 'Dashboard', icon: Home, to: '/dashboard' },
    // Project Management Category (Example - needs refinement)
    // { 
    //   label: 'Project Management', 
    //   icon: FolderKanban, // Need an icon 
    //   to: '/project', // Base path or first child path
    //   pathPrefix: '/project',
    //   children: [
    //     { label: 'Overview', icon: LayoutDashboard, to: '/project/overview' }, // Replace div with actual icon
    //     { label: 'Files', icon: FileText, to: '/project/files' },
    //   ]
    // },
  
    // Resources Section
    { section: 'RESOURCES' },
    { label: 'Deep Research', icon: Search, to: '/deep-research', pathPrefix: '/deep-research', badge: 'New' },
    // Add other resources like Starter Kits, Templates, Inspirations here if needed
  
    // Phases Section
    { section: 'PHASES' },
    {
      label: 'Ideation',
      icon: Lightbulb,
      to: '/project/:projectId/ideation',
      pathPrefix: '/project/:projectId/ideation',
      number: 1,
      children: [
        { label: 'Idea Discovery', icon: Search, to: '/project/:projectId/ideation' },
        { label: 'Counter-Intuition', icon: Sparkles, to: '/project/ideate/counter-intuition' },
      ]
    },
    {
        label: 'Validation',
        icon: ShieldCheck,
        to: '/project/:projectId/validation',
        pathPrefix: '/project/:projectId/validation',
        number: 2,
        children: [
             { label: 'Validation Setup', icon: Activity, to: '/project/:projectId/validation'},
             { label: 'Score', icon: TrendingUp, to: '/project/score' },
        ]
      },
      {
        label: 'MVP Spec',
        icon: Package,
        to: '/project/:projectId/plan',
        pathPrefix: '/project/:projectId/plan',
        number: 4,
        children: [
             { label: 'Core Features', icon: PenTool, to: '/project/:projectId/plan' },
        ]
      },
      {
        label: 'Prototyping',
        icon: Target,
        to: '/project/:projectId/visualize',
        pathPrefix: '/project/:projectId/visualize',
        number: 5,
        children: [
             { label: 'UX Prototype', icon: Box, to: '/project/:projectId/visualize' },
        ]
      },
      {
        label: 'Marketing',
        icon: Megaphone,
        to: '/project/:projectId/launch-prep',
        pathPrefix: '/project/:projectId/launch-prep',
        number: 7,
        children: [
             { label: 'Timeline', icon: Clock, to: '/project/:projectId/launch-prep' },
        ]
      },
  
    // Bottom Links (implicitly another section)
    { section: 'OTHER' }, // Add section separator logic later
    { label: 'Community', icon: Users, to: '/community' },
    { label: 'Settings', icon: Settings, to: '/settings' },
    { label: 'Support', icon: LifeBuoy, to: '/support' },
  ]; 