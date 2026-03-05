import {
  LayoutDashboard, Users, Building2, ShieldCheck, ArrowLeftRight,
  Banknote, TrendingUp, UserCheck, Wrench, FileText, Megaphone,
  LifeBuoy, BarChart3, ScrollText, Settings, LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "User Management", url: "/users", icon: Users },
  { title: "Properties", url: "/properties", icon: Building2 },
  { title: "KYC & Verification", url: "/kyc", icon: ShieldCheck },
  { title: "Transactions", url: "/transactions", icon: ArrowLeftRight },
  { title: "Financials", url: "/financials", icon: Banknote },
  { title: "Sales & Leads", url: "/leads", icon: TrendingUp },
  { title: "Agents", url: "/agents", icon: UserCheck },
  { title: "Maintenance", url: "/maintenance", icon: Wrench },
  { title: "Documents", url: "/documents", icon: FileText },
  { title: "Announcements", url: "/announcements", icon: Megaphone },
  { title: "Support", url: "/support", icon: LifeBuoy },
  { title: "Analytics & Reports", url: "/analytics", icon: BarChart3 },
  { title: "Audit Logs", url: "/audit-logs", icon: ScrollText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(215,60%,35%)] to-[hsl(220,50%,15%)] flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-sm">O</span>
        </div>
        <div>
          <span className="text-base font-bold text-foreground tracking-tight block leading-none">One Property</span>
          <span className="text-[10px] text-primary leading-none">Luxury Fractional Real Estate</span>
        </div>
      </div>

      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url || (item.url !== "/" && location.pathname.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? "bg-primary/15 text-primary font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
                      >
                        <item.icon className="w-[18px] h-[18px] shrink-0" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full">
          <LogOut className="w-[18px] h-[18px]" />
          <span>Sign Out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
