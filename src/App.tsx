import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import Properties from "./pages/Properties";
import KYCVerification from "./pages/KYCVerification";
import Transactions from "./pages/Transactions";
import Financials from "./pages/Financials";
import SalesLeads from "./pages/SalesLeads";
import Agents from "./pages/Agents";
import Maintenance from "./pages/Maintenance";
import Documents from "./pages/Documents";
import Announcements from "./pages/Announcements";
import Support from "./pages/Support";
import AuditLogs from "./pages/AuditLogs";
import Analytics from "./pages/Analytics";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/kyc" element={<KYCVerification />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/financials" element={<Financials />} />
            <Route path="/leads" element={<SalesLeads />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/support" element={<Support />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
