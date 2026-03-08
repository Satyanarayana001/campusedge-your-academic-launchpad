import { studentProfile, todayTasks, upcomingDeadlines, attendanceData } from "@/lib/mockData";
import { BookOpen, Code, Mic, Building2, CheckCircle2, Circle, Clock, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const quickActions = [
  { label: "Study", icon: BookOpen, color: "bg-primary text-primary-foreground" },
  { label: "Practice DSA", icon: Code, color: "gradient-accent text-accent-foreground" },
  { label: "Mock Interview", icon: Mic, color: "bg-secondary text-secondary-foreground" },
  { label: "View Drives", icon: Building2, color: "bg-muted text-foreground" },
];

const priorityColors = {
  high: "text-destructive",
  medium: "text-warning",
  low: "text-success",
};

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
          Welcome back, {studentProfile.name.split(" ")[0]}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">Semester {studentProfile.semester} • {studentProfile.branch}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground font-medium">Current CGPA</p>
          <p className="text-3xl font-display font-bold text-foreground mt-1">{studentProfile.cgpa}</p>
          <Progress value={(studentProfile.cgpa / 10) * 100} className="mt-3 h-2" />
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground font-medium">Placement Readiness</p>
          <p className="text-3xl font-display font-bold text-accent mt-1">{studentProfile.placementReadiness}%</p>
          <Progress value={studentProfile.placementReadiness} className="mt-3 h-2 [&>div]:bg-accent" />
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground font-medium">DSA Problems</p>
          <p className="text-3xl font-display font-bold text-primary mt-1">227</p>
          <div className="flex gap-2 mt-3 text-xs text-muted-foreground">
            <span className="text-success">120 Easy</span>
            <span className="text-warning">85 Med</span>
            <span className="text-destructive">22 Hard</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <button key={action.label} className={`${action.color} rounded-xl p-4 flex flex-col items-center gap-2 transition-transform hover:scale-105 active:scale-95`}>
            <action.icon className="h-6 w-6" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Today's Tasks</h2>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3">
                {task.done ? (
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                ) : (
                  <Circle className={`h-5 w-5 ${priorityColors[task.priority]} shrink-0`} />
                )}
                <span className={`text-sm flex-1 ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {upcomingDeadlines.map((d) => (
              <div key={d.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Clock className="h-4 w-4 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.subject}</p>
                </div>
                <span className="text-xs font-medium text-accent shrink-0">{d.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">Attendance Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {attendanceData.map((s) => (
            <div key={s.subject} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              {s.percentage < 75 && <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.subject}</p>
                <Progress value={s.percentage} className={`mt-1 h-1.5 ${s.percentage < 75 ? "[&>div]:bg-destructive" : ""}`} />
              </div>
              <span className={`text-sm font-bold ${s.percentage < 75 ? "text-destructive" : "text-foreground"}`}>
                {s.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
