"use client"

import { Masthead } from "@/components/newspaper/masthead"
import { BreakingNewsTicker } from "@/components/newspaper/breaking-news-ticker"
import { FeaturedArticle } from "@/components/newspaper/featured-article"
import { ArticleGrid } from "@/components/newspaper/article-grid"
import { TrendingSidebar } from "@/components/newspaper/trending-sidebar"
import { WeatherWidget } from "@/components/newspaper/weather-widget"
import { NewspaperAd } from "@/components/newspaper/newspaper-ad"
import { ContributorProfiles } from "@/components/newspaper/contributor-profiles"
import { ClassifiedAds } from "@/components/newspaper/classified-ads"
import { AnimatedHeadline } from "@/components/newspaper/animated-headline"
import { InteractiveChart } from "@/components/newspaper/interactive-chart"
import { motion } from "framer-motion"
import Image from "next/image"

// Mock data
const featuredArticle = {
  title: "Global Summit Addresses Climate Crisis with Unprecedented Agreement",
  excerpt:
    "World leaders from over 150 countries convened yesterday in Geneva to address the growing climate crisis, pledging significant reductions in carbon emissions by 2030. The historic agreement, which has been in negotiation for more than two years, represents the most ambitious global climate initiative to date.",
  image: "/images/articles/climate-summit.jpg",
  category: "WORLD",
  date: "May 15, 2025",
  author: "Elena Richardson",
  readTime: "6 min read",
  commentCount: 42,
}

const topStories = [
  {
    id: "1",
    title: "Tech Giants Announce Revolutionary AI Ethics Coalition",
    excerpt:
      "Leading technology companies have formed an unprecedented alliance to establish ethical guidelines for artificial intelligence development.",
    image: "/images/articles/ai-ethics.jpg",
    category: "TECHNOLOGY",
    date: "May 15, 2025",
    author: "Marcus Chen",
  },
  {
    id: "2",
    title: "Economic Outlook: Recovery Ahead Despite Challenges",
    excerpt:
      "Financial experts predict a strong economic recovery in the coming quarters, citing increased consumer spending and job growth.",
    image: "/images/articles/economic-recovery.jpg",
    category: "BUSINESS",
    date: "May 15, 2025",
    author: "Sophia Williams",
  },
  {
    id: "3",
    title: "Breakthrough in Renewable Energy Storage Reported",
    excerpt:
      "Scientists have developed a new battery technology that could solve one of the biggest challenges in renewable energy adoption.",
    image: "/images/articles/energy-storage.jpg",
    category: "SCIENCE",
    date: "May 14, 2025",
    author: "Dr. James Wilson",
  },
]

const politicsArticles = [
  {
    id: "4",
    title: "Senate Passes Landmark Infrastructure Bill",
    excerpt:
      "After months of negotiation, the Senate has approved a $1.2 trillion infrastructure package aimed at rebuilding roads, bridges, and expanding broadband access.",
    image: "/images/articles/infrastructure-bill.jpg",
    category: "POLITICS",
    date: "May 14, 2025",
    author: "Alexandra Davis",
  },
  {
    id: "5",
    title: "New Voting Rights Legislation Introduced",
    excerpt:
      "A bipartisan group of lawmakers has introduced a bill designed to strengthen voting rights protections across the country.",
    image: "/images/articles/voting-rights.jpg",
    category: "POLITICS",
    date: "May 13, 2025",
    author: "Michael Johnson",
  },
  {
    id: "6",
    title: "International Relations: Diplomatic Breakthrough in Middle East",
    excerpt:
      "Diplomatic efforts have led to a significant agreement between previously conflicting nations, raising hopes for regional stability.",
    image: "/images/articles/middle-east-diplomacy.jpg",
    category: "POLITICS",
    date: "May 12, 2025",
    author: "Sarah Al-Mahmoud",
  },
]

const trendingItems = [
  { id: "t1", title: "Global Summit Addresses Climate Crisis", views: "24.5K" },
  { id: "t2", title: "Tech Giants Form AI Ethics Coalition", views: "18.3K" },
  { id: "t3", title: "Breakthrough in Renewable Energy Storage", views: "15.7K" },
  { id: "t4", title: "Senate Passes Infrastructure Bill", views: "12.9K" },
  { id: "t5", title: "New Study Reveals Health Benefits of Coffee", views: "10.2K" },
]

const contributors = [
  { id: "c1", name: "Elena Richardson", title: "Senior Editor", image: "/images/contributors/elena-richardson.jpg" },
  { id: "c2", name: "Marcus Chen", title: "Tech Reporter", image: "/images/contributors/marcus-chen.jpg" },
  { id: "c3", name: "Sophia Williams", title: "Business Analyst", image: "/images/contributors/sophia-williams.jpg" },
  { id: "c4", name: "Dr. James Wilson", title: "Science Correspondent", image: "/images/contributors/james-wilson.jpg" },
  { id: "c5", name: "Alexandra Davis", title: "Political Reporter", image: "/images/contributors/alexandra-davis.jpg" },
  { id: "c6", name: "Michael Johnson", title: "Opinion Writer", image: "/images/contributors/michael-johnson.jpg" },
]

const classifiedAds = [
  {
    id: "ad1",
    title: "Apartment for Rent",
    content: "Spacious 2BR in downtown area. Newly renovated, all amenities included. Available immediately.",
    contact: "Contact: (555) 123-4567",
  },
  {
    id: "ad2",
    title: "Job Opening: Marketing Specialist",
    content: "Leading agency seeking experienced marketing professional. Competitive salary and benefits.",
    contact: "Apply at: careers@example.com",
  },
  {
    id: "ad3",
    title: "Piano Lessons",
    content:
      "Experienced instructor offering private piano lessons for all ages and skill levels. Flexible scheduling.",
    contact: "Call: (555) 987-6543",
  },
  {
    id: "ad4",
    title: "Vintage Furniture Sale",
    content: "Estate sale featuring mid-century modern pieces in excellent condition. This weekend only.",
    contact: "Location: 123 Maple Street",
  },
  {
    id: "ad5",
    title: "Pet Adoption Event",
    content: "Local animal shelter hosting adoption event. Dogs, cats, and other pets looking for forever homes.",
    contact: "Info: www.petshelter.org",
  },
  {
    id: "ad6",
    title: "Computer Repair Services",
    content: "Fast, reliable computer repair and IT support. Home and business services available.",
    contact: "Tech Help: (555) 789-0123",
  },
]

// Animated headlines data
const animatedHeadlines = [
  {
    title: "Global Leaders Reach Historic Climate Agreement at Summit",
    category: "BREAKING NEWS",
  },
  {
    title: "Tech Companies Unite to Form Revolutionary AI Ethics Coalition",
    category: "TECHNOLOGY",
  },
  {
    title: "Scientists Announce Breakthrough in Renewable Energy Storage",
    category: "SCIENCE",
  },
  {
    title: "Markets Surge as Economic Recovery Gains Momentum",
    category: "BUSINESS",
  },
  {
    title: "Senate Approves Landmark Infrastructure Package",
    category: "POLITICS",
  },
]

// Types for components
interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface EconomicData {
  monthly: Array<DataItem & {
    previousValue: number;
    growth: number;
  }>;
  sectors: Array<DataItem & {
    growth: number;
  }>;
  predictions: Array<DataItem & {
    confidence: number;
  }>;
}

interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    uvIndex: number;
    visibility: number;
    pressure: number;
    lastUpdated: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    windSpeed: number;
  }>;
  alerts: Array<{
    type: string;
    severity: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
  }>;
}

interface InteractiveChartProps {
  title: string;
  description: string;
  data: EconomicData;
  features: {
    showPredictions: boolean;
    showSectorBreakdown: boolean;
    showGrowthRates: boolean;
    interactive: boolean;
    animations: boolean;
    tooltips: boolean;
    zoom: boolean;
    export: boolean;
  };
}

interface WeatherWidgetProps {
  data: WeatherData;
  features: {
    showForecast: boolean;
    showAlerts: boolean;
    showRadar: boolean;
    showHourly: boolean;
    showAirQuality: boolean;
    showSunMoon: boolean;
    animations: boolean;
    interactive: boolean;
    autoRefresh: boolean;
  };
}

// Interactive chart data with more detailed metrics
const economicData: EconomicData = {
  monthly: [
    { name: "Jan", value: 4000, previousValue: 3800, growth: 5.2, color: "#8884d8" },
    { name: "Feb", value: 3000, previousValue: 3200, growth: -6.2, color: "#82ca9d" },
    { name: "Mar", value: 2000, previousValue: 2100, growth: -4.7, color: "#ffc658" },
    { name: "Apr", value: 2780, previousValue: 2600, growth: 6.9, color: "#ff8042" },
    { name: "May", value: 1890, previousValue: 1800, growth: 5.0, color: "#0088fe" },
    { name: "Jun", value: 2390, previousValue: 2200, growth: 8.6, color: "#00c49f" },
    { name: "Jul", value: 3490, previousValue: 3200, growth: 9.0, color: "#ffbb28" },
  ],
  sectors: [
    { name: "Technology", value: 4500, growth: 12.5, color: "#8884d8" },
    { name: "Healthcare", value: 3800, growth: 8.3, color: "#82ca9d" },
    { name: "Finance", value: 4200, growth: 10.1, color: "#ffc658" },
    { name: "Manufacturing", value: 3500, growth: 6.7, color: "#ff8042" },
    { name: "Retail", value: 3200, growth: 5.4, color: "#0088fe" },
  ],
  predictions: [
    { name: "Aug", value: 3800, confidence: 0.85, color: "#8884d8" },
    { name: "Sep", value: 4100, confidence: 0.82, color: "#82ca9d" },
    { name: "Oct", value: 4300, confidence: 0.78, color: "#ffc658" },
  ]
}

// Enhanced weather data
const weatherData = {
  current: {
    temperature: 72,
    condition: "Sunny",
    icon: "sun",
    humidity: 65,
    windSpeed: 8,
    feelsLike: 74,
    uvIndex: 7,
    visibility: 10,
    pressure: 1013,
    lastUpdated: new Date().toISOString()
  },
  forecast: [
    {
      date: new Date(Date.now() + 86400000).toISOString(),
      high: 75,
      low: 62,
      condition: "Partly Cloudy",
      icon: "cloud-sun",
      precipitation: 20,
      windSpeed: 6
    },
    {
      date: new Date(Date.now() + 172800000).toISOString(),
      high: 73,
      low: 60,
      condition: "Cloudy",
      icon: "cloud",
      precipitation: 40,
      windSpeed: 7
    },
    {
      date: new Date(Date.now() + 259200000).toISOString(),
      high: 70,
      low: 58,
      condition: "Light Rain",
      icon: "cloud-drizzle",
      precipitation: 60,
      windSpeed: 9
    },
    {
      date: new Date(Date.now() + 345600000).toISOString(),
      high: 68,
      low: 56,
      condition: "Rain",
      icon: "cloud-rain",
      precipitation: 80,
      windSpeed: 10
    },
    {
      date: new Date(Date.now() + 432000000).toISOString(),
      high: 71,
      low: 59,
      condition: "Partly Cloudy",
      icon: "cloud-sun",
      precipitation: 30,
      windSpeed: 8
    }
  ],
  alerts: [
    {
      type: "heat",
      severity: "moderate",
      title: "Heat Advisory",
      description: "High temperatures expected. Stay hydrated and limit outdoor activities during peak hours.",
      startTime: new Date(Date.now() + 3600000).toISOString(),
      endTime: new Date(Date.now() + 86400000).toISOString()
    }
  ]
}

// New widgets and sections data
const marketInsights = {
  title: "Market Insights",
  items: [
    {
      title: "Tech Sector Surge",
      change: "+2.4%",
      trend: "up",
      description: "Technology stocks lead market gains as AI boom continues"
    },
    {
      title: "Energy Sector",
      change: "-1.2%",
      trend: "down",
      description: "Oil prices decline amid supply concerns"
    },
    {
      title: "Healthcare",
      change: "+0.8%",
      trend: "up",
      description: "Biotech stocks rally on breakthrough news"
    }
  ]
}

const trendingTopics = {
  title: "Trending Topics",
  items: [
    {
      title: "AI Ethics",
      count: 12500,
      trend: "up",
      category: "Technology"
    },
    {
      title: "Climate Action",
      count: 9800,
      trend: "up",
      category: "Environment"
    },
    {
      title: "Digital Privacy",
      count: 8700,
      trend: "up",
      category: "Technology"
    }
  ]
}

const liveEvents = {
  title: "Live Events",
  items: [
    {
      title: "Global Tech Summit",
      time: "14:00 UTC",
      status: "live",
      viewers: 12500
    },
    {
      title: "Economic Forum",
      time: "16:30 UTC",
      status: "upcoming",
      viewers: 0
    },
    {
      title: "Climate Conference",
      time: "18:00 UTC",
      status: "upcoming",
      viewers: 0
    }
  ]
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('/images/paper-texture.png')] dark:bg-[url('/images/dark-paper-texture.png')] bg-repeat">
      <div className="container mx-auto px-4 py-8">
        <Masthead />
        <BreakingNewsTicker />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-8">
            <FeaturedArticle article={featuredArticle} />
            <ArticleGrid articles={topStories} title="Top Stories" />
            <ArticleGrid articles={politicsArticles} title="Politics" />
          </div>
          <div className="lg:col-span-4">
            <TrendingSidebar items={trendingItems} />
            <WeatherWidget 
              data={weatherData}
              features={{
                showForecast: true,
                showAlerts: true,
                showRadar: false,
                showHourly: false,
                showAirQuality: false,
                showSunMoon: true,
                animations: true,
                interactive: true,
                autoRefresh: true
              }}
            />
            <NewspaperAd />
          </div>
        </div>
        <ContributorProfiles contributors={contributors} />
        <ClassifiedAds ads={classifiedAds} />
        <AnimatedHeadline headlines={animatedHeadlines} />
        <InteractiveChart 
          title="Economic Growth Trends (2025)"
          description="Monthly economic indicators showing growth patterns across different sectors of the economy."
          data={economicData}
          features={{
            showPredictions: true,
            showSectorBreakdown: true,
            showGrowthRates: true,
            interactive: true,
            animations: true,
            tooltips: true,
            zoom: true,
            export: true
          }}
        />
      </div>
    </main>
  )
}
