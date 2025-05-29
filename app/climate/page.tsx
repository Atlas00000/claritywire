"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { AnimatedHeadline } from "@/components/newspaper/animated-headline"
import { ArticleGrid } from "@/components/newspaper/article-grid"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { MapPin, TrendingUp, Thermometer, Wind, Droplets, Sun, Cloud, Leaf, Calendar, Activity, BarChart2, Globe } from "lucide-react"

// Mock data for climate articles
const climateArticles = [
  { 
    id: "1", 
    title: "Global Temperature Rise Hits New Record", 
    excerpt: "Scientists report unprecedented temperature increases across multiple regions...", 
    image: "/images/articles/climate/global-temp-rise.jpg", 
    category: "CLIMATE", 
    date: "May 16, 2025", 
    author: "Dr. Sarah Chen" 
  },
  { 
    id: "2", 
    title: "Renewable Energy Milestone Achieved", 
    excerpt: "Global renewable energy production exceeds fossil fuels for the first time...", 
    image: "/images/articles/climate/renewable-energy-milestone.jpg", 
    category: "ENERGY", 
    date: "May 15, 2025", 
    author: "James Wilson" 
  },
  { 
    id: "3", 
    title: "Arctic Ice Coverage at Historic Low", 
    excerpt: "Satellite data shows dramatic reduction in Arctic ice coverage...", 
    image: "/images/articles/climate/arctic-ice-coverage.jpg", 
    category: "POLAR", 
    date: "May 14, 2025", 
    author: "Dr. Maria Rodriguez" 
  },
]

const animatedHeadlines = [
  { title: "BREAKING: Global Climate Summit Reaches Historic Agreement", category: "BREAKING NEWS" },
  { title: "New Study Reveals Accelerating Climate Change Impact", category: "RESEARCH" },
  { title: "Renewable Energy Investment Reaches All-Time High", category: "ENERGY" },
]

// Enhanced climate metrics with historical data
const climateMetrics = {
  globalTemp: {
    current: 1.2,
    change: 0.3,
    trend: "up",
    unit: "°C",
    historical: [0.8, 0.9, 1.0, 1.1, 1.2],
    target: 1.5,
    impact: "Critical"
  },
  seaLevel: {
    current: 3.4,
    change: 0.2,
    trend: "up",
    unit: "mm/year",
    historical: [2.8, 2.9, 3.1, 3.2, 3.4],
    target: 2.0,
    impact: "High"
  },
  co2Level: {
    current: 417,
    change: 2.1,
    trend: "up",
    unit: "ppm",
    historical: [410, 412, 414, 415, 417],
    target: 350,
    impact: "Critical"
  },
  renewableEnergy: {
    current: 28,
    change: 3.5,
    trend: "up",
    unit: "%",
    historical: [20, 22, 24, 26, 28],
    target: 50,
    impact: "Positive"
  }
}

// Enhanced climate actions with progress tracking
const climateActions = [
  {
    id: "a1",
    title: "Reduce Carbon Footprint",
    impact: "High",
    difficulty: "Medium",
    progress: 65,
    steps: [
      { text: "Switch to renewable energy", completed: true },
      { text: "Use public transportation", completed: true },
      { text: "Reduce meat consumption", completed: false }
    ],
    resources: [
      { title: "Guide to Renewable Energy", url: "#" },
      { title: "Public Transport Map", url: "#" }
    ]
  },
  {
    id: "a2",
    title: "Support Conservation",
    impact: "High",
    difficulty: "Low",
    steps: [
      "Plant native trees",
      "Support wildlife protection",
      "Reduce plastic use"
    ]
  },
  {
    id: "a3",
    title: "Advocate for Change",
    impact: "Very High",
    difficulty: "Medium",
    steps: [
      "Contact local representatives",
      "Join climate organizations",
      "Share information"
    ]
  }
]

// Enhanced climate news with engagement metrics
const climateNews = [
  {
    id: "n1",
    title: "New Climate Technology Breakthrough",
    category: "TECHNOLOGY",
    time: "2h ago",
    source: "Climate Tech Review",
    engagement: {
      views: 1234,
      shares: 89,
      comments: 45
    },
    tags: ["Innovation", "Technology", "Research"]
  },
  {
    id: "n2",
    title: "Community Solar Project Success",
    category: "COMMUNITY",
    time: "4h ago",
    source: "Local News"
  },
  {
    id: "n3",
    title: "Climate Education Initiative",
    category: "EDUCATION",
    time: "6h ago",
    source: "Education Daily"
  }
]

// Types for the climate map
type ViewMode = 'temperature' | 'precipitation' | 'impact'
type ImpactLevel = 'Critical' | 'High' | 'Medium' | 'Low'

interface RegionTrends {
  temperature: string
  [key: string]: string
}

interface Region {
  id: string
  name: string
  temp: number
  change: number
  precipitation: number
  impact: ImpactLevel
  coordinates: { x: number; y: number }
  description: string
  trends: RegionTrends
}

// New component for interactive climate map
const ClimateMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('temperature')

  const regions: Region[] = [
    { 
      id: "arctic", 
      name: "Arctic", 
      temp: -15, 
      change: 2.5,
      precipitation: 200,
      impact: "Critical",
      coordinates: { x: 50, y: 10 },
      description: "Most rapidly warming region on Earth",
      trends: {
        temperature: "+2.5°C/year",
        iceLoss: "13% per decade",
        seaLevel: "+3.1mm/year"
      }
    },
    { 
      id: "europe", 
      name: "Europe", 
      temp: 12, 
      change: 1.8,
      precipitation: 800,
      impact: "High",
      coordinates: { x: 45, y: 35 },
      description: "Increasing heatwaves and extreme weather",
      trends: {
        temperature: "+1.8°C/year",
        precipitation: "+5% per decade",
        extremeEvents: "+30% frequency"
      }
    },
    { 
      id: "asia", 
      name: "Asia", 
      temp: 25, 
      change: 2.2,
      precipitation: 1200,
      impact: "Critical",
      coordinates: { x: 65, y: 35 },
      description: "Rising sea levels threaten coastal communities",
      trends: {
        temperature: "+2.2°C/year",
        monsoon: "Increasing intensity",
        seaLevel: "+4.2mm/year"
      }
    },
    { 
      id: "africa", 
      name: "Africa", 
      temp: 30, 
      change: 1.5,
      precipitation: 600,
      impact: "High",
      coordinates: { x: 45, y: 60 },
      description: "Desertification and water scarcity",
      trends: {
        temperature: "+1.5°C/year",
        drought: "Increasing frequency",
        rainfall: "-10% per decade"
      }
    },
    { 
      id: "americas", 
      name: "Americas", 
      temp: 18, 
      change: 1.9,
      precipitation: 900,
      impact: "High",
      coordinates: { x: 25, y: 35 },
      description: "Intensifying hurricanes and wildfires",
      trends: {
        temperature: "+1.9°C/year",
        wildfires: "+40% frequency",
        hurricanes: "+25% intensity"
      }
    }
  ]

  const getImpactColor = (impact: ImpactLevel): string => {
    switch(impact) {
      case "Critical": return "bg-red-500"
      case "High": return "bg-orange-500"
      case "Medium": return "bg-yellow-500"
      default: return "bg-green-500"
    }
  }

  const getViewModeIcon = (mode: ViewMode) => {
    switch(mode) {
      case "temperature": return <Thermometer className="w-5 h-5" />
      case "precipitation": return <Droplets className="w-5 h-5" />
      case "impact": return <Activity className="w-5 h-5" />
    }
  }

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with view mode controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-semibold">Global Climate Impact Map</h3>
        <div className="flex flex-wrap gap-2">
          {["temperature", "precipitation", "impact"].map((mode) => (
            <motion.button
              key={mode}
              onClick={() => setViewMode(mode as ViewMode)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                viewMode === mode 
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {getViewModeIcon(mode as ViewMode)}
              <span className="capitalize text-sm font-medium">{mode}</span>
            </motion.button>
          ))}
        </div>
        </div>

      {/* Map container */}
      <div className="relative h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        {/* Map visualization */}
        <div className="absolute inset-0">
          <img 
            src="/images/maps/global-climate-map.jpg"
            alt="Global Climate Impact Map"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Interactive regions */}
        {regions.map((region) => (
          <motion.button
            key={region.id}
            className={`absolute p-3 rounded-full shadow-lg transition-all duration-200 ${
              selectedRegion === region.id
                ? "bg-blue-500 text-white ring-4 ring-blue-200 dark:ring-blue-800"
                : hoveredRegion === region.id
                ? "bg-blue-400 text-white ring-2 ring-blue-200 dark:ring-blue-800"
                : "bg-white dark:bg-gray-600 text-gray-800 dark:text-white hover:ring-2 hover:ring-blue-200 dark:hover:ring-blue-800"
            }`}
            style={{
              left: `${region.coordinates.x}%`,
              top: `${region.coordinates.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedRegion(region.id)}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <span className="font-medium whitespace-nowrap">{region.name}</span>
          </motion.button>
        ))}

        {/* Region details panel */}
        <AnimatePresence>
          {selectedRegion && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              {(() => {
                const region = regions.find(r => r.id === selectedRegion)
                if (!region) return null
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">{region.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(region.impact)} text-white`}>
                        {region.impact}
                </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {region.description}
                    </p>
                    <div className="space-y-4">
                      {viewMode === "temperature" && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Temperature</span>
                            <span className="font-semibold text-lg">{region.temp}°C</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Temperature Change</span>
                            <span className="font-semibold text-lg text-red-500">+{region.change}°C</span>
                          </div>
                        </div>
                      )}
                      {viewMode === "precipitation" && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Annual Precipitation</span>
                            <span className="font-semibold text-lg">{region.precipitation}mm</span>
                          </div>
                        </div>
                      )}
                      {viewMode === "impact" && (
                        <div className="space-y-3">
                          {Object.entries(region.trends).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1')}
                              </span>
                              <span className="font-semibold text-sm">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setSelectedRegion(null)}
                        className="w-full py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm font-medium">Critical Impact</span>
              </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-sm font-medium">High Impact</span>
          </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm font-medium">Medium Impact</span>
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced climate impact calculator
const ClimateImpactCalculator = () => {
  const [inputs, setInputs] = useState({
    commute: "",
    energy: "",
    diet: "mixed",
    waste: "medium"
  })
  const [impact, setImpact] = useState(null)

  const calculateImpact = () => {
    // Simplified calculation for demonstration
    const commuteImpact = (parseFloat(inputs.commute) || 0) * 0.2
    const energyImpact = (parseFloat(inputs.energy) || 0) * 0.15
    const dietImpact = inputs.diet === "vegan" ? 2 : inputs.diet === "vegetarian" ? 1.5 : 1
    const wasteImpact = inputs.waste === "low" ? 2 : inputs.waste === "medium" ? 1.5 : 1

    const totalImpact = commuteImpact + energyImpact + dietImpact + wasteImpact
    setImpact(totalImpact)
  }

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="font-semibold mb-4">Calculate Your Impact</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Daily Commute (km)</label>
          <input
            type="number"
            value={inputs.commute}
            onChange={(e) => setInputs({ ...inputs, commute: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            placeholder="Enter distance"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Energy Usage (kWh)</label>
          <input
            type="number"
            value={inputs.energy}
            onChange={(e) => setInputs({ ...inputs, energy: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            placeholder="Enter usage"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Diet Type</label>
          <select
            value={inputs.diet}
            onChange={(e) => setInputs({ ...inputs, diet: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="mixed">Mixed Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Waste Management</label>
          <select
            value={inputs.waste}
            onChange={(e) => setInputs({ ...inputs, waste: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="high">High Waste</option>
            <option value="medium">Medium Waste</option>
            <option value="low">Low Waste</option>
          </select>
        </div>
        <button 
          onClick={calculateImpact}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Calculate Impact
        </button>
        {impact !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <h4 className="font-medium mb-2">Your Climate Impact Score</h4>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{impact.toFixed(1)}</span>
              <span className="text-sm text-gray-500">tons CO2/year</span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${Math.min(100, (impact / 10) * 100)}%` }}
                    />
                  </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function ClimatePage() {
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

      {/* Enhanced Climate Metrics Section */}
      <div className="newspaper-container mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(climateMetrics).map(([key, metric], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {metric.current}{metric.unit}
                  </h3>
                </div>
                <div className={`p-3 rounded-full ${
                  metric.trend === "up" 
                    ? "bg-red-100 dark:bg-red-900" 
                    : "bg-green-100 dark:bg-green-900"
                }`}>
                  {key === "globalTemp" && <Thermometer className="w-6 h-6 text-red-500" />}
                  {key === "seaLevel" && <Droplets className="w-6 h-6 text-blue-500" />}
                  {key === "co2Level" && <Cloud className="w-6 h-6 text-gray-500" />}
                  {key === "renewableEnergy" && <Sun className="w-6 h-6 text-yellow-500" />}
                      </div>
                    </div>
              <div className="flex items-center mt-4 text-sm">
                <span className={`${
                  metric.trend === "up" ? "text-red-500" : "text-green-500"
                }`}>
                  {metric.change}{metric.unit} {metric.trend === "up" ? "↑" : "↓"}
                </span>
                <span className="text-gray-500 ml-2">vs last year</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Target: {metric.target}{metric.unit}</span>
                  <span className={`${
                    metric.impact === "Critical" ? "text-red-500" :
                    metric.impact === "High" ? "text-orange-500" :
                    "text-green-500"
                  }`}>
                    {metric.impact}
                  </span>
                  </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metric.impact === "Critical" ? "bg-red-500" :
                      metric.impact === "High" ? "bg-orange-500" :
                      "bg-green-500"
                    }`}
                    style={{ width: `${(metric.current / metric.target) * 100}%` }}
                  />
                </div>
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
              {["overview", "actions", "news", "research"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
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
                  <ArticleGrid title="Latest Climate News" articles={climateArticles} />
                </motion.div>
              )}

              {activeTab === "actions" && (
                <motion.div
                  key="actions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    {climateActions.map((action) => (
                      <motion.div
                        key={action.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">{action.title}</h3>
                          <div className="flex space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              action.impact === "High" || action.impact === "Very High"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            }`}>
                              Impact: {action.impact}
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                              Difficulty: {action.difficulty}
                            </span>
          </div>
        </div>
                        <div className="space-y-3">
                          {action.steps.map((step, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <span className="text-green-600 dark:text-green-400 text-sm">{index + 1}</span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300">{step.text}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "news" && (
                <motion.div
                  key="news"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    {climateNews.map((news) => (
                      <motion.div
                        key={news.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {news.category}
                          </span>
                          <span className="text-sm text-gray-500">{news.time}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                        <p className="text-sm text-gray-500">Source: {news.source}</p>
                      </motion.div>
            ))}
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
            <ClimateImpactCalculator />
            <ClimateMap />
            {/* Newsletter Signup */}
            <motion.div 
              className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Leaf className="w-6 h-6" />
                <h3 className="font-semibold">Stay Green</h3>
        </div>
              <p className="text-sm mb-4 opacity-90">Get weekly climate updates and action alerts delivered to your inbox.</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="w-full bg-white text-green-600 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  Subscribe Now
              </button>
                <p className="text-xs text-center opacity-75">
                  Join 10,000+ climate activists
                </p>
            </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}