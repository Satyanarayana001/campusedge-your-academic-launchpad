import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import DailyPlanner from "./pages/DailyPlanner";
import CGPACalculator from "./pages/CGPACalculator";
import SkillTracker from "./pages/SkillTracker";
import PlacementPrep from "./pages/PlacementPrep";
import CampusDrives from "./pages/CampusDrives";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planner" element={<DailyPlanner />} />
            <Route path="/cgpa" element={<CGPACalculator />} />
            <Route path="/skills" element={<SkillTracker />} />
            <Route path="/prep" element={<PlacementPrep />} />
            <Route path="/drives" element={<CampusDrives />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
