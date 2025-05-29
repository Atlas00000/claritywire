"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, Gauge, Eye, SunDim, Moon, AlertTriangle } from "lucide-react"

interface WeatherData {
  current: {
    temperature: number
    condition: string
    icon: string
    humidity: number
    windSpeed: number
    feelsLike: number
    uvIndex: number
    visibility: number
    pressure: number
    lastUpdated: string
  }
  forecast: Array<{
    date: string
    high: number
    low: number
    condition: string
    icon: string
    precipitation: number
    windSpeed: number
  }>
  alerts: Array<{
    type: string
    severity: string
    title: string
    description: string
    startTime: string
    endTime: string
  }>
}

interface WeatherWidgetProps {
  data: WeatherData
  features: {
    showForecast: boolean
    showAlerts: boolean
    showRadar: boolean
    showHourly: boolean
    showAirQuality: boolean
    showSunMoon: boolean
    animations: boolean
    interactive: boolean
    autoRefresh: boolean
  }
}

const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case 'sun':
      return <Sun className="w-10 h-10 text-yellow-500" />
    case 'cloud-sun':
      return <SunDim className="w-10 h-10 text-gray-500" />
    case 'cloud':
      return <Cloud className="w-10 h-10 text-gray-500" />
    case 'cloud-rain':
      return <CloudRain className="w-10 h-10 text-blue-500" />
    case 'cloud-drizzle':
      return <Droplets className="w-10 h-10 text-blue-400" />
    default:
      return <Sun className="w-10 h-10 text-yellow-500" />
  }
}

export function WeatherWidget({ data, features }: WeatherWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'current' | 'forecast' | 'alerts'>('current')

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-serif font-bold">Weather</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-3 py-1 rounded ${
              activeTab === 'current' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Current
          </button>
          {features.showForecast && (
            <button
              onClick={() => setActiveTab('forecast')}
              className={`px-3 py-1 rounded ${
                activeTab === 'forecast' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Forecast
            </button>
          )}
          {features.showAlerts && data.alerts.length > 0 && (
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-3 py-1 rounded ${
                activeTab === 'alerts' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Alerts
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'current' && (
          <motion.div
            key="current"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-4xl font-bold">{data.current.temperature}°F</div>
                <div className="text-gray-600 dark:text-gray-300">{data.current.condition}</div>
              </div>
              {getWeatherIcon(data.current.icon)}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5 text-gray-500" />
                <span>Feels like {data.current.feelsLike}°F</span>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-gray-500" />
                <span>Humidity {data.current.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="w-5 h-5 text-gray-500" />
                <span>Wind {data.current.windSpeed} mph</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-gray-500" />
                <span>Visibility {data.current.visibility} mi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gauge className="w-5 h-5 text-gray-500" />
                <span>Pressure {data.current.pressure} hPa</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="w-5 h-5 text-gray-500" />
                <span>UV Index {data.current.uvIndex}</span>
              </div>
            </div>

            {features.showSunMoon && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <span>Sunrise 6:30 AM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Moon className="w-5 h-5 text-gray-500" />
                    <span>Sunset 8:15 PM</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'forecast' && features.showForecast && (
          <motion.div
            key="forecast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-5 gap-4">
              {data.forecast.map((day, index) => (
                <motion.div
                  key={day.date}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="my-2">{getWeatherIcon(day.icon)}</div>
                  <div className="font-medium">{day.high}°</div>
                  <div className="text-sm text-gray-500">{day.low}°</div>
                  <div className="text-xs text-gray-500 mt-1">{day.precipitation}%</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'alerts' && features.showAlerts && data.alerts.length > 0 && (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              {data.alerts.map((alert, index) => (
                <motion.div
                  key={alert.title}
                  className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-red-800 dark:text-red-200">{alert.title}</h4>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">{alert.description}</p>
                      <div className="text-xs text-red-600 dark:text-red-400 mt-2">
                        {new Date(alert.startTime).toLocaleString()} - {new Date(alert.endTime).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-xs text-gray-500 mt-4">
        Last updated: {new Date(data.current.lastUpdated).toLocaleString()}
      </div>
    </motion.div>
  )
}
