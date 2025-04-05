
import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  BarChart4,
  ClipboardList,
  FileClock,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Settings,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: location.pathname === "/dashboard",
    },
    {
      name: "Application Queue",
      href: "/applications",
      icon: ClipboardList,
      current: location.pathname === "/applications",
    },
    {
      name: "Processing",
      href: "/processing",
      icon: FileClock,
      current: location.pathname === "/processing",
    },
    {
      name: "Communication",
      href: "/communication",
      icon: MessageSquare,
      current: location.pathname === "/communication",
    },
    {
      name: "User Management",
      href: "/users",
      icon: Users,
      current: location.pathname === "/users",
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart4,
      current: location.pathname === "/reports",
    },
  ];

  return (
    <div className="min-h-screen bg-visa-blue-50">
      {/* Mobile sidebar toggle */}
      <div className="bg-visa-blue-800 lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center p-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="ml-3 text-white font-semibold">VisaFlow Control</h1>
      </div>

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-visa-blue-800 text-white z-50 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 h-16">
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold">VisaFlow Control</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 mb-6">
            <Avatar>
              <AvatarFallback className="bg-visa-gold-500 text-black">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-visa-blue-100">{user?.role}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium group",
                  item.current
                    ? "bg-visa-blue-700 text-white"
                    : "text-visa-blue-100 hover:bg-visa-blue-700 hover:text-white"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5",
                    item.current
                      ? "text-white"
                      : "text-visa-blue-300 group-hover:text-white"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-visa-blue-100 hover:bg-visa-blue-700 hover:text-white"
            onClick={() => navigate("/settings")}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-visa-blue-100 hover:bg-visa-blue-700 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div
        className={cn(
          "flex flex-col min-h-screen",
          sidebarOpen ? "lg:pl-64" : "",
          "pt-16 lg:pt-0"
        )}
      >
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
