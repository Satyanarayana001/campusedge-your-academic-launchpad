import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import DailyPlanner from "./pages/DailyPlanner";
import CGPACalculator from "./pages/CGPACalculator";
import SkillTracker from "./pages/SkillTracker";
import PlacementPrep from "./pages/PlacementPrep";
import CampusDrives from "./pages/CampusDrives";
import Community from "./pages/Community";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-10 w-10 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-3 animate-pulse">
            <span className="text-accent-foreground font-bold text-sm">CE</span>
          </div>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
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
  );
}

function AuthRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return <AuthPage />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthRoute />} />
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
