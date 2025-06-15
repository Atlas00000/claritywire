"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Bookmark, BookmarkCheck } from "lucide-react"

interface BookmarkButtonProps {
  articleId: number
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function BookmarkButton({ articleId, variant = "outline", size = "icon" }: BookmarkButtonProps) {
  const { toast } = useToast()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if article is bookmarked
    const savedBookmarks = localStorage.getItem("bookmarkedArticles")
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks)
      setIsBookmarked(bookmarks.includes(articleId))
    }
  }, [articleId])

  const handleToggleBookmark = async () => {
    setIsLoading(true)

    try {
      const newBookmarkedState = !isBookmarked
      setIsBookmarked(newBookmarkedState)

      // Update localStorage
      const savedBookmarks = localStorage.getItem("bookmarkedArticles")
      let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : []

      if (newBookmarkedState) {
        bookmarks.push(articleId)
      } else {
        bookmarks = bookmarks.filter((id: number) => id !== articleId)
      }

      localStorage.setItem("bookmarkedArticles", JSON.stringify(bookmarks))

      // In a real app, you would also update the server
      // await toggleBookmark(articleId, newBookmarkedState)

      toast({
        title: newBookmarkedState ? "Article bookmarked" : "Bookmark removed",
        description: newBookmarkedState
          ? "This article has been added to your bookmarks."
          : "This article has been removed from your bookmarks.",
      })
    } catch (error) {
      console.error("Failed to toggle bookmark:", error)
      // Revert UI state on error
      setIsBookmarked(!isBookmarked)

      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={variant} size={size} onClick={handleToggleBookmark} disabled={isLoading}>
            {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{isBookmarked ? "Remove bookmark" : "Bookmark this article"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
