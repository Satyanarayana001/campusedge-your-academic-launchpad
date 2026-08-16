import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";
import { aptitudeQuestions, hrQuestions } from "@/lib/mockData";
import { ChevronDown, ChevronUp, CheckSquare, Square, Clock, Trophy, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PlacementPrep() {
  const { user } = useAuth();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [expandedHR, setExpandedHR] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<any[]>([]);
  const [mockInterviews, setMockInterviews] = useState<any[]>([]);
  const [quizScores, setQuizScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    const [checkRes, intRes, scoresRes] = await Promise.all([
      supabase.from("resume_checklist").select("*").eq("user_id", user.id).order("created_at"),
      supabase.from("mock_interviews").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("quiz_scores").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
    ]);
    let items = checkRes.data || [];
    // Initialize default checklist if empty
    if (items.length === 0) {
      const defaults = [
        "Contact info at the top (Name, Email, Phone, LinkedIn, GitHub)",
        "Professional summary in 2-3 lines",
        "Education section with CGPA",
        "Skills section with categorized technical skills",
        "Projects with tech stack and impact metrics",
        "Work experience / internships",
        "Certifications with verification links",
        "ATS-friendly format (no tables, images, or headers)",
        "Consistent formatting and font usage",
        "Single page with proper margins",
      ];
      const rows = defaults.map(text => ({ user_id: user.id, item_text: text, checked: false }));
      const { data } = await supabase.from("resume_checklist").insert(rows).select();
      items = data || [];
    }
    setChecklist(items);
    setMockInterviews(intRes.data || []);
    setQuizScores(scoresRes.data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  useRealtimeSync("prep", ["resume_checklist", "mock_interviews", "quiz_scores"], load, !!user);


  const handleAnswer = (idx: number) => {
    setSelected(idx);
    const newScore = idx === aptitudeQuestions[currentQ].answer ? score + 1 : score;
    if (idx === aptitudeQuestions[currentQ].answer) setScore(newScore);
    setTimeout(() => {
      if (currentQ + 1 < aptitudeQuestions.length) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setQuizDone(true);
        // Save score
        if (user) {
          supabase.from("quiz_scores").insert({ user_id: user.id, score: newScore, total: aptitudeQuestions.length });
          // Award XP
          supabase.from("profiles").select("xp").eq("user_id", user.id).single().then(({ data }) => {
            if (data) supabase.from("profiles").update({ xp: (data.xp || 0) + newScore * 10 }).eq("user_id", user.id);
          });
        }
      }
    }, 800);
  };

  const resetQuiz = () => { setQuizStarted(false); setCurrentQ(0); setSelected(null); setScore(0); setQuizDone(false); };

  const toggleChecklist = async (id: string, checked: boolean) => {
    await supabase.from("resume_checklist").update({ checked: !checked }).eq("id", id);
    setChecklist(checklist.map(c => c.id === id ? { ...c, checked: !checked } : c));
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Placement Prep</h1>

      {/* Aptitude Quiz */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">Aptitude Quiz</h2>
        {!quizStarted ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-2">10 MCQ Questions • Timed Challenge</p>
            {quizScores.length > 0 && <p className="text-sm text-muted-foreground mb-4">Best: {Math.max(...quizScores.map(s => s.score))}/{aptitudeQuestions.length}</p>}
            <button onClick={() => setQuizStarted(true)} className="px-6 py-3 rounded-xl gradient-accent text-accent-foreground font-medium transition-transform hover:scale-105">Start Quiz</button>
          </div>
        ) : quizDone ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-accent mx-auto mb-3" />
            <p className="text-2xl font-display font-bold text-foreground">{score}/{aptitudeQuestions.length}</p>
            <p className="text-muted-foreground mt-1">Quiz Complete! +{score * 10} XP earned</p>
            <button onClick={resetQuiz} className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm">Retry</button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">Q{currentQ + 1} of {aptitudeQuestions.length}</span>
              <span className="text-sm font-medium text-accent">Score: {score}</span>
            </div>
            <p className="text-foreground font-medium mb-4">{aptitudeQuestions[currentQ].question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aptitudeQuestions[currentQ].options.map((opt, i) => {
                const isCorrect = i === aptitudeQuestions[currentQ].answer;
                const isSelected = selected === i;
                return (
                  <button key={i} onClick={() => selected === null && handleAnswer(i)} disabled={selected !== null}
                    className={`p-3 rounded-lg text-sm text-left font-medium border transition-all ${
                      selected !== null
                        ? isCorrect ? "bg-success/10 border-success text-success" : isSelected ? "bg-destructive/10 border-destructive text-destructive" : "bg-muted border-border text-muted-foreground"
                        : "bg-muted border-border text-foreground hover:border-primary hover:bg-primary/5"
                    }`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HR Questions */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">HR Questions</h2>
          <div className="space-y-2">
            {hrQuestions.map((q, i) => (
              <div key={i} className="border border-border rounded-lg overflow-hidden">
                <button onClick={() => setExpandedHR(expandedHR === i ? null : i)}
                  className="w-full flex items-center justify-between p-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
                  {q.question}
                  {expandedHR === i ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>
                {expandedHR === i && <div className="px-3 pb-3 text-sm text-muted-foreground leading-relaxed">{q.answer}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Resume Checklist */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Resume Checklist (ATS Tips)</h2>
          <div className="space-y-2">
            {checklist.map((item) => (
              <button key={item.id} onClick={() => toggleChecklist(item.id, item.checked)}
                className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors text-left">
                {item.checked ? <CheckSquare className="h-5 w-5 text-success shrink-0 mt-0.5" /> : <Square className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />}
                <span className={`text-sm ${item.checked ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.item_text}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">{checklist.filter(c => c.checked).length}/{checklist.length} completed</p>
          </div>
        </div>
      </div>

      {/* Mock Interviews */}
      {mockInterviews.length > 0 && (
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Mock Interview Log</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-muted-foreground border-b border-border"><th className="py-2 text-left">Date</th><th className="py-2 text-left">Company</th><th className="py-2 text-left">Feedback</th><th className="py-2">Result</th></tr></thead>
              <tbody>
                {mockInterviews.map((m) => (
                  <tr key={m.id} className="border-b border-border/50">
                    <td className="py-3 text-foreground flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-muted-foreground" />{m.date}</td>
                    <td className="py-3 font-medium text-foreground">{m.company}</td>
                    <td className="py-3 text-muted-foreground">{m.feedback}</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${m.result === "Passed" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{m.result}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
