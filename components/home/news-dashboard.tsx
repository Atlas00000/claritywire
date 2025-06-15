"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ArrowUpRight, ThumbsUp } from "lucide-react"

// Mock data for news articles
const newsArticles = [
  {
    id: 1,
    title: "AI Regulation Takes Center Stage in Global Policy Debate",
    category: "Tech & Politics",
    badge: "Verified",
    image: "/images/news-1.png",
    readTime: "4 min read",
    likes: 245,
    slug: "ai-regulation-global-policy",
  },
  {
    id: 2,
    title: "New Research Shows Accelerated Glacier Melt in Antarctica",
    category: "Climate & Environment",
    badge: "Analysis",
    image: "/images/news-2.png",
    readTime: "6 min read",
    likes: 189,
    slug: "glacier-melt-antarctica-research",
  },
  {
    id: 3,
    title: "Global Supply Chain Resilience Tested by New Trade Policies",
    category: "Economy & Business",
    badge: "Fact",
    image: "/images/news-3.png",
    readTime: "5 min read",
    likes: 132,
    slug: "supply-chain-resilience-trade",
  },
]

export default function NewsDashboard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section ref={ref} className="w-full py-6 paper-fold paper-fold-left paper-fold-right">
      <div className="px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="flex items-center justify-between" variants={itemVariants}>
            <h2 className="section-heading">Today's Headlines</h2>
            <Link href="/news" className="flex items-center text-sm font-medium text-primary font-body-serif">
              View all news
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-3" variants={containerVariants}>
            {newsArticles.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Link href={`/article/${article.slug}`}>
                  <Card className="news-card hover:animate-paperFold">
                    <div className="relative h-48 w-full overflow-hidden article-image">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className={`badge badge-${article.badge.toLowerCase()}`}>
                          {article.badge}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <div className="text-sm text-muted-foreground font-body-serif">{article.category}</div>
                      <CardTitle className="line-clamp-2 text-lg newspaper-card-title">{article.title}</CardTitle>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground font-body-serif">
                        <Clock className="mr-1 h-3 w-3" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground font-body-serif">
                        <ThumbsUp className="mr-1 h-3 w-3" />
                        {article.likes}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
