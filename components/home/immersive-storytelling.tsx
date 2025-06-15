"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function ImmersiveStorytelling() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

  return (
    <section ref={ref} className="w-full py-6">
      <div className="px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="flex items-center justify-between" variants={itemVariants}>
            <h2 className="section-heading">Immersive Storytelling</h2>
            <p className="text-sm text-muted-foreground max-w-md font-body-serif">
              Experience stories in a new dimension with our interactive features.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="rounded-sm border bg-card shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto moving-image">
                  <Image
                    src="/images/immersive-story.png"
                    alt="Immersive storytelling visualization"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs uppercase tracking-wider font-body-serif">Featured Story</span>
                    <h3 className="text-xl font-bold font-serif">Climate Crisis: The Human Impact</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2 font-serif">Explore Beyond the Headlines</h3>
                  <p className="text-muted-foreground mb-4 font-body-serif drop-cap">
                    Our immersive storytelling features combine interactive data visualizations, 360° photography, and
                    personal narratives to bring you deeper into the stories that matter. Experience the climate crisis
                    through the eyes of those most affected, with rich multimedia content that goes beyond traditional
                    reporting.
                  </p>
                  <div className="mt-4">
                    <Link href="/immersive">
                      <button className="newspaper-button group">
                        Experience Now{" "}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
