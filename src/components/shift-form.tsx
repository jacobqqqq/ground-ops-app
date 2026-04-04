import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Save, Clock } from "lucide-react"

interface ShiftFormData {
  supervisorName: string
  date: string
  shiftType: string
  inboundQueue: string
  outboundQueue: string
  notes: string
}

export function ShiftForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<ShiftFormData>({
    supervisorName: '',
    date: new Date().toISOString().split('T')[0],
    shiftType: '',
    inboundQueue: '',
    outboundQueue: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const shiftData = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'active'
    }
    
    const existingShifts = JSON.parse(localStorage.getItem('shifts') || '[]')
    existingShifts.unshift(shiftData)
    localStorage.setItem('shifts', JSON.stringify(existingShifts))
    
    toast({
      title: "Shift logged successfully",
      description: `${formData.shiftType} shift for ${formData.supervisorName} has been recorded.`,
    })
    
    setFormData({
      supervisorName: '',
      date: new Date().toISOString().split('T')[0],
      shiftType: '',
      inboundQueue: '',
      outboundQueue: '',
      notes: ''
    })
  }

  const updateField = (field: keyof ShiftFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Log Shift Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supervisor">Ops Supervisor</Label>
              <Input
                id="supervisor"
                placeholder="Enter ops supervisor name"
                value={formData.supervisorName}
                onChange={(e) => updateField('supervisorName', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => updateField('date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shift-type">Shift Type</Label>
            <Select value={formData.shiftType} onValueChange={(value) => updateField('shiftType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select shift type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day Shift (6AM - 2PM)</SelectItem>
                <SelectItem value="evening">Evening Shift (2PM - 10PM)</SelectItem>
                <SelectItem value="night">Night Shift (10PM - 6AM)</SelectItem>
                <SelectItem value="weekend">Weekend Shift</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inbound">Inbound Aircraft Queue</Label>
              <Input
                id="inbound"
                type="number"
                placeholder="0"
                value={formData.inboundQueue}
                onChange={(e) => updateField('inboundQueue', e.target.value)}
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="outbound">Outbound Aircraft Queue</Label>
              <Input
                id="outbound"
                type="number"
                placeholder="0"
                value={formData.outboundQueue}
                onChange={(e) => updateField('outboundQueue', e.target.value)}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Shift Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter important notes, issues, or handoff information..."
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Save className="mr-2 h-4 w-4" />
            Save Shift Log
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
