export interface Database {
 public: {
  Tables: {
   projects: {
    Row: {
     createdAt: string;
     id: string;
     name: string;
     updatedAt: string;
     userId: string;
    };
    Insert: {
     createdAt?: string;
     id?: string;
     name?: string;
     updatedAt?: string;
     userId: string;
    };
    Update: {
     createdAt?: string;
     id?: string;
     name?: string;
     updatedAt?: string;
     userId?: string;
    };
   };
   sections: {
    Row: {
     createdAt: string;
     id: string;
     projectId: string;
     title: string;
     updatedAt: string;
     userId: string;
    };
    Insert: {
     createdAt?: string;
     id?: string;
     projectId: string;
     title?: string;
     updatedAt?: string;
     userId: string;
    };
    Update: {
     createdAt?: string;
     id?: string;
     projectId?: string;
     title?: string;
     updatedAt?: string;
     userId?: string;
    };
   };
   todos: {
    Row: {
     createdAt: string;
     description: string | null;
     id: string;
     index: number;
     isComplete: boolean;
     projectId: string;
     sectionId: string;
     title: string;
     updatedAt: string;
     userId: string;
    };
    Insert: {
     createdAt?: string;
     description?: string | null;
     id?: string;
     index?: number;
     isComplete?: boolean;
     projectId: string;
     sectionId: string;
     title?: string;
     updatedAt?: string;
     userId: string;
    };
    Update: {
     createdAt?: string;
     description?: string | null;
     id?: string;
     index?: number;
     isComplete?: boolean;
     projectId?: string;
     sectionId?: string;
     title?: string;
     updatedAt?: string;
     userId?: string;
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
