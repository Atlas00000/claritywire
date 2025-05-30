import { useState } from "react"
import { useSupabase } from "./useSupabase"
import { toast } from "sonner"

export interface Article {
  id: string
  title: string
  content: string
  category: string
  author_id: string
  status: "draft" | "published" | "archived"
  created_at: string
  updated_at: string
  profiles?: {
    username: string | null
    full_name: string | null
    avatar_url: string | null
  }
  categories?: {
    name: string
    slug: string
  }
}

interface UseArticlesReturn {
  articles: Article[]
  loading: boolean
  error: Error | null
  getArticles: (params?: {
    category?: string
    search?: string
    page?: number
    limit?: number
  }) => Promise<void>
  getArticle: (id: string) => Promise<Article | null>
  createArticle: (article: Omit<Article, "id" | "created_at" | "updated_at">) => Promise<Article | null>
  updateArticle: (id: string, article: Partial<Article>) => Promise<Article | null>
  deleteArticle: (id: string) => Promise<boolean>
}

export function useArticles(): UseArticlesReturn {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { supabase } = useSupabase()

  const getArticles = async (params?: {
    category?: string
    search?: string
    page?: number
    limit?: number
  }) => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from("articles")
        .select(`
          *,
          profiles:author_id (username, full_name, avatar_url),
          categories (name, slug)
        `, { count: "exact" })

      if (params?.category) {
        query = query.eq("category", params.category)
      }

      if (params?.search) {
        query = query.or(`title.ilike.%${params.search}%,content.ilike.%${params.search}%`)
      }

      const page = params?.page || 1
      const limit = params?.limit || 10
      const offset = (page - 1) * limit

      const { data, error } = await query
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) throw error

      setArticles(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch articles"))
      toast.error("Failed to fetch articles")
    } finally {
      setLoading(false)
    }
  }

  const getArticle = async (id: string): Promise<Article | null> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          profiles:author_id (username, full_name, avatar_url),
          categories (name, slug)
        `)
        .eq("id", id)
        .single()

      if (error) throw error

      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch article"))
      toast.error("Failed to fetch article")
      return null
    } finally {
      setLoading(false)
    }
  }

  const createArticle = async (
    article: Omit<Article, "id" | "created_at" | "updated_at">
  ): Promise<Article | null> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("articles")
        .insert(article)
        .select()
        .single()

      if (error) throw error

      toast.success("Article created successfully")
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to create article"))
      toast.error("Failed to create article")
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateArticle = async (
    id: string,
    article: Partial<Article>
  ): Promise<Article | null> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("articles")
        .update({
          ...article,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      toast.success("Article updated successfully")
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update article"))
      toast.error("Failed to update article")
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteArticle = async (id: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id)

      if (error) throw error

      toast.success("Article deleted successfully")
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to delete article"))
      toast.error("Failed to delete article")
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    articles,
    loading,
    error,
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
  }
} 