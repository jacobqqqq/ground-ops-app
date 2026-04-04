import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown,
  Calendar,
  Users,
  Target,
  Lightbulb
} from "lucide-react"

export function SafetySection() {
  const safetyMetrics = {
    daysWithoutInjury: 42,
    totalIncidents: 3,
    minorInjuries: 2,
    recordableInjuries: 1,
    safetyGoal: 90
  }

  const recentIncidents = [
    {
      date: "2024-07-28",
      type: "Minor Cut",
      area: "Ramp Zone C",
      description: "Crew member cut hand on cargo container latch",
      status: "Resolved"
    },
    {
      date: "2024-07-15", 
      type: "Slip/Fall",
      area: "Apron Near Gate B4",
      description: "Slip on fuel spill near refueling station",
      status: "Under Review"
    },
    {
      date: "2024-07-02",
      type: "Strain/Sprain",
      area: "Baggage Handling",
      description: "Back strain from improper lifting of oversized luggage",
      status: "Resolved"
    }
  ]

  const safetyTips = [
    {
      icon: Shield,
      title: "Proper Lifting Technique",
      description: "Recent back strain incident — reminder to lift with legs when handling baggage",
      priority: "high"
    },
    {
      icon: AlertTriangle,
      title: "FOD Awareness", 
      description: "Check ramp areas for foreign object debris before aircraft movement",
      priority: "medium"
    },
    {
      icon: Target,
      title: "GSE Proximity Protocol",
      description: "Maintain safe distance from operating ground support equipment",
      priority: "high"
    }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-success" />
            <span>Safety Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-8 w-8 text-success" />
              </div>
              <div className="text-2xl font-bold text-success">{safetyMetrics.daysWithoutInjury}</div>
              <div className="text-sm text-muted-foreground">Days Injury-Free</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
              <div className="text-2xl font-bold text-foreground">{safetyMetrics.totalIncidents}</div>
              <div className="text-sm text-muted-foreground">Total Incidents</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
                <TrendingDown className="h-4 w-4 text-success ml-1" />
              </div>
              <div className="text-2xl font-bold text-foreground">{safetyMetrics.minorInjuries}</div>
              <div className="text-sm text-muted-foreground">Minor Injuries</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">{safetyMetrics.safetyGoal}</div>
              <div className="text-sm text-muted-foreground">Safety Goal (Days)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>Recent Incidents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map((incident, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{incident.type}</span>
                    <StatusBadge variant={incident.status === "Resolved" ? "success" : "warning"}>
                      {incident.status}
                    </StatusBadge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {incident.date} • {incident.area}
                  </div>
                  <div className="text-sm">{incident.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span>Priority Safety Reminders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safetyTips.map((tip, index) => {
                const Icon = tip.icon
                return (
                  <div key={index} className={`border rounded-lg p-3 space-y-2 ${
                    tip.priority === 'high' ? 'border-destructive/20 bg-destructive/5' : 'border-warning/20 bg-warning/5'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${
                        tip.priority === 'high' ? 'text-destructive' : 'text-warning'
                      }`} />
                      <span className="font-medium text-sm">{tip.title}</span>
                      <StatusBadge variant={tip.priority === 'high' ? 'destructive' : 'warning'}>
                        {tip.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                      </StatusBadge>
                    </div>
                    <div className="text-sm text-muted-foreground ml-6">
                      {tip.description}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
