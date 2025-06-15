// Mock data for the ClarityWire application

export interface Article {
  id: number
  title: string
  slug: string
  category: string
  badge: "Verified" | "Analysis" | "Opinion" | "Fact"
  image: string
  readTime: string
  likes: number
  summary?: string
  author?: {
    name: string
    role: string
    image: string
  }
  publishedAt?: string
  content?: string
  relatedArticles?: {
    slug: string
    title: string
    image: string
  }[]
}

export interface Topic {
  id: number
  name: string
  slug: string
  count: number
  category: string
}

export const newsArticles: Article[] = [
  {
    id: 1,
    title: "AI Regulation Takes Center Stage in Global Policy Debate",
    slug: "ai-regulation-global-policy",
    category: "Tech & Politics",
    badge: "Verified",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "4 min read",
    likes: 245,
    summary:
      "Governments worldwide are developing frameworks to regulate artificial intelligence, with varying approaches to balancing innovation and safety.",
    author: {
      name: "Sarah Johnson",
      role: "Technology Policy Analyst",
      image: "/placeholder.svg?height=100&width=100",
    },
    publishedAt: "May 10, 2025",
  },
  {
    id: 2,
    title: "New Research Shows Accelerated Glacier Melt in Antarctica",
    slug: "glacier-melt-antarctica-research",
    category: "Climate & Environment",
    badge: "Analysis",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "6 min read",
    likes: 189,
    summary:
      "Scientists report unprecedented rates of ice loss in key Antarctic regions, raising concerns about sea level rise projections.",
    author: {
      name: "Michael Chen",
      role: "Climate Science Correspondent",
      image: "/placeholder.svg?height=100&width=100",
    },
    publishedAt: "May 8, 2025",
  },
  {
    id: 3,
    title: "Global Supply Chain Resilience Tested by New Trade Policies",
    slug: "supply-chain-resilience-trade",
    category: "Economy & Business",
    badge: "Fact",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "5 min read",
    likes: 132,
    summary:
      "Companies are adapting to changing trade regulations and geopolitical tensions by diversifying suppliers and reshoring production.",
    author: {
      name: "Elena Rodriguez",
      role: "International Trade Analyst",
      image: "/placeholder.svg?height=100&width=100",
    },
    publishedAt: "May 5, 2025",
  },
  {
    id: 4,
    title: "Diplomatic Tensions Rise in South China Sea Dispute",
    slug: "south-china-sea-tensions",
    category: "Politics & International",
    badge: "Analysis",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "7 min read",
    likes: 156,
    summary:
      "Recent naval movements have escalated long-standing territorial disputes, prompting diplomatic interventions from multiple nations.",
    author: {
      name: "James Wilson",
      role: "Foreign Affairs Correspondent",
      image: "/placeholder.svg?height=100&width=100",
    },
    publishedAt: "May 3, 2025",
  },
  {
    id: 5,
    title: "Universal Basic Income Trials Show Mixed Economic Results",
    slug: "ubi-trials-economic-results",
    category: "Economy & Policy",
    badge: "Fact",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "3 min read",
    likes: 178,
    summary:
      "Pilot programs testing universal basic income in various countries reveal complex outcomes for employment, wellbeing, and local economies.",
    author: {
      name: "Sophia Ahmed",
      role: "Economic Policy Reporter",
      image: "/placeholder.svg?height=100&width=100",
    },
    publishedAt: "May 1, 2025",
  },
  {
    id: 6,
    title: "Quantum Computing Reaches New Milestone",
    slug: "quantum-computing-milestone",
    category: "Tech & Science",
    badge: "Fact",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "4 min read",
    likes: 203,
    summary:
      "Researchers achieve quantum advantage in solving complex optimization problems, bringing practical quantum computing applications closer to reality.",
    author: {
      name: "David Park",
      role: "Science & Technology Editor",
      image: "/placeholder.svg?height=100&width=100",
    },
    publishedAt: "April 28, 2025",
  },
]

export const trendingTopics: Topic[] = [
  {
    id: 1,
    name: "Climate Summit 2025",
    slug: "climate-summit-2025",
    count: 1245,
    category: "Climate",
  },
  {
    id: 2,
    name: "Quantum Computing Breakthrough",
    slug: "quantum-computing-breakthrough",
    count: 987,
    category: "Technology",
  },
  {
    id: 3,
    name: "Global Economic Forum",
    slug: "global-economic-forum",
    count: 876,
    category: "Economy",
  },
  {
    id: 4,
    name: "Healthcare Equity Initiative",
    slug: "healthcare-equity-initiative",
    count: 743,
    category: "Health",
  },
  {
    id: 5,
    name: "Space Exploration Milestone",
    slug: "space-exploration-milestone",
    count: 692,
    category: "Science",
  },
]

export const contentTypes = {
  fact: [
    {
      id: 1,
      title: "Universal Basic Income Trials Show Mixed Economic Results",
      slug: "ubi-trials-economic-results",
      category: "Economy & Policy",
      badge: "Fact",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "3 min read",
      likes: 178,
    },
    {
      id: 2,
      title: "Quantum Computing Reaches New Milestone",
      slug: "quantum-computing-milestone",
      category: "Tech & Science",
      badge: "Fact",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "4 min read",
      likes: 203,
    },
  ],
  analysis: [
    {
      id: 3,
      title: "Diplomatic Tensions Rise in South China Sea Dispute",
      slug: "south-china-sea-tensions",
      category: "Politics & International",
      badge: "Analysis",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "7 min read",
      likes: 156,
    },
    {
      id: 4,
      title: "The Implications of Digital Art in Modern Culture",
      slug: "digital-art-implications",
      category: "Culture & Society",
      badge: "Analysis",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "5 min read",
      likes: 142,
    },
  ],
  opinion: [
    {
      id: 5,
      title: "Why We Need to Rethink Urban Planning Post-Pandemic",
      slug: "urban-planning-post-pandemic",
      category: "Society & Urban",
      badge: "Opinion",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "6 min read",
      likes: 189,
    },
    {
      id: 6,
      title: "The Future of Sustainable Computing: Beyond Energy Efficiency",
      slug: "sustainable-computing-future",
      category: "Tech & Environment",
      badge: "Opinion",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "8 min read",
      likes: 215,
    },
  ],
}

export const personalizedContent = {
  forYou: [
    {
      id: 1,
      title: "The Future of Sustainable Computing: Beyond Energy Efficiency",
      slug: "sustainable-computing-future",
      category: "Tech & Environment",
      badge: "Opinion",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "8 min read",
      likes: 215,
    },
    {
      id: 2,
      title: "Remote Work Revolution: Economic Impact on Urban Centers",
      slug: "remote-work-economic-impact",
      category: "Economy & Society",
      badge: "Analysis",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "6 min read",
      likes: 178,
    },
  ],
  opposingViews: [
    {
      id: 3,
      title: "The Case Against Universal Basic Income",
      slug: "case-against-ubi",
      category: "Economy & Policy",
      badge: "Opinion",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "7 min read",
      likes: 143,
    },
    {
      id: 4,
      title: "Why Traditional Energy Sources Still Matter in the Green Transition",
      slug: "traditional-energy-green-transition",
      category: "Energy & Environment",
      badge: "Analysis",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "5 min read",
      likes: 156,
    },
  ],
  discover: [
    {
      id: 5,
      title: "Quantum Computing's Potential Impact on Cryptography",
      slug: "quantum-computing-cryptography",
      category: "Tech & Security",
      badge: "Analysis",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "9 min read",
      likes: 198,
    },
    {
      id: 6,
      title: "The Evolution of Public Health Systems Post-Pandemic",
      slug: "public-health-post-pandemic",
      category: "Health & Policy",
      badge: "Fact",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "6 min read",
      likes: 167,
    },
  ],
}
