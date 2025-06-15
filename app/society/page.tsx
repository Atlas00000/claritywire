"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { AnimatedHeadline } from "@/components/newspaper/animated-headline"
import { ArticleGrid } from "@/components/newspaper/article-grid"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Users, TrendingUp, Heart, MessageCircle, Share2, Bookmark, Globe, Building2, School, Briefcase, Calendar, MapPin, Clock, ChevronDown, ChevronUp, BarChart2, PieChart, Activity, Filter, SortAsc, SortDesc, Download, RefreshCw } from "lucide-react"

// Mock data for society articles
const societyArticles = [
  { 
    id: "1", 
    title: "Community Gardens Transform Urban Spaces", 
    excerpt: "Local initiatives bring neighbors together through sustainable urban farming...", 
    image: "/images/articles/society/community-gardens.jpg", 
    category: "COMMUNITY", 
    date: "May 16, 2025", 
    author: "Sarah Johnson" 
  },
  { 
    id: "2", 
    title: "Digital Literacy Programs Bridge Generation Gap", 
    excerpt: "Youth-led workshops help seniors navigate the digital world...", 
    image: "/images/articles/society/digital-literacy.jpg", 
    category: "EDUCATION", 
    date: "May 15, 2025", 
    author: "Michael Chen" 
  },
  { 
    id: "3", 
    title: "Cultural Festivals Celebrate Diversity", 
    excerpt: "Annual events showcase the rich tapestry of local traditions...", 
    image: "/images/articles/society/cultural-festival.jpg", 
    category: "CULTURE", 
    date: "May 14, 2025", 
    author: "Maria Rodriguez" 
  },
]

const animatedHeadlines = [
  { title: "BREAKING: Community Center Opens Doors to All", category: "BREAKING NEWS" },
  { title: "Local Heroes: Volunteers Making a Difference", category: "FEATURES" },
  { title: "Youth Leadership Program Launches", category: "EDUCATION" },
]

// Enhanced society metrics with historical data and trends
const societyMetrics = {
  communityEvents: {
    current: 156,
    change: 23,
    trend: "up",
    unit: "events",
    category: "Community Engagement",
    historical: [120, 130, 145, 156],
    target: 200,
    impact: "High",
    distribution: {
      social: 45,
      educational: 30,
      cultural: 25
    }
  },
  volunteerHours: {
    current: 12500,
    change: 1500,
    trend: "up",
    unit: "hours",
    category: "Volunteerism",
    historical: [9000, 10000, 11500, 12500],
    target: 15000,
    impact: "Very High",
    distribution: {
      youth: 40,
      seniors: 30,
      adults: 30
    }
  },
  youthPrograms: {
    current: 45,
    change: 8,
    trend: "up",
    unit: "programs",
    category: "Youth Development",
    historical: [30, 35, 40, 45],
    target: 60,
    impact: "High",
    distribution: {
      education: 50,
      sports: 30,
      arts: 20
    }
  },
  culturalEvents: {
    current: 89,
    change: 12,
    trend: "up",
    unit: "events",
    category: "Cultural Activities",
    historical: [65, 72, 80, 89],
    target: 100,
    impact: "Medium",
    distribution: {
      festivals: 40,
      workshops: 35,
      performances: 25
    }
  }
}

// Enhanced community initiatives with more detailed data
const communityInitiatives = [
  {
    id: "i1",
    title: "Neighborhood Watch",
    status: "Active",
    participants: 245,
    impact: "High",
    activities: [
      "Regular patrols",
      "Community meetings",
      "Safety workshops"
    ],
    progress: 85,
    milestones: [
      { date: "Jan 2025", description: "Program Launch", completed: true },
      { date: "Mar 2025", description: "100 Members", completed: true },
      { date: "Jun 2025", description: "Safety Training", completed: false }
    ],
    resources: [
      { title: "Safety Guidelines", url: "#" },
      { title: "Training Materials", url: "#" }
    ],
    engagement: {
      meetings: 12,
      reports: 45,
      feedback: 89
    }
  },
  {
    id: "i2",
    title: "Youth Mentorship",
    status: "Growing",
    participants: 180,
    impact: "High",
    activities: [
      "One-on-one mentoring",
      "Career guidance",
      "Skill development"
    ],
    progress: 65
  },
  {
    id: "i3",
    title: "Senior Support",
    status: "Active",
    participants: 120,
    impact: "Medium",
    activities: [
      "Home visits",
      "Social activities",
      "Health check-ins"
    ],
    progress: 75
  }
]

// Enhanced upcoming events with more details
const upcomingEvents = [
  {
    id: "e1",
    title: "Community Potluck",
    date: "May 20",
    time: "6:00 PM",
    location: "Central Park",
    category: "Social",
    attendees: 89,
    capacity: 100,
    organizer: "Community Center",
    description: "Join us for a night of food, music, and community bonding.",
    requirements: ["Bring a dish", "RSVP required"],
    activities: ["Food sharing", "Live music", "Games"],
    weather: "Sunny, 75°F"
  },
  {
    id: "e2",
    title: "Youth Leadership Workshop",
    date: "May 22",
    time: "3:00 PM",
    location: "Community Center",
    category: "Education",
    attendees: 45
  },
  {
    id: "e3",
    title: "Cultural Festival",
    date: "May 25",
    time: "12:00 PM",
    location: "Downtown Square",
    category: "Cultural",
    attendees: 234
  }
]

// Community stories data
const communityStories = [
  {
    id: "s1",
    title: "Local Hero: Jane's Community Impact",
    category: "FEATURES",
    time: "2h ago",
    author: "John Smith",
    engagement: {
      likes: 234,
      comments: 45,
      shares: 23
    }
  },
  {
    id: "s2",
    title: "Youth Program Success Story",
    category: "EDUCATION",
    time: "4h ago",
    author: "Lisa Chen",
    engagement: {
      likes: 189,
      comments: 34,
      shares: 17
    }
  },
  {
    id: "s3",
    title: "Community Garden Blooms",
    category: "ENVIRONMENT",
    time: "6h ago",
    author: "Mike Johnson",
    engagement: {
      likes: 156,
      comments: 28,
      shares: 15
    }
  }
]

// New component for interactive pie chart
const PieChartVisualization = ({ data, title }) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0)
  let currentAngle = 0

  return (
    <div className="relative w-full h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {Object.entries(data).map(([key, value], index) => {
          const percentage = (value / total) * 100
          const angle = (percentage / 100) * 360
          const startAngle = currentAngle
          currentAngle += angle

          const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180))
          const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180))
          const endX = 50 + 40 * Math.cos((currentAngle - 90) * (Math.PI / 180))
          const endY = 50 + 40 * Math.sin((currentAngle - 90) * (Math.PI / 180))

          const largeArcFlag = angle > 180 ? 1 : 0

          return (
            <motion.path
              key={key}
              d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
              fill={`hsl(${index * 60}, 70%, 60%)`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
      </div>
    </div>
  )
}

// New component for line graph
const LineGraphVisualization = ({ data, title }) => {
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

// Enhanced MetricsVisualization component
const MetricsVisualization = ({ metric }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [visualizationType, setVisualizationType] = useState('pie')

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{metric.category}</p>
          <h3 className="text-2xl font-bold mt-1">{metric.current.toLocaleString()}</h3>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        </div>

      <div className="flex items-center mt-4 text-sm">
        <span className="text-green-500">+{metric.change} {metric.unit}</span>
        <span className="text-gray-500 ml-2">this month</span>
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
                  <span>Target</span>
                  <span>{metric.target} {metric.unit}</span>
                        </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(metric.current / metric.target) * 100}%` }}
                  />
                      </div>
                    </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setVisualizationType('pie')}
                  className={`p-2 rounded-full ${
                    visualizationType === 'pie' 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <PieChart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setVisualizationType('line')}
                  className={`p-2 rounded-full ${
                    visualizationType === 'line' 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <BarChart2 className="w-4 h-4" />
                </button>
                  </div>
            </div>

            {visualizationType === 'pie' ? (
              <PieChartVisualization data={metric.distribution} title={metric.category} />
            ) : (
              <LineGraphVisualization data={metric.historical} title="Historical Trend" />
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

// New component for enhanced event card
const EnhancedEventCard = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex flex-col items-center justify-center">
        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{event.date}</span>
          </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{event.title}</h4>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-sm text-gray-500">{event.time} • {event.location}</p>
        <div className="flex items-center mt-1">
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700">
            {event.category}
          </span>
          <span className="text-xs text-gray-500 ml-2">
            {event.attendees}/{event.capacity} attending
          </span>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-2 text-sm"
            >
              <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{event.time}</span>
                  </div>
              <div className="flex flex-wrap gap-2">
                {event.requirements.map((req, index) => (
                  <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {req}
                      </span>
                ))}
                      </div>
            </motion.div>
          )}
        </AnimatePresence>
                    </div>
    </motion.div>
  )
}

// Enhanced event calendar with filtering and sorting
const EnhancedEventCalendar = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('asc')
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    date: 'all'
  })

  const categories = [...new Set(events.map(event => event.category))]
  const dates = [...new Set(events.map(event => event.date))]

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
    
    if (activeFilters.category !== 'all') {
      filtered = filtered.filter(event => event.category === activeFilters.category)
    }
    
    if (activeFilters.date !== 'all') {
      filtered = filtered.filter(event => event.date === activeFilters.date)
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
        <h3 className="font-semibold">Upcoming Events</h3>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Calendar className="w-5 h-5" />
          </button>
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
            value={activeFilters.category}
            onChange={(e) => handleFilter('category', e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
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
            <EnhancedEventCard key={event.id} event={event} />
          ))}
                  </div>
                </div>
    </motion.div>
  )
}

export default function SocietyPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <main ref={containerRef}>
      <motion.div 
        style={{ opacity, scale }}
        className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg"
      >
        <Masthead />
      </motion.div>

      <AnimatedHeadline headlines={animatedHeadlines} />

      {/* Enhanced Society Metrics Section */}
      <div className="newspaper-container mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(societyMetrics).map(([key, metric], index) => (
            <MetricsVisualization key={key} metric={metric} />
            ))}
          </div>
        </div>

      <div className="newspaper-container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Tab Navigation */}
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-8">
              {["overview", "initiatives", "stories", "calendar"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArticleGrid title="Latest Community News" articles={societyArticles} />
                </motion.div>
              )}

              {activeTab === "initiatives" && (
                <motion.div
                  key="initiatives"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    {communityInitiatives.map((initiative) => (
                      <motion.div
                        key={initiative.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">{initiative.title}</h3>
                          <div className="flex space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              initiative.status === "Active" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            }`}>
                              {initiative.status}
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                              {initiative.participants} participants
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {initiative.activities.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <span className="text-blue-600 dark:text-blue-400 text-sm">{index + 1}</span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300">{activity}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{initiative.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${initiative.progress}%` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "stories" && (
                <motion.div
                  key="stories"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    {communityStories.map((story) => (
                      <motion.div
                        key={story.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {story.category}
                          </span>
                          <span className="text-sm text-gray-500">{story.time}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{story.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">By {story.author}</p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                            <Heart className="w-4 h-4" />
                            <span>{story.engagement.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                            <MessageCircle className="w-4 h-4" />
                            <span>{story.engagement.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                            <Share2 className="w-4 h-4" />
                            <span>{story.engagement.shares}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className="lg:col-span-4">
            <EnhancedEventCalendar events={upcomingEvents} />
            {/* Community Spotlight */}
            <motion.div 
              className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6" />
                <h3 className="font-semibold">Community Spotlight</h3>
              </div>
              <p className="text-sm mb-4 opacity-90">
                Join our growing community of volunteers and make a difference in your neighborhood.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-white text-blue-600 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  Become a Volunteer
                </button>
                <button className="w-full bg-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition-colors font-medium">
                  Learn More
              </button>
                <p className="text-xs text-center opacity-75">
                  Join 1,000+ active volunteers
                </p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { icon: Building2, text: "Community Centers" },
                  { icon: School, text: "Education Programs" },
                  { icon: Briefcase, text: "Volunteer Opportunities" },
                  { icon: Globe, text: "Cultural Events" }
                ].map((link, index) => (
                  <motion.button
                    key={index}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <link.icon className="w-5 h-5 text-blue-500" />
                    <span>{link.text}</span>
                  </motion.button>
                ))}
          </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}