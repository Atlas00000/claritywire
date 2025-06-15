"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  // TODO: Replace with actual auth check
  useEffect(() => {
    // Check if user is admin
    const isAdmin = false // This will be replaced with actual auth check
    if (!isAdmin) {
      router.push("/signin")
    }
  }, [router])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {children}
    </motion.div>
  )
} 