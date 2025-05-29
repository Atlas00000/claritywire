"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Calendar,
  TrendingUp,
  Clock,
  Filter,
  Search,
  ChevronDown,
  Newspaper,
  BookOpen,
  Users,
  Tag,
  ArrowRight,
  Bookmark,
  Share2,
  MessageCircle,
  Heart,
  Eye,
  BookmarkCheck
} from "lucide-react"

// Types
type Topic = {
  slug: string
  name: string
  description: string
  color: string
  icon: string
  articleCount: number
  followers: number
  relatedTopics: string[]
  featuredArticles: Article[]
  latestArticles: Article[]
  popularArticles: Article[]
}

type Article = {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  author: {
    name: string
    avatar: string
  }
  topic: string
  readTime: string
  views: number
  likes: number
  comments: number
  isBookmarked?: boolean
}

// Mock data
const mockTopic: Topic = {
  slug: "artificial-intelligence",
  name: "Artificial Intelligence",
  description: "Exploring the frontiers of AI, machine learning, and their impact on society",
  color: "purple",
  icon: "🤖",
  articleCount: 89,
  followers: 45600,
  relatedTopics: ["Machine Learning", "Deep Learning", "Neural Networks", "Computer Vision"],
  featuredArticles: [
    {
      id: "1",
      title: "The Evolution of AI: From Simple Algorithms to Complex Neural Networks",
      excerpt: "A comprehensive look at how artificial intelligence has evolved over the decades...",
      image: "/placeholder.svg?height=400&width=800",
      date: "May 16, 2025",
      author: {
        name: "Dr. Sarah Chen",
        avatar: "/placeholder.svg?height=32&width=32"
      },
      topic: "Artificial Intelligence",
      readTime: "8 min read",
      views: 12345,
      likes: 789,
      comments: 123
    }
  ],
  latestArticles: [],
  popularArticles: []
}

// Components
const TopicHero = ({ topic }: { topic: Topic }) => {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90" />
      <div className="relative p-8 text-white">
        <motion.div 
          className="text-6xl mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {topic.icon}
        </motion.div>
        <motion.h1 
          className="text-4xl font-serif font-bold mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {topic.name}
        </motion.h1>
        <motion.p 
          className="text-lg opacity-90 mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {topic.description}
        </motion.p>
        <motion.div 
          className="flex items-center space-x-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center">
            <Newspaper className="w-5 h-5 mr-2" />
            {topic.articleCount} Articles
          </span>
          <span className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            {topic.followers.toLocaleString()} Followers
          </span>
          <motion.button
            className={`px-6 py-2 rounded-lg font-semibold ${
              isFollowing 
                ? 'bg-white/20 hover:bg-white/30' 
                : 'bg-white text-purple-600 hover:bg-gray-100'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? 'Following' : 'Follow Topic'}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

const FeaturedArticle = ({ article }: { article: Article }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked)

  return (
    <motion.article
      className="relative overflow-hidden rounded-xl mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-[400px]">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        />
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          <motion.div 
            className="flex items-center space-x-4 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <div className="font-medium">{article.author.name}</div>
              <div className="text-sm opacity-80">{article.date}</div>
            </div>
          </motion.div>
          <motion.h2 
            className="text-3xl font-serif font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {article.title}
          </motion.h2>
          <motion.p 
            className="text-lg opacity-90 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {article.excerpt}
          </motion.p>
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className="flex items-center space-x-2 hover:text-purple-300 transition-colors">
              <Heart className="w-5 h-5" />
              <span>{article.likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-purple-300 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{article.comments}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-purple-300 transition-colors">
              <Eye className="w-5 h-5" />
              <span>{article.views}</span>
            </button>
            <motion.button
              className="flex items-center space-x-2 hover:text-purple-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 hover:text-purple-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

const ArticleGrid = ({ articles, title }: { articles: Article[], title: string }) => {
  return (
    <div className="mb-12">
      <motion.h2 
        className="text-2xl font-serif font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.article
            key={article.id}
            className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs">
                  {article.topic}
                </span>
                <span className="text-sm text-gray-500">{article.date}</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">{article.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{article.author.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{article.readTime}</span>
                  <span>{article.views} views</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

const RelatedTopics = ({ topics }: { topics: string[] }) => {
  return (
    <motion.div 
      className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="font-semibold mb-4">Related Topics</h3>
      <div className="space-y-2">
        {topics.map((topic, index) => (
          <motion.div
            key={topic}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 5 }}
          >
            <span className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-purple-500" />
              {topic}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Main Topic Page Component
export default function TopicPage({ params }: { params: { slug: string } }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div 
        className={`sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Masthead />
      </motion.div>

      <div className="newspaper-container py-8">
        <TopicHero topic={mockTopic} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {mockTopic.featuredArticles.map(article => (
              <FeaturedArticle key={article.id} article={article} />
            ))}
            
            <ArticleGrid 
              articles={mockTopic.latestArticles} 
              title="Latest Articles" 
            />
            
            <ArticleGrid 
              articles={mockTopic.popularArticles} 
              title="Popular Articles" 
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <RelatedTopics topics={mockTopic.relatedTopics} />
            
            {/* Newsletter Signup */}
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl shadow-lg p-4 text-white backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center mb-2">
                <Newspaper className="w-5 h-5 mr-2" />
                <h4 className="font-semibold">Stay Updated</h4>
              </div>
              <p className="text-sm mb-2">Get the latest articles on {mockTopic.name} delivered to your inbox.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 rounded-l-lg text-gray-900" 
                />
                <button 
                  type="submit" 
                  className="bg-white text-purple-600 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
} 