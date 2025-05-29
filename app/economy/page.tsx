"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { AnimatedHeadline } from "@/components/newspaper/animated-headline"
import { ArticleGrid } from "@/components/newspaper/article-grid"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  TrendingUp, TrendingDown, DollarSign, BarChart2, 
  PieChart, Calendar, Mail, Star, Globe, ChevronDown, 
  ChevronUp, ArrowUpRight, ArrowDownRight, LineChart,
  Building2, Factory, ShoppingCart, Users, Banknote,
  RefreshCw, Download, SortAsc, SortDesc, Bell
} from "lucide-react"

// Mock headlines
const economyHeadlines = [
  { title: "BREAKING: Federal Reserve Announces Interest Rate Decision", category: "MARKETS" },
  { title: "Global Markets React to Economic Data Release", category: "GLOBAL" },
  { title: "New Economic Policy Framework Unveiled", category: "POLICY" },
]

// Mock economic metrics
const economicMetrics = [
  { 
    label: "GDP Growth", 
    value: "2.4%", 
    icon: TrendingUp, 
    trend: 0.3, 
    unit: "Q1 2025",
    historical: [1.8, 2.0, 2.2, 2.4],
    distribution: {
      "Services": 45,
      "Manufacturing": 30,
      "Construction": 15,
      "Agriculture": 10
    }
  },
  { 
    label: "Inflation Rate", 
    value: "3.2%", 
    icon: TrendingDown, 
    trend: -0.2, 
    unit: "YoY",
    historical: [4.0, 3.8, 3.5, 3.2],
    distribution: {
      "Housing": 35,
      "Transportation": 25,
      "Food": 20,
      "Energy": 20
    }
  },
  { 
    label: "Unemployment", 
    value: "4.1%", 
    icon: Users, 
    trend: -0.1, 
    unit: "Latest",
    historical: [4.5, 4.3, 4.2, 4.1],
    distribution: {
      "Full-time": 75,
      "Part-time": 15,
      "Temporary": 10
    }
  },
  { 
    label: "Trade Balance", 
    value: "-$45.2B", 
    icon: Globe, 
    trend: 2.1, 
    unit: "Monthly",
    historical: [-50.1, -48.5, -47.2, -45.2],
    distribution: {
      "Exports": 40,
      "Imports": 60
    }
  }
]

// Mock market data
const marketData = {
  stocks: [
    { symbol: "S&P 500", value: "4,521.23", change: "+1.2%" },
    { symbol: "Dow Jones", value: "34,521.45", change: "+0.8%" },
    { symbol: "Nasdaq", value: "14,231.67", change: "+1.5%" }
  ],
  currencies: [
    { pair: "EUR/USD", value: "1.0854", change: "+0.2%" },
    { pair: "GBP/USD", value: "1.2654", change: "-0.1%" },
    { pair: "USD/JPY", value: "151.23", change: "+0.3%" }
  ],
  commodities: [
    { name: "Gold", value: "$2,345.67", change: "+0.5%" },
    { name: "Oil", value: "$78.45", change: "-1.2%" },
    { name: "Silver", value: "$28.34", change: "+0.8%" }
  ]
}

// Mock articles
const economyArticles = [
  { 
    id: "1", 
    title: "Global Economic Recovery Shows Signs of Strength", 
    excerpt: "Key indicators suggest a robust recovery across major economies...", 
    image: "/placeholder.svg?height=200&width=300", 
    category: "GLOBAL", 
    date: "May 16, 2025", 
    author: "Dr. Sarah Chen",
    views: 12500,
    shares: 450,
    comments: 89
  },
  { 
    id: "2", 
    title: "Tech Sector Leads Market Rally", 
    excerpt: "Technology stocks continue to outperform as AI boom drives growth...", 
    image: "/placeholder.svg?height=200&width=300", 
    category: "MARKETS", 
    date: "May 15, 2025", 
    author: "Michael Brown",
    views: 9800,
    shares: 320,
    comments: 65
  },
  { 
    id: "3", 
    title: "New Trade Agreement Boosts Economic Outlook", 
    excerpt: "Historic trade deal expected to create new opportunities...", 
    image: "/placeholder.svg?height=200&width=300", 
    category: "TRADE", 
    date: "May 14, 2025", 
    author: "Lisa Wang",
    views: 7500,
    shares: 280,
    comments: 42
  }
]

// Mock economic calendar events
const economicEvents = [
  { 
    id: "e1", 
    title: "Fed Interest Rate Decision", 
    date: "May 20", 
    time: "14:00 EST",
    impact: "High",
    description: "Federal Reserve announces interest rate decision and monetary policy statement.",
    previous: "5.50%",
    forecast: "5.50%",
    actual: "Pending"
  },
  { 
    id: "e2", 
    title: "GDP Growth Rate", 
    date: "May 22", 
    time: "08:30 EST",
    impact: "High",
    description: "Q1 2025 GDP growth rate announcement.",
    previous: "2.1%",
    forecast: "2.4%",
    actual: "Pending"
  },
  { 
    id: "e3", 
    title: "Inflation Rate", 
    date: "May 25", 
    time: "08:30 EST",
    impact: "High",
    description: "Monthly inflation rate data release.",
    previous: "3.3%",
    forecast: "3.2%",
    actual: "Pending"
  }
]

// Market Watch Widget
const MarketWatchWidget = ({ data }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Market Watch</h4>
        <RefreshCw className="w-4 h-4 text-gray-500" />
        </div>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium mb-2">Stocks</h5>
          <div className="space-y-2">
            {data.stocks.map((stock, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{stock.symbol}</span>
                <div className="flex items-center">
                  <span className="mr-2">{stock.value}</span>
                  <span className={`text-sm ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change}
            </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2">Currencies</h5>
          <div className="space-y-2">
            {data.currencies.map((currency, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{currency.pair}</span>
                <div className="flex items-center">
                  <span className="mr-2">{currency.value}</span>
                  <span className={`text-sm ${currency.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {currency.change}
                  </span>
                  </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2">Commodities</h5>
          <div className="space-y-2">
            {data.commodities.map((commodity, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{commodity.name}</span>
                <div className="flex items-center">
                  <span className="mr-2">{commodity.value}</span>
                  <span className={`text-sm ${commodity.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {commodity.change}
                      </span>
                      </div>
                    </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Economic Calendar Widget
const EconomicCalendarWidget = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('asc')
  const [activeFilters, setActiveFilters] = useState({
    impact: 'all',
    date: 'all'
  })

  const impacts = [...new Set(events.map(event => event.impact))]
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
    
    if (activeFilters.impact !== 'all') {
      filtered = filtered.filter(event => event.impact === activeFilters.impact)
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          <h4 className="font-semibold">Economic Calendar</h4>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <select
            value={activeFilters.impact}
            onChange={(e) => handleFilter('impact', e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="all">All Impact Levels</option>
            {impacts.map(impact => (
              <option key={impact} value={impact}>{impact}</option>
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
                  <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  event.impact === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  event.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {event.impact} Impact
                      </span>
                    </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Previous</p>
                  <p className="font-medium">{event.previous}</p>
                  </div>
                <div>
                  <p className="text-gray-500">Forecast</p>
                  <p className="font-medium">{event.forecast}</p>
                </div>
                <div>
                  <p className="text-gray-500">Actual</p>
                  <p className="font-medium">{event.actual}</p>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        </div>
    </motion.div>
  )
}

// Currency Converter Widget
const CurrencyConverterWidget = () => {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState(0.85)

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD']

  const handleConvert = () => {
    // Mock conversion logic
    const rates = {
      USD: { EUR: 0.85, GBP: 0.75, JPY: 110, AUD: 1.35, CAD: 1.25 },
      EUR: { USD: 1.18, GBP: 0.88, JPY: 129, AUD: 1.59, CAD: 1.47 },
      // Add more rates as needed
    }
    
    if (fromCurrency === toCurrency) {
      setResult(amount)
    } else {
      const rate = rates[fromCurrency]?.[toCurrency] || 1
      setResult(amount * rate)
    }
  }

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
        <h4 className="font-semibold">Currency Converter</h4>
                  </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Convert
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Result</p>
          <p className="text-2xl font-bold">{result.toFixed(2)} {toCurrency}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Data Visualization Components
const LineChartVisualization = ({ data, color = "blue" }) => {
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue

  return (
    <div className="h-24 w-full">
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <path
          d={data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 40 - ((value - minValue) / range) * 35
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
          }).join(' ')}
          fill="none"
          stroke={`rgb(59, 130, ${color === "blue" ? "246" : "220"})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100
          const y = 40 - ((value - minValue) / range) * 35
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={`rgb(59, 130, ${color === "blue" ? "246" : "220"})`}
            />
          )
        })}
      </svg>
                  </div>
  )
}

const PieChartVisualization = ({ data }) => {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0)
  let currentAngle = 0

  return (
    <div className="h-24 w-full">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {Object.entries(data).map(([label, value], index) => {
          const percentage = (value / total) * 100
          const angle = (percentage / 100) * 360
          const startAngle = currentAngle
          currentAngle += angle

          const startRad = (startAngle - 90) * (Math.PI / 180)
          const endRad = (currentAngle - 90) * (Math.PI / 180)

          const x1 = 50 + 40 * Math.cos(startRad)
          const y1 = 50 + 40 * Math.sin(startRad)
          const x2 = 50 + 40 * Math.cos(endRad)
          const y2 = 50 + 40 * Math.sin(endRad)

          const largeArcFlag = angle > 180 ? 1 : 0

          return (
            <path
              key={label}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={`hsl(${index * 60}, 70%, 60%)`}
            />
          )
        })}
      </svg>
    </div>
  )
}

const MetricsVisualization = ({ metric }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [chartType, setChartType] = useState('line')

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <metric.icon className="w-8 h-8 text-blue-500" />
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType(chartType === 'line' ? 'pie' : 'line')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {chartType === 'line' ? <PieChart className="w-4 h-4" /> : <LineChart className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
                    </div>
                  </div>

      <div className="text-2xl font-bold mb-1">{metric.value}</div>
      <div className="text-sm text-gray-500">{metric.label}</div>
      <div className="text-xs text-gray-400 mt-1">{metric.unit}</div>

      <div className="mt-4">
        {chartType === 'line' ? (
          <LineChartVisualization data={metric.historical} />
        ) : (
          <PieChartVisualization data={metric.distribution} />
        )}
                </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium mb-2">Historical Trend</h5>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  {metric.historical.map((value, index) => (
                    <div key={index} className="text-center">
                      <div className="font-medium">{value}</div>
                      <div className="text-xs text-gray-500">Q{index + 1}</div>
                    </div>
            ))}
          </div>
        </div>
              <div>
                <h5 className="text-sm font-medium mb-2">Distribution</h5>
                <div className="space-y-2">
                  {Object.entries(metric.distribution).map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm">{label}</span>
                      <span className="text-sm font-medium">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Additional Data Visualization Components
const BarChartVisualization = ({ data, labels, color = "blue" }) => {
  const maxValue = Math.max(...data)
  const barWidth = 100 / data.length - 2

  return (
    <div className="h-24 w-full">
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        {data.map((value, index) => {
          const height = (value / maxValue) * 35
          const x = index * (barWidth + 2)
          return (
            <g key={index}>
              <rect
                x={x}
                y={40 - height}
                width={barWidth}
                height={height}
                fill={`rgb(59, 130, ${color === "blue" ? "246" : "220"})`}
                className="transition-all duration-300 hover:opacity-80"
              />
              <text
                x={x + barWidth / 2}
                y={42}
                textAnchor="middle"
                className="text-[2px] fill-gray-500"
              >
                {labels[index]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

const AreaChartVisualization = ({ data, color = "blue" }) => {
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 40 - ((value - minValue) / range) * 35
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="h-24 w-full">
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <path
          d={`M 0,40 L ${points} L 100,40 Z`}
          fill={`rgba(59, 130, ${color === "blue" ? "246" : "220"}, 0.2)`}
          stroke={`rgb(59, 130, ${color === "blue" ? "246" : "220"})`}
          strokeWidth="1"
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100
          const y = 40 - ((value - minValue) / range) * 35
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill={`rgb(59, 130, ${color === "blue" ? "246" : "220"})`}
              className="transition-all duration-300 hover:r-2"
            />
          )
        })}
      </svg>
    </div>
  )
}

// Additional Chart Types
const CandlestickChartVisualization = ({ data, color = "blue" }) => {
  const maxValue = Math.max(...data.map(d => d.high))
  const minValue = Math.min(...data.map(d => d.low))
  const range = maxValue - minValue
  const barWidth = 100 / data.length - 2

  return (
    <div className="h-32 w-full">
      <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
        {data.map((candle, index) => {
          const x = index * (barWidth + 2)
          const openY = 50 - ((candle.open - minValue) / range) * 45
          const closeY = 50 - ((candle.close - minValue) / range) * 45
          const highY = 50 - ((candle.high - minValue) / range) * 45
          const lowY = 50 - ((candle.low - minValue) / range) * 45
          const isGreen = candle.close > candle.open

          return (
            <g key={index}>
              {/* Wick */}
              <line
                x1={x + barWidth / 2}
                y1={highY}
                x2={x + barWidth / 2}
                y2={lowY}
                stroke={isGreen ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                strokeWidth="1"
              />
              {/* Body */}
              <rect
                x={x}
                y={Math.min(openY, closeY)}
                width={barWidth}
                height={Math.abs(closeY - openY)}
                fill={isGreen ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                className="transition-all duration-300 hover:opacity-80"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// Enhanced Technical Indicators
const TechnicalIndicators = ({ data }) => {
  // Existing SMA calculation
  const calculateSMA = (prices, period) => {
    const sma = []
    for (let i = period - 1; i < prices.length; i++) {
      const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0)
      sma.push(sum / period)
    }
    return sma
  }

  // Existing RSI calculation
  const calculateRSI = (prices, period = 14) => {
    const changes = prices.slice(1).map((price, i) => price - prices[i])
    const gains = changes.map(change => change > 0 ? change : 0)
    const losses = changes.map(change => change < 0 ? -change : 0)
    
    const avgGain = calculateSMA(gains, period)
    const avgLoss = calculateSMA(losses, period)
    
    return avgGain.map((gain, i) => {
      const loss = avgLoss[i]
      const rs = gain / loss
      return 100 - (100 / (1 + rs))
    })
  }

  // MACD (Moving Average Convergence Divergence)
  const calculateMACD = (prices, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) => {
    const fastEMA = calculateEMA(prices, fastPeriod)
    const slowEMA = calculateEMA(prices, slowPeriod)
    const macdLine = fastEMA.map((fast, i) => fast - slowEMA[i])
    const signalLine = calculateEMA(macdLine, signalPeriod)
    const histogram = macdLine.map((macd, i) => macd - signalLine[i])
    
    return { macdLine, signalLine, histogram }
  }

  // Exponential Moving Average (EMA)
  const calculateEMA = (prices, period) => {
    const multiplier = 2 / (period + 1)
    const ema = [prices[0]]
    
    for (let i = 1; i < prices.length; i++) {
      ema.push((prices[i] - ema[i - 1]) * multiplier + ema[i - 1])
    }
    
    return ema
  }

  // Bollinger Bands
  const calculateBollingerBands = (prices, period = 20, multiplier = 2) => {
    const sma = calculateSMA(prices, period)
    const stdDev = []
    
    for (let i = period - 1; i < prices.length; i++) {
      const slice = prices.slice(i - period + 1, i + 1)
      const mean = sma[i - period + 1]
      const squaredDiffs = slice.map(price => Math.pow(price - mean, 2))
      const variance = squaredDiffs.reduce((a, b) => a + b, 0) / period
      stdDev.push(Math.sqrt(variance))
    }
    
    return {
      middle: sma,
      upper: sma.map((value, i) => value + (multiplier * stdDev[i])),
      lower: sma.map((value, i) => value - (multiplier * stdDev[i]))
    }
  }

  const sma20 = calculateSMA(data, 20)
  const rsi = calculateRSI(data)
  const { macdLine, signalLine, histogram } = calculateMACD(data)
  const bollingerBands = calculateBollingerBands(data)

  return (
          <div className="space-y-4">
                  <div>
        <h6 className="text-sm font-medium mb-2">SMA (20)</h6>
        <LineChartVisualization data={sma20} color="purple" />
                  </div>
      <div>
        <h6 className="text-sm font-medium mb-2">RSI (14)</h6>
        <LineChartVisualization data={rsi} color="orange" />
      </div>
      <div>
        <h6 className="text-sm font-medium mb-2">MACD</h6>
        <div className="h-24">
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d={macdLine.map((value, index) => {
                const x = (index / (macdLine.length - 1)) * 100
                const y = 20 - (value * 10)
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
              }).join(' ')}
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="1"
            />
            <path
              d={signalLine.map((value, index) => {
                const x = (index / (signalLine.length - 1)) * 100
                const y = 20 - (value * 10)
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
              }).join(' ')}
              fill="none"
              stroke="rgb(234, 179, 8)"
              strokeWidth="1"
            />
            {histogram.map((value, index) => {
              const x = (index / (histogram.length - 1)) * 100
              const y = 20
              const height = value * 10
              return (
                <rect
                  key={index}
                  x={x - 1}
                  y={y - height}
                  width="2"
                  height={Math.abs(height)}
                  fill={height >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                />
              )
            })}
          </svg>
        </div>
      </div>
      <div>
        <h6 className="text-sm font-medium mb-2">Bollinger Bands</h6>
        <div className="h-24">
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d={bollingerBands.middle.map((value, index) => {
                const x = (index / (bollingerBands.middle.length - 1)) * 100
                const y = 40 - (value * 0.1)
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
              }).join(' ')}
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="1"
            />
            <path
              d={bollingerBands.upper.map((value, index) => {
                const x = (index / (bollingerBands.upper.length - 1)) * 100
                const y = 40 - (value * 0.1)
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
              }).join(' ')}
              fill="none"
              stroke="rgb(234, 179, 8)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <path
              d={bollingerBands.lower.map((value, index) => {
                const x = (index / (bollingerBands.lower.length - 1)) * 100
                const y = 40 - (value * 0.1)
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
              }).join(' ')}
              fill="none"
              stroke="rgb(234, 179, 8)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

// Enhanced Candlestick Chart with Volume
const EnhancedCandlestickChart = ({ data, volumeData }) => {
  const maxValue = Math.max(...data.map(d => d.high))
  const minValue = Math.min(...data.map(d => d.low))
  const range = maxValue - minValue
  const barWidth = 100 / data.length - 2
  const maxVolume = Math.max(...volumeData)

  return (
    <div className="h-48 w-full">
      <svg className="w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none">
        {/* Candlesticks */}
        <g transform="translate(0, 0)">
          {data.map((candle, index) => {
            const x = index * (barWidth + 2)
            const openY = 40 - ((candle.open - minValue) / range) * 35
            const closeY = 40 - ((candle.close - minValue) / range) * 35
            const highY = 40 - ((candle.high - minValue) / range) * 35
            const lowY = 40 - ((candle.low - minValue) / range) * 35
            const isGreen = candle.close > candle.open

            return (
              <g key={index}>
                {/* Wick */}
                <line
                  x1={x + barWidth / 2}
                  y1={highY}
                  x2={x + barWidth / 2}
                  y2={lowY}
                  stroke={isGreen ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                  strokeWidth="1"
                />
                {/* Body */}
                <rect
                  x={x}
                  y={Math.min(openY, closeY)}
                  width={barWidth}
                  height={Math.abs(closeY - openY)}
                  fill={isGreen ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                  className="transition-all duration-300 hover:opacity-80"
                />
              </g>
            )
          })}
        </g>

        {/* Volume Bars */}
        <g transform="translate(0, 45)">
          {volumeData.map((volume, index) => {
            const x = index * (barWidth + 2)
            const height = (volume / maxVolume) * 30
            const isGreen = data[index].close > data[index].open

            return (
              <rect
                key={index}
                x={x}
                y={30 - height}
                width={barWidth}
                height={height}
                fill={isGreen ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}
                className="transition-all duration-300 hover:opacity-80"
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
}

// Enhanced Market Analytics
const MarketAnalytics = ({ data, timeframe }) => {
  const [selectedIndicator, setSelectedIndicator] = useState('price')
  const [showTechnical, setShowTechnical] = useState(false)
  const [showVolume, setShowVolume] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')

  const indicators = [
    { id: 'price', label: 'Price' },
    { id: 'volume', label: 'Volume' },
    { id: 'momentum', label: 'Momentum' },
    { id: 'volatility', label: 'Volatility' }
  ]

  const timeframes = ['1D', '1W', '1M', '3M', '1Y']

  // Mock candlestick data
  const candlestickData = [
    { open: 4500, high: 4520, low: 4490, close: 4510 },
    { open: 4510, high: 4530, low: 4500, close: 4525 },
    { open: 4525, high: 4540, low: 4515, close: 4535 },
    { open: 4535, high: 4550, low: 4525, close: 4545 },
    { open: 4545, high: 4560, low: 4535, close: 4555 }
  ]

  // Mock volume data
  const volumeData = [1200000, 1500000, 1300000, 1400000, 1600000]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {indicators.map(indicator => (
            <button
              key={indicator.id}
              onClick={() => setSelectedIndicator(indicator.id)}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedIndicator === indicator.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {indicator.label}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`px-3 py-1 rounded-lg text-sm ${
              showVolume
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Volume
          </button>
          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className={`px-3 py-1 rounded-lg text-sm ${
              showTechnical
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Technical
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        {timeframes.map(tf => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`px-2 py-1 text-xs rounded ${
              selectedTimeframe === tf
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="h-64">
        {selectedIndicator === 'price' ? (
          <EnhancedCandlestickChart data={candlestickData} volumeData={showVolume ? volumeData : []} />
        ) : (
          <AreaChartVisualization data={data} />
        )}
      </div>

      <AnimatePresence>
        {showTechnical && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <TechnicalIndicators data={data} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Open</p>
          <p className="font-medium">{candlestickData[0].open}</p>
        </div>
        <div>
          <p className="text-gray-500">High</p>
          <p className="font-medium">{Math.max(...candlestickData.map(d => d.high))}</p>
        </div>
        <div>
          <p className="text-gray-500">Low</p>
          <p className="font-medium">{Math.min(...candlestickData.map(d => d.low))}</p>
        </div>
        <div>
          <p className="text-gray-500">Close</p>
          <p className="font-medium">{candlestickData[candlestickData.length - 1].close}</p>
        </div>
      </div>

      {showVolume && (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Volume</p>
            <p className="font-medium">{volumeData.reduce((a, b) => a + b, 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Avg Volume</p>
            <p className="font-medium">
              {(volumeData.reduce((a, b) => a + b, 0) / volumeData.length).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Update EnhancedMarketWatchWidget to use new analytics
const EnhancedMarketWatchWidget = ({ data }) => {
  const [timeframe, setTimeframe] = useState('1D')
  const [selectedMarket, setSelectedMarket] = useState('stocks')
  const [showAnalytics, setShowAnalytics] = useState(false)

  const timeframes = ['1D', '1W', '1M', '3M', '1Y']
  const markets = ['stocks', 'currencies', 'commodities']

  // Mock historical data for visualization
  const historicalData = {
    stocks: [4500, 4520, 4510, 4525, 4521],
    currencies: [1.08, 1.085, 1.082, 1.087, 1.085],
    commodities: [2340, 2345, 2342, 2348, 2345]
  }

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Market Watch</h4>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <BarChart2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        {markets.map(market => (
          <button
            key={market}
            onClick={() => setSelectedMarket(market)}
            className={`px-3 py-1 rounded-lg text-sm ${
              selectedMarket === market
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {market.charAt(0).toUpperCase() + market.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {data[selectedMarket].map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-medium">{item.symbol || item.pair || item.name}</span>
            <div className="flex items-center">
              <span className="mr-2">{item.value}</span>
              <span className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {item.change}
                  </span>
                </div>
          </motion.div>
            ))}
          </div>

      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <MarketAnalytics data={historicalData[selectedMarket]} timeframe={timeframe} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Enhanced Economic Calendar Widget
const EnhancedEconomicCalendarWidget = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('asc')
  const [activeFilters, setActiveFilters] = useState({
    impact: 'all',
    date: 'all'
  })
  const [notifications, setNotifications] = useState({})
  const [showNotifications, setShowNotifications] = useState(false)

  const impacts = [...new Set(events.map(event => event.impact))]
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

  const toggleNotification = (eventId) => {
    setNotifications(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }))
  }

  const exportCalendar = () => {
    // Mock calendar export functionality
    const calendarData = filteredEvents.map(event => ({
      title: event.title,
      start: `${event.date} ${event.time}`,
      description: event.description
    }))
    console.log('Exporting calendar:', calendarData)
  }

  useEffect(() => {
    let filtered = [...events]
    
    if (activeFilters.impact !== 'all') {
      filtered = filtered.filter(event => event.impact === activeFilters.impact)
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          <h4 className="font-semibold">Economic Calendar</h4>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
          >
            <Bell className="w-4 h-4" />
            {Object.values(notifications).some(Boolean) && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
          <button
            onClick={exportCalendar}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <select
            value={activeFilters.impact}
            onChange={(e) => handleFilter('impact', e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="all">All Impact Levels</option>
            {impacts.map(impact => (
              <option key={impact} value={impact}>{impact}</option>
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
                  <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
        </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleNotification(event.id)}
                    className={`p-1 rounded-full ${
                      notifications[event.id]
                        ? 'text-blue-500'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    event.impact === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    event.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {event.impact} Impact
                  </span>
      </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Previous</p>
                  <p className="font-medium">{event.previous}</p>
                </div>
                <div>
                  <p className="text-gray-500">Forecast</p>
                  <p className="font-medium">{event.forecast}</p>
                </div>
                <div>
                  <p className="text-gray-500">Actual</p>
                  <p className="font-medium">{event.actual}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="text-sm font-medium mb-2">Event Notifications</h5>
              <div className="space-y-2">
                {Object.entries(notifications)
                  .filter(([_, enabled]) => enabled)
                  .map(([eventId]) => {
                    const event = events.find(e => e.id === eventId)
                    return (
                      <div key={eventId} className="flex items-center justify-between text-sm">
                        <span>{event.title}</span>
                        <span className="text-gray-500">{event.date} {event.time}</span>
                      </div>
                    )
                  })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Main Economy Page
export default function EconomyPage() {
  const [activeTab, setActiveTab] = useState("markets")
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
      <AnimatedHeadline headlines={economyHeadlines} />
      
      {/* Economic Metrics Dashboard */}
      <div className="newspaper-container mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {economicMetrics.map((metric) => (
            <MetricsVisualization key={metric.label} metric={metric} />
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
              {["markets", "indicators", "news", "policy", "global", "analysis"].map(tab => (
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
              {activeTab === "markets" && (
                <motion.div
                  key="markets"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <EnhancedMarketWatchWidget data={marketData} />
                </motion.div>
              )}
              {activeTab === "indicators" && (
                <motion.div
                  key="indicators"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    Economic Indicators Dashboard (mockup)
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
                  <ArticleGrid title="Latest Economic News" articles={economyArticles} />
                </motion.div>
              )}
              {activeTab === "policy" && (
                <motion.div
                  key="policy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    Policy & Regulation Updates (mockup)
                  </div>
                </motion.div>
              )}
              {activeTab === "global" && (
                <motion.div
                  key="global"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    Global Economic Overview (mockup)
                  </div>
                </motion.div>
              )}
              {activeTab === "analysis" && (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    Expert Analysis & Insights (mockup)
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <EnhancedMarketWatchWidget data={marketData} />
            <EnhancedEconomicCalendarWidget events={economicEvents} />
            <CurrencyConverterWidget />
          </motion.div>
        </div>
      </div>
    </main>
  )
} 