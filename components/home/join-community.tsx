"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

export default function JoinCommunity() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send the email to your API
      setSubmitted(true)
    }
  }

  return (
    <section ref={ref} className="w-full py-6">
      <div className="px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
            <h2 className="section-heading mx-auto">Join Our Community</h2>
            <p className="text-muted-foreground mt-2 font-body-serif">
              Subscribe to our newsletter and become part of a community dedicated to truth and clarity in journalism.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-md mx-auto w-full">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newspaper-button">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-muted-foreground text-center font-body-serif">
                  By subscribing, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            ) : (
              <div className="bg-secondary/50 p-6 rounded-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-serif">Thank You for Subscribing!</h3>
                <p className="text-muted-foreground font-body-serif">
                  You've successfully joined our community. Watch your inbox for the latest news and updates.
                </p>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4">
              <h3 className="text-lg font-bold mb-2 font-serif">Daily Updates</h3>
              <p className="text-sm text-muted-foreground font-body-serif">
                Get the latest news delivered directly to your inbox every morning.
              </p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-lg font-bold mb-2 font-serif">Exclusive Content</h3>
              <p className="text-sm text-muted-foreground font-body-serif">
                Access in-depth analysis and special features available only to subscribers.
              </p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-lg font-bold mb-2 font-serif">Community Events</h3>
              <p className="text-sm text-muted-foreground font-body-serif">
                Invitations to virtual and in-person events with our journalists and experts.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
