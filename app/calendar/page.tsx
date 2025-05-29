"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Star, Users, BookOpen, TrendingUp, Clock, Eye, Heart, MessageCircle, Bookmark, BookmarkCheck, Share2, Tag, ChevronRight, ChevronLeft, Sparkles, BarChart2, User, Mail, Search, Filter, X, Calendar, MapPin, Bell
} from "lucide-react"

// Enhanced Types
type Event = {
  id: string
  title: string
  description: string
  image: string
  date: string
  location: string
  category: string
  attendees: number
  isFeatured?: boolean
  tags?: string[]
  price?: string
  organizer?: string
  status?: 'upcoming' | 'ongoing' | 'completed'
}

// Enhanced Mock Data
const mockEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "Join us for the latest in technology and innovation...",
    image: "/images/articles/tech/tech-conference.jpg",
    date: "2025-05-16",
    location: "San Francisco, CA",
    category: "Technology",
    attendees: 1234,
    isFeatured: true,
    tags: ["AI", "Cloud", "Security"],
    price: "$299",
    organizer: "Tech Events Inc",
    status: "upcoming"
  },
  {
    id: "2",
    title: "Climate Action Summit",
    description: "A global summit on climate change solutions...",
    image: "/images/articles/climate/climate-summit.jpg",
    date: "2025-05-15",
    location: "New York, NY",
    category: "Environment",
    attendees: 987,
    isFeatured: false,
    tags: ["Sustainability", "Climate"],
    price: "Free",
    organizer: "Green Earth Foundation",
    status: "upcoming"
  },
  {
    id: "3",
    title: "Digital Journalism Workshop",
    description: "Learn the future of digital journalism...",
    image: "/images/articles/journalism/journalism-workshop.jpg",
    date: "2025-05-14",
    location: "London, UK",
    category: "Journalism",
    attendees: 654,
    isFeatured: false,
    tags: ["Media", "Digital"],
    price: "$149",
    organizer: "Media Academy",
    status: "upcoming"
  },
  {
    id: "4",
    title: "AI & Machine Learning Expo",
    description: "Explore the latest in AI and ML technologies...",
    image: "/images/articles/tech/ai-expo.jpg",
    date: "2025-05-20",
    location: "Boston, MA",
    category: "Technology",
    attendees: 2100,
    isFeatured: true,
    tags: ["AI", "ML", "Data Science"],
    price: "$399",
    organizer: "AI Events Group",
    status: "upcoming"
  },
  {
    id: "5",
    title: "Sustainable Business Forum",
    description: "Connecting sustainable business leaders...",
    image: "/images/articles/business/sustainable-forum.jpg",
    date: "2025-05-22",
    location: "Amsterdam, NL",
    category: "Business",
    attendees: 850,
    isFeatured: false,
    tags: ["Business", "Sustainability"],
    price: "$199",
    organizer: "Business Network",
    status: "upcoming"
  }
]

const featuredEvents = [
  {
    id: "1",
    title: "Global Climate Summit",
    description: "World leaders gather to discuss climate action...",
    image: "/images/articles/climate/climate-summit.jpg",
    date: "June 15, 2025",
    location: "New York, USA",
    category: "Environment"
  },
  {
    id: "2",
    title: "Tech Innovation Forum",
    description: "Exploring the future of technology...",
    image: "/images/articles/tech/tech-forum.jpg",
    date: "June 20, 2025",
    location: "San Francisco, USA",
    category: "Technology"
  },
  {
    id: "3",
    title: "Cultural Arts Festival",
    description: "Celebrating global arts and culture...",
    image: "/images/articles/culture/arts-festival.jpg",
    date: "June 25, 2025",
    location: "London, UK",
    category: "Culture"
  }
]

const popularCategories = ["Technology", "Environment", "Journalism", "Business", "Health"]

const CalendarHero = () => (
  <motion.div className="relative overflow-hidden rounded-xl mb-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <div className="relative p-8">
      <motion.div className="text-6xl mb-4" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>📅</motion.div>
      <motion.h1 className="text-4xl font-serif font-bold mb-2 text-gray-900 dark:text-white" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>Upcoming Events</motion.h1>
      <motion.p className="text-lg text-gray-600 dark:text-gray-300 mb-6" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>Discover and join our upcoming events.</motion.p>
      <motion.div className="flex items-center space-x-6 text-gray-600 dark:text-gray-300" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <span className="flex items-center"><Star className="w-5 h-5 mr-2" /> 234 Events</span>
        <span className="flex items-center"><Users className="w-5 h-5 mr-2" /> 45.6K Attendees</span>
      </motion.div>
    </div>
  </motion.div>
)

const CalendarOverview = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState(mockEvents)

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay()

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear()
    })
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Calendar Overview</h3>
        <div className="flex items-center space-x-2">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
          const dayEvents = getEventsForDate(date)
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
          
          return (
            <motion.div
              key={i}
              className={`p-2 text-center rounded-lg cursor-pointer relative ${
                isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedDate(date)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05 * i }}
            >
              <span>{i + 1}</span>
              {dayEvents.length > 0 && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {dayEvents.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1 h-1 rounded-full ${
                        isSelected ? 'bg-white' : 'bg-blue-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
      {selectedDate && (
        <motion.div
          className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="font-medium mb-2">
            {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h4>
          <div className="space-y-2">
            {getEventsForDate(selectedDate).map(event => (
              <div key={event.id} className="p-2 bg-white dark:bg-gray-800 rounded shadow-sm">
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-gray-500">{event.location}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

const EventSearch = () => (
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
    <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Search Events</h3><Search className="w-5 h-5 text-blue-500" /></div>
    <div className="relative">
      <input type="text" placeholder="Search events..." className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
  </motion.div>
)

const FeaturedEvents = () => {
  const [current, setCurrent] = useState(0)
  return (
    <motion.div className="relative mb-8 overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700"><h2 className="text-xl font-serif font-bold">Featured Events</h2></div>
      <div className="relative">
        <motion.div className="flex transition-transform duration-500 ease-in-out" animate={{ x: `-${current * 100}%` }}>
          {featuredEvents.map((event, i) => (
            <div key={event.id} className="w-full flex-shrink-0 p-4">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg mb-2" />
              <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <MapPin className="w-4 h-4" /> {event.location}
                <Clock className="w-4 h-4 ml-2" /> {event.date}
              </div>
            </div>
          ))}
        </motion.div>
        <button onClick={() => setCurrent((current - 1 + featuredEvents.length) % featuredEvents.length)} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg"><ChevronLeft className="w-5 h-5" /></button>
        <button onClick={() => setCurrent((current + 1) % featuredEvents.length)} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg"><ChevronRight className="w-5 h-5" /></button>
      </div>
      <div className="flex justify-center space-x-2 p-4">
        {featuredEvents.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${current === i ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
        ))}
      </div>
    </motion.div>
  )
}

const PopularCategories = () => (
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
    <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Popular Categories</h3><Tag className="w-5 h-5 text-blue-500" /></div>
    <div className="flex flex-wrap gap-2">
      {popularCategories.map((category, i) => (
        <motion.span key={category} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.05 * i }}>{category}</motion.span>
      ))}
    </div>
  </motion.div>
)

const NewsletterSignup = () => (
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
    <div className="flex items-center mb-2"><Mail className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" /><h4 className="font-semibold text-gray-900 dark:text-white">Stay Updated</h4></div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Get the latest events delivered to your inbox.</p>
    <form className="flex">
      <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      <button type="submit" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Subscribe</button>
    </form>
  </motion.div>
)

const RecentActivity = () => (
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
    <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Recent Activity</h3><Bell className="w-5 h-5 text-blue-500" /></div>
    <div className="space-y-3">
      {mockEvents.slice(0, 3).map((event, i) => (
        <motion.div key={event.id} className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}>
          <div className="font-medium">{event.title}</div>
          <div className="text-xs text-gray-500">{event.attendees} attendees</div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)

const EventFilters = () => {
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    status: ''
  })

  const categories = [...new Set(mockEvents.map(event => event.category))]
  const prices = [...new Set(mockEvents.map(event => event.price))]
  const statuses = ['upcoming', 'ongoing', 'completed']

  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filter Events</h3>
        <Filter className="w-5 h-5 text-blue-500" />
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Range</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">All Prices</option>
            {prices.map(price => (
              <option key={price} value={price}>{price}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  )
}

const EventStats = () => (
  <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">Event Statistics</h3>
      <BarChart2 className="w-5 h-5 text-blue-500" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-sm text-gray-500">Total Events</div>
        <div className="text-2xl font-bold">{mockEvents.length}</div>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-sm text-gray-500">Total Attendees</div>
        <div className="text-2xl font-bold">
          {mockEvents.reduce((sum, event) => sum + event.attendees, 0).toLocaleString()}
        </div>
      </div>
    </div>
  </motion.div>
)

export default function CalendarPage() {
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
        <CalendarHero />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <CalendarOverview />
            <EventFilters />
            <EventSearch />
            <FeaturedEvents />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <EventStats />
            <PopularCategories />
            <NewsletterSignup />
            <RecentActivity />
          </div>
        </div>
      </div>
    </main>
  )
} 