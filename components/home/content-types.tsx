"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowUpRight, ThumbsUp } from "lucide-react"

// Mock data for content types
const contentTypes = {
  fact: [
    {
      id: 1,
      title: "Universal Basic Income Trials Show Mixed Economic Results",
      category: "Economy & Policy",
      badge: "Fact",
      image: "/images/fact-1.png",
      readTime: "3 min read",
      likes: 178,
      slug: "ubi-trials-economic-results",
    },
    {
      id: 2,
      title: "Quantum Computing Reaches New Milestone",
      category: "Tech & Science",
      badge: "Fact",
      image: "/images/fact-2.png",
      readTime: "4 min read",
      likes: 203,
      slug: "quantum-computing-milestone",
    },
  ],
  analysis: [
    {
      id: 3,
      title: "Diplomatic Tensions Rise in South China Sea Dispute",
      category: "Politics & International",
      badge: "Analysis",
      image: "/images/analysis-1.png",
      readTime: "7 min read",
      likes: 156,
      slug: "south-china-sea-tensions",
    },
    {
      id: 4,
      title: "The Implications of Digital Art in Modern Culture",
      category: "Culture & Society",
      badge: "Analysis",
      image: "/images/analysis-2.png",
      readTime: "5 min read",
      likes: 142,
      slug: "digital-art-implications",
    },
  ],
  opinion: [
    {
      id: 5,
      title: "Why We Need to Rethink Urban Planning Post-Pandemic",
      category: "Society & Urban",
      badge: "Opinion",
      image: "/images/opinion-1.png",
      readTime: "6 min read",
      likes: 189,
      slug: "urban-planning-post-pandemic",
    },
    {
      id: 6,
      title: "The Future of Sustainable Computing: Beyond Energy Efficiency",
      category: "Tech & Environment",
      badge: "Opinion",
      image: "/images/opinion-2.png",
      readTime: "8 min read",
      likes: 215,
      slug: "sustainable-computing-future",
    },
  ],
}

export default function ContentTypes() {
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
            <h2 className="section-heading">Content Categories</h2>
            <Link href="/content-types" className="flex items-center text-sm font-medium text-primary font-body-serif">
              Learn about our content
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="fact" className="w-full">
              <TabsList className="newspaper-tabs grid w-full grid-cols-3 mb-8">
                <TabsTrigger className="newspaper-tab" value="fact">
                  Fact
                </TabsTrigger>
                <TabsTrigger className="newspaper-tab" value="analysis">
                  Analysis
                </TabsTrigger>
                <TabsTrigger className="newspaper-tab" value="opinion">
                  Opinion
                </TabsTrigger>
              </TabsList>
              {Object.entries(contentTypes).map(([type, articles]) => (
                <TabsContent key={type} value={type} className="mt-0">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {articles.map((article) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
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
                              <CardTitle className="line-clamp-2 text-lg newspaper-card-title">
                                {article.title}
                              </CardTitle>
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
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
