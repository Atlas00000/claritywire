"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ContentCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      title: "Featured Series",
      items: [
        {
          title: "The Digital Revolution",
          description: "Exploring the impact of technology on society",
          image: "/images/articles/tech/digital-revolution.jpg"
        },
        {
          title: "Future of Work",
          description: "How work is changing in the 21st century",
          image: "/images/articles/business/future-work.jpg"
        },
        {
          title: "Climate Action",
          description: "Solutions for a sustainable future",
          image: "/images/articles/climate/climate-action.jpg"
        }
      ]
    },
    {
      title: "Editor's Picks",
      items: [
        {
          title: "Innovation in Education",
          description: "New approaches to learning in the digital age",
          image: "/images/articles/education/innovation.jpg"
        },
        {
          title: "Sustainable Living",
          description: "Practical steps towards a greener future",
          image: "/images/articles/climate/sustainable-living.jpg"
        },
        {
          title: "Tech Trends 2025",
          description: "The technologies shaping our future",
          image: "/images/articles/tech/tech-trends.jpg"
        }
      ]
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <motion.div 
      className="relative mb-8 overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-serif font-bold">{slides[currentSlide].title}</h2>
      </div>
      
      <div className="relative">
        <motion.div 
          className="flex transition-transform duration-500 ease-in-out"
          animate={{ x: `-${currentSlide * 100}%` }}
        >
          {slides.map((slide, slideIndex) => (
            <div 
              key={slideIndex}
              className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-4 p-4"
            >
              {slide.items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  className="relative overflow-hidden rounded-lg cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: itemIndex * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center space-x-2 p-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index 
                ? 'bg-blue-500' 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
} 