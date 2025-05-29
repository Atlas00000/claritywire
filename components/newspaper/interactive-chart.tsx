"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend } from "recharts"

interface DataItem {
  name: string
  value: number
  color?: string
}

interface EconomicData {
  monthly: Array<DataItem & {
    previousValue: number
    growth: number
  }>
  sectors: Array<DataItem & {
    growth: number
  }>
  predictions: Array<DataItem & {
    confidence: number
  }>
}

interface InteractiveChartProps {
  title: string
  description: string
  data: EconomicData
  features: {
    showPredictions: boolean
    showSectorBreakdown: boolean
    showGrowthRates: boolean
    interactive: boolean
    animations: boolean
    tooltips: boolean
    zoom: boolean
    export: boolean
  }
}

export function InteractiveChart({ title, description, data, features }: InteractiveChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'monthly' | 'sectors' | 'predictions'>('monthly')

  const handleMouseEnter = (index: number) => {
    if (features.interactive) {
      setActiveIndex(index)
    }
  }

  const handleMouseLeave = () => {
    if (features.interactive) {
      setActiveIndex(null)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const chartHeight = isExpanded ? 400 : 250

  const renderChart = () => {
    switch (activeTab) {
      case 'monthly':
        return (
          <BarChart data={data.monthly} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--text-color)" }}
              tickLine={{ stroke: "var(--border-color)" }}
              axisLine={{ stroke: "var(--border-color)" }}
            />
            <YAxis
              tick={{ fill: "var(--text-color)" }}
              tickLine={{ stroke: "var(--border-color)" }}
              axisLine={{ stroke: "var(--border-color)" }}
            />
            {features.tooltips && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "4px",
                  color: "var(--text-color)",
                }}
              />
            )}
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.monthly.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={activeIndex === index ? entry.color || "#000000" : entry.color || "#555555"}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    filter: activeIndex === index ? "brightness(1.2)" : "brightness(1)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Bar>
            {features.showGrowthRates && (
              <Line
                type="monotone"
                dataKey="growth"
                stroke="#8884d8"
                dot={false}
                strokeWidth={2}
                yAxisId={1}
              />
            )}
          </BarChart>
        )
      case 'sectors':
        return (
          <BarChart data={data.sectors} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--text-color)" }}
              tickLine={{ stroke: "var(--border-color)" }}
              axisLine={{ stroke: "var(--border-color)" }}
            />
            <YAxis
              tick={{ fill: "var(--text-color)" }}
              tickLine={{ stroke: "var(--border-color)" }}
              axisLine={{ stroke: "var(--border-color)" }}
            />
            {features.tooltips && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "4px",
                  color: "var(--text-color)",
                }}
              />
            )}
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.sectors.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={activeIndex === index ? entry.color || "#000000" : entry.color || "#555555"}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    filter: activeIndex === index ? "brightness(1.2)" : "brightness(1)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Bar>
            {features.showGrowthRates && (
              <Line
                type="monotone"
                dataKey="growth"
                stroke="#8884d8"
                dot={false}
                strokeWidth={2}
                yAxisId={1}
              />
            )}
          </BarChart>
        )
      case 'predictions':
        return (
          <LineChart data={data.predictions} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--text-color)" }}
              tickLine={{ stroke: "var(--border-color)" }}
              axisLine={{ stroke: "var(--border-color)" }}
            />
            <YAxis
              tick={{ fill: "var(--text-color)" }}
              tickLine={{ stroke: "var(--border-color)" }}
              axisLine={{ stroke: "var(--border-color)" }}
            />
            {features.tooltips && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "4px",
                  color: "var(--text-color)",
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ fill: "#8884d8", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ fill: "#82ca9d", strokeWidth: 2 }}
            />
          </LineChart>
        )
    }
  }

  return (
    <motion.div
      className="interactive-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="interactive-chart-header">
        <h3 className="interactive-chart-title">{title}</h3>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-3 py-1 rounded ${
                activeTab === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Monthly
            </button>
            {features.showSectorBreakdown && (
              <button
                onClick={() => setActiveTab('sectors')}
                className={`px-3 py-1 rounded ${
                  activeTab === 'sectors' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Sectors
              </button>
            )}
            {features.showPredictions && (
              <button
                onClick={() => setActiveTab('predictions')}
                className={`px-3 py-1 rounded ${
                  activeTab === 'predictions' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Predictions
              </button>
            )}
          </div>
          <button className="interactive-chart-expand-button" onClick={toggleExpand}>
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      <p className="interactive-chart-description">{description}</p>

      <div className="interactive-chart-container">
        <ResponsiveContainer width="100%" height={chartHeight}>
          {renderChart()}
        </ResponsiveContainer>
      </div>

      <div className="interactive-chart-legend">
        {activeTab === 'monthly' && data.monthly.map((item, index) => (
          <div
            key={index}
            className="interactive-chart-legend-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="interactive-chart-legend-color" style={{ backgroundColor: item.color || "#555555" }} />
            <span className="interactive-chart-legend-name">{item.name}</span>
            <span className="interactive-chart-legend-value">{item.value}</span>
            {features.showGrowthRates && (
              <span className="interactive-chart-legend-growth">
                {item.growth > 0 ? '+' : ''}{item.growth}%
              </span>
            )}
          </div>
        ))}
        {activeTab === 'sectors' && data.sectors.map((item, index) => (
          <div
            key={index}
            className="interactive-chart-legend-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="interactive-chart-legend-color" style={{ backgroundColor: item.color || "#555555" }} />
            <span className="interactive-chart-legend-name">{item.name}</span>
            <span className="interactive-chart-legend-value">{item.value}</span>
            {features.showGrowthRates && (
              <span className="interactive-chart-legend-growth">
                {item.growth > 0 ? '+' : ''}{item.growth}%
              </span>
            )}
          </div>
        ))}
        {activeTab === 'predictions' && data.predictions.map((item, index) => (
          <div
            key={index}
            className="interactive-chart-legend-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="interactive-chart-legend-color" style={{ backgroundColor: item.color || "#555555" }} />
            <span className="interactive-chart-legend-name">{item.name}</span>
            <span className="interactive-chart-legend-value">{item.value}</span>
            <span className="interactive-chart-legend-confidence">
              {(item.confidence * 100).toFixed(0)}% confidence
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
