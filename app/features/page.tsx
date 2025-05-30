"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
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
  ChevronLeft,
  Award,
  Zap,
  Lightbulb,
  Sparkles,
  Target,
  BarChart2,
  User,
  Mail
} from "lucide-react"

// Types
type Feature = {
  id: string
  title: string
  description: string
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
  isFeatured?: boolean
  tags: string[]
  impact: {
    metric: string
    value: string
  }[]
}

// Mock data
const mockFeatures: Feature[] = [
  {
    id: "1",
    title: "Interactive Data Visualization",
    description: "Explore complex data through our interactive visualizations...",
    image: "/images/articles/tech/data-viz.jpg",
    date: "May 16, 2025",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/contributors/sarah-johnson.jpg"
    },
    category: "Technology",
    readTime: "8 min read",
    views: 12345,
    likes: 789,
    comments: 123,
    isFeatured: true,
    tags: ["Technology", "Future", "Innovation"],
    impact: [
      { metric: "Reader Engagement", value: "+45%" },
      { metric: "Time on Site", value: "+30%" },
      { metric: "Social Shares", value: "+60%" }
    ]
  },
  {
    id: "2",
    title: "Real-time News Updates",
    description: "Stay informed with our real-time news coverage...",
    image: "/images/articles/tech/real-time-news.jpg",
    date: "May 15, 2025",
    author: { 
      name: "Michael Chen", 
      avatar: "/images/contributors/michael-chen.jpg" 
    },
    category: "News",
    readTime: "6 min read",
    views: 9876,
    likes: 654,
    comments: 98,
    isFeatured: false,
    tags: ["AI", "Newsroom"],
    impact: [
      { metric: "Efficiency", value: "+20%" }
    ]
  },
  {
    id: "3",
    title: "Expert Analysis",
    description: "In-depth analysis from industry experts...",
    image: "/images/articles/tech/expert-analysis.jpg",
    date: "May 14, 2025",
    author: { 
      name: "Emma Wilson", 
      avatar: "/images/contributors/emma-wilson.jpg" 
    },
    category: "Analysis",
    readTime: "10 min read",
    views: 6543,
    likes: 321,
    comments: 65,
    isFeatured: false,
    tags: ["Climate", "Solutions"],
    impact: [
      { metric: "Impact", value: "+80%" }
    ]
  }
]

const trendingFeatures = mockFeatures.slice(0, 2)
const editorsPicks = mockFeatures.slice(1)
const authors = [
  { name: "Sarah Johnson", bio: "Award-winning journalist.", avatar: "/images/contributors/sarah-johnson.jpg", twitter: "#" },
  { name: "Michael Chen", bio: "Tech and AI reporter.", avatar: "/images/contributors/michael-chen.jpg", twitter: "#" },
  { name: "Emma Wilson", bio: "Environment correspondent.", avatar: "/images/contributors/emma-wilson.jpg", twitter: "#" }
]
const tags = ["Technology", "Future", "Innovation", "AI", "Newsroom", "Climate", "Solutions"]

// Components
const FeatureHero = () => {
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
          📰
        </motion.div>
        <motion.h1 
          className="text-4xl font-serif font-bold mb-2 text-gray-900 dark:text-white"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Features & Innovations
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Explore our most impactful features, innovations, and in-depth stories.
        </motion.p>
        <motion.div 
          className="flex items-center space-x-6 text-gray-600 dark:text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            234 Features
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

const TrendingFeatures = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Trending Features</h3>
        <TrendingUp className="w-5 h-5 text-blue-500" />
      </div>
      <div className="space-y-3">
        {trendingFeatures.map((feature, i) => (
          <motion.div 
            key={feature.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            whileHover={{ x: 5 }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">{feature.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{feature.views} views</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const EditorsPicksCarousel = () => {
  const [current, setCurrent] = useState(0)
  return (
    <motion.div 
      className="relative mb-8 overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-serif font-bold">Editor's Picks</h2>
      </div>
      <div className="relative">
        <motion.div 
          className="flex transition-transform duration-500 ease-in-out"
          animate={{ x: `-${current * 100}%` }}
        >
          {editorsPicks.map((feature, i) => (
            <div 
              key={feature.id}
              className="w-full flex-shrink-0 p-4"
            >
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{feature.description}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="w-4 h-4" />
                {feature.readTime}
              </div>
            </div>
          ))}
        </motion.div>
        <button 
          onClick={() => setCurrent((current - 1 + editorsPicks.length) % editorsPicks.length)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setCurrent((current + 1) % editorsPicks.length)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-center space-x-2 p-4">
        {editorsPicks.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${current === i ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

const FeaturedStory = ({ feature }: { feature: Feature }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

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
          src={feature.image} 
          alt={feature.title}
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
              src={feature.author.avatar} 
              alt={feature.author.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <div className="font-medium">{feature.author.name}</div>
              <div className="text-sm opacity-80">{feature.date}</div>
            </div>
          </motion.div>
          <motion.h2 
            className="text-3xl font-serif font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {feature.title}
          </motion.h2>
          <motion.p 
            className="text-lg opacity-90 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {feature.description}
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
                <span>{feature.likes}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-blue-300 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{feature.comments}</span>
              </button>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {feature.readTime}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {feature.views.toLocaleString()} views
                </span>
              </div>
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
              <ShareMenu feature={feature} />
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="absolute top-4 right-4 flex space-x-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {feature.impact.map((item, index) => (
          <motion.div
            key={item.metric}
            className="bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-sm font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            {item.metric}: {item.value}
          </motion.div>
        ))}
      </motion.div>
    </motion.article>
  )
}

const FeatureGrid = ({ features, title }: { features: Feature[], title: string }) => {
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
        {features.map((feature, index) => (
          <motion.article
            key={feature.id}
            className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative">
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                  {feature.category}
                </span>
                <span className="text-sm text-gray-500">{feature.date}</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img 
                    src={feature.author.avatar} 
                    alt={feature.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{feature.author.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{feature.readTime}</span>
                  <span>{feature.views} views</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

const FeatureFilters = () => {
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
          <h3 className="font-semibold">Filter Features</h3>
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
                placeholder="Search in features..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const ImpactMetrics = () => {
  const metrics = [
    { title: "Total Impact", value: "1.2M+", icon: <Target className="w-6 h-6" /> },
    { title: "Active Readers", value: "45.6K", icon: <Users className="w-6 h-6" /> },
    { title: "Engagement Rate", value: "78%", icon: <BarChart2 className="w-6 h-6" /> },
    { title: "Innovation Score", value: "92", icon: <Sparkles className="w-6 h-6" /> }
  ]

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Impact Metrics</h3>
        <Zap className="w-5 h-5 text-blue-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-center space-x-2 mb-2">
              {metric.icon}
              <span className="text-sm text-gray-600 dark:text-gray-300">{metric.title}</span>
            </div>
            <div className="text-2xl font-bold">{metric.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const AuthorSpotlight = () => (
  <motion.div 
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">Author Spotlight</h3>
      <User className="w-5 h-5 text-blue-500" />
    </div>
    <div className="space-y-3">
      {authors.map((author, i) => (
        <motion.div 
          key={author.name}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i }}
        >
          <img 
            src={author.avatar} 
            alt={author.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium">{author.name}</div>
            <div className="text-xs text-gray-500">{author.bio}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)

const NewsletterSignup = () => (
  <motion.div 
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    <div className="flex items-center mb-2">
      <Mail className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
      <h4 className="font-semibold text-gray-900 dark:text-white">Stay Updated</h4>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Get the latest features delivered to your inbox.</p>
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

const FeatureTagsCloud = () => (
  <motion.div 
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">Feature Tags</h3>
      <Tag className="w-5 h-5 text-blue-500" />
    </div>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <motion.span 
          key={tag}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 * i }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  </motion.div>
)

const ShareMenu = ({ feature }: { feature: Feature }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const shareOptions = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(feature.title)}&url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    copyLink: currentUrl
  }

  const handleShare = (type: keyof typeof shareOptions) => {
    if (type === 'copyLink') {
      if (typeof window !== 'undefined') {
        navigator.clipboard.writeText(shareOptions.copyLink)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      }
    } else {
      if (typeof window !== 'undefined') {
        window.open(shareOptions[type], '_blank')
      }
    }
  }

  return (
    <div className="relative">
      <motion.button
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Share2 className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              onClick={() => handleShare('copyLink')}
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              {isCopied ? 'Copied!' : 'Copy Link'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main Feature Page Component
export default function FeaturePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900" style={{ backgroundImage: 'url("/paper-texture.png")', backgroundBlendMode: 'multiply' }}>
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
        <FeatureHero />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <EditorsPicksCarousel />
            {mockFeatures.filter(feature => feature.isFeatured).map(feature => (
              <FeaturedStory key={feature.id} feature={feature} />
            ))}
            
            <FeatureFilters />
            
            <FeatureGrid 
              features={mockFeatures.filter(feature => !feature.isFeatured)} 
              title="Latest Features" 
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <TrendingFeatures />
            <ImpactMetrics />
            <AuthorSpotlight />
            <FeatureTagsCloud />
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </main>
  )
} 