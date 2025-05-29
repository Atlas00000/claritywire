import { NextResponse } from "next/server"
import { newsArticles } from "@/lib/mock-data"

// GET /api/articles/[slug]
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug

  // Find the article with the matching slug
  const article = newsArticles.find((article) => article.slug === slug)

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 })
  }

  return NextResponse.json(article)
}
