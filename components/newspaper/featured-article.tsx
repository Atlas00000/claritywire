"use client"

import { motion } from "framer-motion"
import { Calendar, User, Clock, MessageSquare } from "lucide-react"
import Image from "next/image"

interface FeaturedArticleProps {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
  readTime: string
  commentCount: number
}

export function FeaturedArticle({
  title,
  excerpt,
  image,
  category,
  date,
  author,
  readTime,
  commentCount,
}: FeaturedArticleProps) {
  return (
    <motion.div
      className="featured-article"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="moving-image relative aspect-[16/9]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-lg"
            priority
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+ODhAR0dHSEhIR0dHR0dHR0dHR0dHR0f/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder.jpg';
            }}
          />
        </div>
        <div>
          <div className="article-category">{category}</div>
          <h2 className="article-title text-3xl md:text-4xl headline-animation">{title}</h2>
          <p className="article-excerpt drop-cap">{excerpt}</p>
          <div className="flex items-center text-xs text-gray-500 mt-4">
            <div className="flex items-center mr-4">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center mr-4">
              <User className="w-3 h-3 mr-1" />
              <span>{author}</span>
            </div>
            <div className="flex items-center mr-4">
              <Clock className="w-3 h-3 mr-1" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-3 h-3 mr-1" />
              <span>{commentCount}</span>
            </div>
          </div>
          <button className="newspaper-button mt-6">Read Full Story</button>
        </div>
      </div>
    </motion.div>
  )
}
