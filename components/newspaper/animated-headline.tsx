"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedHeadlineProps {
  headlines: {
    title: string
    category: string
  }[]
  interval?: number
}

export function AnimatedHeadline({ headlines, interval = 5000 }: AnimatedHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length)
        setIsVisible(true)
      }, 500)
    }, interval)

    return () => clearInterval(timer)
  }, [headlines.length, interval])

  const headline = headlines[currentIndex]

  return (
    <div className="animated-headline-container">
      <div className="animated-headline-category">{headline.category}</div>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.h2
            key={currentIndex}
            className="animated-headline-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {headline.title}
          </motion.h2>
        )}
      </AnimatePresence>
      <div className="animated-headline-dots">
        {headlines.map((_, index) => (
          <span key={index} className={`animated-headline-dot ${index === currentIndex ? "active" : ""}`} />
        ))}
      </div>
    </div>
  )
}
