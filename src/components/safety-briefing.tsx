import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export type BriefingCategory = 'Weather' | 'Incident' | 'General'

export interface BriefingEntry {
  category: BriefingCategory
  message: string
}

const borderColorMap: Record<BriefingCategory, string> = {
  Weather: 'border-l-warning',
  Incident: 'border-l-destructive',
  General: 'border-l-primary',
}

interface SafetyBriefingProps {
  entries: BriefingEntry[]
}

export function SafetyBriefing({ entries }: SafetyBriefingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Safety Briefing</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <div
              key={index}
              className={`border-l-4 ${borderColorMap[entry.category]} rounded-lg border bg-card p-3`}
            >
              <p className="text-sm">{entry.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
