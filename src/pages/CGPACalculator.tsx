import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const gradePoints: Record<string, number> = {
  "A+": 10, "A": 9, "A-": 8.5, "B+": 8, "B": 7, "B-": 6.5, "C+": 6, "C": 5, "D": 4, "F": 0,
};

export default function CGPACalculator() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSubjects, setNewSubjects] = useState([{ name: "", credits: 3, grade: "A", semester: 1 }]);
  const [selectedSemester, setSelectedSemester] = useState(1);

  useEffect(() => {
    if (!user) return;
    supabase.from("semester_grades").select("*").eq("user_id", user.id).order("semester").order("subject_name")
      .then(({ data }) => { setGrades(data || []); setLoading(false); });
  }, [user]);

  const semesters = [...new Set(grades.map(g => g.semester))].sort();
  const semesterGPAs = semesters.map(sem => {
    const semGrades = grades.filter(g => g.semester === sem);
    const totalCredits = semGrades.reduce((a, g) => a + g.credits, 0);
    const totalPoints = semGrades.reduce((a, g) => a + g.credits * (gradePoints[g.grade] || 0), 0);
    return { sem: `Sem ${sem}`, gpa: totalCredits ? +(totalPoints / totalCredits).toFixed(2) : 0 };
  });

  const cumulativeCGPA = semesterGPAs.length
    ? +(semesterGPAs.reduce((a, s) => a + s.gpa, 0) / semesterGPAs.length).toFixed(2) : 0;

  const currentGPA = (() => {
    const valid = newSubjects.filter(s => s.name.trim());
    if (!valid.length) return 0;
    const totalCredits = valid.reduce((a, s) => a + s.credits, 0);
    const totalPoints = valid.reduce((a, s) => a + s.credits * (gradePoints[s.grade] || 0), 0);
    return totalCredits ? +(totalPoints / totalCredits).toFixed(2) : 0;
  })();

  const saveGrades = async () => {
    if (!user) return;
    const valid = newSubjects.filter(s => s.name.trim());
    if (!valid.length) { toast.error("Add at least one subject"); return; }
    const rows = valid.map(s => ({
      user_id: user.id, semester: selectedSemester, subject_name: s.name,
      credits: s.credits, grade: s.grade, gpa: gradePoints[s.grade] || 0,
    }));
    const { error } = await supabase.from("semester_grades").insert(rows);
    if (error) { toast.error(error.message); return; }
    // Also update profile CGPA
    const allGrades = [...grades, ...rows];
    const allSemesters = [...new Set(allGrades.map(g => g.semester))];
    const avgGPA = allSemesters.map(sem => {
      const sg = allGrades.filter(g => g.semester === sem);
      const tc = sg.reduce((a, g) => a + g.credits, 0);
      const tp = sg.reduce((a, g) => a + g.credits * (gradePoints[g.grade] || 0), 0);
      return tc ? tp / tc : 0;
    });
    const newCGPA = +(avgGPA.reduce((a, v) => a + v, 0) / avgGPA.length).toFixed(2);
    await supabase.from("profiles").update({ cgpa: newCGPA }).eq("user_id", user.id);
    setGrades([...grades, ...rows.map((r, i) => ({ ...r, id: `new-${i}` }))]);
    setNewSubjects([{ name: "", credits: 3, grade: "A", semester: selectedSemester }]);
    toast.success("Grades saved!");
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">CGPA Calculator</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-sm text-muted-foreground">Calculator GPA</p>
          <p className="text-3xl font-display font-bold text-accent mt-1">{currentGPA || "—"}</p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-sm text-muted-foreground">Cumulative CGPA</p>
          <p className="text-3xl font-display font-bold text-primary mt-1">{cumulativeCGPA || "—"}</p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-sm text-muted-foreground">Semesters</p>
          <p className="text-3xl font-display font-bold text-foreground mt-1">{semesters.length}</p>
        </div>
      </div>

      {/* Calculator */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-foreground text-lg">Add Grades</h2>
          <div className="flex gap-2 items-center">
            <label className="text-sm text-muted-foreground">Semester:</label>
            <select value={selectedSemester} onChange={(e) => setSelectedSemester(+e.target.value)}
              className="px-2 py-1 rounded-lg bg-muted border border-border text-sm text-foreground">
              {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-3">
          {newSubjects.map((s, i) => (
            <div key={i} className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <input className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Subject name" value={s.name} onChange={(e) => { const n = [...newSubjects]; n[i].name = e.target.value; setNewSubjects(n); }} />
              <select className="px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground" value={s.credits}
                onChange={(e) => { const n = [...newSubjects]; n[i].credits = +e.target.value; setNewSubjects(n); }}>
                {[1,2,3,4,5].map(c => <option key={c} value={c}>{c} cr</option>)}
              </select>
              <select className="px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground" value={s.grade}
                onChange={(e) => { const n = [...newSubjects]; n[i].grade = e.target.value; setNewSubjects(n); }}>
                {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <button onClick={() => setNewSubjects(newSubjects.filter((_, idx) => idx !== i))} className="p-2 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={() => setNewSubjects([...newSubjects, { name: "", credits: 3, grade: "A", semester: selectedSemester }])}
            className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Subject</button>
          <button onClick={saveGrades} className="ml-auto px-4 py-2 rounded-lg gradient-accent text-accent-foreground text-sm font-medium">Save Grades</button>
        </div>
      </div>

      {/* Trend Chart */}
      {semesterGPAs.length > 0 && (
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">CGPA Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={semesterGPAs}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="sem" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis domain={[0, 10]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
                <Line type="monotone" dataKey="gpa" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ fill: "hsl(var(--accent))", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Semester History */}
      {grades.length > 0 && (
        <div className="glass-card rounded-xl p-5 overflow-x-auto">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Semester History</h2>
          <table className="w-full text-sm">
            <thead><tr className="text-muted-foreground border-b border-border"><th className="py-2 text-left">Semester</th><th className="py-2">GPA</th><th className="py-2 text-left">Subjects</th></tr></thead>
            <tbody>
              {semesters.map(sem => {
                const semGrades = grades.filter(g => g.semester === sem);
                const gpa = semesterGPAs.find(s => s.sem === `Sem ${sem}`)?.gpa || 0;
                return (
                  <tr key={sem} className="border-b border-border/50">
                    <td className="py-3 font-medium text-foreground">Semester {sem}</td>
                    <td className="py-3 text-center font-bold text-accent">{gpa}</td>
                    <td className="py-3"><div className="flex flex-wrap gap-1.5">
                      {semGrades.map(g => <span key={g.id} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">{g.subject_name}: {g.grade}</span>)}
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
