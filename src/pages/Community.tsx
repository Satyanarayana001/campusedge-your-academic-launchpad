import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { studyGroups, seniorTips } from "@/lib/mockData";
import { Heart, MessageCircle, Users, Lightbulb, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AdSlot from "@/components/AdSlot";
import { AD_SLOTS } from "@/lib/ads";


function getAuthorName(profile: any) {
  if (profile?.full_name && !profile.full_name.includes("@")) return profile.full_name;
  if (profile?.full_name?.includes("@")) return profile.full_name.split("@")[0];
  return "Student";
}

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [postsRes, likesRes] = await Promise.all([
        supabase.from("community_posts").select("*").order("created_at", { ascending: false }).limit(50),
        supabase.from("post_likes").select("post_id").eq("user_id", user.id),
      ]);
      const postsList = postsRes.data || [];
      // Fetch profiles for authors
      const userIds = [...new Set(postsList.map((p: any) => p.user_id))];
      let profileMap: Record<string, any> = {};
      if (userIds.length) {
        const { data: profs } = await supabase.from("profiles").select("user_id, full_name, avatar_url").in("user_id", userIds);
        (profs || []).forEach((p: any) => { profileMap[p.user_id] = p; });
      }
      setPosts(postsList.map((p: any) => ({ ...p, _profile: profileMap[p.user_id] || null })));
      setLikedPosts(new Set((likesRes.data || []).map((l: any) => l.post_id)));
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel("community-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "community_posts" }, async (payload) => {
        if (payload.eventType === "DELETE") {
          setPosts((prev) => prev.filter((p) => p.id !== (payload.old as any).id));
          return;
        }
        const row: any = payload.new;
        const { data: prof } = await supabase
          .from("profiles").select("user_id, full_name, avatar_url").eq("user_id", row.user_id).maybeSingle();
        setPosts((prev) => {
          const exists = prev.some((p) => p.id === row.id);
          if (exists) return prev.map((p) => (p.id === row.id ? { ...p, ...row, _profile: p._profile || prof } : p));
          return [{ ...row, _profile: prof }, ...prev];
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);


  const handlePost = async () => {
    if (!newPost.trim() || !user) return;
    const { data, error } = await supabase.from("community_posts").insert({ user_id: user.id, content: newPost.trim() }).select().single();
    if (error) { toast.error(error.message); return; }
    const { data: prof } = await supabase.from("profiles").select("full_name, avatar_url").eq("user_id", user.id).single();
    setPosts([{ ...data, _profile: prof }, ...posts]);
    setNewPost("");
    toast.success("Posted!");
  };

  const handleLike = async (postId: string) => {
    if (!user) return;
    if (likedPosts.has(postId)) {
      await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", user.id);
      setLikedPosts(prev => { const n = new Set(prev); n.delete(postId); return n; });
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: Math.max(0, (p.likes || 0) - 1) } : p));
      await supabase.from("community_posts").update({ likes: Math.max(0, posts.find(p => p.id === postId)?.likes - 1 || 0) }).eq("id", postId);
    } else {
      await supabase.from("post_likes").insert({ post_id: postId, user_id: user.id });
      setLikedPosts(prev => new Set(prev).add(postId));
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p));
      await supabase.from("community_posts").update({ likes: (posts.find(p => p.id === postId)?.likes || 0) + 1 }).eq("id", postId);
    }
  };

  const getInitials = (name: string) => name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "??";
  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Community</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-xl p-4">
            <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Share something with the community..."
              className="w-full bg-muted rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none h-20" />
            <div className="flex justify-end mt-2">
              <button onClick={handlePost} className="px-4 py-2 rounded-lg gradient-accent text-accent-foreground text-sm font-medium transition-transform hover:scale-105">Post</button>
            </div>
          </div>

          {posts.map((post) => {
            const author = getAuthorName(post._profile);
            return (
              <div key={post.id} className="glass-card rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {getInitials(author)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{author}</p>
                    <p className="text-xs text-muted-foreground">{getTimeAgo(post.created_at)}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                  <button onClick={() => handleLike(post.id)} className={`flex items-center gap-1.5 text-xs transition-colors ${likedPosts.has(post.id) ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`}>
                    <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? "fill-current" : ""}`} /> {post.likes || 0}
                  </button>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MessageCircle className="h-4 w-4" /> 0
                  </span>
                </div>
              </div>
            );
          })}
          {posts.length === 0 && (
            <div className="glass-card rounded-xl p-8 text-center text-muted-foreground">
              <p>No posts yet. Be the first to share!</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-xl p-5">
            <h2 className="font-display font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Study Groups
            </h2>
            <div className="space-y-3">
              {studyGroups.map((group) => (
                <div key={group.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <span className="text-xl">{group.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{group.name}</p>
                    <p className="text-xs text-muted-foreground">{group.members} members</p>
                  </div>
                  <button className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">Join</button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-5">
            <h2 className="font-display font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" /> Senior Tips
            </h2>
            <div className="space-y-4">
              {seniorTips.map((tip) => (
                <div key={tip.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full gradient-accent flex items-center justify-center text-accent-foreground text-xs font-bold">{tip.avatar}</div>
                    <span className="text-sm font-medium text-foreground">{tip.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-9">"{tip.tip}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
