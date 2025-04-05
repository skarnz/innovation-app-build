import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductTypeProvider } from "./contexts/ProductTypeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CounterIntuition from "./pages/CounterIntuition";
import ProjectScore from "./pages/ProjectScore";
import Forecasting from "./pages/Forecasting";
import Pricing from "./pages/Pricing";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FileManagement from "./pages/FileManagement";
import MVPSpecification from "./pages/MVPSpecification";
import CoreFeatures from "./pages/mvp/CoreFeatures";
import Timeline from "./pages/mvp/Timeline";
import Resources from "./pages/mvp/Resources";
import Dependencies from "./pages/mvp/Dependencies";
import Prototyping from "./pages/Prototyping";
import UXPrototype from "./pages/prototyping/UXPrototype";
import SketchPrototype from "./pages/prototyping/SketchPrototype";
import PhysicalPrototype from "./pages/prototyping/PhysicalPrototype";
import ProductionDeployment from "./pages/ProductionDeployment";
import GitHubIntegration from "./pages/launch/GitHubIntegration";
import SupabaseIntegration from "./pages/launch/SupabaseIntegration";
import Pilot from "./pages/launch/Pilot";
import MarketingFeedback from "./pages/MarketingFeedback";
import MarketingTimeline from "./pages/marketing/MarketingTimeline";
import MarketingPlatforms from "./pages/marketing/MarketingPlatforms";
import AutomationFlow from "./pages/marketing/AutomationFlow";
import GenerativeVideo from "./pages/marketing/GenerativeVideo";
import BusinessCanvas from "./pages/BusinessCanvas";
import ValueChain from "./pages/ValueChain";
import CompetitionAnalysis from "./pages/CompetitionAnalysis";
import MarketAnalysis from "./pages/MarketAnalysis";
import MazeOfOutcomes from "./pages/MazeOfOutcomes";
import AntiIntuition from "./pages/AntiIntuition";
import TargetMarket from "./pages/TargetMarket";
import Interviews from "./pages/Interviews";
import ScalingOperations from "./pages/ScalingOperations";
import Partnerships from "./pages/Partnerships";
import Support from "./pages/Support";
import ComingSoon from "@/pages/ComingSoon";
import ProjectSetup from "@/pages/ProjectSetup";
import Ideation from "@/pages/Ideation";
import ValidationPage from "@/pages/ValidationPage";
import VisualizePage from "@/pages/Visualize";
import PlanPage from "@/pages/Plan";
import LaunchPrepPage from "@/pages/LaunchPrepPage";
import MarketingPage from "@/pages/MarketingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProductTypeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected/Dashboard Routes - Now under /app prefix */}
            <Route path="/app" element={<DashboardLayout />}>
              {/* Default dashboard route: /app */}
              <Route index element={<Dashboard />} /> 
              {/* Explicit dashboard route: /app/dashboard */}
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Project Setup Route: /app/project/setup */}
              <Route path="project/setup" element={<ProjectSetup />} />

              {/* Main Phases: /app/project/:projectId/... */}
              <Route path="project/:projectId/ideation" element={<Ideation />} />
              <Route path="project/:projectId/validation" element={<ValidationPage />} />
              <Route path="project/:projectId/visualize" element={<VisualizePage />} />
              <Route path="project/:projectId/plan" element={<PlanPage />} />
              <Route path="project/:projectId/launch-prep" element={<LaunchPrepPage />} />
              <Route path="project/:projectId/marketing-plan" element={<MarketingPage />} />

              {/* --- Legacy/Placeholder Routes (Review/Remove Later) --- */}
              {/* Assuming these should also be under /app */}
              <Route path="project/ideate/counter-intuition" element={<CounterIntuition />} />
              <Route path="project/score" element={<ProjectScore />} />
              {/* ... other legacy routes prefixed implicitly by /app ... */}
              <Route path="project/marketing/video" element={<GenerativeVideo />} />
              <Route path="project/scaling" element={<ScalingOperations />} />
              <Route path="project/partnerships" element={<Partnerships />} />
              {/* --- End Legacy --- */}
              
              {/* Project Management: /app/project/... & /app/chat */}
              <Route path="project/files" element={<FileManagement />} />
              <Route path="project/overview" element={<Dashboard />} />
              <Route path="chat" element={<Dashboard />} /> 

              {/* Other top-level sections: /app/... */}
              <Route path="deep-research" element={<ComingSoon featureName="Deep Research" />} />
              <Route path="community" element={<ComingSoon featureName="Community" />} />
              <Route path="settings" element={<ComingSoon featureName="Settings" />} /> 
              <Route path="support" element={<ComingSoon featureName="Support" />} /> 
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProductTypeProvider>
  </QueryClientProvider>
);

export default App;
