import { NextResponse } from "next/server"

// In a real app, this would be stored in a database
// For this demo, we'll just use an in-memory store
// Note: This won't persist across server restarts
const userBookmarks: Record<string, number[]> = {}

// GET /api/bookmarks?userId=xxx
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "anonymous"

  const bookmarks = userBookmarks[userId] || []

  return NextResponse.json({ bookmarks })
}

// POST /api/bookmarks
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId = "anonymous", articleId } = body

    if (!articleId) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 })
    }

    // Initialize user's bookmarks if they don't exist
    if (!userBookmarks[userId]) {
      userBookmarks[userId] = []
    }

    // Check if article is already bookmarked
    const isBookmarked = userBookmarks[userId].includes(articleId)

    if (isBookmarked) {
      // Remove bookmark
      userBookmarks[userId] = userBookmarks[userId].filter((id) => id !== articleId)
      return NextResponse.json({ bookmarked: false, bookmarks: userBookmarks[userId] })
    } else {
      // Add bookmark
      userBookmarks[userId].push(articleId)
      return NextResponse.json({ bookmarked: true, bookmarks: userBookmarks[userId] })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update bookmark" }, { status: 500 })
  }
}
