import { skills, dsaProgress, certifications, projects } from "@/lib/mockData";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Github, Award } from "lucide-react";

export default function SkillTracker() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Skill Tracker</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">Technical Skills</h2>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* DSA Progress */}
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-5">
            <h2 className="font-display font-semibold text-foreground text-lg mb-4">DSA Progress</h2>
            <div className="text-center mb-4">
              <p className="text-4xl font-display font-bold text-foreground">{dsaProgress.total}</p>
              <p className="text-sm text-muted-foreground">Problems Solved</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-success/10">
                <p className="text-2xl font-bold text-success">{dsaProgress.easy}</p>
                <p className="text-xs text-muted-foreground">Easy</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-warning/10">
                <p className="text-2xl font-bold text-warning">{dsaProgress.medium}</p>
                <p className="text-xs text-muted-foreground">Medium</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-destructive/10">
                <p className="text-2xl font-bold text-destructive">{dsaProgress.hard}</p>
                <p className="text-xs text-muted-foreground">Hard</p>
              </div>
            </div>
          </div>

          {/* Profile Links */}
          <div className="glass-card rounded-xl p-5">
            <h2 className="font-display font-semibold text-foreground text-lg mb-4">Profiles</h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Github className="h-5 w-5 text-foreground" />
                <span className="text-sm font-medium text-foreground">github.com/arjunsharma</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Code2Icon className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium text-foreground">leetcode.com/arjunsharma</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Award className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.platform} • {cert.date}</p>
              </div>
              <a href={cert.link} className="text-accent hover:text-accent/80"><ExternalLink className="h-3.5 w-3.5" /></a>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">Project Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {projects.map((proj) => (
            <div key={proj.name} className="p-4 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
              <h3 className="font-display font-semibold text-foreground">{proj.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {proj.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Code2Icon(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
    </svg>
  );
}
