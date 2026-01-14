import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Database = {
  public: {
    Tables: {
      pets: {
        Row: {
          id: string;
          name: string;
          breed: string;
          age: string;
          gender: '公' | '母';
          weight: string;
          distance: string;
          location: string;
          image: string;
          tags: string[];
          description: string;
          status: '待领养' | '审核中' | '已通过';
          price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          breed: string;
          age: string;
          gender: '公' | '母';
          weight: string;
          distance: string;
          location: string;
          image: string;
          tags: string[];
          description: string;
          status?: '待领养' | '审核中' | '已通过';
          price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          breed?: string;
          age?: string;
          gender?: '公' | '母';
          weight?: string;
          distance?: string;
          location?: string;
          image?: string;
          tags?: string[];
          description?: string;
          status?: '待领养' | '审核中' | '已通过';
          price?: number;
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          pet_id: string;
          user_name: string;
          user_email: string;
          user_phone: string;
          house_type: string;
          ownership_type: string;
          experience: string;
          reason: string;
          status: '审核中' | '已通过' | '已完成' | '已拒绝';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          pet_id: string;
          user_name: string;
          user_email: string;
          user_phone: string;
          house_type: string;
          ownership_type: string;
          experience: string;
          reason: string;
          status?: '审核中' | '已通过' | '已完成' | '已拒绝';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          pet_id?: string;
          user_name?: string;
          user_email?: string;
          user_phone?: string;
          house_type?: string;
          ownership_type?: string;
          experience?: string;
          reason?: string;
          status?: '审核中' | '已通过' | '已完成' | '已拒绝';
          updated_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          pet_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          pet_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          pet_id?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          role: 'user' | 'assistant';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          role: 'user' | 'assistant';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          role?: 'user' | 'assistant';
        };
      };
    };
  };
};
