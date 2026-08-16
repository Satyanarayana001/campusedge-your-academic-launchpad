import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, CalendarDays, Calculator, Target, BriefcaseBusiness,
  Building2, Users, ChevronLeft, ChevronRight, Moon, Sun, Flame, Star, Medal, LogOut,
  BookOpen, UserCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Daily Planner", url: "/planner", icon: CalendarDays },
  { title: "CGPA Calculator", url: "/cgpa", icon: Calculator },
  { title: "Skill Tracker", url: "/skills", icon: Target },
  { title: "Placement Prep", url: "/prep", icon: BriefcaseBusiness },
  { title: "Campus Drives", url: "/drives", icon: Building2 },
  { title: "Resources", url: "/resources", icon: BookOpen },
  { title: "Community", url: "/community", icon: Users },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation();
  const { signOut, user } = useAuth();

  const loadProfile = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
    setProfile(data);
  }, [user]);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  useRealtimeSync("layout-profile", ["profiles"], loadProfile, !!user);


  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const streak = profile?.streak ?? 0;
  const xp = profile?.xp ?? 0;
  const badges = profile?.badges ?? 0;

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-16" : "w-60"} fixed top-0 left-0 h-full z-30 flex flex-col transition-all duration-300 bg-sidebar border-r border-sidebar-border lg:relative`}
      >
        <div className={`flex items-center gap-2 p-4 ${collapsed ? "justify-center" : ""}`}>
          <div className="h-8 w-8 rounded-lg gradient-accent flex items-center justify-center font-display font-bold text-accent-foreground text-sm shrink-0">
            CE
          </div>
          {!collapsed && <span className="font-display font-bold text-lg text-sidebar-foreground">CampusEdge</span>}
        </div>

        <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.url;
            return (
              <Link
                key={item.url}
                to={item.url}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-sidebar-border space-y-1">
          <Link to="/profile" className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors ${collapsed ? "justify-center" : ""}`}>
            <UserCircle className="h-4 w-4" />
            {!collapsed && <span>Edit Profile</span>}
          </Link>
          <button onClick={signOut} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors ${collapsed ? "justify-center" : ""}`}>
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign Out</span>}
          </button>
          <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center p-2 rounded-lg text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen ml-16 lg:ml-0`}>
        {/* Gamification Strip */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Flame className="h-4 w-4 text-accent" />
                <span className="text-foreground">{streak}</span>
                <span className="text-muted-foreground hidden sm:inline">Streak</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Star className="h-4 w-4 text-warning" />
                <span className="text-foreground">{xp.toLocaleString()}</span>
                <span className="text-muted-foreground hidden sm:inline">XP</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Medal className="h-4 w-4 text-primary" />
                <span className="text-foreground">{badges}</span>
                <span className="text-muted-foreground hidden sm:inline">Badges</span>
              </div>
            </div>
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
