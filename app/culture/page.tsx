"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { AnimatedHeadline } from "@/components/newspaper/animated-headline"
import { ArticleGrid } from "@/components/newspaper/article-grid"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  BookOpen, 
  Music, 
  Theater, 
  Film, 
  Palette, 
  Calendar, 
  TrendingUp, 
  Users, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Download, 
  RefreshCw,
  Bookmark,
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  Clock,
  Ticket
} from "lucide-react"

// Mock headlines
const cultureHeadlines = [
  { title: "BREAKING: New Art Exhibition Breaks Attendance Records", category: "ARTS" },
  { title: "Award-Winning Play Returns to Broadway", category: "THEATER" },
  { title: "International Film Festival Announces Lineup", category: "FILM" },
]

// Enhanced cultural metrics with historical data and trends
const culturalMetrics = [
  { 
    label: "Exhibitions", 
    value: 156, 
    icon: Palette, 
    trend: 15, 
    unit: "this year",
    historical: [120, 135, 145, 156],
    distribution: {
      "Visual Arts": 40,
      "Digital Art": 25,
      "Sculpture": 20,
      "Photography": 15
    }
  },
  { 
    label: "Performances", 
    value: 892, 
    icon: Music, 
    trend: 12, 
    unit: "this quarter",
    historical: [750, 800, 850, 892],
    distribution: {
      "Music": 35,
      "Theater": 30,
      "Dance": 25,
      "Other": 10
    }
  },
  { 
    label: "Film Screenings", 
    value: 245, 
    icon: Film, 
    trend: 8, 
    unit: "this month",
    historical: [200, 215, 230, 245],
    distribution: {
      "Independent": 45,
      "International": 30,
      "Classic": 15,
      "Documentary": 10
    }
  },
  { 
    label: "Book Launches", 
    value: 78, 
    icon: BookOpen, 
    trend: 20, 
    unit: "this year",
    historical: [50, 60, 70, 78],
    distribution: {
      "Fiction": 40,
      "Non-Fiction": 30,
      "Poetry": 20,
      "Children": 10
    }
  }
]

// Mock articles
const cultureArticles = [
  { 
    id: "1", 
    title: "Contemporary Art Exhibition Draws Global Attention", 
    excerpt: "The groundbreaking exhibition features works from emerging artists...", 
    image: "/images/articles/culture/contemporary-exhibition.jpg", 
    category: "ARTS", 
    date: "May 16, 2025", 
    author: "Emma Thompson" 
  },
  { 
    id: "2", 
    title: "Jazz Festival Celebrates 50th Anniversary", 
    excerpt: "Legendary musicians gather for a week-long celebration...", 
    image: "/images/articles/culture/jazz-festival.jpg", 
    category: "MUSIC", 
    date: "May 15, 2025", 
    author: "Marcus Johnson" 
  },
  { 
    id: "3", 
    title: "New Theater Production Challenges Conventions", 
    excerpt: "Innovative staging and storytelling techniques redefine theater...", 
    image: "/images/articles/culture/new-production.jpg", 
    category: "THEATER", 
    date: "May 14, 2025", 
    author: "Sarah Chen" 
  },
]

// Mock cultural events
const culturalEvents = [
  { 
    id: "e1", 
    title: "Modern Art Exhibition", 
    date: "May 20", 
    time: "10:00 AM",
    location: "City Gallery", 
    type: "Exhibition",
    image: "/images/articles/culture/contemporary-exhibition.jpg",
    attendees: 450,
    capacity: 500,
    description: "A showcase of contemporary art from local and international artists.",
    artists: ["Jane Smith", "John Doe", "Maria Garcia"],
    categories: ["Visual Arts", "Contemporary", "Mixed Media"],
    registration: "Open"
  },
  { 
    id: "e2", 
    title: "Summer Music Festival", 
    date: "May 22", 
    time: "2:00 PM",
    location: "Central Park", 
    type: "Festival",
    image: "/images/articles/culture/jazz-festival.jpg",
    attendees: 1200,
    capacity: 1500,
    description: "Three-day music festival featuring various genres and artists.",
    artists: ["The Jazz Collective", "Urban Beats", "Classical Ensemble"],
    categories: ["Music", "Outdoor", "Festival"],
    registration: "Limited"
  },
  { 
    id: "e3", 
    title: "Theater Premiere", 
    date: "May 25", 
    time: "7:30 PM",
    location: "Grand Theater", 
    type: "Performance",
    image: "/images/articles/culture/new-production.jpg",
    attendees: 300,
    capacity: 400,
    description: "World premiere of a new play exploring modern relationships.",
    artists: ["City Theater Company"],
    categories: ["Theater", "Drama", "Premiere"],
    registration: "Closed"
  }
]

// Mock trending topics
const trendingTopics = [
  { topic: "Digital Art", trend: 32 },
  { topic: "Indie Films", trend: 28 },
  { topic: "Jazz Revival", trend: 24 },
  { topic: "Poetry Slam", trend: 20 },
  { topic: "Street Art", trend: 16 },
]

// Mock poll
const culturePoll = {
  question: "Which cultural event are you most excited about?",
  options: [
    { label: "Art Exhibition", votes: 150 },
    { label: "Music Festival", votes: 120 },
    { label: "Theater Show", votes: 80 },
    { label: "Film Screening", votes: 50 },
  ],
  total: 400,
}

// Mock contributors
const contributors = [
  { name: "Emma Thompson", bio: "Arts & Culture Critic", avatar: "/placeholder.svg?height=40&width=40", twitter: "#" },
  { name: "Marcus Johnson", bio: "Music & Theater Reviewer", avatar: "/placeholder.svg?height=40&width=40", twitter: "#" },
  { name: "Sarah Chen", bio: "Film & Literature Expert", avatar: "/placeholder.svg?height=40&width=40", twitter: "#" },
]

// Add these new types at the top of the file after imports
type TrendingTopic = {
  topic: string;
  trend: number;
}

type PollOption = {
  label: string;
  votes: number;
}

type Poll = {
  question: string;
  options: PollOption[];
  total: number;
}

type Contributor = {
  name: string;
  bio: string;
  avatar: string;
  twitter: string;
}

type CulturalEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number;
  capacity: number;
  description: string;
  artists: string[];
  categories: string[];
  registration: string;
}

// Enhanced Pie Chart Widget with improved animations and interactions
const PieChartWidget = ({ data }: { data: TrendingTopic[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const total = data.reduce((sum: number, t: TrendingTopic) => sum + t.trend, 0)
  let currentAngle = 0

  return (
    <div className="relative">
      <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
          </filter>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {data.map((t, i) => {
          const angle = (t.trend / total) * 360
          const startAngle = currentAngle
          currentAngle += angle
          const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180))
          const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180))
          const endX = 50 + 40 * Math.cos((currentAngle - 90) * (Math.PI / 180))
          const endY = 50 + 40 * Math.sin((currentAngle - 90) * (Math.PI / 180))
          const largeArcFlag = angle > 180 ? 1 : 0
          const isHovered = hoveredIndex === i
          const isSelected = selectedIndex === i

          return (
            <g key={t.topic}>
              <motion.path
                d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                fill={`hsl(${i * 60}, 70%, ${isHovered ? '70%' : '60%'})`}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ 
                  scale: isHovered ? 1.05 : 1,
                  rotate: isSelected ? 5 : 0,
                  filter: isHovered ? 'url(#glow)' : 'none'
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(i === selectedIndex ? null : i)}
                className="cursor-pointer transition-all duration-300"
              />
              {(isHovered || isSelected) && (
                <motion.text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {t.trend}%
                </motion.text>
              )}
            </g>
          )
        })}
        <motion.circle
          cx="50"
          cy="50"
          r="15"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        />
      </svg>
      <div className="mt-4 space-y-2">
        {data.map((t, i) => (
          <motion.div
            key={t.topic}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
              hoveredIndex === i ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            } ${selectedIndex === i ? 'ring-2 ring-blue-500' : ''}`}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => setSelectedIndex(i === selectedIndex ? null : i)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center">
              <motion.div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: `hsl(${i * 60}, 70%, 60%)` }}
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <span className="text-sm">{t.topic}</span>
                          </div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-sm font-semibold text-blue-500 mr-1">+{t.trend}</span>
              <span className="text-xs text-gray-500">%</span>
            </motion.div>
          </motion.div>
        ))}
                        </div>
                      </div>
  )
}

// Enhanced Live Poll Widget with animations and interactions
const LivePollWidget = ({ poll }: { poll: Poll }) => {
  const [selected, setSelected] = useState<number | null>(null)
  const [votes, setVotes] = useState(poll.options.map(o => o.votes))
  const [isVoting, setIsVoting] = useState(false)
  const totalVotes = votes.reduce((a: number, b: number) => a + b, 0)

  const handleVote = (idx: number) => {
    if (selected === null && !isVoting) {
      setIsVoting(true)
      const newVotes = [...votes]
      newVotes[idx]++
      setVotes(newVotes)
      setSelected(idx)
      
      // Simulate network delay
      setTimeout(() => {
        setIsVoting(false)
      }, 1000)
    }
  }

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
      <motion.h4 
        className="font-semibold mb-2 font-serif"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {poll.question}
      </motion.h4>
      <div className="space-y-2">
        {poll.options.map((option, idx) => {
          const percent = ((votes[idx] / totalVotes) * 100).toFixed(0)
          const isSelected = selected === idx
          
          return (
            <motion.button
              key={option.label}
              onClick={() => handleVote(idx)}
              className={`w-full flex items-center mb-2 px-3 py-2 rounded-lg transition-all ${
                isSelected 
                  ? "bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              disabled={selected !== null || isVoting}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex-1 text-left">{option.label}</span>
              <motion.div 
                className="flex items-center"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="ml-2 text-sm font-medium">{percent}%</span>
              </motion.div>
            </motion.button>
          )
        })}
                    </div>
      <motion.div 
        className="text-xs text-gray-500 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Total votes: {totalVotes}
      </motion.div>
                </div>
  )
}

// Enhanced event calendar with filtering and sorting
const EnhancedEventCalendar = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('asc')
  const [activeFilters, setActiveFilters] = useState({
    type: 'all',
    date: 'all',
    registration: 'all'
  })

  const types = [...new Set(events.map(event => event.type))]
  const dates = [...new Set(events.map(event => event.date))]
  const registrationStatuses = [...new Set(events.map(event => event.registration))]

  const handleFilter = (type, value) => {
    setActiveFilters(prev => ({ ...prev, [type]: value }))
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  useEffect(() => {
    let filtered = [...events]
    
    if (activeFilters.type !== 'all') {
      filtered = filtered.filter(event => event.type === activeFilters.type)
    }
    
    if (activeFilters.date !== 'all') {
      filtered = filtered.filter(event => event.date === activeFilters.date)
    }

    if (activeFilters.registration !== 'all') {
      filtered = filtered.filter(event => event.registration === activeFilters.registration)
    }

    filtered.sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      return sortOrder === 'asc' 
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1
    })

    setFilteredEvents(filtered)
  }, [events, activeFilters, sortBy, sortOrder])

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          <h4 className="font-semibold">Upcoming Cultural Events</h4>
                          </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <RefreshCw className="w-5 h-5" />
          </button>
                        </div>
                      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <select
            value={activeFilters.type}
            onChange={(e) => handleFilter('type', e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="all">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={activeFilters.date}
            onChange={(e) => handleFilter('date', e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="all">All Dates</option>
            {dates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
          <select
            value={activeFilters.registration}
            onChange={(e) => handleFilter('registration', e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="all">All Registration Status</option>
            {registrationStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button
            onClick={() => handleSort('date')}
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center space-x-1"
          >
            <span>Sort by Date</span>
            {sortBy === 'date' && (
              sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => handleSort('attendees')}
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center space-x-1"
          >
            <span>Sort by Attendance</span>
            {sortBy === 'attendees' && (
              sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h5 className="font-semibold">{event.title}</h5>
                  <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  event.registration === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  event.registration === 'Limited' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {event.registration}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {event.categories.map((category, index) => (
                  <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {category}
                  </span>
            ))}
          </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">{event.attendees}/{event.capacity} attendees</span>
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>
                <button className="text-blue-500 hover:text-blue-600 flex items-center">
                  <Ticket className="w-4 h-4 mr-1" />
                  Get Tickets
                </button>
              </div>
            </motion.div>
            ))}
          </div>
        </div>
    </motion.div>
  )
}

// Newsletter signup widget
const NewsletterSignup = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-4 text-white mb-6">
      <div className="flex items-center mb-2">
        <BookOpen className="w-5 h-5 mr-2" />
        <h4 className="font-semibold">Cultural Times Newsletter</h4>
                  </div>
      <p className="text-sm mb-2">Stay updated with the latest cultural events and news.</p>
      <form className="flex">
        <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-lg text-gray-900" />
        <button type="submit" className="bg-white text-blue-600 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">Subscribe</button>
      </form>
                </div>
  )
}

// Contributor spotlight widget
const ContributorSpotlight = ({ contributors }) => {
  const [active, setActive] = useState(0)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <div className="flex items-center mb-2">
        <Users className="w-5 h-5 mr-2 text-blue-500" />
        <h4 className="font-semibold">Contributor Spotlight</h4>
          </div>
      <div className="flex items-center space-x-3 mb-2">
        <img src={contributors[active].avatar} alt={contributors[active].name} className="w-10 h-10 rounded-full border-2 border-blue-500" />
        <div>
          <div className="font-medium">{contributors[active].name}</div>
          <div className="text-xs text-gray-500">{contributors[active].bio}</div>
        </div>
                      </div>
      <div className="flex space-x-2">
        {contributors.map((c, i) => (
          <button key={i} onClick={() => setActive(i)} className={`w-2 h-2 rounded-full ${i === active ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}></button>
        ))}
                    </div>
                  </div>
  )
}

// Add these styles at the top of the file after imports
const paperTexture = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
}

// Main Culture Page
export default function CulturePage() {
  const [activeTab, setActiveTab] = useState("latest")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12" style={paperTexture}>
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

      {/* Enhanced Headlines with vintage typography and parallax effect */}
      <motion.div 
        className="relative overflow-hidden"
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <AnimatedHeadline headlines={cultureHeadlines} />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Enhanced Metrics Dashboard with hover effects */}
      <div className="newspaper-container mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturalMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <metric.icon className="w-8 h-8 text-blue-500 mb-2" />
                  </motion.div>
                  <div className="text-2xl font-bold font-serif">{metric.value.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 font-medium">{metric.label}</div>
                </div>
                <motion.div 
                  className="flex items-center text-xs text-green-600"
                  whileHover={{ scale: 1.1 }}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />+{metric.trend}%
                </motion.div>
              </div>
              <div className="text-xs text-gray-400">{metric.unit}</div>
            </motion.div>
            ))}
          </div>
        </div>

      {/* Main Content & Sidebar with enhanced transitions */}
      <div className="newspaper-container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <motion.div className="lg:col-span-8">
            {/* Enhanced Tabs with underline animation */}
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-8">
              {["latest", "arts", "music", "theater", "film", "literature"].map(tab => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 font-medium capitalize transition-colors ${
                    activeTab === tab 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Enhanced Tab Content with page turn effect */}
            <AnimatePresence mode="wait">
              {activeTab === "latest" && (
                <motion.div
                  key="latest"
                  initial={{ opacity: 0, rotateX: -15 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArticleGrid title="Latest Cultural News" articles={cultureArticles} />
                </motion.div>
              )}
              {activeTab === "arts" && (
                <motion.div
                  key="arts"
                  initial={{ opacity: 0, rotateX: -15 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">Arts & Exhibitions (mockup)</div>
                </motion.div>
              )}
              {activeTab === "music" && (
                <motion.div
                  key="music"
                  initial={{ opacity: 0, rotateX: -15 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">Music & Performances (mockup)</div>
                </motion.div>
              )}
              {activeTab === "theater" && (
                <motion.div
                  key="theater"
                  initial={{ opacity: 0, rotateX: -15 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">Theater & Dance (mockup)</div>
                </motion.div>
              )}
              {activeTab === "film" && (
                <motion.div
                  key="film"
                  initial={{ opacity: 0, rotateX: -15 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">Film & Media (mockup)</div>
                </motion.div>
              )}
              {activeTab === "literature" && (
                <motion.div
                  key="literature"
                  initial={{ opacity: 0, rotateX: -15 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">Literature & Poetry (mockup)</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Enhanced Sidebar with hover effects */}
          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Trending Topics Widget with enhanced hover */}
            <motion.div 
              className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-2">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                </motion.div>
                <h4 className="font-semibold font-serif">Trending Topics</h4>
          </div>
              <PieChartWidget data={trendingTopics} />
            </motion.div>

            {/* Enhanced Live Poll Widget */}
            <motion.div 
              className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <LivePollWidget poll={culturePoll} />
            </motion.div>

            {/* Enhanced Newsletter Signup */}
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-4 text-white backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <NewsletterSignup />
            </motion.div>

            {/* Enhanced Contributor Spotlight */}
            <motion.div 
              className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <ContributorSpotlight contributors={contributors} />
            </motion.div>

            {/* Enhanced Event Calendar */}
            <motion.div 
              className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <EnhancedEventCalendar events={culturalEvents} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}