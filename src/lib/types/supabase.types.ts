export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          post_id: number;
          user_id: number;
        };
        Insert: {
          content?: string;
          created_at?: string;
          id?: number;
          post_id: number;
          user_id: number;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: number;
          post_id?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "comment_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          }
        ];
      };
      likes: {
        Row: {
          created_at: string;
          id: number;
          post_id: number;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id: number;
          user_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      post: {
        Row: {
          category_id: number;
          content: string;
          created_at: string;
          id: number;
          intro: string | null;
          published: boolean | null;
          tags: string[];
          thumbnail: string | null;
          title: string;
          user_id: number | null;
          comments_count: number | null;
          liked_by: number | null;
          likedby: number | null;
          likes_count: number | null;
          title_intro_content: string | null;
        };
        Insert: {
          category_id: number;
          content: string;
          created_at?: string;
          id?: number;
          intro?: string | null;
          published?: boolean | null;
          tags?: string[];
          thumbnail?: string | null;
          title: string;
          user_id?: number | null;
        };
        Update: {
          category_id?: number;
          content?: string;
          created_at?: string;
          id?: number;
          intro?: string | null;
          published?: boolean | null;
          tags?: string[];
          thumbnail?: string | null;
          title?: string;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      user: {
        Row: {
          avatar: string | null;
          created_at: string;
          email: string;
          firstName: string | null;
          id: number;
          lastName: string | null;
          role: string;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string;
          email: string;
          firstName?: string | null;
          id?: number;
          lastName?: string | null;
          role: string;
        };
        Update: {
          avatar?: string | null;
          created_at?: string;
          email?: string;
          firstName?: string | null;
          id?: number;
          lastName?: string | null;
          role?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      comments_count: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      liked_by: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      likedby: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      likes_count: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      title_intro_content: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
