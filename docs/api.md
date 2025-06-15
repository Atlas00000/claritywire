# API Documentation

## Base URL
```
https://api.claritywire.com/v1
```

## Authentication
All API requests require authentication using a Bearer token.

```typescript
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## Endpoints

### Articles

#### Get Articles
```typescript
GET /articles

// Query Parameters
interface GetArticlesParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  sort?: 'latest' | 'popular' | 'trending'
}

// Response
interface ArticlesResponse {
  articles: Article[]
  total: number
  page: number
  limit: number
}

// Example
const response = await fetch('/api/articles?page=1&limit=10&category=tech')
```

#### Get Article by ID
```typescript
GET /articles/:id

// Response
interface ArticleResponse {
  article: Article
  related: Article[]
}

// Example
const response = await fetch('/api/articles/123')
```

### Categories

#### Get Categories
```typescript
GET /categories

// Response
interface CategoriesResponse {
  categories: Category[]
}

// Example
const response = await fetch('/api/categories')
```

### Users

#### Get User Profile
```typescript
GET /users/profile

// Response
interface UserProfileResponse {
  user: User
  preferences: UserPreferences
}

// Example
const response = await fetch('/api/users/profile')
```

#### Update User Profile
```typescript
PATCH /users/profile

// Request Body
interface UpdateProfileRequest {
  name?: string
  email?: string
  preferences?: UserPreferences
}

// Response
interface UpdateProfileResponse {
  user: User
}

// Example
const response = await fetch('/api/users/profile', {
  method: 'PATCH',
  body: JSON.stringify({
    name: 'John Doe',
    preferences: {
      theme: 'dark',
      notifications: true
    }
  })
})
```

## Error Handling

All API endpoints follow a consistent error response format:

```typescript
interface ErrorResponse {
  error: {
    code: string
    message: string
    details?: Record<string, any>
  }
}
```

Common error codes:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

## Rate Limiting

API requests are rate limited:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1620000000
```

## Webhooks

### Available Events
- `article.published`
- `article.updated`
- `article.deleted`
- `user.created`
- `user.updated`

### Webhook Payload
```typescript
interface WebhookPayload {
  event: string
  timestamp: string
  data: Record<string, any>
  signature: string
}
```

## SDK Usage

```typescript
import { ClarityWireClient } from '@claritywire/sdk'

const client = new ClarityWireClient({
  apiKey: process.env.CLARITYWIRE_API_KEY
})

// Get articles
const articles = await client.articles.list({
  page: 1,
  limit: 10
})

// Get article by ID
const article = await client.articles.get('123')

// Update user profile
const user = await client.users.updateProfile({
  name: 'John Doe'
})
```

## Best Practices

1. **Error Handling**
   - Always check for error responses
   - Implement proper retry logic
   - Handle rate limiting

2. **Authentication**
   - Store tokens securely
   - Implement token refresh
   - Handle authentication errors

3. **Performance**
   - Use pagination
   - Implement caching
   - Optimize request payloads

4. **Security**
   - Use HTTPS
   - Validate input
   - Sanitize output 