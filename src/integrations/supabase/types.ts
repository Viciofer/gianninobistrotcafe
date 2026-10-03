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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          schedule: string | null
          section: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          schedule?: string | null
          section: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          schedule?: string | null
          section?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_section_fkey"
            columns: ["section"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["slug"]
          },
        ]
      }
      contact_info: {
        Row: {
          address_line1: string
          address_line2: string
          created_at: string
          email: string
          id: string
          instagram_handle: string
          instagram_url: string
          maps_pin_address: string
          phone: string
          schedule_main: string
          schedule_note: string
          updated_at: string
        }
        Insert: {
          address_line1?: string
          address_line2?: string
          created_at?: string
          email?: string
          id?: string
          instagram_handle?: string
          instagram_url?: string
          maps_pin_address?: string
          phone?: string
          schedule_main?: string
          schedule_note?: string
          updated_at?: string
        }
        Update: {
          address_line1?: string
          address_line2?: string
          created_at?: string
          email?: string
          id?: string
          instagram_handle?: string
          instagram_url?: string
          maps_pin_address?: string
          phone?: string
          schedule_main?: string
          schedule_note?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_items: {
        Row: {
          created_at: string
          href: string | null
          icon: string
          id: string
          label: string
          sort_order: number
          updated_at: string
          value: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          href?: string | null
          icon?: string
          id?: string
          label?: string
          sort_order?: number
          updated_at?: string
          value?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          href?: string | null
          icon?: string
          id?: string
          label?: string
          sort_order?: number
          updated_at?: string
          value?: string
          visible?: boolean
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string
          event_date: string
          event_time: string
          id: string
          image_path: string | null
          image_url: string | null
          title: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          description?: string
          event_date: string
          event_time?: string
          id?: string
          image_path?: string | null
          image_url?: string | null
          title: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          description?: string
          event_date?: string
          event_time?: string
          id?: string
          image_path?: string | null
          image_url?: string | null
          title?: string
          visible?: boolean
        }
        Relationships: []
      }
      home_content: {
        Row: {
          body_html: string
          carousel_enabled: boolean
          carousel_interval: number
          id: string
          title_html: string
          updated_at: string
        }
        Insert: {
          body_html?: string
          carousel_enabled?: boolean
          carousel_interval?: number
          id?: string
          title_html?: string
          updated_at?: string
        }
        Update: {
          body_html?: string
          carousel_enabled?: boolean
          carousel_interval?: number
          id?: string
          title_html?: string
          updated_at?: string
        }
        Relationships: []
      }
      home_images: {
        Row: {
          alt: string
          created_at: string
          id: string
          path: string | null
          sort_order: number
          url: string
          visible: boolean
        }
        Insert: {
          alt?: string
          created_at?: string
          id?: string
          path?: string | null
          sort_order?: number
          url: string
          visible?: boolean
        }
        Update: {
          alt?: string
          created_at?: string
          id?: string
          path?: string | null
          sort_order?: number
          url?: string
          visible?: boolean
        }
        Relationships: []
      }
      products: {
        Row: {
          available: boolean
          category_id: string
          created_at: string
          description: string | null
          id: string
          name: string
          price: string | null
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          available?: boolean
          category_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          price?: string | null
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          available?: boolean
          category_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          price?: string | null
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          builtin: boolean
          created_at: string
          icon: string
          id: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          builtin?: boolean
          created_at?: string
          icon?: string
          id?: string
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          builtin?: boolean
          created_at?: string
          icon?: string
          id?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      section_type: "menu" | "caffetteria" | "drink" | "vini"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
      section_type: ["menu", "caffetteria", "drink", "vini"],
    },
  },
} as const
