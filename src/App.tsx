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
import ProjectIdeation from "./pages/ProjectIdeation";
import CounterIntuition from "./pages/CounterIntuition";
import ProjectValidation from "./pages/ProjectValidation";
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
import LaunchProduction from "./pages/LaunchProduction";
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
import ComingSoon from "./pages/ComingSoon";
import ProjectSetup from "./pages/ProjectSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProductTypeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/support" element={<DashboardLayout><ComingSoon featureName="Support" /></DashboardLayout>} />
            
            {/* Project Setup Route (Phase 2) */}
            <Route path="/project/setup" element={<DashboardLayout><ProjectSetup /></DashboardLayout>} />
            
            {/* Dashboard Routes */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Main Phases in Order with Numbering */}
              <Route path="project/ideate" element={<ProjectIdeation />} /> {/* Phase 1 */}
              <Route path="project/ideate/counter-intuition" element={<CounterIntuition />} />
              
              <Route path="project/validate" element={<ProjectValidation />} /> {/* Phase 2 */}
              <Route path="project/score" element={<ProjectScore />} />
              <Route path="project/forecasting" element={<Forecasting />} />
              <Route path="project/target" element={<TargetMarket />} />
              <Route path="project/interview" element={<Interviews />} />
              
              {/* Business Model & Value Chain Hub - Now as section 3 */}
              <Route path="project/business-canvas" element={<BusinessCanvas />} /> {/* Phase 3 */}
              <Route path="project/value-chain" element={<ValueChain />} />
              <Route path="project/competition" element={<CompetitionAnalysis />} />
              <Route path="project/market" element={<MarketAnalysis />} />
              <Route path="project/outcomes" element={<MazeOfOutcomes />} />
              <Route path="project/anti-intuition" element={<AntiIntuition />} />
              
              {/* MVP Specification - Phase 4 */}
              <Route path="project/mvp" element={<MVPSpecification />} />
              <Route path="project/mvp/core-features" element={<CoreFeatures />} />
              <Route path="project/mvp/timeline" element={<Timeline />} />
              <Route path="project/mvp/resources" element={<Resources />} />
              <Route path="project/mvp/dependencies" element={<Dependencies />} />
              
              {/* Prototyping - Phase 5 */}
              <Route path="project/prototype" element={<Prototyping />} />
              <Route path="project/prototype/ux" element={<UXPrototype />} />
              <Route path="project/prototype/sketch" element={<SketchPrototype />} />
              <Route path="project/prototype/physical" element={<PhysicalPrototype />} />
              
              {/* Launch - Phase 6 */}
              <Route path="project/launch" element={<LaunchProduction />} />
              <Route path="project/production" element={<ProductionDeployment />} />
              <Route path="project/launch/github" element={<GitHubIntegration />} />
              <Route path="project/launch/supabase" element={<SupabaseIntegration />} />
              <Route path="project/launch/pilot" element={<Pilot />} />
              
              {/* Marketing - Phase 7 */}
              <Route path="project/marketing" element={<MarketingFeedback />} />
              <Route path="project/marketing/timeline" element={<MarketingTimeline />} />
              <Route path="project/marketing/platforms" element={<MarketingPlatforms />} />
              <Route path="project/marketing/automation" element={<AutomationFlow />} />
              <Route path="project/marketing/video" element={<GenerativeVideo />} />
              
              {/* Scaling Operations - Phase 8 */}
              <Route path="project/scaling" element={<ScalingOperations />} />
              
              {/* Partnerships - Phase 9 */}
              <Route path="project/partnerships" element={<Partnerships />} />
              
              {/* Project Management Functionality */}
              <Route path="project/files" element={<FileManagement />} />
              <Route path="project/overview" element={<Dashboard />} />
              <Route path="chat" element={<Dashboard />} />

              {/* Add routes for new sidebar items using ComingSoon */}
              <Route path="deep-research" element={<ComingSoon featureName="Deep Research" />} />
              <Route path="community" element={<ComingSoon featureName="Community" />} />
              {/* Settings could also be ComingSoon or redirect to profile if exists */}
              <Route path="settings" element={<ComingSoon featureName="Settings" />} /> 

              {/* Catch-all for other /project paths */}
              <Route path="project/*" element={<ComingSoon featureName="This Project Feature" />} />
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
