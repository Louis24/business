export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      merchants: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          description: string | null
          chamber_position: 'president' | 'vice_president' | 'director' | 'member'
          industry: string
          type: 'manufacturer' | 'distributor' | 'trader'
          region: string
          certifications: string[]
          contact_person: string | null
          phone: string | null
          address: string | null
          website: string | null
          member_since: number | null
          product_count: number | null
          is_featured: boolean | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['merchants']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['merchants']['Insert']>
      }
      products: {
        Row: {
          id: string
          merchant_id: string
          name: string
          images: string[]
          reference_price: number | null
          unit: string | null
          moq: number | null
          category: string
          description: string | null
          specs: Json
          is_featured: boolean | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      news_items: {
        Row: {
          id: string
          title: string
          content: string | null
          summary: string | null
          type: 'announcement' | 'supply' | 'demand' | 'event'
          author: string | null
          published_at: string
          event_date: string | null
          event_location: string | null
          contact_phone: string | null
          merchant_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['news_items']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['news_items']['Insert']>
      }
      inquiries: {
        Row: {
          id: string
          product_id: string | null
          merchant_id: string
          buyer_id: string | null
          buyer_name: string
          buyer_company: string | null
          buyer_phone: string
          buyer_email: string | null
          quantity: number | null
          target_price: number | null
          message: string
          status: 'pending' | 'replied' | 'closed'
          reply: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['inquiries']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['inquiries']['Insert']>
      }
    }
  }
}
