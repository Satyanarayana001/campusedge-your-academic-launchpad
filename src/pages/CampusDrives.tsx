import { useState } from "react";
import { campusDrives, studentProfile } from "@/lib/mockData";
import { Building2, Calendar, IndianRupee, GraduationCap, Filter } from "lucide-react";

type Status = "all" | "upcoming" | "applied" | "shortlisted" | "placed";

const statusStyles: Record<string, string> = {
  upcoming: "bg-info/10 text-info",
  applied: "bg-warning/10 text-warning",
  shortlisted: "bg-accent/10 text-accent",
  placed: "bg-success/10 text-success",
};

const statusLabels: Record<string, string> = {
  upcoming: "Upcoming",
  applied: "Applied",
  shortlisted: "Shortlisted",
  placed: "Placed ✅",
};

export default function CampusDrives() {
  const [filter, setFilter] = useState<Status>("all");
  const [cgpaInput, setCgpaInput] = useState("");

  const cgpaCheck = cgpaInput ? parseFloat(cgpaInput) : null;
  const filtered = campusDrives.filter((d) => {
    if (filter !== "all" && d.status !== filter) return false;
    if (cgpaCheck !== null && d.cgpaCutoff > cgpaCheck) return false;
    return true;
  });

  const filters: Status[] = ["all", "upcoming", "applied", "shortlisted", "placed"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Campus Drives</h1>

      {/* Placement Status Board */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["upcoming", "applied", "shortlisted", "placed"] as const).map((s) => {
          const count = campusDrives.filter((d) => d.status === s).length;
          return (
            <div key={s} className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">{count}</p>
              <p className={`text-xs font-medium mt-1 ${statusStyles[s].split(" ")[1]}`}>{statusLabels[s]}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === f ? "gradient-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {f === "all" ? "All" : statusLabels[f]}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <input
            type="number"
            step="0.1"
            placeholder={`Your CGPA (${studentProfile.cgpa})`}
            value={cgpaInput}
            onChange={(e) => setCgpaInput(e.target.value)}
            className="w-36 px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Drive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((drive) => (
          <div key={drive.id} className="glass-card rounded-xl p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                  {drive.company.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{drive.company}</h3>
                  <p className="text-xs text-muted-foreground">{drive.role}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[drive.status]}`}>
                {statusLabels[drive.status]}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <IndianRupee className="h-3.5 w-3.5" /> <span className="text-foreground font-medium">{drive.ctc}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> <span>{drive.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5" /> <span>Min CGPA: {drive.cgpaCutoff}</span>
                {studentProfile.cgpa >= drive.cgpaCutoff ? (
                  <span className="text-xs text-success font-medium ml-auto">Eligible ✓</span>
                ) : (
                  <span className="text-xs text-destructive font-medium ml-auto">Not Eligible</span>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No drives match your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
