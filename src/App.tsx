
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ApplicationQueue from "./pages/ApplicationQueue";
import ApplicationDetail from "./pages/ApplicationDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/applications"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <ApplicationQueue />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/applications/:id"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <ApplicationDetail />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Login />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
