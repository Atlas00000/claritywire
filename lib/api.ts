// API functions for fetching data
import { newsArticles } from "./mock-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch articles by topic
export async function fetchArticlesByTopic(topicSlug: string) {
  // Simulate API call
  await delay(800)

  // In a real app, this would be an API call to your backend
  // For now, we'll filter the mock data to simulate topic-specific articles

  // Get a random subset of articles to simulate topic-specific content
  const randomArticles = [...newsArticles].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 6) + 3)

  return randomArticles.map((article) => ({
    ...article,
    // Randomly assign a badge if not already present
    badge: article.badge || ["Fact", "Analysis", "Opinion", "Verified"][Math.floor(Math.random() * 4)],
  }))
}

// Fetch articles by category
export async function fetchArticlesByCategory(categorySlug: string) {
  // Simulate API call
  await delay(800)

  // In a real app, this would be an API call to your backend
  // For now, we'll filter the mock data to simulate category-specific articles

  // Map category slugs to potential categories in our mock data
  const categoryMap: Record<string, string[]> = {
    politics: ["Politics", "Policy", "Government"],
    tech: ["Tech", "Technology", "Innovation"],
    climate: ["Climate", "Environment", "Sustainability"],
    economy: ["Economy", "Business", "Finance"],
    society: ["Society", "Culture", "Social"],
    health: ["Health", "Science", "Medicine"],
  }

  const relevantCategories = categoryMap[categorySlug] || []

  // Filter articles that might belong to this category
  // In a real app, you'd have proper category assignments
  let filteredArticles = newsArticles.filter((article) =>
    relevantCategories.some((cat) => article.category.includes(cat)),
  )

  // If no matches, return random articles
  if (filteredArticles.length === 0) {
    filteredArticles = [...newsArticles].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 6) + 3)
  }

  return filteredArticles
}

// Fetch article by slug
export async function fetchArticleBySlug(slug: string) {
  // Simulate API call
  await delay(600)

  // Find the article in our mock data
  const article = newsArticles.find((article) => article.slug === slug)

  if (!article) {
    throw new Error("Article not found")
  }

  return article
}

// Fetch comments for an article
export async function fetchComments(articleSlug: string) {
  // Simulate API call
  await delay(1000)

  // Generate mock comments
  const commentCount = Math.floor(Math.random() * 10) + 5
  const comments = Array.from({ length: commentCount }, (_, i) => ({
    id: i + 1,
    author: {
      name: `User ${i + 1}`,
      avatar: `/placeholder.svg?height=40&width=40`,
    },
    content: `This is a mock comment ${i + 1} for the article. In a real application, this would be fetched from a database.`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    likes: Math.floor(Math.random() * 50),
    replies:
      i % 3 === 0
        ? [
            {
              id: `${i + 1}-1`,
              author: {
                name: `Replier ${i + 1}-1`,
                avatar: `/placeholder.svg?height=40&width=40`,
              },
              content: `This is a reply to comment ${i + 1}.`,
              createdAt: new Date(Date.now() - Math.random() * 5000000000).toISOString(),
              likes: Math.floor(Math.random() * 20),
            },
          ]
        : [],
  }))

  return comments
}

// Add a comment to an article
export async function addComment(articleSlug: string, comment: { content: string; author: string }) {
  // Simulate API call
  await delay(500)

  // In a real app, this would send the comment to your backend
  console.log(`Adding comment to article ${articleSlug}:`, comment)

  // Return a mock response
  return {
    id: Date.now(),
    author: {
      name: comment.author || "Anonymous",
      avatar: `/placeholder.svg?height=40&width=40`,
    },
    content: comment.content,
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: [],
  }
}

// Toggle bookmark for an article
export async function toggleBookmark(articleId: number, isBookmarked: boolean) {
  // Simulate API call
  await delay(300)

  // In a real app, this would update the user's bookmarks in your backend
  console.log(`${isBookmarked ? "Bookmarking" : "Unbookmarking"} article ${articleId}`)

  // Return success
  return { success: true }
}

// Share article
export async function shareArticle(articleSlug: string, platform: string) {
  // Simulate API call
  await delay(200)

  // In a real app, this might track sharing analytics or generate sharing links
  console.log(`Sharing article ${articleSlug} on ${platform}`)

  // Return a mock sharing URL
  return {
    url: `https://claritywire.example.com/share/${platform}/${articleSlug}`,
    success: true,
  }
}
