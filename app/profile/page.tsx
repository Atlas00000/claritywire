"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useSupabase } from "@/hooks/useSupabase"
import { useProfile } from "@/hooks/useProfile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/forms/profile-form"
import { 
  User, 
  Settings, 
  Bell, 
  Bookmark, 
  History, 
  Star, 
  Activity,
  Shield,
  Mail,
  Calendar,
  TrendingUp,
  Users
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useSupabase()
  const { profile, loading: profileLoading } = useProfile()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/signin")
    }
  }, [user, authLoading, router])

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <motion.div
      className="container py-8 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header */}
      <motion.div variants={itemVariants} className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg blur-3xl" />
        <Card className="relative">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={profile?.avatar_url || ""} />
                <AvatarFallback className="text-2xl">
                  {profile?.full_name?.[0] || user?.email?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{profile?.full_name || "Anonymous User"}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">Member</Badge>
                  <Badge variant="outline">Verified</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Profile Completion</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">Jan 2024</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Active</p>
                  <p className="font-medium">Now</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Messages
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Area */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest interactions and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Activity {i}</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reading Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Articles Read</span>
                        <span className="font-medium">24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Time Spent</span>
                        <span className="font-medium">12h 30m</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Comments</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bookmarks</span>
                        <span className="font-medium">15</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                  <CardDescription>Your complete activity history</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="p-2 bg-primary/10 rounded-full">
                        <History className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Activity Title {i}</p>
                        <p className="text-sm text-muted-foreground">
                          Detailed description of the activity and its impact
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{i} days ago</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Push Notifications</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Content Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Reading History</span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Saved Articles</span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
} 