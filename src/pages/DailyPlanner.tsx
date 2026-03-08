import { useState, useEffect, useCallback } from "react";
import { weeklyTimetable, studyHoursData, attendanceData, todayTasks } from "@/lib/mockData";
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const priorityColors = { high: "text-destructive", medium: "text-warning", low: "text-success" };

export default function DailyPlanner() {
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

  const mins = Math.floor(pomodoroTime / 60);
  const secs = pomodoroTime % 60;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Daily Planner</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timetable */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5 overflow-x-auto">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Weekly Timetable</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground">
                <th className="py-2 px-3 text-left">Day</th>
                {["9 AM", "10 AM", "11 AM", "2 PM", "3 PM"].map((t) => <th key={t} className="py-2 px-3">{t}</th>)}
              </tr>
            </thead>
            <tbody>
              {weeklyTimetable.map((row) => (
                <tr key={row.day} className="border-t border-border/50">
                  <td className="py-2.5 px-3 font-medium text-foreground">{row.day}</td>
                  {row.slots.map((slot, i) => (
                    <td key={i} className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${slot === "—" ? "text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                        {slot}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pomodoro */}
        <div className="glass-card rounded-xl p-5 flex flex-col items-center">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">
            {isBreak ? "Break Time ☕" : "Focus Mode 🎯"}
          </h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Tasks</h2>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                {task.done ? <CheckCircle2 className="h-5 w-5 text-success shrink-0" /> : <Circle className={`h-5 w-5 ${priorityColors[task.priority]} shrink-0`} />}
                <span className={`text-sm flex-1 ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${task.priority === "high" ? "bg-destructive/10 text-destructive" : task.priority === "medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>{task.priority}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Attendance Tracker</h2>
          <div className="space-y-3">
            {attendanceData.map((s) => (
              <div key={s.subject} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground font-medium flex items-center gap-1.5">
                    {s.percentage < 75 && <AlertTriangle className="h-3.5 w-3.5 text-destructive" />}
                    {s.subject}
                  </span>
                  <span className={`font-bold ${s.percentage < 75 ? "text-destructive" : "text-foreground"}`}>{s.percentage}%</span>
                </div>
                <Progress value={s.percentage} className={`h-1.5 ${s.percentage < 75 ? "[&>div]:bg-destructive" : ""}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Hours Chart */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">Study Hours This Week</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studyHoursData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
