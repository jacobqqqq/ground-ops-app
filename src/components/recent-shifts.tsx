import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { History, CheckCircle, Calendar, User, ArrowUpDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Shift {
  id: string
  supervisorName: string
  date: string
  shiftType: string
  inboundQueue: string
  outboundQueue: string
  notes: string
  timestamp: string
  status: string
  acknowledged?: boolean
}

export function RecentShifts() {
  const { toast } = useToast()
  const [shifts, setShifts] = useState<Shift[]>([])

  useEffect(() => {
    const savedShifts = JSON.parse(localStorage.getItem('shifts') || '[]')
    setShifts(savedShifts.slice(0, 10))
  }, [])

  const acknowledgeShift = (shiftId: string) => {
    const updatedShifts = shifts.map(shift => 
      shift.id === shiftId 
        ? { ...shift, acknowledged: true }
        : shift
    )
    setShifts(updatedShifts)
    
    const allShifts = JSON.parse(localStorage.getItem('shifts') || '[]')
    const allUpdated = allShifts.map((shift: Shift) => 
      shift.id === shiftId 
        ? { ...shift, acknowledged: true }
        : shift
    )
    localStorage.setItem('shifts', JSON.stringify(allUpdated))
    
    toast({
      title: "Shift acknowledged",
      description: "Handoff has been confirmed.",
    })
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getShiftTypeColor = (shiftType: string) => {
    switch (shiftType) {
      case 'day': return 'success'
      case 'evening': return 'warning'
      case 'night': return 'primary'
      case 'weekend': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5 text-primary" />
          <span>Recent Shifts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {shifts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent shifts logged</p>
            <p className="text-sm">Shift logs will appear here once created</p>
          </div>
        ) : (
          <div className="space-y-4">
            {shifts.map((shift) => (
              <div key={shift.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{shift.supervisorName}</span>
                      <StatusBadge 
                        variant={getShiftTypeColor(shift.shiftType)}
                      >
                        {shift.shiftType} shift
                      </StatusBadge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatTime(shift.timestamp)}</span>
                    </div>
                  </div>
                  
                  {!shift.acknowledged && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => acknowledgeShift(shift.id)}
                      className="text-success border-success hover:bg-success hover:text-success-foreground"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Acknowledge
                    </Button>
                  )}
                  
                  {shift.acknowledged && (
                    <StatusBadge variant="success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Acknowledged
                    </StatusBadge>
                  )}
                </div>

                {(shift.inboundQueue || shift.outboundQueue) && (
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Inbound:</span>
                      <span className="font-medium">{shift.inboundQueue || '0'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground rotate-90" />
                      <span className="text-muted-foreground">Outbound:</span>
                      <span className="font-medium">{shift.outboundQueue || '0'}</span>
                    </div>
                  </div>
                )}

                {shift.notes && (
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-1">Notes:</p>
                    <p className="text-foreground bg-muted p-2 rounded text-sm">{shift.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
