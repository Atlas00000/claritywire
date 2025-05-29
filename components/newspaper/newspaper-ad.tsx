"use client"

import { motion } from "framer-motion"

interface NewspaperAdProps {
  title: string
  content: string
  buttonText?: string
  buttonLink?: string
}

export function NewspaperAd({ title, content, buttonText, buttonLink }: NewspaperAdProps) {
  return (
    <motion.div
      className="newspaper-ad"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="newspaper-ad-title">{title}</div>
      <p className="newspaper-ad-content">{content}</p>
      {buttonText && buttonLink && (
        <a href={buttonLink} className="newspaper-button-outline mt-2 text-xs">
          {buttonText}
        </a>
      )}
    </motion.div>
  )
}
