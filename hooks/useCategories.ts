import { useState } from "react"
import { useSupabase } from "./useSupabase"
import { toast } from "sonner"

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

interface UseCategoriesReturn {
  categories: Category[]
  loading: boolean
  error: Error | null
  getCategories: () => Promise<void>
  getCategory: (id: string) => Promise<Category | null>
  createCategory: (category: Omit<Category, "id">) => Promise<Category | null>
  updateCategory: (id: string, category: Partial<Category>) => Promise<Category | null>
  deleteCategory: (id: string) => Promise<boolean>
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { supabase } = useSupabase()

  const getCategories = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name")

      if (error) throw error

      setCategories(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch categories"))
      toast.error("Failed to fetch categories")
    } finally {
      setLoading(false)
    }
  }

  const getCategory = async (id: string): Promise<Category | null> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single()

      if (error) throw error

      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch category"))
      toast.error("Failed to fetch category")
      return null
    } finally {
      setLoading(false)
    }
  }

  const createCategory = async (
    category: Omit<Category, "id">
  ): Promise<Category | null> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("categories")
        .insert(category)
        .select()
        .single()

      if (error) throw error

      toast.success("Category created successfully")
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to create category"))
      toast.error("Failed to create category")
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateCategory = async (
    id: string,
    category: Partial<Category>
  ): Promise<Category | null> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("categories")
        .update(category)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      toast.success("Category updated successfully")
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update category"))
      toast.error("Failed to update category")
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id)

      if (error) throw error

      toast.success("Category deleted successfully")
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to delete category"))
      toast.error("Failed to delete category")
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    categories,
    loading,
    error,
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
  }
} 