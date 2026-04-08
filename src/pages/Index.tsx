import { useState } from "react"
import { MobileHeader } from "@/components/mobile-header"
import { AirportHeader } from "@/components/airport-header"
import { ShiftForm } from "@/components/shift-form"
import { RecentShifts } from "@/components/recent-shifts"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { SafetySection } from "@/components/safety-section"
import { SafetyBriefing, type BriefingEntry } from "@/components/safety-briefing"
import { PostBriefingForm } from "@/components/post-briefing-form"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, Users, Plane, CloudFog, Eye, Wind, Thermometer, AlertCircle, MapPin } from "lucide-react"

type Role = 'MANAGER' | 'GROUND_OPS'

const defaultBriefings: BriefingEntry[] = [
  { category: 'Weather', message: 'High Heat Advisory: Temps above 100°F today. Stay hydrated and take shade breaks every 30 minutes.' },
  { category: 'Incident', message: 'Environmental Hazard Incident (Yesterday): Review chemical spill kit locations in your zone before shift start.' },
  { category: 'General', message: 'FOD Walk Reminder: Inspect your gate area for foreign object debris at shift start.' },
]

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [role, setRole] = useState<Role>('MANAGER')
  const [briefings, setBriefings] = useState<BriefingEntry[]>(defaultBriefings)

  const toggleRole = () => setRole(r => r === 'MANAGER' ? 'GROUND_OPS' : 'MANAGER')

  const handlePostBriefing = (entry: BriefingEntry) => {
    setBriefings(prev => [entry, ...prev])
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'log':
        return <ShiftForm />
      case 'history':
        return <RecentShifts />
      case 'metrics':
        return <DashboardMetrics />
      default:
        return <DashboardOverview onPostBriefing={handlePostBriefing} />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader
        title="GATE"
        notificationCount={2}
        role={role}
        onRoleSwitch={toggleRole}
      />
      <AirportHeader />

      <main className="container mx-auto px-4 py-6">
        {role === 'MANAGER' ? renderActiveTab() : <GroundOpsView briefings={briefings} />}
      </main>

      {role === 'MANAGER' && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
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

      {/* Weather Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CloudFog className="h-5 w-5 text-primary" />
            <span>SFO Weather Conditions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Thermometer className="h-6 w-6 text-primary" />
              <div>
                <div className="text-xl font-bold">58°F</div>
                <p className="text-xs text-muted-foreground">Temperature</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Wind className="h-6 w-6 text-primary" />
              <div>
                <div className="text-xl font-bold">12 mph</div>
                <p className="text-xs text-muted-foreground">Wind Speed</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Eye className="h-6 w-6 text-primary" />
              <div>
                <div className="text-xl font-bold">6 mi</div>
                <p className="text-xs text-muted-foreground">Visibility</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg bg-success/5 border-success/20">
              <CloudFog className="h-6 w-6 text-success" />
              <div>
                <div className="text-sm font-bold text-success">Low Risk</div>
                <p className="text-xs text-muted-foreground">Fog / Delay</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            <span>Active Incidents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Gate B7 conflict — dual aircraft assignment</p>
                <p className="text-xs text-muted-foreground">Today, 09:42 AM</p>
              </div>
              <StatusBadge variant="destructive">High</StatusBadge>
            </div>
            <div className="flex items-start justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Pushback tug #4 out of service at Gate C3</p>
                <p className="text-xs text-muted-foreground">Today, 08:15 AM</p>
              </div>
              <StatusBadge variant="warning">Medium</StatusBadge>
            </div>
            <div className="flex items-start justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Inbound delay — UA 347 holding for ramp space</p>
                <p className="text-xs text-muted-foreground">Today, 07:58 AM</p>
              </div>
              <StatusBadge variant="success">Low</StatusBadge>
            </div>
          </div>
        </CardContent>
      </Card>

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

function GroundOpsView() {
  return (
    <div className="space-y-6">
      {/* Current Shift Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Shift Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Sarah Johnson</h3>
              <p className="text-muted-foreground">Day Shift • Started 6:00 AM</p>
            </div>
            <StatusBadge variant="success">
              <Activity className="h-3 w-3 mr-1" />
              Active
            </StatusBadge>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Gate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Assigned Gate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge className="text-2xl font-bold px-4 py-2 bg-primary text-primary-foreground">
                Gate B7
              </Badge>
            </div>
            <StatusBadge variant="success">On Duty</StatusBadge>
          </div>
        </CardContent>
      </Card>

      {/* Active Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            <span>Active Incidents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Gate B7 conflict — dual aircraft assignment</p>
                <p className="text-xs text-muted-foreground">Today, 09:42 AM</p>
              </div>
              <StatusBadge variant="destructive">High</StatusBadge>
            </div>
            <div className="flex items-start justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Pushback tug #4 out of service at Gate C3</p>
                <p className="text-xs text-muted-foreground">Today, 08:15 AM</p>
              </div>
              <StatusBadge variant="warning">Medium</StatusBadge>
            </div>
            <div className="flex items-start justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Inbound delay — UA 347 holding for ramp space</p>
                <p className="text-xs text-muted-foreground">Today, 07:58 AM</p>
              </div>
              <StatusBadge variant="success">Low</StatusBadge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CloudFog className="h-5 w-5 text-primary" />
            <span>SFO Weather Conditions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Thermometer className="h-6 w-6 text-primary" />
              <div>
                <div className="text-xl font-bold">58°F</div>
                <p className="text-xs text-muted-foreground">Temperature</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Wind className="h-6 w-6 text-primary" />
              <div>
                <div className="text-xl font-bold">12 mph</div>
                <p className="text-xs text-muted-foreground">Wind Speed</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Eye className="h-6 w-6 text-primary" />
              <div>
                <div className="text-xl font-bold">6 mi</div>
                <p className="text-xs text-muted-foreground">Visibility</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg bg-success/5 border-success/20">
              <CloudFog className="h-6 w-6 text-success" />
              <div>
                <div className="text-sm font-bold text-success">Low Risk</div>
                <p className="text-xs text-muted-foreground">Fog / Delay</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Index;
