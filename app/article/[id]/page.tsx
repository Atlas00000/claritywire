"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Bookmark,
  Share2,
  MessageCircle,
  Clock,
  User,
  Heart,
  BookOpen,
  Newspaper,
  Tag,
  ChevronUp,
  ChevronDown,
  ZoomIn,
  Sun,
  Moon,
  Type,
  List,
  ExternalLink,
  Twitter,
  Facebook,
  Linkedin,
  Link,
  Volume2,
  VolumeX,
  Contrast,
  Headphones
} from "lucide-react"

// Types
type Article = {
  id: string
  title: string
  category: string
  date: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  content: string
  image: string
  readTime: string
  tags: string[]
  likes: number
  comments: number
  shares: number
}

// Add new types
type TableOfContents = {
  id: string
  title: string
  level: number
}

// Add new types
type Comment = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  date: string
  likes: number
  replies: Comment[]
}

// Mock data
const mockArticle: Article = {
  id: "1",
  title: "The Future of Digital Journalism: A Deep Dive into Modern News Consumption",
  category: "TECHNOLOGY",
  date: "May 16, 2025",
  author: {
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Senior Technology Editor"
  },
  content: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
  `,
  image: "/placeholder.svg?height=400&width=800",
  readTime: "5 min read",
  tags: ["Journalism", "Technology", "Media", "Digital"],
  likes: 245,
  comments: 89,
  shares: 156
}

// Paper texture style
const paperTexture = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
}

// Reading Progress Component
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <motion.div 
      className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
      style={{ width: `${progress}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.1 }}
    />
  )
}

// Article Actions Component
const ArticleActions = ({ article }: { article: Article }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div 
      className="flex items-center space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSaved(!isSaved)}
        className={`flex items-center space-x-1 ${
          isSaved ? 'text-blue-500' : 'text-gray-500'
        }`}
      >
        <Bookmark className="w-5 h-5" />
        <span className="text-sm">Save</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsLiked(!isLiked)}
        className={`flex items-center space-x-1 ${
          isLiked ? 'text-red-500' : 'text-gray-500'
        }`}
      >
        <Heart className="w-5 h-5" />
        <span className="text-sm">{article.likes}</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center space-x-1 text-gray-500"
      >
        <Share2 className="w-5 h-5" />
        <span className="text-sm">Share</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center space-x-1 text-gray-500"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">{article.comments}</span>
      </motion.button>
    </motion.div>
  )
}

// Add new components
const TableOfContents = ({ headings }: { headings: TableOfContents[] }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.div 
      className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <List className="w-5 h-5 mr-2 text-blue-500" />
          <h3 className="font-semibold">Table of Contents</h3>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-2 overflow-hidden"
          >
            {headings.map((heading) => (
              <motion.a
                key={heading.id}
                href={`#${heading.id}`}
                className={`block text-sm hover:text-blue-500 transition-colors ${
                  heading.level === 1 ? 'font-medium' : 'ml-4'
                }`}
                whileHover={{ x: 5 }}
              >
                {heading.title}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const ReadingControls = () => {
  const [fontSize, setFontSize] = useState(16)
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <motion.div 
      className="flex items-center space-x-4 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <button
        onClick={() => setFontSize(prev => Math.max(12, Math.min(24, prev - 2)))}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        <Type className="w-5 h-5" />
      </button>
      <span className="text-sm">{fontSize}px</span>
      <button
        onClick={() => setFontSize(prev => Math.max(12, Math.min(24, prev + 2)))}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        <Type className="w-5 h-5" />
      </button>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </motion.div>
  )
}

const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image} 
              alt={`Article image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors rounded-lg" />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Selected image"
              className="max-w-full max-h-[90vh] object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

const SocialShare = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareOptions = [
    { icon: Twitter, label: "Share on Twitter", color: "text-blue-400" },
    { icon: Facebook, label: "Share on Facebook", color: "text-blue-600" },
    { icon: Linkedin, label: "Share on LinkedIn", color: "text-blue-700" }
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div 
      className="fixed bottom-8 left-8 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Share options"
      >
        <Share2 className="w-6 h-6" />
      </motion.button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 space-y-2"
          >
            {shareOptions.map((option, index) => (
              <motion.button
                key={index}
                className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${
                  option.color
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={option.label}
              >
                <option.icon className="w-5 h-5" />
                <span className="text-sm">{option.label}</span>
              </motion.button>
            ))}
            <motion.button
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-gray-600 dark:text-gray-300"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              aria-label="Copy link"
            >
              <Link className="w-5 h-5" />
              <span className="text-sm">{copied ? "Copied!" : "Copy link"}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const CommentsSection = ({ comments }: { comments: Comment[] }) => {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setNewComment("")
    }, 1000)
  }

  return (
    <motion.div
      className="mt-12 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          aria-label="Comment input"
        />
        <motion.button
          type="submit"
          className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </motion.button>
      </form>
      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="font-medium">{comment.author.name}</div>
                <div className="text-sm text-gray-500">{comment.date}</div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
            <div className="mt-2 flex items-center space-x-4">
              <button className="text-gray-500 hover:text-blue-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-500">{comment.likes}</span>
              <button className="text-gray-500 hover:text-blue-500 transition-colors">
                Reply
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const AccessibilityControls = () => {
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [isScreenReader, setIsScreenReader] = useState(false)

  return (
    <motion.div
      className="fixed top-24 right-8 z-50 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="space-y-4">
        <button
          onClick={() => setIsHighContrast(!isHighContrast)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
          aria-label="Toggle high contrast mode"
        >
          <Contrast className="w-5 h-5" />
          <span className="text-sm">High Contrast</span>
        </button>
        <button
          onClick={() => setIsScreenReader(!isScreenReader)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
          aria-label="Toggle screen reader mode"
        >
          <Headphones className="w-5 h-5" />
          <span className="text-sm">Screen Reader</span>
        </button>
      </div>
    </motion.div>
  )
}

// Main Article Page Component
export default function ArticlePage({ params }: { params: { id: string } }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mock table of contents
  const tableOfContents: TableOfContents[] = [
    { id: "introduction", title: "Introduction", level: 1 },
    { id: "digital-journalism", title: "The Rise of Digital Journalism", level: 1 },
    { id: "challenges", title: "Current Challenges", level: 2 },
    { id: "solutions", title: "Proposed Solutions", level: 2 },
    { id: "future", title: "Looking to the Future", level: 1 }
  ]

  // Mock images
  const articleImages = [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300"
  ]

  // Mock comments
  const mockComments: Comment[] = [
    {
      id: "1",
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32"
      },
      content: "Great article! Really enjoyed the insights on digital journalism.",
      date: "2 hours ago",
      likes: 12,
      replies: []
    },
    {
      id: "2",
      author: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32"
      },
      content: "The future of journalism is indeed fascinating. Thanks for sharing!",
      date: "1 hour ago",
      likes: 8,
      replies: []
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900" style={paperTexture}>
      <ReadingProgress />
      <BackToTop />
      <SocialShare />
      <AccessibilityControls />
      
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Article Header */}
            <div className="mb-8">
              <motion.div 
                className="text-blue-500 font-medium mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {mockArticle.category}
              </motion.div>
              <motion.h1 
                className="text-4xl font-serif font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {mockArticle.title}
              </motion.h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={mockArticle.author.avatar} 
                    alt={mockArticle.author.name} 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{mockArticle.author.name}</div>
                    <div className="text-sm text-gray-500">{mockArticle.date}</div>
                  </div>
                </div>
                <ArticleActions article={mockArticle} />
              </div>
            </div>

            {/* Reading Controls */}
            <div className="mb-8">
              <ReadingControls />
            </div>

            {/* Featured Image with Zoom */}
            <motion.div 
              className="mb-8 rounded-lg overflow-hidden group relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <img 
                src={mockArticle.image} 
                alt={mockArticle.title} 
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <motion.button
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ZoomIn className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Article Content with Pull Quotes */}
            <motion.div 
              className="prose dark:prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {mockArticle.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg leading-relaxed">
                  {index === 0 ? (
                    <span className="float-left text-6xl font-serif mr-4 text-blue-500">
                      {paragraph[0]}
                    </span>
                  ) : null}
                  {paragraph}
                  {index === 2 && (
                    <blockquote className="border-l-4 border-blue-500 pl-4 my-8 italic text-xl">
                      "The future of journalism lies in the balance between traditional values and digital innovation."
                    </blockquote>
                  )}
                </p>
              ))}
            </motion.div>

            {/* Image Gallery */}
            <ImageGallery images={articleImages} />

            {/* Tags */}
            <motion.div 
              className="flex flex-wrap gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {mockArticle.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Comments Section */}
            <CommentsSection comments={mockComments} />
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Table of Contents */}
            <TableOfContents headings={tableOfContents} />

            {/* Author Spotlight */}
            <motion.div 
              className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={mockArticle.author.avatar} 
                  alt={mockArticle.author.name} 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-medium">{mockArticle.author.name}</div>
                  <div className="text-sm text-gray-500">{mockArticle.author.bio}</div>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Follow Author
              </button>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-4 text-white backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
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
          </motion.div>
        </div>
      </div>
    </main>
  )
} 