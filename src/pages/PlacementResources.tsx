import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search, ExternalLink, Bookmark, BookmarkCheck, CheckCircle2, Circle,
  Loader2, Building2, Map, CalendarDays, Smartphone, GraduationCap,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import AdSlot from "@/components/AdSlot";
import { AD_SLOTS } from "@/lib/ads";

import {
  resources, companyGuides, roadmaps, studyPlans, mustHaveApps, allCategories,
} from "@/lib/placementResources";

export default function PlacementResources() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [completions, setCompletions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  const load = useCallback(async () => {
    if (!user) return;
    const [bRes, cRes, pRes] = await Promise.all([
      supabase.from("resource_bookmarks").select("resource_id").eq("user_id", user.id),
      supabase.from("resource_completions").select("resource_id").eq("user_id", user.id),
      supabase.from("profiles").select("branch, semester, xp").eq("user_id", user.id).maybeSingle(),
    ]);
    setBookmarks(new Set((bRes.data || []).map((b: any) => b.resource_id)));
    setCompletions(new Set((cRes.data || []).map((c: any) => c.resource_id)));
    setProfile(pRes.data);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  useRealtimeSync("resources", ["resource_bookmarks", "resource_completions", "profiles"], load, !!user);


  const toggleBookmark = async (resourceId: string) => {
    if (!user) return;
    if (bookmarks.has(resourceId)) {
      await supabase.from("resource_bookmarks").delete().eq("user_id", user.id).eq("resource_id", resourceId);
      setBookmarks(prev => { const n = new Set(prev); n.delete(resourceId); return n; });
    } else {
      await supabase.from("resource_bookmarks").insert({ user_id: user.id, resource_id: resourceId });
      setBookmarks(prev => new Set(prev).add(resourceId));
      toast.success("Bookmarked!");
    }
  };

  const toggleCompletion = async (resourceId: string) => {
    if (!user) return;
    if (completions.has(resourceId)) {
      await supabase.from("resource_completions").delete().eq("user_id", user.id).eq("resource_id", resourceId);
      setCompletions(prev => { const n = new Set(prev); n.delete(resourceId); return n; });
      // Remove XP
      if (profile) {
        const newXp = Math.max(0, (profile.xp || 0) - 10);
        await supabase.from("profiles").update({ xp: newXp }).eq("user_id", user.id);
        setProfile({ ...profile, xp: newXp });
      }
    } else {
      await supabase.from("resource_completions").insert({ user_id: user.id, resource_id: resourceId });
      setCompletions(prev => new Set(prev).add(resourceId));
      // Add XP
      if (profile) {
        const newXp = (profile.xp || 0) + 10;
        await supabase.from("profiles").update({ xp: newXp }).eq("user_id", user.id);
        setProfile({ ...profile, xp: newXp });
      }
      toast.success("+10 XP! Resource completed 🎉");
    }
  };

  const filteredResources = useMemo(() => {
    let list = resources;
    if (activeTab === "My Bookmarks") {
      list = list.filter(r => bookmarks.has(r.id));
    } else if (activeTab !== "All" && activeTab !== "Roadmaps") {
      list = list.filter(r => r.category === activeTab);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.platform.toLowerCase().includes(q));
    }
    return list;
  }, [activeTab, search, bookmarks]);

  const completedCount = completions.size;
  const totalCount = resources.length;

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const tabs = [...allCategories, "My Bookmarks"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">📚 Placement Resources</h1>
          <p className="text-muted-foreground text-sm mt-1">Everything you need to crack your dream placement</p>
        </div>
        <div className="glass-card rounded-xl px-4 py-3 text-sm text-foreground flex items-center gap-3">
          <span>📚 {completedCount}/{totalCount} completed</span>
          <Progress value={(completedCount / totalCount) * 100} className="w-24 h-2" />
          <span>🔖 {bookmarks.size} saved</span>
        </div>
      </div>

      <AdSlot slot={AD_SLOTS.resourcesInline} />



      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? "gradient-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Resource Cards */}
      {(activeTab === "All" || (activeTab !== "Roadmaps" && activeTab !== "My Bookmarks") || activeTab === "My Bookmarks") && filteredResources.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map(r => (
            <div key={r.id} className="glass-card rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-semibold text-foreground text-sm">{r.title}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => toggleBookmark(r.id)} className="p-1 rounded hover:bg-muted transition-colors">
                      {bookmarks.has(r.id) ? <BookmarkCheck className="h-4 w-4 text-accent" /> : <Bookmark className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{r.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{r.platform}</span>
                  <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">{r.free ? "FREE" : "PAID"}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <button onClick={() => toggleCompletion(r.id)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${completions.has(r.id) ? "text-success" : "text-muted-foreground hover:text-foreground"}`}>
                  {completions.has(r.id) ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  {completions.has(r.id) ? "Completed" : "Mark done"}
                </button>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                  Visit <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "My Bookmarks" && filteredResources.length === 0 && (
        <div className="glass-card rounded-xl p-8 text-center text-muted-foreground">No bookmarks yet. Click the bookmark icon on any resource to save it.</div>
      )}

      {/* Company Guides - show on All or specific categories */}
      {(activeTab === "All" || activeTab === "Interview") && (
        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Company-Wise Prep Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyGuides.map(g => (
              <div key={g.company} className="glass-card rounded-xl p-4">
                <h3 className="font-display font-bold text-foreground text-lg mb-2">{g.company}</h3>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p><span className="font-medium text-foreground">CGPA:</span> {g.cgpaCutoff} | <span className="font-medium text-foreground">Backlogs:</span> {g.backlogs}</p>
                  <p><span className="font-medium text-foreground">Rounds:</span> {g.rounds}</p>
                  <p><span className="font-medium text-foreground">Focus:</span> {g.focus}</p>
                  <p><span className="font-medium text-foreground">Resources:</span> {g.resources}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roadmaps */}
      {(activeTab === "All" || activeTab === "Roadmaps") && (
        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2"><Map className="h-5 w-5 text-accent" /> Branch-Wise Roadmaps</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {roadmaps.map(rm => (
              <div key={rm.branch} className="glass-card rounded-xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-3">{rm.branch} Roadmap</h3>
                <div className="space-y-3">
                  {rm.steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-6 w-6 rounded-full gradient-accent flex items-center justify-center text-accent-foreground text-xs font-bold shrink-0">{i + 1}</div>
                        {i < rm.steps.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1" />}
                      </div>
                      <div className="pb-3">
                        <p className="text-sm font-medium text-foreground">{step.year}</p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Plans */}
      {(activeTab === "All" || activeTab === "Roadmaps") && (
        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /> Study Plans</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {studyPlans.map(sp => (
              <div key={sp.title} className="glass-card rounded-xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-1">{sp.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{sp.duration}</p>
                <div className="space-y-2">
                  {sp.weeks.map((w, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-xs font-medium text-accent shrink-0 w-16">{w.label}</span>
                      <span className="text-xs text-muted-foreground">{w.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Must-Have Apps */}
      {activeTab === "All" && (
        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2"><Smartphone className="h-5 w-5 text-accent" /> Must-Have Apps</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mustHaveApps.map(app => (
              <div key={app.name} className="glass-card rounded-xl p-4 text-center">
                <p className="font-display font-semibold text-foreground text-sm mb-1">{app.name}</p>
                <p className="text-xs text-muted-foreground">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
