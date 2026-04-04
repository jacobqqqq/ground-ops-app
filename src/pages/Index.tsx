import { useState } from "react"
import { MobileHeader } from "@/components/mobile-header"
import { AirportHeader } from "@/components/airport-header"
import { ShiftForm } from "@/components/shift-form"
import { RecentShifts } from "@/components/recent-shifts"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { SafetySection } from "@/components/safety-section"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Activity, Clock, Users, Plane, CloudFog, Eye, Wind, Thermometer, AlertCircle } from "lucide-react"

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'log':
        return <ShiftForm />
      case 'history':
        return <RecentShifts />
      case 'metrics':
        return <DashboardMetrics />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader 
        title="GATE" 
        notificationCount={2}
      />
      <AirportHeader />
      
      <main className="container mx-auto px-4 py-6">
        {renderActiveTab()}
      </main>

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  )
}

function DashboardOverview() {
  const currentShift = {
    supervisor: "Sarah Johnson",
    type: "Day Shift",
    startTime: "6:00 AM",
    status: "Active"
  }

  const quickStats = [
    { label: "Active Crew", value: "24", icon: Users, color: "success" },
    { label: "Aircraft Queue", value: "47", icon: Plane, color: "warning" },
    { label: "Avg Turnaround", value: "8.5m", icon: Clock, color: "primary" },
    { label: "Efficiency", value: "94%", icon: Activity, color: "success" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Shift Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{currentShift.supervisor}</h3>
              <p className="text-muted-foreground">{currentShift.type} • Started {currentShift.startTime}</p>
            </div>
            <StatusBadge variant="success">
              <Activity className="h-3 w-3 mr-1" />
              {currentShift.status}
            </StatusBadge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-muted-foreground">10:45 AM</span>
              <span>Evening shift handoff acknowledged</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">10:30 AM</span>
              <span>High aircraft queue alert cleared</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">10:15 AM</span>
              <span>New shift log created by Mike Chen</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <SafetySection />
    </div>
  )
}

export default Index;
