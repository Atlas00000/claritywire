"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { AnimatedHeadline } from "@/components/newspaper/animated-headline"
import { ArticleGrid } from "@/components/newspaper/article-grid"
import { TrendingSidebar } from "@/components/newspaper/trending-sidebar"
import { InteractiveChart } from "@/components/newspaper/interactive-chart"
import { ContributorProfiles } from "@/components/newspaper/contributor-profiles"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { MapPin, TrendingUp, Users, Calendar, Clock, ArrowUpRight } from "lucide-react"

// Mock data (replace with real data as needed)
const politicsArticles = [
  { 
    id: "1", 
    title: "Election Results Announced", 
    excerpt: "The latest election results are in...", 
    image: "/images/articles/politics/election-results.jpg", 
    category: "POLITICS", 
    date: "May 16, 2025", 
    author: "Jane Doe" 
  },
  { 
    id: "2", 
    title: "Senate Passes New Bill", 
    excerpt: "A new bill has been passed in the Senate...", 
    image: "/images/articles/politics/senate-bill.jpg", 
    category: "POLITICS", 
    date: "May 15, 2025", 
    author: "John Smith" 
  },
  { 
    id: "3", 
    title: "International Summit Highlights", 
    excerpt: "Key takeaways from the recent summit...", 
    image: "/images/articles/politics/international-summit.jpg", 
    category: "POLITICS", 
    date: "May 14, 2025", 
    author: "Alex Lee" 
  },
]

const animatedHeadlines = [
  { title: "Election Results: Major Upset in Key States", category: "BREAKING NEWS" },
  { title: "Senate Approves Landmark Legislation", category: "POLITICS" },
  { title: "International Relations: New Alliances Formed", category: "WORLD" },
]

const trendingItems = [
  { id: "t1", title: "Election Results Announced", views: "12.5K" },
  { id: "t2", title: "Senate Passes New Bill", views: "9.3K" },
  { id: "t3", title: "International Summit Highlights", views: "7.7K" },
]

const contributors = [
  { id: "c1", name: "Jane Doe", title: "Political Analyst", image: "/placeholder.svg?height=100&width=100" },
  { id: "c2", name: "John Smith", title: "Reporter", image: "/placeholder.svg?height=100&width=100" },
  { id: "c3", name: "Alex Lee", title: "Editor", image: "/placeholder.svg?height=100&width=100" },
]

// Enhanced mock data for new features
const statsData = [
  { label: "Active Voters", value: "2.4M", change: "+12%", icon: Users },
  { label: "Election Turnout", value: "68%", change: "+5%", icon: TrendingUp },
  { label: "Upcoming Events", value: "24", change: "New", icon: Calendar },
  { label: "Live Debates", value: "3", change: "Now", icon: Clock },
]

const policyProgress = [
  { 
    name: "Climate Action", 
    progress: 75, 
    color: "#4CAF50",
    icon: "🌱",
    details: "Reducing carbon emissions by 50% by 2030",
    milestones: [
      { label: "Initial Plan", completed: true },
      { label: "Legislation Draft", completed: true },
      { label: "Senate Approval", completed: true },
      { label: "House Vote", completed: false },
      { label: "Implementation", completed: false }
    ]
  },
  { 
    name: "Healthcare Reform", 
    progress: 45, 
    color: "#2196F3",
    icon: "🏥",
    details: "Expanding coverage to 95% of citizens",
    milestones: [
      { label: "Committee Review", completed: true },
      { label: "Public Hearing", completed: true },
      { label: "Senate Debate", completed: false },
      { label: "Final Vote", completed: false },
      { label: "Rollout", completed: false }
    ]
  },
  { 
    name: "Education Bill", 
    progress: 90, 
    color: "#9C27B0",
    icon: "📚",
    details: "Modernizing curriculum and infrastructure",
    milestones: [
      { label: "Research Phase", completed: true },
      { label: "Draft Bill", completed: true },
      { label: "Public Consultation", completed: true },
      { label: "Legislative Approval", completed: true },
      { label: "Implementation", completed: false }
    ]
  },
  { 
    name: "Infrastructure", 
    progress: 60, 
    color: "#FF9800",
    icon: "🏗️",
    details: "National infrastructure modernization plan",
    milestones: [
      { label: "Assessment", completed: true },
      { label: "Budget Allocation", completed: true },
      { label: "Contract Awards", completed: true },
      { label: "Construction", completed: false },
      { label: "Completion", completed: false }
    ]
  },
]

const electionMap = {
  states: [
    { id: "ca", name: "California", party: "Democrat", margin: 15, electoralVotes: 55 },
    { id: "tx", name: "Texas", party: "Republican", margin: 8, electoralVotes: 38 },
    { id: "ny", name: "New York", party: "Democrat", margin: 20, electoralVotes: 29 },
    { id: "fl", name: "Florida", party: "Republican", margin: 5, electoralVotes: 29 },
    { id: "il", name: "Illinois", party: "Democrat", margin: 12, electoralVotes: 20 },
    { id: "pa", name: "Pennsylvania", party: "Democrat", margin: 3, electoralVotes: 20 },
  ]
}

const liveDebates = [
  { id: "d1", topic: "Climate Policy", participants: ["Rep. Smith", "Sen. Johnson"], status: "Live", viewers: "1.2M" },
  { id: "d2", topic: "Economic Reform", participants: ["Dr. Williams", "Prof. Chen"], status: "Upcoming", time: "2:00 PM" },
  { id: "d3", topic: "Healthcare Bill", participants: ["Rep. Davis", "Sen. Martinez"], status: "Scheduled", date: "Tomorrow" },
]

// Enhanced mock data for sidebar widgets
const pollData = {
  question: "Who do you think will win the next election?",
  options: [
    { id: "a", label: "Candidate A", votes: 1250, percentage: 45 },
    { id: "b", label: "Candidate B", votes: 980, percentage: 35 },
    { id: "c", label: "Undecided", votes: 520, percentage: 20 }
  ],
  totalVotes: 2750,
  timeLeft: "2 days left"
}

const trendingTopics = [
  { id: "t1", title: "Election Results Announced", views: "12.5K", category: "BREAKING", trend: "up", change: "+15%" },
  { id: "t2", title: "Senate Passes New Bill", views: "9.3K", category: "POLITICS", trend: "up", change: "+8%" },
  { id: "t3", title: "International Summit Highlights", views: "7.7K", category: "WORLD", trend: "down", change: "-3%" },
  { id: "t4", title: "New Policy Announcement", views: "6.2K", category: "POLICY", trend: "up", change: "+12%" },
  { id: "t5", title: "Debate Highlights", views: "5.8K", category: "DEBATE", trend: "up", change: "+5%" }
]

const socialFeed = [
  { 
    id: "s1", 
    user: "Political Analyst", 
    handle: "@pol_analyst", 
    avatar: "/placeholder.svg?height=100&width=100",
    content: "Breaking: New poll shows significant shift in voter preferences. Key battleground states showing interesting trends.",
    time: "2h ago",
    likes: 245,
    comments: 89,
    shares: 56
  },
  { 
    id: "s2", 
    user: "News Reporter", 
    handle: "@news_reporter", 
    avatar: "/placeholder.svg?height=100&width=100",
    content: "Live coverage of the Senate session today. Major bills being discussed that could impact millions of citizens.",
    time: "3h ago",
    likes: 189,
    comments: 45,
    shares: 32
  },
  { 
    id: "s3", 
    user: "Policy Expert", 
    handle: "@policy_expert", 
    avatar: "/placeholder.svg?height=100&width=100",
    content: "Analysis: The new infrastructure bill could create over 2 million jobs. Here's what you need to know.",
    time: "4h ago",
    likes: 312,
    comments: 78,
    shares: 92
  }
]

export default function PoliticsPage() {
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

      {/* Quick Stats Section */}
      <div className="newspaper-container mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <stat.icon className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center mt-4 text-sm text-green-500">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </motion.div>
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
              {["overview", "debates", "policies", "elections"].map((tab) => (
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
                  <ArticleGrid title="Latest Political News" articles={politicsArticles} />
                  
                  <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-6">Policy Progress Tracker</h3>
                    <div className="space-y-8">
                      {policyProgress.map((policy, index) => (
                        <motion.div
                          key={policy.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{policy.icon}</span>
                              <div>
                                <h4 className="font-semibold text-lg">{policy.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{policy.details}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold" style={{ color: policy.color }}>
                                {policy.progress}%
                              </span>
                              <div className="w-16 h-16 relative">
                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                  <path
                                    d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#E5E7EB"
                                    strokeWidth="3"
                                    className="dark:stroke-gray-700"
                                  />
                                  <motion.path
                                    d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke={policy.color}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: policy.progress / 100 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                  {policy.progress}%
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                            <motion.div
                              className="h-2.5 rounded-full"
                              style={{ backgroundColor: policy.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${policy.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>

                          <div className="flex justify-between items-center">
                            {policy.milestones.map((milestone, idx) => (
                              <motion.div
                                key={idx}
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (idx * 0.1) }}
                              >
                                <div 
                                  className={`w-4 h-4 rounded-full mb-2 ${
                                    milestone.completed 
                                      ? "bg-green-500" 
                                      : "bg-gray-300 dark:bg-gray-600"
                                  }`}
                                />
                                <span className="text-xs text-center max-w-[100px] text-gray-600 dark:text-gray-400">
                                  {milestone.label}
                  </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "debates" && (
                <motion.div
                  key="debates"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    {liveDebates.map((debate) => (
                      <motion.div
                        key={debate.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold">{debate.topic}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            debate.status === "Live" 
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" 
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}>
                            {debate.status}
                          </span>
                </div>
                        <div className="mt-4 space-y-2">
                          <p className="text-gray-600 dark:text-gray-300">
                            Participants: {debate.participants.join(" vs ")}
                          </p>
                          {debate.viewers && (
                            <p className="text-sm text-gray-500">
                              {debate.viewers} watching
                            </p>
                          )}
                          {debate.time && (
                            <p className="text-sm text-gray-500">
                              Starts at {debate.time}
                            </p>
                          )}
                          {debate.date && (
                            <p className="text-sm text-gray-500">
                              {debate.date}
                            </p>
                          )}
              </div>
                      </motion.div>
                    ))}
          </div>
                </motion.div>
              )}

              {activeTab === "elections" && (
                <motion.div
                  key="elections"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Election Map 2025</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {electionMap.states.map((state) => (
                        <motion.div
                          key={state.id}
                          className={`p-4 rounded-lg ${
                            state.party === "Democrat" 
                              ? "bg-blue-100 dark:bg-blue-900" 
                              : "bg-red-100 dark:bg-red-900"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold">{state.name}</h4>
                            <span className="text-sm font-medium">{state.electoralVotes} EV</span>
                </div>
                          <p className="text-sm mt-1">
                            {state.party} +{state.margin}%
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TrendingSidebar items={trendingItems} />
            
            {/* Live Poll Widget */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Live Poll</h3>
                <span className="text-sm text-gray-500">{pollData.timeLeft}</span>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-medium">{pollData.question}</p>
                <div className="space-y-4">
                  {pollData.options.map((option) => (
                    <div key={option.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="radio" 
                            name="poll" 
                            id={option.id} 
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={option.id} className="text-sm font-medium">{option.label}</label>
                        </div>
                        <span className="text-sm text-gray-500">{option.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full bg-blue-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${option.percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{option.votes.toLocaleString()} votes</span>
                        <span>{option.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500">Total votes: {pollData.totalVotes.toLocaleString()}</p>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Vote Now
                </button>
              </div>
            </motion.div>

            {/* Trending Topics Widget */}
            <motion.div 
              className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-semibold mb-4">Trending Now</h3>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          topic.category === "BREAKING" 
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}>
                          {topic.category}
                        </span>
                        <span className={`text-xs ${
                          topic.trend === "up" ? "text-green-500" : "text-red-500"
                        }`}>
                          {topic.change}
                        </span>
                      </div>
                      <p className="text-sm font-medium truncate">{topic.title}</p>
                      <p className="text-xs text-gray-500">{topic.views} views</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Feed Widget */}
            <motion.div 
              className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Live Social Feed</h3>
                <span className="text-xs text-blue-600 dark:text-blue-400">Live Updates</span>
              </div>
              <div className="space-y-6">
                {socialFeed.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start space-x-3">
                      <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium">{post.user}</p>
                          <span className="text-xs text-gray-500">{post.handle}</span>
                          <span className="text-xs text-gray-500">· {post.time}</span>
                        </div>
                        <p className="text-sm mt-1">{post.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-xs">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-xs">{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            <span className="text-xs">{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
          ))}
        </div>
            </motion.div>

        {/* Newsletter Signup */}
            <motion.div 
              className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="font-semibold">Stay Updated</h3>
              </div>
              <p className="text-sm mb-4 opacity-90">Get daily political updates and exclusive insights delivered to your inbox.</p>
              <div className="space-y-3">
                <div className="relative">
              <input
                type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                <button className="w-full bg-white text-blue-600 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  Subscribe Now
              </button>
                <p className="text-xs text-center opacity-75">
                  By subscribing, you agree to our Privacy Policy and Terms of Service
                </p>
          </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}