"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Star, Users, BookOpen, TrendingUp, Clock, Eye, Heart, MessageCircle, Bookmark, BookmarkCheck, Share2, Tag, ChevronRight, ChevronLeft, Sparkles, BarChart2, User, Mail, Search, Filter, X
} from "lucide-react"

// Types
type Topic = {
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
}

// Mock data
const mockTopics = [
  {
    id: "1",
    title: "The Future of Digital Journalism",
    description: "Exploring how technology is reshaping the way we consume and interact with news...",
    image: "/images/articles/journalism/digital-journalism.jpg",
    date: "May 16, 2025",
    author: { name: "Sarah Johnson", avatar: "/images/contributors/sarah-johnson.jpg" },
    category: "Journalism",
    readTime: "8 min read",
    views: 12345,
    likes: 789,
    comments: 123,
    isFeatured: true,
    tags: ["Technology", "Future", "Innovation"]
  },
  {
    id: "2",
    title: "AI in the Newsroom",
    description: "How artificial intelligence is transforming reporting and editing...",
    image: "/images/articles/tech/ai-newsroom.jpg",
    date: "May 15, 2025",
    author: { name: "Michael Chen", avatar: "/images/contributors/michael-chen.jpg" },
    category: "Technology",
    readTime: "6 min read",
    views: 9876,
    likes: 654,
    comments: 98,
    isFeatured: false,
    tags: ["AI", "Newsroom"]
  },
  {
    id: "3",
    title: "Climate Change Solutions",
    description: "Innovative approaches to addressing the global climate crisis...",
    image: "/images/articles/climate/climate-solutions.jpg",
    date: "May 14, 2025",
    author: { name: "Emma Wilson", avatar: "/images/contributors/emma-wilson.jpg" },
    category: "Environment",
    readTime: "10 min read",
    views: 6543,
    likes: 321,
    comments: 65,
    isFeatured: false,
    tags: ["Climate", "Solutions"]
  }
]

const trendingTopics = mockTopics.slice(0, 2)
const editorsPicks = mockTopics.slice(1)
const authors = [
  { name: "Sarah Johnson", bio: "Award-winning journalist.", avatar: "/images/contributors/sarah-johnson.jpg", twitter: "#" },
  { name: "Michael Chen", bio: "Tech and AI reporter.", avatar: "/images/contributors/michael-chen.jpg", twitter: "#" },
  { name: "Emma Wilson", bio: "Environment correspondent.", avatar: "/images/contributors/emma-wilson.jpg", twitter: "#" }
]
const tags = ["Technology", "Future", "Innovation", "AI", "Newsroom", "Climate", "Solutions"]

const TopicHero = () => (
  <motion.div className="relative overflow-hidden rounded-xl mb-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <div className="relative p-8">
      <motion.div className="text-6xl mb-4" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>📰</motion.div>
      <motion.h1 className="text-4xl font-serif font-bold mb-2 text-gray-900 dark:text-white" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>Explore Topics</motion.h1>
      <motion.p className="text-lg text-gray-600 dark:text-gray-300 mb-6" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>Discover trending topics, editor's picks, and more.</motion.p>
      <motion.div className="flex items-center space-x-6 text-gray-600 dark:text-gray-300" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <span className="flex items-center"><Star className="w-5 h-5 mr-2" /> 234 Topics</span>
        <span className="flex items-center"><Users className="w-5 h-5 mr-2" /> 45.6K Readers</span>
      </motion.div>
    </div>
  </motion.div>
)

const TrendingTopics = () => (
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
    <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Trending Topics</h3><TrendingUp className="w-5 h-5 text-blue-500" /></div>
    <div className="space-y-3">
      {trendingTopics.map((topic, i) => (
        <motion.div key={topic.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} whileHover={{ x: 5 }}>
          <div className="flex items-center space-x-3"><span className="text-sm font-medium">{topic.title}</span></div>
          <div className="flex items-center space-x-2"><span className="text-sm text-gray-500">{topic.views} views</span></div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)

const TopicSearch = () => (
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
    <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Search Topics</h3><Search className="w-5 h-5 text-blue-500" /></div>
    <div className="relative">
      <input type="text" placeholder="Search topics..." className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
  </motion.div>
)

const TagCloud = () => (
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
    <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Topic Tags</h3><Tag className="w-5 h-5 text-blue-500" /></div>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <motion.span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.05 * i }}>{tag}</motion.span>
      ))}
    </div>
  </motion.div>
)

const EditorsPicks = () => {
  const [current, setCurrent] = useState(0)
  return (
    <motion.div className="relative mb-8 overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700"><h2 className="text-xl font-serif font-bold">Editor's Picks</h2></div>
      <div className="relative">
        <motion.div className="flex transition-transform duration-500 ease-in-out" animate={{ x: `-${current * 100}%` }}>
          {editorsPicks.map((topic, i) => (
            <div key={topic.id} className="w-full flex-shrink-0 p-4">
              <img src={topic.image} alt={topic.title} className="w-full h-48 object-cover rounded-lg mb-2" />
              <h3 className="font-semibold text-lg mb-1">{topic.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{topic.description}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="w-4 h-4" /> {topic.readTime}
                <Eye className="w-4 h-4 ml-2" /> {topic.views}
              </div>
            </div>
          ))}
        </motion.div>
        <button onClick={() => setCurrent((current - 1 + editorsPicks.length) % editorsPicks.length)} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg"><ChevronLeft className="w-5 h-5" /></button>
        <button onClick={() => setCurrent((current + 1) % editorsPicks.length)} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg"><ChevronRight className="w-5 h-5" /></button>
      </div>
      <div className="flex justify-center space-x-2 p-4">
        {editorsPicks.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${current === i ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
        ))}
      </div>
    </motion.div>
  )
}

const PopularAuthors = () => (
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
    <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Popular Authors</h3><User className="w-5 h-5 text-blue-500" /></div>
    <div className="space-y-3">
      {authors.map((author, i) => (
        <motion.div key={author.name} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}>
          <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
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
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
    <div className="flex items-center mb-2"><Mail className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" /><h4 className="font-semibold text-gray-900 dark:text-white">Stay Updated</h4></div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Get the latest topics delivered to your inbox.</p>
    <form className="flex">
      <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      <button type="submit" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Subscribe</button>
    </form>
  </motion.div>
)

const RecentDiscussions = () => (
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
    <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Recent Discussions</h3><MessageCircle className="w-5 h-5 text-blue-500" /></div>
    <div className="space-y-3">
      {mockTopics.slice(0, 3).map((topic, i) => (
        <motion.div key={topic.id} className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}>
          <div className="font-medium">{topic.title}</div>
          <div className="text-xs text-gray-500">{topic.comments} comments</div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)

export default function TopicsPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900" style={{ backgroundImage: 'url("/paper-texture.png")', backgroundBlendMode: 'multiply' }}>
      <motion.div className={`sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Masthead />
      </motion.div>
      <div className="newspaper-container py-8">
        <TopicHero />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <TopicSearch />
            <TagCloud />
            <EditorsPicks />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <TrendingTopics />
            <PopularAuthors />
            <NewsletterSignup />
            <RecentDiscussions />
          </div>
        </div>
      </div>
    </main>
  )
} 