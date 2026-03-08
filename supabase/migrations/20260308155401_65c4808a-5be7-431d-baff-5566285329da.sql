
-- Fix all RESTRICTIVE RLS policies to PERMISSIVE

-- attendance
DROP POLICY IF EXISTS "Users can CRUD own attendance" ON public.attendance;
CREATE POLICY "Users can CRUD own attendance" ON public.attendance FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- campus_drives
DROP POLICY IF EXISTS "Anyone authenticated can view drives" ON public.campus_drives;
CREATE POLICY "Anyone authenticated can view drives" ON public.campus_drives FOR SELECT TO authenticated USING (true);

-- certifications
DROP POLICY IF EXISTS "Users can CRUD own certifications" ON public.certifications;
CREATE POLICY "Users can CRUD own certifications" ON public.certifications FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- community_posts
DROP POLICY IF EXISTS "Anyone authenticated can view posts" ON public.community_posts;
DROP POLICY IF EXISTS "Users can create own posts" ON public.community_posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON public.community_posts;
DROP POLICY IF EXISTS "Users can update own posts" ON public.community_posts;
CREATE POLICY "Anyone authenticated can view posts" ON public.community_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create own posts" ON public.community_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON public.community_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON public.community_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- drive_applications
DROP POLICY IF EXISTS "Users can CRUD own drive_applications" ON public.drive_applications;
CREATE POLICY "Users can CRUD own drive_applications" ON public.drive_applications FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- dsa_progress
DROP POLICY IF EXISTS "Users can CRUD own dsa_progress" ON public.dsa_progress;
CREATE POLICY "Users can CRUD own dsa_progress" ON public.dsa_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- mock_interviews
DROP POLICY IF EXISTS "Users can CRUD own mock_interviews" ON public.mock_interviews;
CREATE POLICY "Users can CRUD own mock_interviews" ON public.mock_interviews FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- post_comments
DROP POLICY IF EXISTS "Anyone authenticated can view comments" ON public.post_comments;
DROP POLICY IF EXISTS "Users can create own comments" ON public.post_comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON public.post_comments;
CREATE POLICY "Anyone authenticated can view comments" ON public.post_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create own comments" ON public.post_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.post_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- post_likes
DROP POLICY IF EXISTS "Anyone authenticated can view likes" ON public.post_likes;
DROP POLICY IF EXISTS "Users can like posts" ON public.post_likes;
DROP POLICY IF EXISTS "Users can unlike posts" ON public.post_likes;
CREATE POLICY "Anyone authenticated can view likes" ON public.post_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can like posts" ON public.post_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike posts" ON public.post_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- profiles - also allow authenticated users to view all profiles (for community)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Anyone authenticated can view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- projects
DROP POLICY IF EXISTS "Users can CRUD own projects" ON public.projects;
CREATE POLICY "Users can CRUD own projects" ON public.projects FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- quiz_scores
DROP POLICY IF EXISTS "Users can CRUD own quiz_scores" ON public.quiz_scores;
CREATE POLICY "Users can CRUD own quiz_scores" ON public.quiz_scores FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- resume_checklist
DROP POLICY IF EXISTS "Users can CRUD own resume_checklist" ON public.resume_checklist;
CREATE POLICY "Users can CRUD own resume_checklist" ON public.resume_checklist FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- semester_grades
DROP POLICY IF EXISTS "Users can CRUD own grades" ON public.semester_grades;
CREATE POLICY "Users can CRUD own grades" ON public.semester_grades FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- skills
DROP POLICY IF EXISTS "Users can CRUD own skills" ON public.skills;
CREATE POLICY "Users can CRUD own skills" ON public.skills FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- study_hours
DROP POLICY IF EXISTS "Users can CRUD own study_hours" ON public.study_hours;
CREATE POLICY "Users can CRUD own study_hours" ON public.study_hours FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- tasks
DROP POLICY IF EXISTS "Users can CRUD own tasks" ON public.tasks;
CREATE POLICY "Users can CRUD own tasks" ON public.tasks FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- timetable
DROP POLICY IF EXISTS "Users can CRUD own timetable" ON public.timetable;
CREATE POLICY "Users can CRUD own timetable" ON public.timetable FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Resource bookmarks table
CREATE TABLE public.resource_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  resource_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, resource_id)
);
ALTER TABLE public.resource_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own bookmarks" ON public.resource_bookmarks FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Resource completions table
CREATE TABLE public.resource_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  resource_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, resource_id)
);
ALTER TABLE public.resource_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own completions" ON public.resource_completions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
