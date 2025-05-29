"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Newspaper } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mr-6"
        >
          <Link href="/" className="flex items-center space-x-2">
            <Newspaper className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-serif font-bold">ClarityWire</span>
                </Link>
              </motion.div>
        <div className="mr-4 flex">
          <Button variant="ghost" className="mr-2 px-0">
            <Search className="h-4 w-4" />
          </Button>
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px]"
          />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
            <ModeToggle />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            >
              <Link href="/signin">
              <Button variant="outline" className="font-medium">
                Sign in
              </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Link href="/signup">
              <Button className="font-medium">
                Sign up
              </Button>
              </Link>
            </motion.div>
        </div>
      </div>
    </header>
  )
}
