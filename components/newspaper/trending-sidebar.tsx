"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

interface TrendingItem {
  id: string
  title: string
  views: string
}

interface TrendingSidebarProps {
  items: TrendingItem[]
}

export function TrendingSidebar({ items }: TrendingSidebarProps) {
  return (
    <div className="sidebar">
      <div className="flex items-center mb-4">
        <TrendingUp className="w-4 h-4 mr-2" />
        <h3 className="sidebar-title mb-0 pb-0 border-0">Trending Now</h3>
      </div>

      <div>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="sidebar-item flex items-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="trending-number">{index + 1}</div>
            <div>
              <h4 className="sidebar-item-title">{item.title}</h4>
              <div className="sidebar-item-meta">{item.views} views</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
