import { NextResponse } from "next/server"

// Mock comments database
const comments: any[] = []

// GET /api/comments?articleSlug=xxx
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const articleSlug = searchParams.get("articleSlug")

  if (!articleSlug) {
    return NextResponse.json({ error: "Article slug is required" }, { status: 400 })
  }

  // Filter comments for the specified article
  const articleComments = comments.filter((comment) => comment.articleSlug === articleSlug)

  return NextResponse.json(articleComments)
}

// POST /api/comments
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { articleSlug, content, author } = body

    if (!articleSlug || !content) {
      return NextResponse.json({ error: "Article slug and content are required" }, { status: 400 })
    }

    // Create a new comment
    const newComment = {
      id: Date.now(),
      articleSlug,
      content,
      author: {
        name: author || "Anonymous",
        avatar: `/placeholder.svg?height=40&width=40`,
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    }

    // Add to our mock database
    comments.push(newComment)

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}
