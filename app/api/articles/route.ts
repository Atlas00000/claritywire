import { NextResponse } from "next/server"
import { newsArticles } from "@/lib/mock-data"

// GET /api/articles
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Parse query parameters
  const category = searchParams.get("category")
  const topic = searchParams.get("topic")
  const badge = searchParams.get("badge")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const page = Number.parseInt(searchParams.get("page") || "1")

  // Filter articles based on query parameters
  let filteredArticles = [...newsArticles]

  if (category) {
    filteredArticles = filteredArticles.filter((article) =>
      article.category.toLowerCase().includes(category.toLowerCase()),
    )
  }

  if (topic) {
    // In a real app, you would have a proper relationship between topics and articles
    // For now, we'll just do a simple string match on the title or category
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(topic.toLowerCase()) ||
        article.category.toLowerCase().includes(topic.toLowerCase()),
    )
  }

  if (badge) {
    filteredArticles = filteredArticles.filter((article) => article.badge.toLowerCase() === badge.toLowerCase())
  }

  // Calculate pagination
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  // Return response with pagination metadata
  return NextResponse.json({
    articles: paginatedArticles,
    pagination: {
      total: filteredArticles.length,
      page,
      limit,
      pages: Math.ceil(filteredArticles.length / limit),
    },
  })
}
