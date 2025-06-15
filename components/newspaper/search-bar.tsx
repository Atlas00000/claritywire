"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SearchResult {
  id: string
  title: string
  category: string
  url: string
}

// Mock search results
const mockResults: SearchResult[] = [
  {
    id: "sr1",
    title: "Global Summit Addresses Climate Crisis with Unprecedented Agreement",
    category: "WORLD",
    url: "#",
  },
  {
    id: "sr2",
    title: "Tech Giants Announce Revolutionary AI Ethics Coalition",
    category: "TECHNOLOGY",
    url: "#",
  },
  {
    id: "sr3",
    title: "Economic Outlook: Recovery Ahead Despite Challenges",
    category: "BUSINESS",
    url: "#",
  },
  {
    id: "sr4",
    title: "Breakthrough in Renewable Energy Storage Reported",
    category: "SCIENCE",
    url: "#",
  },
  {
    id: "sr5",
    title: "Senate Passes Landmark Infrastructure Bill",
    category: "POLITICS",
    url: "#",
  },
]

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim().length > 0) {
      // In a real app, this would be an API call
      // For now, we'll filter our mock results
      const filteredResults = mockResults.filter((result) => result.title.toLowerCase().includes(query.toLowerCase()))
      setResults(filteredResults)
    } else {
      setResults([])
    }
  }

  const toggleSearch = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setQuery("")
      setResults([])
    }
  }

  return (
    <div className="relative">
      {!isOpen ? (
        <button onClick={toggleSearch} className="newspaper-search-button flex items-center" aria-label="Open search">
          <Search className="w-4 h-4" />
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "300px" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.3 }}
          className="newspaper-search-container"
        >
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="newspaper-search-input"
              autoFocus
            />
            <button type="submit" className="newspaper-search-submit" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <button type="button" onClick={toggleSearch} className="newspaper-search-close" aria-label="Close search">
              <X className="w-4 h-4" />
            </button>
          </form>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="newspaper-search-results"
              >
                <h3 className="newspaper-search-results-title">Search Results</h3>
                <ul className="newspaper-search-results-list">
                  {results.map((result) => (
                    <li key={result.id} className="newspaper-search-result-item">
                      <a href={result.url} className="newspaper-search-result-link">
                        <span className="newspaper-search-result-category">{result.category}</span>
                        <span className="newspaper-search-result-title">{result.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
