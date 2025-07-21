import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Package,
  Truck,
  Clock,
  AlertTriangle
} from "lucide-react"

export function DashboardMetrics() {
  // Mock real-time data - in production this would come from your warehouse management system
  const metrics = {
    inboundQueue: 47,
    outboundQueue: 23,
    processingRate: 125,
    avgProcessingTime: 8.5,
    alerts: 2,
    efficiency: 94
  }

  const trends = {
    inbound: 'up',
    outbound: 'down',
    processing: 'up',
    efficiency: 'stable'
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Live Warehouse Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Package className="h-8 w-8 text-primary" />
                {trends.inbound === 'up' && <TrendingUp className="h-4 w-4 text-success ml-1" />}
              </div>
              <div className="text-2xl font-bold text-foreground">{metrics.inboundQueue}</div>
              <div className="text-sm text-muted-foreground">Inbound Queue</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Truck className="h-8 w-8 text-accent" />
                {trends.outbound === 'down' && <TrendingDown className="h-4 w-4 text-success ml-1" />}
              </div>
              <div className="text-2xl font-bold text-foreground">{metrics.outboundQueue}</div>
              <div className="text-sm text-muted-foreground">Outbound Queue</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Activity className="h-8 w-8 text-success" />
                {trends.processing === 'up' && <TrendingUp className="h-4 w-4 text-success ml-1" />}
              </div>
              <div className="text-2xl font-bold text-foreground">{metrics.processingRate}</div>
              <div className="text-sm text-muted-foreground">Items/Hour</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-warning" />
              </div>
              <div className="text-2xl font-bold text-foreground">{metrics.avgProcessingTime}m</div>
              <div className="text-sm text-muted-foreground">Avg Process Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">WMS Connection</span>
              <StatusBadge variant="success">Online</StatusBadge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Scanner Network</span>
              <StatusBadge variant="success">Active</StatusBadge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Conveyor System</span>
              <StatusBadge variant="warning">Maintenance</StatusBadge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Shift Efficiency</span>
              <StatusBadge variant="success">{metrics.efficiency}%</StatusBadge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span className="text-lg">Active Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.alerts > 0 ? (
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 border border-warning/20 rounded-lg bg-warning/5">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Conveyor Belt B2</div>
                    <div className="text-xs text-muted-foreground">Scheduled maintenance due</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 border border-destructive/20 rounded-lg bg-destructive/5">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">High Inbound Volume</div>
                    <div className="text-xs text-muted-foreground">Queue approaching capacity</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No active alerts</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}