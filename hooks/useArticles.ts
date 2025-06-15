import { create } from 'zustand'
import { mockArticles } from '@/lib/mock-data'

interface Article {
  id: string
  title: string
  content: string
  category_id: string
  created_at: string
  updated_at: string
  author_id: string
  image_url?: string
}

interface ArticlesState {
  articles: Article[]
  loading: boolean
  error: string | null
  fetchArticles: () => Promise<void>
  getArticleById: (id: string) => Article | undefined
  getArticlesByCategory: (categoryId: string) => Article[]
}

export const useArticles = create<ArticlesState>((set, get) => ({
  articles: [],
  loading: false,
  error: null,
  fetchArticles: async () => {
    set({ loading: true, error: null })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ articles: mockArticles, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch articles', loading: false })
    }
  },
  getArticleById: (id: string) => {
    return get().articles.find(article => article.id === id)
  },
  getArticlesByCategory: (categoryId: string) => {
    return get().articles.filter(article => article.category_id === categoryId)
  }
})) 