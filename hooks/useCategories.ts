import { create } from 'zustand'
import { mockCategories } from '@/lib/mock-data'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

interface CategoriesState {
  categories: Category[]
  loading: boolean
  error: string | null
  fetchCategories: () => Promise<void>
  getCategoryById: (id: string) => Category | undefined
  getCategoryBySlug: (slug: string) => Category | undefined
}

export const useCategories = create<CategoriesState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    set({ loading: true, error: null })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ categories: mockCategories, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch categories', loading: false })
    }
  },
  getCategoryById: (id: string) => {
    return get().categories.find(category => category.id === id)
  },
  getCategoryBySlug: (slug: string) => {
    return get().categories.find(category => category.slug === slug)
  }
})) 