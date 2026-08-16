import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Code, Mic, Building2, CheckCircle2, Circle, Clock, AlertTriangle, Plus, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const quickActions = [
  { label: "Study", icon: BookOpen, color: "bg-primary text-primary-foreground", link: "/planner" },
  { label: "Practice DSA", icon: Code, color: "gradient-accent text-accent-foreground", link: "/skills" },
  { label: "Mock Interview", icon: Mic, color: "bg-secondary text-secondary-foreground", link: "/prep" },
  { label: "View Drives", icon: Building2, color: "bg-muted text-foreground", link: "/drives" },
];

const priorityColors = {
  high: "text-destructive",
  medium: "text-warning",
  low: "text-success",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [dsaProgress, setDsaProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [profileRes, tasksRes, attendanceRes, dsaRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("tasks").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
        supabase.from("attendance").select("*").eq("user_id", user.id),
        supabase.from("dsa_progress").select("*").eq("user_id", user.id).single(),
      ]);
      setProfile(profileRes.data);
      setTasks(tasksRes.data || []);
      setAttendance(attendanceRes.data || []);
      setDsaProgress(dsaRes.data);
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel("dashboard-tasks-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks", filter: `user_id=eq.${user.id}` }, (payload) => {
        if (payload.eventType === "DELETE") {
          setTasks((prev) => prev.filter((t) => t.id !== (payload.old as any).id));
          return;
        }
        const row: any = payload.new;
        setTasks((prev) => {
          const exists = prev.some((t) => t.id === row.id);
          if (exists) return prev.map((t) => (t.id === row.id ? { ...t, ...row } : t));
          return [row, ...prev];
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);


  const addTask = async () => {
    if (!newTask.trim() || !user) return;
    const { data, error } = await supabase.from("tasks").insert({ user_id: user.id, title: newTask.trim(), priority: "medium" }).select().single();
    if (error) { toast.error("Failed to add task"); return; }
    setTasks([data, ...tasks]);
    setNewTask("");
    toast.success("Task added!");
  };

  const toggleTask = async (id: string, done: boolean) => {
    await supabase.from("tasks").update({ done: !done }).eq("id", id);
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !done } : t));
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const cgpa = profile?.cgpa ?? 0;
  const totalDsa = dsaProgress ? dsaProgress.easy + dsaProgress.medium + dsaProgress.hard : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
          Welcome back, {profile?.full_name?.split(" ")[0] || "Student"}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">Semester {profile?.semester || 1} • {profile?.branch || "B.Tech"}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground font-medium">Current CGPA</p>
          <p className="text-3xl font-display font-bold text-foreground mt-1">{Number(cgpa).toFixed(2)}</p>
          <Progress value={(Number(cgpa) / 10) * 100} className="mt-3 h-2" />
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground font-medium">Tasks Completed</p>
          <p className="text-3xl font-display font-bold text-accent mt-1">{tasks.filter(t => t.done).length}/{tasks.length}</p>
          <Progress value={tasks.length ? (tasks.filter(t => t.done).length / tasks.length) * 100 : 0} className="mt-3 h-2 [&>div]:bg-accent" />
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground font-medium">DSA Problems</p>
          <p className="text-3xl font-display font-bold text-primary mt-1">{totalDsa}</p>
          {dsaProgress && (
            <div className="flex gap-2 mt-3 text-xs text-muted-foreground">
              <span className="text-success">{dsaProgress.easy} Easy</span>
              <span className="text-warning">{dsaProgress.medium} Med</span>
              <span className="text-destructive">{dsaProgress.hard} Hard</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <a key={action.label} href={action.link} className={`${action.color} rounded-xl p-4 flex flex-col items-center gap-2 transition-transform hover:scale-105 active:scale-95`}>
            <action.icon className="h-6 w-6" />
            <span className="text-sm font-medium">{action.label}</span>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Your Tasks</h2>
          <div className="flex gap-2 mb-4">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task..."
              className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button onClick={addTask} className="p-2 rounded-lg gradient-accent text-accent-foreground"><Plus className="h-4 w-4" /></button>
          </div>
          <div className="space-y-3">
            {tasks.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No tasks yet. Add one above!</p>}
            {tasks.map((task) => (
              <button key={task.id} onClick={() => toggleTask(task.id, task.done)} className="flex items-center gap-3 w-full text-left">
                {task.done ? (
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                ) : (
                  <Circle className={`h-5 w-5 ${priorityColors[task.priority as keyof typeof priorityColors] || "text-muted-foreground"} shrink-0`} />
                )}
                <span className={`text-sm flex-1 ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {task.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Attendance */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Attendance Summary</h2>
          {attendance.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No attendance data yet. Add subjects in Daily Planner.</p>
          ) : (
            <div className="space-y-3">
              {attendance.map((s) => {
                const pct = s.total > 0 ? Math.round((s.attended / s.total) * 100) : 0;
                return (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    {pct < 75 && <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{s.subject}</p>
                      <Progress value={pct} className={`mt-1 h-1.5 ${pct < 75 ? "[&>div]:bg-destructive" : ""}`} />
                    </div>
                    <span className={`text-sm font-bold ${pct < 75 ? "text-destructive" : "text-foreground"}`}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
