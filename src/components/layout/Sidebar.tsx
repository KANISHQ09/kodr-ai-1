import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Code2, 
  LayoutDashboard, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  BookOpen,
  Folder,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Playground", href: "/playground", icon: Code2 },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "Quiz", href: "/quiz", icon: Zap },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const collapseTimeoutRef = useRef<number | null>(null);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, []);

  const scheduleCollapse = (delay = 2000) => {
    // clear existing timer
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
    }
    collapseTimeoutRef.current = window.setTimeout(() => {
      setCollapsed(true);
      collapseTimeoutRef.current = null;
    }, delay);
  };

  const handleLogout = () => {
    navigate("/"); // changed to root
  };

  return (
    <div className={cn(
      "flex flex-col bg-card border-r border-border transition-all duration-300 h-screen",
      collapsed ? "w-16" : "w-full sm:w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
      {!collapsed && (
        <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Kodr
        </span>
        </div>
      )}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 rounded-lg hover:bg-muted transition-colors"
      >
        {collapsed ? (
        <ChevronRight className="w-4 h-4" />
        ) : (
        <ChevronLeft className="w-4 h-4" />
        )}
      </button>
      </div>

      {/* Navigation - fixed within sidebar */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto sticky top-0">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
        <NavLink
          key={item.name}
          to={item.href}
          onClick={() => scheduleCollapse(1000)} // collapse automatically after 1s
          className={cn(
          "nav-item group flex items-center gap-3 p-2 rounded-lg transition-colors",
          isActive && "bg-primary/10 text-primary",
          collapsed && "justify-center px-2"
          )}
        >
          <item.icon className={cn(
          "w-5 h-5 transition-colors",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )} />
          {!collapsed && (
          <span className={cn(
            "font-medium transition-colors",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )}>
            {item.name}
          </span>
          )}
        </NavLink>
        );
      })}
      </nav>

      {/* Footer - Logout */}
      <div className="p-4 border-t border-border">
      <div className={cn(
        "flex items-center space-x-3 p-3 rounded-lg bg-muted/50",
        collapsed && "justify-center"
      )}>
        <button
          onClick={handleLogout}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors",
            collapsed ? "p-0" : ""
          )}
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5 text-foreground" />
        </button>
        {!collapsed && (
        <div className="flex-1 min-w-0">
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-foreground text-left w-full"
          >
            Logout
          </button>
        </div>
        )}
      </div>
      </div>
    </div>
  );
}
