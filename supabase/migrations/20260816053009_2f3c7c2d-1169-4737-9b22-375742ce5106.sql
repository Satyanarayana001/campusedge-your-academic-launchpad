DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['attendance','study_hours','timetable','skills','dsa_progress','certifications','projects','resume_checklist','mock_interviews','quiz_scores','semester_grades','drive_applications','campus_drives','profiles','post_comments','resource_bookmarks','resource_completions']
  LOOP
    EXECUTE format('ALTER TABLE public.%I REPLICA IDENTITY FULL', t);
    BEGIN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', t);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
  END LOOP;
END $$;