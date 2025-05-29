import { ApiResponse, PaginatedResponse } from './types/api'

class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

class ApiClient {
  private baseUrl: string
  private headers: HeadersInit

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api'
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(
          data.error?.code || 'UNKNOWN_ERROR',
          data.error?.message || 'An unknown error occurred'
        )
      }

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('NETWORK_ERROR', 'Network request failed')
    }
  }

  // Auth endpoints
  async signIn(email: string, password: string) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async signUp(email: string, password: string, fullName: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    })
  }

  async signOut() {
    return this.request('/auth/signout', {
      method: 'POST',
    })
  }

  // User endpoints
  async getUsers(page = 1, limit = 10) {
    return this.request<PaginatedResponse<any>>(`/users?page=${page}&limit=${limit}`)
  }

  async getUser(id: string) {
    return this.request(`/users/${id}`)
  }

  // Article endpoints
  async getArticles(page = 1, limit = 10) {
    return this.request<PaginatedResponse<any>>(`/articles?page=${page}&limit=${limit}`)
  }

  async getArticle(slug: string) {
    return this.request(`/articles/${slug}`)
  }

  // Analytics endpoints
  async getAnalytics() {
    return this.request('/analytics')
  }

  // System endpoints
  async getSystemStatus() {
    return this.request('/system/status')
  }
}

export const apiClient = new ApiClient() 