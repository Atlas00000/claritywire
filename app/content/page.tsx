"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { ErrorBoundary } from 'react-error-boundary'
import { 
  Newspaper,
  BookOpen,
  Clock,
  Calendar,
  TrendingUp,
  Bookmark,
  Share2,
  MessageCircle,
  Heart,
  Eye,
  BookmarkCheck,
  Filter,
  Search,
  ChevronDown,
  Tag,
  ArrowRight,
  Users,
  Star,
  BookText,
  X,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  ChevronRight,
  ChevronLeft
} from "lucide-react"
import { BarChart } from "lucide-react"
import dynamic from 'next/dynamic'

// Dynamically import components that use window
const ReadingProgress = dynamic(() => import('@/components/ReadingProgress'), { ssr: false })
const ContentCarousel = dynamic(() => import('@/components/ContentCarousel'), { ssr: false })

// Types
type Content = {
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
  comments: number
  isBookmarked?: boolean
  isFeatured?: boolean
}

// Add new types
type QuickViewContent = Content & {
  fullText: string
  tags: string[]
  relatedArticles: string[]
}

type ShareOptions = {
  twitter: string
  facebook: string
  linkedin: string
  copyLink: string
}

// Mock data
const mockContents: Content[] = [
  {
    id: "1",
    title: "The Future of Digital Journalism",
    excerpt: "Exploring how technology is reshaping the way we consume and interact with news...",
    image: "/images/articles/journalism/digital-journalism.jpg",
    date: "May 16, 2025",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/contributors/sarah-johnson.jpg"
    },
    category: "Journalism",
    readTime: "8 min read",
    views: 12345,
    likes: 789,
    comments: 123,
    isFeatured: true
  },
  {
    id: "2",
    title: "The Rise of AI in Content Creation",
    excerpt: "How artificial intelligence is transforming the way we create and consume content...",
    image: "/images/articles/tech/ai-content.jpg",
    date: "May 15, 2025",
    author: {
      name: "Michael Chen",
      avatar: "/images/contributors/michael-chen.jpg"
    },
    category: "Technology",
    readTime: "6 min read",
    views: 9876,
    likes: 654,
    comments: 98,
    isFeatured: true
  },
  {
    id: "3",
    title: "The Evolution of Social Media",
    excerpt: "From simple networking to complex ecosystems: how social media has changed our world...",
    image: "/images/articles/tech/social-media.jpg",
    date: "May 14, 2025",
    author: {
      name: "Emma Wilson",
      avatar: "/images/contributors/emma-wilson.jpg"
    },
    category: "Social Media",
    readTime: "7 min read",
    views: 8765,
    likes: 543,
    comments: 87,
    isFeatured: false
  },
  {
    id: "4",
    title: "The Future of Work",
    excerpt: "Remote work, automation, and the changing landscape of employment...",
    image: "/images/articles/business/future-work.jpg",
    date: "May 13, 2025",
    author: {
      name: "David Brown",
      avatar: "/images/contributors/david-brown.jpg"
    },
    category: "Business",
    readTime: "9 min read",
    views: 7654,
    likes: 432,
    comments: 76,
    isFeatured: false
  },
  {
    id: "5",
    title: "Climate Change Solutions",
    excerpt: "Innovative approaches to addressing the global climate crisis...",
    image: "/images/articles/climate/climate-solutions.jpg",
    date: "May 12, 2025",
    author: {
      name: "Lisa Martinez",
      avatar: "/images/contributors/lisa-martinez.jpg"
    },
    category: "Environment",
    readTime: "10 min read",
    views: 6543,
    likes: 321,
    comments: 65,
    isFeatured: false
  },
  {
    id: "6",
    title: "The Future of Education",
    excerpt: "How technology is transforming learning and teaching methods...",
    image: "/images/articles/education/future-education.jpg",
    date: "May 11, 2025",
    author: {
      name: "James Wilson",
      avatar: "/images/contributors/james-wilson.jpg"
    },
    category: "Education",
    readTime: "8 min read",
    views: 5432,
    likes: 210,
    comments: 54,
    isFeatured: false
  }
]

// Add new mock data
const mockQuickViewContent: QuickViewContent = {
  id: "1",
  title: "The Future of Digital Journalism",
  excerpt: "Exploring how technology is reshaping the way we consume and interact with news...",
  fullText: "Full article text here...",
  image: "/images/articles/journalism/digital-journalism.jpg",
  date: "May 16, 2025",
  author: {
    name: "Sarah Johnson",
    avatar: "/images/contributors/sarah-johnson.jpg"
  },
  category: "Journalism",
  readTime: "8 min read",
  views: 12345,
  likes: 789,
  comments: 123,
  isFeatured: true,
  tags: ["Journalism", "Technology", "Future"],
  relatedArticles: ["Article 1", "Article 2", "Article 3"]
}

// Components
const ContentHero = () => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl mb-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative p-8">
        <motion.div 
          className="text-6xl mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          📚
        </motion.div>
        <motion.h1 
          className="text-4xl font-serif font-bold mb-2 text-gray-900 dark:text-white"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Content Library
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Discover in-depth articles, research papers, and thought-provoking content
        </motion.p>
        <motion.div 
          className="flex items-center space-x-6 text-gray-600 dark:text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            1,234 Articles
          </span>
          <span className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            45.6K Readers
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

const FeaturedContent = ({ content }: { content: Content }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(content.isBookmarked)

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
          src={content.image} 
          alt={content.title}
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
              src={content.author.avatar} 
              alt={content.author.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <div className="font-medium">{content.author.name}</div>
              <div className="text-sm opacity-80">{content.date}</div>
            </div>
          </motion.div>
          <motion.h2 
            className="text-3xl font-serif font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {content.title}
          </motion.h2>
          <motion.p 
            className="text-lg opacity-90 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {content.excerpt}
          </motion.p>
          <motion.div 
            className="flex items-center justify-between"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 hover:text-blue-300 transition-colors">
                <Heart className="w-5 h-5" />
                <span>{content.likes}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-blue-300 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{content.comments}</span>
              </button>
              <ArticleStats content={content} />
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                className="flex items-center space-x-2 hover:text-blue-300 transition-colors"
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
              <ShareMenu content={content} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

const ContentGrid = ({ contents, title }: { contents: Content[], title: string }) => {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedContent, setSelectedContent] = useState<QuickViewContent | null>(null)
  const observer = useRef<IntersectionObserver>()
  const lastContentRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1)
        setIsLoading(true)
        // Simulate loading more content
        setTimeout(() => setIsLoading(false), 1000)
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoading])

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
        {contents.map((content, index) => (
          <motion.article
            key={content.id}
            ref={index === contents.length - 1 ? lastContentRef : null}
            className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-gray-100 dark:border-gray-700 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedContent(mockQuickViewContent)}
          >
            <div className="relative">
              <img 
                src={content.image} 
                alt={content.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                  {content.category}
                </span>
                <span className="text-sm text-gray-500">{content.date}</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">{content.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{content.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img 
                    src={content.author.avatar} 
                    alt={content.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{content.author.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{content.readTime}</span>
                  <span>{content.views} views</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      {isLoading && (
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
        </motion.div>
      )}
      <AnimatePresence>
        {selectedContent && (
          <QuickView 
            content={selectedContent} 
            onClose={() => setSelectedContent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const ContentFilters = () => {
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
          <h3 className="font-semibold">Filter Content</h3>
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
                placeholder="Search in content..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const PopularCategories = () => {
  const categories = [
    "Journalism",
    "Research",
    "Analysis",
    "Opinion",
    "Investigative",
    "Feature"
  ]

  return (
    <motion.div 
      className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="font-semibold mb-4">Popular Categories</h3>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 5 }}
          >
            <span className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-blue-500" />
              {category}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Add new components
const QuickView = ({ content, onClose }: { content: QuickViewContent, onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="relative">
          <img 
            src={content.image} 
            alt={content.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-serif font-bold mb-4">{content.title}</h2>
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src={content.author.avatar} 
              alt={content.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-medium">{content.author.name}</div>
              <div className="text-sm text-gray-500">{content.date}</div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{content.fullText}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {content.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Related Articles</h3>
            <ul className="space-y-2">
              {content.relatedArticles.map(article => (
                <li key={article} className="text-blue-600 hover:underline cursor-pointer">
                  {article}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Update Newsletter Signup with a more minimalistic design
const NewsletterSignup = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center mb-2">
        <BookText className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
        <h4 className="font-semibold text-gray-900 dark:text-white">Stay Updated</h4>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Get the latest content delivered to your inbox.
      </p>
      <form className="flex">
        <input 
          type="email" 
          placeholder="Your email" 
          className="flex-1 px-3 py-2 rounded-l-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        />
        <button 
          type="submit" 
          className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </motion.div>
  )
}

const ArticleStats = ({ content }: { content: Content }) => {
  return (
    <motion.div 
      className="flex items-center space-x-4 text-sm text-gray-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <span className="flex items-center">
        <Clock className="w-4 h-4 mr-1" />
        {content.readTime}
      </span>
      <span className="flex items-center">
        <Eye className="w-4 h-4 mr-1" />
        {content.views.toLocaleString()} views
      </span>
      <span className="flex items-center">
        <BarChart className="w-4 h-4 mr-1" />
        Trending
      </span>
    </motion.div>
  )
}

// Add new widgets
const TopContributors = () => {
  const contributors = [
    { name: "Sarah Johnson", articles: 45, avatar: "/images/contributors/sarah-johnson.jpg" },
    { name: "Michael Chen", articles: 38, avatar: "/images/contributors/michael-chen.jpg" },
    { name: "Emma Wilson", articles: 32, avatar: "/images/contributors/emma-wilson.jpg" },
    { name: "David Brown", articles: 29, avatar: "/images/contributors/david-brown.jpg" },
    { name: "Lisa Martinez", articles: 27, avatar: "/images/contributors/lisa-martinez.jpg" }
  ]

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Top Contributors</h3>
        <Users className="w-5 h-5 text-blue-500" />
      </div>
      <div className="space-y-3">
        {contributors.map((contributor, index) => (
          <motion.div
            key={contributor.name}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-center space-x-3">
              <img 
                src={contributor.avatar} 
                alt={contributor.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{contributor.name}</span>
            </div>
            <span className="text-sm text-gray-500">{contributor.articles} articles</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const ContentSeries = () => {
  const series = [
    { 
      title: "The Digital Revolution", 
      description: "Exploring the impact of technology on society",
      articles: 12,
      image: "/images/articles/tech/digital-revolution.jpg"
    },
    { 
      title: "Future of Work", 
      description: "How work is changing in the 21st century",
      articles: 8,
      image: "/images/articles/business/future-work.jpg"
    },
    { 
      title: "Climate Action", 
      description: "Solutions for a sustainable future",
      articles: 10,
      image: "/images/articles/climate/climate-action.jpg"
    }
  ]

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Featured Series</h3>
        <BookOpen className="w-5 h-5 text-blue-500" />
      </div>
      <div className="space-y-4">
        {series.map((item, index) => (
          <motion.div
            key={item.title}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h4 className="font-semibold mb-1">{item.title}</h4>
              <p className="text-sm opacity-90 mb-2">{item.description}</p>
              <div className="flex items-center text-sm">
                <span>{item.articles} articles</span>
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Add SearchBar component
const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="relative flex-1"
            animate={{ width: isExpanded ? "100%" : "200px" }}
            transition={{ duration: 0.3 }}
          >
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setIsExpanded(false)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </motion.div>
          <motion.button
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Add TrendingTopics component
const TrendingTopics = () => {
  const topics = [
    { name: "Artificial Intelligence", count: 45, trend: "up" },
    { name: "Climate Change", count: 38, trend: "up" },
    { name: "Digital Privacy", count: 32, trend: "up" },
    { name: "Remote Work", count: 29, trend: "down" },
    { name: "Sustainable Tech", count: 27, trend: "up" }
  ]

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Trending Topics</h3>
        <TrendingUp className="w-5 h-5 text-blue-500" />
      </div>
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.name}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 5 }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">{topic.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{topic.count} articles</span>
              <motion.div
                className={`w-4 h-4 ${
                  topic.trend === "up" 
                    ? "text-green-500" 
                    : "text-red-500"
                }`}
                animate={{ y: topic.trend === "up" ? [0, -2, 0] : [0, 2, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {topic.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingUp className="w-4 h-4 transform rotate-180" />
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Add error fallback component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold text-red-600">Something went wrong:</h2>
      <pre className="mt-2 text-sm text-gray-600">{error.message}</pre>
    </div>
  )
}

// Main Content Page Component
export default function ContentPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 50)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  if (!isClient) {
    return null // or a loading state
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Masthead />
        <main className="container mx-auto px-4 py-8">
          <ContentHero />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <SearchBar />
              <ContentCarousel />
              
              {mockContents.filter(content => content.isFeatured).map(content => (
                <FeaturedContent key={content.id} content={content} />
              ))}
              
              <ContentFilters />
              
              <ContentGrid 
                contents={mockContents.filter(content => !content.isFeatured)} 
                title="Latest Content" 
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <TrendingTopics />
              <TopContributors />
              <ContentSeries />
              <PopularCategories />
              <NewsletterSignup />
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
} 