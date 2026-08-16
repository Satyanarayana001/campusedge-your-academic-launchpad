ALTER TABLE public.community_posts REPLICA IDENTITY FULL;
ALTER TABLE public.tasks REPLICA IDENTITY FULL;
ALTER TABLE public.post_likes REPLICA IDENTITY FULL;
DO $$ BEGIN
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.post_likes; EXCEPTION WHEN duplicate_object THEN NULL; END;
END $$;