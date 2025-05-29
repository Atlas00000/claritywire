"use client"

import { motion } from "framer-motion"
import { Calendar, User } from "lucide-react"
import Image from "next/image"

interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
}

interface ArticleGridProps {
  title: string
  articles: Article[]
}

export function ArticleGrid({ title, articles }: ArticleGridProps) {
  return (
    <section className="newspaper-section">
      <h2 className="newspaper-section-title">{title}</h2>
      <div className="article-grid">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            className="article-card article-hover-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative aspect-[4/3] mb-3">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
                quality={85}
              />
            </div>
            <div className="article-category">{article.category}</div>
            <h3 className="article-title">{article.title}</h3>
            <p className="article-excerpt">{article.excerpt}</p>
            <div className="article-meta">
              <span className="article-date flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {article.date}
              </span>
              <span className="article-author flex items-center">
                <User className="w-3 h-3 mr-1" />
                {article.author}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
