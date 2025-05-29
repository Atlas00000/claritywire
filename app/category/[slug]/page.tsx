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
  ArrowRight
} from "lucide-react"

// Types
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
  category: string
  readTime: string
  views: number
  likes: number
}

type Category = {
  slug: string
  name: string
  description: string
  color: string
  icon: string
  articleCount: number
  trendingTopics: string[]
}

// Mock data
const mockCategory: Category = {
  slug: "technology",
  name: "Technology",
  description: "Latest news and insights from the world of technology",
  color: "blue",
  icon: "💻",
  articleCount: 156,
  trendingTopics: ["AI", "Blockchain", "Cybersecurity", "Cloud Computing"]
}

const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Artificial Intelligence in Healthcare",
    excerpt: "Exploring how AI is revolutionizing medical diagnosis and treatment...",
    image: "/placeholder.svg?height=200&width=300",
    date: "May 16, 2025",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32"
    },
    category: "Technology",
    readTime: "5 min read",
    views: 1234,
    likes: 89
  },
  // Add more mock articles...
]

// Components
const CategoryHero = ({ category }: { category: Category }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
      <div className="relative p-8 text-white">
        <motion.div 
          className="text-6xl mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {category.icon}
        </motion.div>
        <motion.h1 
          className="text-4xl font-serif font-bold mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {category.name}
        </motion.h1>
        <motion.p 
          className="text-lg opacity-90"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {category.description}
        </motion.p>
        <motion.div 
          className="mt-4 flex items-center space-x-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center">
            <Newspaper className="w-5 h-5 mr-2" />
            {category.articleCount} Articles
          </span>
          <span className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            1.2M Readers
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

const ArticleCard = ({ article }: { article: Article }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
            {article.category}
          </span>
          <span className="text-sm text-gray-500">{article.date}</span>
        </div>
        <h2 className="text-xl font-serif font-bold mb-2">{article.title}</h2>
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
  )
}

const CategoryFilters = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div 
      className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Filter className="w-5 h-5 mr-2 text-blue-500" />
          <h3 className="font-semibold">Filter Articles</h3>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Calendar className="w-5 h-5" />
                <span>Date</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <TrendingUp className="w-5 h-5" />
                <span>Popularity</span>
              </button>
            </div>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search in category..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const TrendingTopics = ({ topics }: { topics: string[] }) => {
  return (
    <motion.div 
      className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="font-semibold mb-4">Trending Topics</h3>
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
              <Tag className="w-4 h-4 mr-2 text-blue-500" />
              {topic}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Main Category Page Component
export default function CategoryPage({ params }: { params: { slug: string } }) {
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
        <CategoryHero category={mockCategory} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <CategoryFilters />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <TrendingTopics topics={mockCategory.trendingTopics} />
            
            {/* Newsletter Signup */}
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-4 text-white backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center mb-2">
                <Newspaper className="w-5 h-5 mr-2" />
                <h4 className="font-semibold">Stay Updated</h4>
              </div>
              <p className="text-sm mb-2">Get the latest articles delivered to your inbox.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 rounded-l-lg text-gray-900" 
                />
                <button 
                  type="submit" 
                  className="bg-white text-blue-600 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors"
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