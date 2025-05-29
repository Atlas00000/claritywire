"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"
import { 
  Newspaper, 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp,
  Star,
  FileText,
  Layout,
  Landmark,
  Cpu,
  Cloud,
  Users2,
  LineChart
} from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Newspaper },
  { name: "Politics & Policy", href: "/politics", icon: Landmark },
  { name: "Tech & Innovation", href: "/tech", icon: Cpu },
  { name: "Climate", href: "/climate", icon: Cloud },
  { name: "Society", href: "/society", icon: Users2 },
  { name: "Economy", href: "/economy", icon: LineChart },
  { name: "Culture", href: "/culture", icon: Users },
  { name: "Content", href: "/content", icon: FileText },
  { name: "Features", href: "/features", icon: Star },
  { name: "Topics", href: "/topics", icon: TrendingUp },
  { name: "Calendar", href: "/calendar", icon: Calendar },
]

const navigation = [
  { name: "Home", href: "/" },
  { name: "Content", href: "/content" },
  { name: "Features", href: "/features" },
  { name: "Culture", href: "/culture" },
  { name: "Technology", href: "/technology" },
  { name: "Business", href: "/business" },
  { name: "Science", href: "/science" },
  { name: "Health", href: "/health" },
  { name: "Sports", href: "/sports" },
  { name: "Entertainment", href: "/entertainment" },
  { name: "Opinion", href: "/opinion" },
  { name: "About", href: "/about" },
]

export function Masthead() {
  const pathname = usePathname()
  const today = new Date()
  const formattedDate = format(today, "EEEE, MMMM do, yyyy")
  const volumeNumber = 127
  const issueNumber = Math.floor(Math.random() * 365) + 1

  return (
    <div className="newspaper-masthead">
      <div className="flex justify-between items-center text-xs mb-2">
        <div>{formattedDate}</div>
        <div>
          Vol. {volumeNumber} · No. {issueNumber}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Newspaper className="w-8 h-8 text-blue-600" />
          </motion.div>
          <motion.h1 
            className="text-2xl font-serif font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ClarityWire
          </motion.h1>
        </Link>
      <p className="newspaper-subtitle">Illuminating Truth in a Complex World</p>
      </div>

      <Separator className="bg-foreground h-0.5 my-4" />

      {/* Navigation */}
      <nav className="w-full">
        <ul className="flex flex-wrap justify-center gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <motion.li
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
              >
                <Link 
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
