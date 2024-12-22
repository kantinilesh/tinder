export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'recruiter' | 'employee' | 'both'
          full_name: string
          email: string
          avatar_url: string | null
          title: string | null
          bio: string | null
          skills: string[] | null
          experience: Json | null
          preferences: Json | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'recruiter' | 'employee' | 'both'
          full_name: string
          email: string
          avatar_url?: string | null
          title?: string | null
          bio?: string | null
          skills?: string[] | null
          experience?: Json | null
          preferences?: Json | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'recruiter' | 'employee' | 'both'
          full_name?: string
          email?: string
          avatar_url?: string | null
          title?: string | null
          bio?: string | null
          skills?: string[] | null
          experience?: Json | null
          preferences?: Json | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          recruiter_id: string
          title: string
          company: string
          description: string
          requirements: string[]
          location: string | null
          salary_range: Json | null
          job_type: string | null
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          recruiter_id: string
          title: string
          company: string
          description: string
          requirements: string[]
          location?: string | null
          salary_range?: Json | null
          job_type?: string | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          recruiter_id?: string
          title?: string
          company?: string
          description?: string
          requirements?: string[]
          location?: string | null
          salary_range?: Json | null
          job_type?: string | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      matches: {
        Row: {
          id: string
          user_id: string
          job_id: string
          status: 'liked' | 'passed' | 'matched'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id: string
          status: 'liked' | 'passed' | 'matched'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string
          status?: 'liked' | 'passed' | 'matched'
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          job_id: string
          content: string
          created_at: string
          read_at: string | null
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          job_id: string
          content: string
          created_at?: string
          read_at?: string | null
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          job_id?: string
          content?: string
          created_at?: string
          read_at?: string | null
        }
      }
      video_interviews: {
        Row: {
          id: string
          job_id: string
          candidate_id: string
          questions: Json
          responses: Json | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          job_id: string
          candidate_id: string
          questions: Json
          responses?: Json | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          job_id?: string
          candidate_id?: string
          questions?: Json
          responses?: Json | null
          created_at?: string
          completed_at?: string | null
        }
      }
    }
  }
}