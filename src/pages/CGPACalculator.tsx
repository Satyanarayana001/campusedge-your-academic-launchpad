import { useState } from "react";
import { semesterGrades } from "@/lib/mockData";
import { Plus, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const gradePoints: Record<string, number> = {
  "A+": 10, "A": 9, "A-": 8.5, "B+": 8, "B": 7, "B-": 6.5, "C+": 6, "C": 5, "D": 4, "F": 0,
};

export default function CGPACalculator() {
  const [subjects, setSubjects] = useState([
    { name: "", credits: 3, grade: "A" },
  ]);

  const addSubject = () => setSubjects([...subjects, { name: "", credits: 3, grade: "A" }]);
  const removeSubject = (i: number) => setSubjects(subjects.filter((_, idx) => idx !== i));

  const semesterGPA = (() => {
    const valid = subjects.filter((s) => s.name.trim());
    if (!valid.length) return 0;
    const totalCredits = valid.reduce((a, s) => a + s.credits, 0);
    const totalPoints = valid.reduce((a, s) => a + s.credits * (gradePoints[s.grade] || 0), 0);
    return totalCredits ? +(totalPoints / totalCredits).toFixed(2) : 0;
  })();

  const cgpaData = semesterGrades.map((s) => ({ sem: `Sem ${s.semester}`, gpa: s.gpa }));

  const cumulativeCGPA = (() => {
    const total = semesterGrades.reduce((a, s) => a + s.gpa, 0);
    return +(total / semesterGrades.length).toFixed(2);
  })();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">CGPA Calculator</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-sm text-muted-foreground">Current Semester GPA</p>
          <p className="text-3xl font-display font-bold text-accent mt-1">{semesterGPA || "—"}</p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-sm text-muted-foreground">Cumulative CGPA</p>
          <p className="text-3xl font-display font-bold text-primary mt-1">{cumulativeCGPA}</p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-sm text-muted-foreground">Semesters Completed</p>
          <p className="text-3xl font-display font-bold text-foreground mt-1">{semesterGrades.length}</p>
        </div>
      </div>

      {/* Calculator */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-foreground text-lg">Calculate GPA</h2>
          <button onClick={addSubject} className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
            <Plus className="h-4 w-4" /> Add Subject
          </button>
        </div>
        <div className="space-y-3">
          {subjects.map((s, i) => (
            <div key={i} className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <input
                className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Subject name"
                value={s.name}
                onChange={(e) => { const n = [...subjects]; n[i].name = e.target.value; setSubjects(n); }}
              />
              <select
                className="px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={s.credits}
                onChange={(e) => { const n = [...subjects]; n[i].credits = +e.target.value; setSubjects(n); }}
              >
                {[1, 2, 3, 4, 5].map((c) => <option key={c} value={c}>{c} cr</option>)}
              </select>
              <select
                className="px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={s.grade}
                onChange={(e) => { const n = [...subjects]; n[i].grade = e.target.value; setSubjects(n); }}
              >
                {Object.keys(gradePoints).map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              <button onClick={() => removeSubject(i)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Chart */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">CGPA Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cgpaData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="sem" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis domain={[6, 10]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
              <Line type="monotone" dataKey="gpa" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ fill: "hsl(var(--accent))", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Semester History */}
      <div className="glass-card rounded-xl p-5 overflow-x-auto">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">Semester History</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="py-2 text-left">Semester</th>
              <th className="py-2">GPA</th>
              <th className="py-2 text-left">Subjects</th>
            </tr>
          </thead>
          <tbody>
            {semesterGrades.map((sem) => (
              <tr key={sem.semester} className="border-b border-border/50">
                <td className="py-3 font-medium text-foreground">Semester {sem.semester}</td>
                <td className="py-3 text-center font-bold text-accent">{sem.gpa}</td>
                <td className="py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {sem.subjects.map((sub) => (
                      <span key={sub.name} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
                        {sub.name}: {sub.grade}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
