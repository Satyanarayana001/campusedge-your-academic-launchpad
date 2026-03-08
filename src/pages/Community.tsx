import { useState } from "react";
import { communityPosts, studyGroups, seniorTips } from "@/lib/mockData";
import { Heart, MessageCircle, Users, Lightbulb } from "lucide-react";

export default function Community() {
  const [posts, setPosts] = useState(communityPosts);
  const [newPost, setNewPost] = useState("");

  const handleLike = (id: number) => {
    setPosts(posts.map((p) => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([{
      id: Date.now(), author: "You", avatar: "YO", content: newPost,
      likes: 0, comments: 0, time: "Just now",
    }, ...posts]);
    setNewPost("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Community</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* New Post */}
          <div className="glass-card rounded-xl p-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share something with the community..."
              className="w-full bg-muted rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none h-20"
            />
            <div className="flex justify-end mt-2">
              <button onClick={handlePost} className="px-4 py-2 rounded-lg gradient-accent text-accent-foreground text-sm font-medium transition-transform hover:scale-105">
                Post
              </button>
            </div>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {post.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
                  <Heart className="h-4 w-4" /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" /> {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Study Groups */}
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
                  <button className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Senior Tips */}
          <div className="glass-card rounded-xl p-5">
            <h2 className="font-display font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" /> Senior Tips
            </h2>
            <div className="space-y-4">
              {seniorTips.map((tip) => (
                <div key={tip.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full gradient-accent flex items-center justify-center text-accent-foreground text-xs font-bold">
                      {tip.avatar}
                    </div>
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
