import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Github, Award, Plus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function SkillTracker() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<any[]>([]);
  const [dsaProgress, setDsaProgress] = useState<any>(null);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(50);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [skillsRes, dsaRes, certsRes, projRes] = await Promise.all([
        supabase.from("skills").select("*").eq("user_id", user.id).order("level", { ascending: false }),
        supabase.from("dsa_progress").select("*").eq("user_id", user.id).single(),
        supabase.from("certifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("projects").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      setSkills(skillsRes.data || []);
      setDsaProgress(dsaRes.data);
      setCertifications(certsRes.data || []);
      setProjects(projRes.data || []);
      setLoading(false);
    };
    load();
  }, [user]);

  const addSkill = async () => {
    if (!newSkill.trim() || !user) return;
    const { data, error } = await supabase.from("skills").insert({ user_id: user.id, name: newSkill.trim(), level: newSkillLevel }).select().single();
    if (error) { toast.error(error.message); return; }
    setSkills([...skills, data].sort((a, b) => b.level - a.level));
    setNewSkill("");
    toast.success("Skill added!");
  };

  const updateDSA = async (field: "easy" | "medium" | "hard", delta: number) => {
    if (!user) return;
    if (!dsaProgress) {
      const { data } = await supabase.from("dsa_progress").insert({ user_id: user.id, [field]: Math.max(0, delta) }).select().single();
      setDsaProgress(data);
      return;
    }
    const newVal = Math.max(0, (dsaProgress[field] || 0) + delta);
    await supabase.from("dsa_progress").update({ [field]: newVal }).eq("user_id", user.id);
    setDsaProgress({ ...dsaProgress, [field]: newVal });
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const totalDsa = dsaProgress ? (dsaProgress.easy || 0) + (dsaProgress.medium || 0) + (dsaProgress.hard || 0) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Skill Tracker</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Technical Skills</h2>
          <div className="flex gap-2 mb-4">
            <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="Add skill..." className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="number" min={0} max={100} value={newSkillLevel} onChange={(e) => setNewSkillLevel(+e.target.value)}
              className="w-16 px-2 py-2 rounded-lg bg-muted border border-border text-sm text-foreground text-center" />
            <button onClick={addSkill} className="p-2 rounded-lg gradient-accent text-accent-foreground"><Plus className="h-4 w-4" /></button>
          </div>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
            {skills.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Add your first skill above</p>}
          </div>
        </div>

        {/* DSA Progress */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">DSA Progress</h2>
          <div className="text-center mb-4">
            <p className="text-4xl font-display font-bold text-foreground">{totalDsa}</p>
            <p className="text-sm text-muted-foreground">Problems Solved</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(["easy", "medium", "hard"] as const).map((diff) => {
              const colors = { easy: "text-success bg-success/10", medium: "text-warning bg-warning/10", hard: "text-destructive bg-destructive/10" };
              return (
                <div key={diff} className={`text-center p-3 rounded-lg ${colors[diff].split(" ")[1]}`}>
                  <p className={`text-2xl font-bold ${colors[diff].split(" ")[0]}`}>{dsaProgress?.[diff] || 0}</p>
                  <p className="text-xs text-muted-foreground capitalize">{diff}</p>
                  <div className="flex justify-center gap-1 mt-2">
                    <button onClick={() => updateDSA(diff, -1)} className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">−</button>
                    <button onClick={() => updateDSA(diff, 1)} className="px-2 py-0.5 rounded bg-muted text-xs text-foreground font-medium">+</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Award className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.platform} • {cert.date}</p>
              </div>
            </div>
          ))}
          {certifications.length === 0 && <p className="text-sm text-muted-foreground text-center py-4 col-span-2">No certifications yet</p>}
        </div>
      </div>

      {/* Projects */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">Project Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {projects.map((proj) => (
            <div key={proj.id} className="p-4 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
              <h3 className="font-display font-semibold text-foreground">{proj.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {(proj.tech || []).map((t: string) => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-sm text-muted-foreground text-center py-4 col-span-3">No projects yet</p>}
        </div>
      </div>
    </div>
  );
}
