import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle2, Circle, Plus, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const priorityColors = { high: "text-destructive", medium: "text-warning", low: "text-success" };

export default function DailyPlanner() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [studyHours, setStudyHours] = useState<any[]>([]);
  const [timetable, setTimetable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [newSubject, setNewSubject] = useState("");

  // Pomodoro
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setPomodoroTime(isBreak ? 5 * 60 : 25 * 60);
  }, [isBreak]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setPomodoroTime((t) => {
        if (t <= 0) {
          setIsBreak(!isBreak);
          setIsRunning(false);
          return isBreak ? 25 * 60 : 5 * 60;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

  const load = useCallback(async () => {
    if (!user) return;
    const [tasksRes, attRes, hoursRes, ttRes] = await Promise.all([
      supabase.from("tasks").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("attendance").select("*").eq("user_id", user.id),
      supabase.from("study_hours").select("*").eq("user_id", user.id).order("date", { ascending: true }).limit(7),
      supabase.from("timetable").select("*").eq("user_id", user.id).order("day").order("slot_index"),
    ]);
    setTasks(tasksRes.data || []);
    setAttendance(attRes.data || []);
    setStudyHours(hoursRes.data || []);
    setTimetable(ttRes.data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  useRealtimeSync("planner", ["tasks", "attendance", "study_hours", "timetable"], load, !!user);


  const addTask = async () => {
    if (!newTask.trim() || !user) return;
    const { data, error } = await supabase.from("tasks").insert({
      user_id: user.id, title: newTask.trim(), priority: newPriority as any,
    }).select().single();
    if (error) { toast.error("Failed to add task"); return; }
    setTasks([data, ...tasks]);
    setNewTask("");
    toast.success("Task added!");
  };

  const toggleTask = async (id: string, done: boolean) => {
    await supabase.from("tasks").update({ done: !done }).eq("id", id);
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !done } : t));
  };

  const addAttendance = async () => {
    if (!newSubject.trim() || !user) return;
    const { data, error } = await supabase.from("attendance").insert({
      user_id: user.id, subject: newSubject.trim(), attended: 0, total: 0,
    }).select().single();
    if (error) { toast.error(error.message); return; }
    setAttendance([...attendance, data]);
    setNewSubject("");
    toast.success("Subject added!");
  };

  const updateAttendance = async (id: string, field: "attended" | "total", delta: number) => {
    const item = attendance.find(a => a.id === id);
    if (!item) return;
    const newVal = Math.max(0, (item[field] || 0) + delta);
    const updates = { [field]: newVal };
    if (field === "attended" && newVal > item.total) updates.total = newVal;
    await supabase.from("attendance").update(updates).eq("id", id);
    setAttendance(attendance.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const mins = Math.floor(pomodoroTime / 60);
  const secs = pomodoroTime % 60;

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const chartData = studyHours.map(h => ({ day: new Date(h.date).toLocaleDateString("en", { weekday: "short" }), hours: Number(h.hours) }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Daily Planner</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Tasks</h2>
          <div className="flex gap-2 mb-4">
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add task..." className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}
              className="px-2 py-2 rounded-lg bg-muted border border-border text-sm text-foreground">
              <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
            </select>
            <button onClick={addTask} className="p-2 rounded-lg gradient-accent text-accent-foreground"><Plus className="h-4 w-4" /></button>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {tasks.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No tasks yet</p>}
            {tasks.map((task) => (
              <button key={task.id} onClick={() => toggleTask(task.id, task.done)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors w-full text-left">
                {task.done ? <CheckCircle2 className="h-5 w-5 text-success shrink-0" /> : <Circle className={`h-5 w-5 ${priorityColors[task.priority as keyof typeof priorityColors] || "text-muted-foreground"} shrink-0`} />}
                <span className={`text-sm flex-1 ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${task.priority === "high" ? "bg-destructive/10 text-destructive" : task.priority === "medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>{task.priority}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pomodoro */}
        <div className="glass-card rounded-xl p-5 flex flex-col items-center">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">{isBreak ? "Break Time ☕" : "Focus Mode 🎯"}</h2>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="absolute inset-0" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" className="stroke-muted" strokeWidth="6" />
              <circle cx="80" cy="80" r="70" fill="none" className={isBreak ? "stroke-success" : "stroke-accent"} strokeWidth="6" strokeDasharray={440} strokeDashoffset={440 - (440 * pomodoroTime) / (isBreak ? 300 : 1500)} strokeLinecap="round" transform="rotate(-90 80 80)" style={{ transition: "stroke-dashoffset 1s linear" }} />
            </svg>
            <span className="text-3xl font-display font-bold text-foreground">
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </span>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => setIsRunning(!isRunning)} className="p-3 rounded-full gradient-accent text-accent-foreground transition-transform hover:scale-105">
              {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={resetTimer} className="p-3 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Attendance */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">Attendance Tracker</h2>
        <div className="flex gap-2 mb-4">
          <input value={newSubject} onChange={(e) => setNewSubject(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addAttendance()}
            placeholder="Add subject..." className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          <button onClick={addAttendance} className="p-2 rounded-lg gradient-accent text-accent-foreground"><Plus className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          {attendance.map((s) => {
            const pct = s.total > 0 ? Math.round((s.attended / s.total) * 100) : 0;
            return (
              <div key={s.id} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground font-medium flex items-center gap-1.5">
                    {pct < 75 && s.total > 0 && <AlertTriangle className="h-3.5 w-3.5 text-destructive" />}
                    {s.subject}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateAttendance(s.id, "attended", 1)} className="px-2 py-0.5 rounded bg-success/10 text-success text-xs font-medium">+Present</button>
                    <button onClick={() => updateAttendance(s.id, "total", 1)} className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-medium">+Class</button>
                    <span className={`font-bold ${pct < 75 && s.total > 0 ? "text-destructive" : "text-foreground"}`}>{s.total > 0 ? `${pct}%` : "—"}</span>
                  </div>
                </div>
                <Progress value={pct} className={`h-1.5 ${pct < 75 && s.total > 0 ? "[&>div]:bg-destructive" : ""}`} />
                <p className="text-xs text-muted-foreground">{s.attended}/{s.total} classes</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Study Hours Chart */}
      {chartData.length > 0 && (
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Study Hours This Week</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
