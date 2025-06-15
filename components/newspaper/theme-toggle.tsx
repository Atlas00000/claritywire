"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Sun, Moon, Newspaper } from "lucide-react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"

export function NewspaperThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <motion.div
      className="newspaper-theme-toggle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <Newspaper className="newspaper-theme-toggle-icon mr-2" />
        <span className="newspaper-theme-toggle-text mr-2">Edition:</span>
        <Switch checked={isDark} onCheckedChange={() => setTheme(isDark ? "light" : "dark")} className="theme-switch">
          <span className="theme-switch-thumb" />
        </Switch>
        <span className="ml-2">
          {isDark ? <Moon className="newspaper-theme-toggle-icon" /> : <Sun className="newspaper-theme-toggle-icon" />}
        </span>
      </div>
    </motion.div>
  )
}
