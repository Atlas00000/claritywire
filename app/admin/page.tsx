"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { apiClient } from "@/lib/api-client"
import { AnalyticsData, SystemStatus } from "@/lib/types/api"
import {
  Users,
  FileText,
  Activity,
  Settings,
  Download,
  Upload,
  Search,
  BarChart3,
  Shield,
  AlertCircle,
  Loader2,
} from "lucide-react"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [analyticsResponse, statusResponse] = await Promise.all([
          apiClient.getAnalytics(),
          apiClient.getSystemStatus(),
        ])

        setAnalytics(analyticsResponse.data)
        setSystemStatus(statusResponse.data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleExport = async () => {
    try {
      // Implement export functionality
      toast({
        title: "Export Started",
        description: "Your data export has been initiated",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your application</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-9 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.totalUsers || 0}</div>
                <p className="text-xs text-muted-foreground">+0% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.totalArticles || 0}</div>
                <p className="text-xs text-muted-foreground">+0% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.activeSessions || 0}</div>
                <p className="text-xs text-muted-foreground">Active now</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${
                  systemStatus?.status === 'healthy' ? 'text-green-500' :
                  systemStatus?.status === 'degraded' ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {systemStatus?.status || 'Unknown'}
                </div>
                <p className="text-xs text-muted-foreground">{systemStatus?.message || 'Status unknown'}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">No recent activity</p>
                      <p className="text-sm text-muted-foreground">Activity will appear here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-green-500 mr-2" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">System Status</p>
                      <p className="text-sm text-muted-foreground">All systems are operational</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Search Users</Label>
                    <Input placeholder="Search by name or email" />
                  </div>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Import Users
                  </Button>
                </div>
                <Separator />
                <div className="rounded-md border">
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">No users found</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage articles and categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Search Content</Label>
                    <Input placeholder="Search articles or categories" />
                  </div>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Import Content
                  </Button>
                </div>
                <Separator />
                <div className="rounded-md border">
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">No content found</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>View detailed analytics and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Date Range</Label>
                    <Input type="date" />
                  </div>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>
                <Separator />
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-center h-[200px]">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    <p className="ml-2 text-sm text-muted-foreground">Analytics data will appear here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system preferences and features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>System Configuration</Label>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Maintenance Mode</p>
                        <p className="text-sm text-muted-foreground">Enable maintenance mode</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Backup Settings</p>
                        <p className="text-sm text-muted-foreground">Configure automatic backups</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">API Settings</p>
                        <p className="text-sm text-muted-foreground">Manage API configurations</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 