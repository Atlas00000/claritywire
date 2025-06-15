"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ThumbsUp } from "lucide-react"

// Mock data for personalized content
const personalizedContent = {
  forYou: [
    {
      id: 1,
      title: "The Future of Sustainable Computing: Beyond Energy Efficiency",
      category: "Tech & Environment",
      badge: "Opinion",
      image: "/images/personalized-1.png",
      readTime: "8 min read",
      likes: 215,
      slug: "sustainable-computing-future",
    },
    {
      id: 2,
      title: "Remote Work Revolution: Economic Impact on Urban Centers",
      category: "Economy & Society",
      badge: "Analysis",
      image: "/images/personalized-2.png",
      readTime: "6 min read",
      likes: 178,
      slug: "remote-work-economic-impact",
    },
  ],
  opposingViews: [
    {
      id: 3,
      title: "The Case Against Universal Basic Income",
      category: "Economy & Policy",
      badge: "Opinion",
      image: "/images/opposing-1.png",
      readTime: "7 min read",
      likes: 143,
      slug: "case-against-ubi",
    },
    {
      id: 4,
      title: "Why Traditional Energy Sources Still Matter in the Green Transition",
      category: "Energy & Environment",
      badge: "Analysis",
      image: "/images/opposing-2.png",
      readTime: "5 min read",
      likes: 156,
      slug: "traditional-energy-green-transition",
    },
  ],
  discover: [
    {
      id: 5,
      title: "Quantum Computing's Potential Impact on Cryptography",
      category: "Tech & Security",
      badge: "Analysis",
      image: "/images/discover-1.png",
      readTime: "9 min read",
      likes: 198,
      slug: "quantum-computing-cryptography",
    },
    {
      id: 6,
      title: "The Evolution of Public Health Systems Post-Pandemic",
      category: "Health & Policy",
      badge: "Fact",
      image: "/images/discover-2.png",
      readTime: "6 min read",
      likes: 167,
      slug: "public-health-post-pandemic",
    },
  ],
}

export default function PersonalizedSection() {
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
    <section ref={ref} className="w-full py-6 paper-fold paper-fold-left">
      <div className="px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="flex items-center justify-between" variants={itemVariants}>
            <h2 className="section-heading">Personalized For You</h2>
            <p className="text-sm text-muted-foreground max-w-md font-body-serif">
              Content tailored to your interests, with opposing viewpoints to broaden your perspective.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="forYou" className="w-full">
              <TabsList className="newspaper-tabs grid w-full grid-cols-3 mb-8">
                <TabsTrigger className="newspaper-tab" value="forYou">
                  For You
                </TabsTrigger>
                <TabsTrigger className="newspaper-tab" value="opposingViews">
                  Opposing Views
                </TabsTrigger>
                <TabsTrigger className="newspaper-tab" value="discover">
                  Discover
                </TabsTrigger>
              </TabsList>
              {Object.entries(personalizedContent).map(([type, articles]) => (
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
