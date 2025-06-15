"use client"

import { motion } from "framer-motion"

export function BreakingNewsTicker() {
  return (
    <motion.div
      className="bg-black text-white py-2 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 font-bold text-sm uppercase tracking-wider border-r border-gray-700">
          Breaking News
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "linear",
            }}
            className="inline-block"
          >
            <span className="inline-block px-4">Global Leaders Reach Historic Climate Agreement</span>
            <span className="inline-block px-4">•</span>
            <span className="inline-block px-4">Tech Giants Announce Revolutionary AI Ethics Coalition</span>
            <span className="inline-block px-4">•</span>
            <span className="inline-block px-4">Major Breakthrough in Renewable Energy Storage Reported</span>
            <span className="inline-block px-4">•</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
