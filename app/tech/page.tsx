"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { AnimatedHeadline } from "@/components/newspaper/animated-headline"
import { ArticleGrid } from "@/components/newspaper/article-grid"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { BarChart2, PieChart, TrendingUp, Users, Calendar, Mail, Star, Cpu, Smartphone, Globe, ChevronDown, ChevronUp, Filter, SortAsc, SortDesc, Download, RefreshCw, LineChart, AreaChart, BarChart, Download as DownloadIcon, Share2, Bookmark, Heart, MessageCircle } from "lucide-react"

// Mock headlines
const techHeadlines = [
  { title: "BREAKING: AI Surpasses Human Performance in Key Benchmarks", category: "AI" },
  { title: "Quantum Computing Startups Raise Record Funding", category: "STARTUPS" },
  { title: "Gadget Expo 2025 Unveils Next-Gen Devices", category: "GADGETS" },
]

// Enhanced tech metrics with historical data and trends
const techMetrics = [
  { 
    label: "Startups Launched", 
    value: 312, 
    icon: Cpu, 
    trend: 12, 
    unit: "this year",
    historical: [250, 275, 290, 312],
    distribution: {
      "AI/ML": 35,
      "FinTech": 25,
      "HealthTech": 20,
      "EdTech": 15,
      "Other": 5
    }
  },
  { 
    label: "Patents Filed", 
    value: 1287, 
    icon: Star, 
    trend: 8, 
    unit: "this quarter",
    historical: [1000, 1100, 1200, 1287],
    distribution: {
      "Software": 40,
      "Hardware": 30,
      "Biotech": 20,
      "Other": 10
    }
  },
  { 
    label: "Tech Events", 
    value: 42, 
    icon: Calendar, 
    trend: 5, 
    unit: "this month",
    historical: [30, 35, 38, 42],
    distribution: {
      "Conferences": 45,
      "Hackathons": 25,
      "Meetups": 20,
      "Workshops": 10
    }
  },
  { 
    label: "Funding Raised ($M)", 
    value: 980, 
    icon: TrendingUp, 
    trend: 15, 
    unit: "this year",
    historical: [700, 800, 900, 980],
    distribution: {
      "Series A": 40,
      "Seed": 30,
      "Series B+": 20,
      "Pre-seed": 10
    }
  }
]

// Mock articles
const techArticles = [
  { 
    id: "1", 
    title: "AI Revolutionizes Healthcare Diagnostics", 
    excerpt: "Machine learning models now outperform doctors in early disease detection...", 
    image: "/images/articles/tech/ai-healthcare.jpg", 
    category: "AI", 
    date: "May 16, 2025", 
    author: "Alex Kim" 
  },
  { 
    id: "2", 
    title: "Wearables: The Next Frontier in Personal Tech", 
    excerpt: "Smartwatches and AR glasses are changing how we interact with the world...", 
    image: "/images/articles/tech/wearables.jpg", 
    category: "GADGETS", 
    date: "May 15, 2025", 
    author: "Priya Patel" 
  },
  { 
    id: "3", 
    title: "Startups Tackle Climate Change with Tech", 
    excerpt: "Innovative solutions from green tech startups are making a real impact...", 
    image: "/images/articles/tech/green-tech.jpg", 
    category: "STARTUPS", 
    date: "May 14, 2025", 
    author: "Jordan Lee" 
  },
]

// Mock trending technologies
const trendingTech = [
  { topic: "Quantum Computing", trend: 32 },
  { topic: "5G Networks", trend: 21 },
  { topic: "Wearables", trend: 18 },
  { topic: "Edge AI", trend: 15 },
  { topic: "Blockchain", trend: 12 },
]

// Mock poll
const poll = {
  question: "Which tech trend excites you most?",
  options: [
    { label: "AI & Machine Learning", votes: 120 },
    { label: "Quantum Computing", votes: 80 },
    { label: "Wearables", votes: 60 },
    { label: "5G & Connectivity", votes: 40 },
  ],
  total: 300,
}

// Enhanced tech events with more details
const techEvents = [
  { 
    id: "e1", 
    title: "Gadget Expo 2025", 
    date: "May 20", 
    location: "Silicon Hall", 
    type: "Expo",
    attendees: 2500,
    capacity: 3000,
    description: "The biggest tech showcase of the year featuring cutting-edge gadgets and innovations.",
    speakers: ["John Smith", "Sarah Chen", "Alex Rodriguez"],
    topics: ["AI", "IoT", "Wearables"],
    registration: "Open"
  },
  { 
    id: "e2", 
    title: "AI Hackathon", 
    date: "May 22", 
    location: "Tech Hub", 
    type: "Hackathon",
    attendees: 150,
    capacity: 200,
    description: "48-hour hackathon focused on AI solutions for real-world problems.",
    speakers: ["Dr. Emily Watson", "Mark Johnson"],
    topics: ["Machine Learning", "Neural Networks", "Computer Vision"],
    registration: "Limited"
  },
  { 
    id: "e3", 
    title: "Startup Pitch Night", 
    date: "May 25", 
    location: "Innovation Center", 
    type: "Pitch",
    attendees: 100,
    capacity: 150,
    description: "Early-stage startups pitch to leading VCs and angel investors.",
    speakers: ["Michael Brown", "Lisa Wang"],
    topics: ["FinTech", "HealthTech", "EdTech"],
    registration: "Closed"
  }
]

// Mock contributors
const contributors = [
  { name: "Alex Kim", bio: "AI & Data Science Writer", avatar: "/placeholder.svg?height=40&width=40", twitter: "#" },
  { name: "Priya Patel", bio: "Gadgets & Reviews", avatar: "/placeholder.svg?height=40&width=40", twitter: "#" },
  { name: "Jordan Lee", bio: "Startups & Funding", avatar: "/placeholder.svg?height=40&width=40", twitter: "#" },
]

// Enhanced Pie Chart Widget for trending tech
const PieChartWidget = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const total = data.reduce((sum, t) => sum + t.trend, 0)
  let currentAngle = 0

  return (
    <div className="relative">
      <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
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

          return (
            <g key={t.topic}>
              <motion.path
                d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                fill={`hsl(${i * 60}, 70%, ${isHovered ? '70%' : '60%'})`}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: isHovered ? 1.05 : 1,
                  filter: isHovered ? 'url(#shadow)' : 'none'
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="cursor-pointer transition-all duration-300"
              />
              {isHovered && (
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
            }`}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: `hsl(${i * 60}, 70%, 60%)` }}
              />
              <span className="text-sm">{t.topic}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-blue-500 mr-1">+{t.trend}</span>
              <span className="text-xs text-gray-500">%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Live poll widget
const LivePollWidget = ({ poll }) => {
  const [selected, setSelected] = useState(null)
  const [votes, setVotes] = useState(poll.options.map(o => o.votes))
  const totalVotes = votes.reduce((a, b) => a + b, 0)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
      <h4 className="font-semibold mb-2">{poll.question}</h4>
      {poll.options.map((option, idx) => {
        const percent = ((votes[idx] / totalVotes) * 100).toFixed(0)
        return (
          <button
            key={option.label}
            onClick={() => {
              if (selected === null) {
                const newVotes = [...votes]
                newVotes[idx]++
                setVotes(newVotes)
                setSelected(idx)
              }
            }}
            className={`w-full flex items-center mb-2 px-3 py-2 rounded-lg transition-colors ${selected === idx ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
            disabled={selected !== null}
          >
            <span className="flex-1 text-left">{option.label}</span>
            <span className="ml-2 text-sm font-medium">{percent}%</span>
          </button>
        )
      })}
      <div className="text-xs text-gray-500 mt-2">Total votes: {totalVotes}</div>
    </div>
  )
}

// New component for interactive line chart
const LineChartWidget = ({ data, title }) => {
  const maxValue = Math.max(...data)
  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - (value / maxValue) * 100
  }))

  const pathD = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ')

  return (
    <div className="relative w-full h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute top-0 left-0">
        <p className="text-sm font-medium">{title}</p>
      </div>
    </div>
  )
}

// Enhanced metrics visualization with multiple chart types
const EnhancedMetricsVisualization = ({ metric }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [chartType, setChartType] = useState('pie')

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <metric.icon className="w-8 h-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">{metric.value.toLocaleString()}</div>
          <div className="text-sm text-gray-500">{metric.label}</div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
                    </div>

      <div className="flex items-center text-xs text-green-600 mb-4">
        <TrendingUp className="w-4 h-4 mr-1" />+{metric.trend}% <span className="ml-1 text-gray-400">{metric.unit}</span>
                  </div>

      <AnimatePresence mode="wait">
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Historical Trend</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setChartType('pie')}
                  className={`p-2 rounded-full ${
                    chartType === 'pie' 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <PieChart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-full ${
                    chartType === 'line' 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <LineChart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {chartType === 'pie' ? (
              <PieChartWidget data={Object.entries(metric.distribution).map(([key, value]) => ({ topic: key, trend: value }))} />
            ) : (
              <LineChartWidget data={metric.historical} title="Historical Trend" />
            )}

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(metric.distribution).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{key}</p>
                  <p className="text-lg font-semibold">{value}%</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
          <h4 className="font-semibold">Upcoming Tech Events</h4>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <DownloadIcon className="w-5 h-5" />
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
                  <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
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
                {event.topics.map((topic, index) => (
                  <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {topic}
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
                <button className="text-blue-500 hover:text-blue-600">Learn More</button>
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
        <Mail className="w-5 h-5 mr-2" />
        <h4 className="font-semibold">Tech Times Newsletter</h4>
      </div>
      <p className="text-sm mb-2">Get the latest tech news and insights delivered to your inbox.</p>
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

// Main Tech Page
export default function TechPage() {
  const [activeTab, setActiveTab] = useState("latest")
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 newspaper-texture pb-12">
      <motion.div 
        className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Masthead />
      </motion.div>
      <AnimatedHeadline headlines={techHeadlines} />
      
      {/* Enhanced Metrics Dashboard */}
      <div className="newspaper-container mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techMetrics.map((metric, index) => (
            <EnhancedMetricsVisualization key={metric.label} metric={metric} />
          ))}
                    </div>
                  </div>

      {/* Main Content & Sidebar */}
      <div className="newspaper-container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <motion.div className="lg:col-span-8">
            {/* Tabs */}
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-8">
              {["latest", "startups", "gadgets", "ai", "events", "opinion"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium capitalize transition-colors ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {activeTab === "latest" && (
                <motion.div key="latest" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <ArticleGrid title="Latest Tech News" articles={techArticles} />
                </motion.div>
              )}
              {activeTab === "startups" && (
                <motion.div key="startups" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">Showcase of top startups (mockup)</div>
                </motion.div>
              )}
              {activeTab === "gadgets" && (
                <motion.div key="gadgets" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">Gallery of latest gadgets (mockup)</div>
                </motion.div>
              )}
              {activeTab === "ai" && (
                <motion.div key="ai" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">AI & Data dashboard (mockup)</div>
                </motion.div>
              )}
              {activeTab === "events" && (
                <motion.div key="events" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <EnhancedEventCalendar events={techEvents} />
                </motion.div>
              )}
              {activeTab === "opinion" && (
                <motion.div key="opinion" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">Opinion pieces and editorials (mockup)</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            {/* Trending Technologies Widget */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <PieChart className="w-5 h-5 mr-2 text-blue-500" />
                <h4 className="font-semibold">Trending Technologies</h4>
              </div>
              <PieChartWidget data={trendingTech} />
              <ul className="mt-4 space-y-1">
                {trendingTech.map((t, i) => (
                  <li key={t.topic} className="flex items-center justify-between text-sm">
                    <span>{t.topic}</span>
                    <span className="font-semibold text-blue-500">+{t.trend}</span>
                  </li>
                ))}
              </ul>
          </div>
            {/* Live Poll Widget */}
            <LivePollWidget poll={poll} />
            {/* Newsletter Signup */}
            <NewsletterSignup />
            {/* Contributor Spotlight */}
            <ContributorSpotlight contributors={contributors} />
            <EnhancedEventCalendar events={techEvents} />
          </motion.div>
        </div>
      </div>
    </main>
  )
}