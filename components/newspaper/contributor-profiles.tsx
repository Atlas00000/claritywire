"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Contributor {
  id: string
  name: string
  title: string
  image: string
}

interface ContributorProfilesProps {
  contributors: Contributor[]
}

function MovingPortrait({ contributor }: { contributor: Contributor }) {
  const portraitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!portraitRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = portraitRef.current.getBoundingClientRect()
      const x = (clientX - left) / width
      const y = (clientY - top) / height

      portraitRef.current.style.setProperty("--mouse-x", `${x}`)
      portraitRef.current.style.setProperty("--mouse-y", `${y}`)
    }

    const element = portraitRef.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div className="moving-portrait" ref={portraitRef}>
      <div className="relative w-24 h-24">
        <Image
          src={contributor.image}
          alt={contributor.name}
          fill
          sizes="96px"
          className="portrait-image rounded-full object-cover"
          quality={90}
        />
      </div>
      <div className="portrait-overlay"></div>
    </div>
  )
}

export function ContributorProfiles({ contributors }: ContributorProfilesProps) {
  return (
    <section className="newspaper-section">
      <h2 className="newspaper-section-title">Our Contributors</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {contributors.map((contributor, index) => (
          <motion.div
            key={contributor.id}
            className="contributor-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <MovingPortrait contributor={contributor} />
            <h3 className="contributor-name">{contributor.name}</h3>
            <p className="contributor-title">{contributor.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
