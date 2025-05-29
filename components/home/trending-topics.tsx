"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

// Mock data for trending topics
const trendingTopics = [
  {
    id: 1,
    name: "Climate Summit 2025",
    count: 1245,
    category: "Climate",
    slug: "climate-summit-2025",
  },
  {
    id: 2,
    name: "Quantum Computing Breakthrough",
    count: 987,
    category: "Technology",
    slug: "quantum-computing-breakthrough",
  },
  {
    id: 3,
    name: "Global Economic Forum",
    count: 876,
    category: "Economy",
    slug: "global-economic-forum",
  },
  {
    id: 4,
    name: "Healthcare Equity Initiative",
    count: 743,
    category: "Health",
    slug: "healthcare-equity-initiative",
  },
  {
    id: 5,
    name: "Space Exploration Milestone",
    count: 692,
    category: "Science",
    slug: "space-exploration-milestone",
  },
]

// Category colors
const categoryColors = {
  Climate: "bg-green-100 text-green-800 border-green-200",
  Technology: "bg-blue-100 text-blue-800 border-blue-200",
  Economy: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Health: "bg-red-100 text-red-800 border-red-200",
  Science: "bg-purple-100 text-purple-800 border-purple-200",
  Politics: "bg-orange-100 text-orange-800 border-orange-200",
  Society: "bg-pink-100 text-pink-800 border-pink-200",
  Culture: "bg-indigo-100 text-indigo-800 border-indigo-200",
}

export default function TrendingTopics() {
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
    <section ref={ref} className="w-full py-6">
      <div className="px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="flex items-center justify-between" variants={itemVariants}>
            <h2 className="section-heading">Trending Topics</h2>
            <p className="text-sm text-muted-foreground max-w-md font-body-serif">
              Stay informed on what's capturing global attention right now.
            </p>
          </motion.div>

          <motion.div className="space-y-6" variants={containerVariants}>
            <div className="rounded-sm border bg-card shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 font-serif">Most Discussed</h3>
                <ul className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <motion.li
                      key={topic.id}
                      className="flex items-center justify-between"
                      variants={itemVariants}
                      custom={index}
                    >
                      <Link href={`/topic/${topic.slug}`} className="flex items-center group">
                        <span className="text-2xl font-bold text-primary mr-4 w-8 font-serif">{index + 1}</span>
                        <span className="font-medium group-hover:text-primary transition-colors font-serif">
                          {topic.name}
                        </span>
                      </Link>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-muted-foreground font-body-serif">{topic.count} articles</span>
                        <Badge className={`${categoryColors[topic.category as keyof typeof categoryColors]}`}>
                          {topic.category}
                        </Badge>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="border-t p-4 flex justify-center">
                <Link href="/topics" className="flex items-center text-sm font-medium text-primary font-body-serif">
                  View all trending topics
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
