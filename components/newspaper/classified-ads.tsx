"use client"

import { motion } from "framer-motion"

interface ClassifiedAd {
  id: string
  title: string
  content: string
  contact: string
}

interface ClassifiedAdsProps {
  ads: ClassifiedAd[]
}

export function ClassifiedAds({ ads }: ClassifiedAdsProps) {
  return (
    <div className="newspaper-section">
      <h2 className="newspaper-section-title">Classified Advertisements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad, index) => (
          <motion.div
            key={ad.id}
            className="classified-ad"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="classified-ad-title">{ad.title}</div>
            <div className="classified-ad-content">{ad.content}</div>
            <div className="classified-ad-contact">{ad.contact}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
