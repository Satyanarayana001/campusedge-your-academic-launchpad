export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          attended: number | null
          created_at: string
          id: string
          subject: string
          total: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          attended?: number | null
          created_at?: string
          id?: string
          subject: string
          total?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          attended?: number | null
          created_at?: string
          id?: string
          subject?: string
          total?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      campus_drives: {
        Row: {
          cgpa_cutoff: number | null
          company: string
          created_at: string
          ctc: string
          date: string
          id: string
          role: string
        }
        Insert: {
          cgpa_cutoff?: number | null
          company: string
          created_at?: string
          ctc: string
          date: string
          id?: string
          role: string
        }
        Update: {
          cgpa_cutoff?: number | null
          company?: string
          created_at?: string
          ctc?: string
          date?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          created_at: string
          date: string | null
          id: string
          link: string | null
          name: string
          platform: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: string
          link?: string | null
          name: string
          platform?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: string
          link?: string | null
          name?: string
          platform?: string | null
          user_id?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          likes: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          likes?: number | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          likes?: number | null
          user_id?: string
        }
        Relationships: []
      }
      drive_applications: {
        Row: {
          created_at: string
          drive_id: string
          id: string
          status: Database["public"]["Enums"]["drive_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          drive_id: string
          id?: string
          status?: Database["public"]["Enums"]["drive_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          drive_id?: string
          id?: string
          status?: Database["public"]["Enums"]["drive_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drive_applications_drive_id_fkey"
            columns: ["drive_id"]
            isOneToOne: false
            referencedRelation: "campus_drives"
            referencedColumns: ["id"]
          },
        ]
      }
      dsa_progress: {
        Row: {
          created_at: string
          easy: number | null
          hard: number | null
          id: string
          medium: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          easy?: number | null
          hard?: number | null
          id?: string
          medium?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          easy?: number | null
          hard?: number | null
          id?: string
          medium?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mock_interviews: {
        Row: {
          company: string
          created_at: string
          date: string
          feedback: string | null
          id: string
          result: Database["public"]["Enums"]["interview_result"] | null
          user_id: string
        }
        Insert: {
          company: string
          created_at?: string
          date: string
          feedback?: string | null
          id?: string
          result?: Database["public"]["Enums"]["interview_result"] | null
          user_id: string
        }
        Update: {
          company?: string
          created_at?: string
          date?: string
          feedback?: string | null
          id?: string
          result?: Database["public"]["Enums"]["interview_result"] | null
          user_id?: string
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          badges: number | null
          branch: string
          cgpa: number | null
          created_at: string
          full_name: string
          id: string
          semester: number
          streak: number | null
          updated_at: string
          user_id: string
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          badges?: number | null
          branch?: string
          cgpa?: number | null
          created_at?: string
          full_name?: string
          id?: string
          semester?: number
          streak?: number | null
          updated_at?: string
          user_id: string
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          badges?: number | null
          branch?: string
          cgpa?: number | null
          created_at?: string
          full_name?: string
          id?: string
          semester?: number
          streak?: number | null
          updated_at?: string
          user_id?: string
          xp?: number | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          link: string | null
          name: string
          tech: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          link?: string | null
          name: string
          tech?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          link?: string | null
          name?: string
          tech?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      quiz_scores: {
        Row: {
          created_at: string
          id: string
          score: number
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          score: number
          total: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          score?: number
          total?: number
          user_id?: string
        }
        Relationships: []
      }
      resource_bookmarks: {
        Row: {
          created_at: string
          id: string
          resource_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          resource_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          resource_id?: string
          user_id?: string
        }
        Relationships: []
      }
      resource_completions: {
        Row: {
          created_at: string
          id: string
          resource_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          resource_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          resource_id?: string
          user_id?: string
        }
        Relationships: []
      }
      resume_checklist: {
        Row: {
          checked: boolean | null
          created_at: string
          id: string
          item_text: string
          user_id: string
        }
        Insert: {
          checked?: boolean | null
          created_at?: string
          id?: string
          item_text: string
          user_id: string
        }
        Update: {
          checked?: boolean | null
          created_at?: string
          id?: string
          item_text?: string
          user_id?: string
        }
        Relationships: []
      }
      semester_grades: {
        Row: {
          created_at: string
          credits: number
          gpa: number | null
          grade: string
          id: string
          semester: number
          subject_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits?: number
          gpa?: number | null
          grade: string
          id?: string
          semester: number
          subject_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits?: number
          gpa?: number | null
          grade?: string
          id?: string
          semester?: number
          subject_name?: string
          user_id?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string
          id: string
          level: number | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          level?: number | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          level?: number | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      study_hours: {
        Row: {
          created_at: string
          date: string
          hours: number | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          hours?: number | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          hours?: number | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          deadline: string | null
          done: boolean | null
          id: string
          priority: Database["public"]["Enums"]["task_priority"] | null
          subject: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deadline?: string | null
          done?: boolean | null
          id?: string
          priority?: Database["public"]["Enums"]["task_priority"] | null
          subject?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deadline?: string | null
          done?: boolean | null
          id?: string
          priority?: Database["public"]["Enums"]["task_priority"] | null
          subject?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      timetable: {
        Row: {
          created_at: string
          day: string
          id: string
          slot_index: number
          subject: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          day: string
          id?: string
          slot_index: number
          subject?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          day?: string
          id?: string
          slot_index?: number
          subject?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_profiles: {
        Args: { _user_ids: string[] }
        Returns: {
          avatar_url: string
          full_name: string
          user_id: string
        }[]
      }
    }
    Enums: {
      drive_status: "upcoming" | "applied" | "shortlisted" | "placed"
      interview_result: "Passed" | "Failed"
      task_priority: "high" | "medium" | "low"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      drive_status: ["upcoming", "applied", "shortlisted", "placed"],
      interview_result: ["Passed", "Failed"],
      task_priority: ["high", "medium", "low"],
    },
  },
} as const
