export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          content: string;
          createdAt: string;
          id: string;
        };
        Insert: {
          content?: string;
          createdAt?: string;
          id?: string;
        };
        Update: {
          content?: string;
          createdAt?: string;
          id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
