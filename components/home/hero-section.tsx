"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, CheckCircle, Clock, Bookmark } from "lucide-react"

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section ref={ref} className="w-full py-6 md:py-12 overflow-hidden">
      <div className="px-4 md:px-6">
        <motion.div
          className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="flex flex-col justify-center space-y-4" variants={itemVariants}>
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl/none"
                variants={itemVariants}
              >
                Fact-driven journalism for the modern world
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl font-body-serif drop-cap"
                variants={itemVariants}
              >
                Delivering accessible and inclusive content that empowers global citizens to understand and engage with
                the issues that matter. Our team of dedicated journalists works tirelessly to bring you the most
                accurate and insightful reporting.
              </motion.p>
            </div>
            <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={itemVariants}>
              <Link href="/start-reading">
                <button className="newspaper-button group">
                  Start Reading <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/learn-more">
                <button className="newspaper-button-outline">Learn More</button>
              </Link>
            </motion.div>
            <motion.div
              className="flex items-center space-x-4 text-sm text-muted-foreground pt-4 font-body-serif"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                <span>Fact Checked</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>Updated hourly</span>
              </div>
              <div className="flex items-center">
                <Bookmark className="mr-1 h-4 w-4" />
                <span>Save for later</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="flex items-center justify-center" variants={itemVariants}>
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden article-image moving-image">
              <Image
                src="/images/hero-image.png"
                alt="Hero image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/60 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
