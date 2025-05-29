export interface User {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
  avatar_url: string | null
  role: 'user' | 'admin'
}

export interface Article {
  id: string
  title: string
  content: string
  slug: string
  author_id: string
  category_id: string
  published_at: string
  created_at: string
  updated_at: string
  featured_image: string | null
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface Topic {
  id: string
  name: string
  slug: string
  category_id: string
}

export interface ApiResponse<T> {
  data: T
  error: null | {
    message: string
    code: string
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface AuthResponse {
  user: User
  session: {
    access_token: string
    refresh_token: string
  }
}

export interface SystemStatus {
  status: 'healthy' | 'degraded' | 'down'
  message: string
  lastChecked: string
}

export interface AnalyticsData {
  totalUsers: number
  totalArticles: number
  activeSessions: number
  systemStatus: SystemStatus
} 