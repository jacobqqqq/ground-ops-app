import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Megaphone } from "lucide-react"
import type { BriefingCategory, BriefingEntry } from "./safety-briefing"

interface PostBriefingFormProps {
  onPost: (entry: BriefingEntry) => void
}

export function PostBriefingForm({ onPost }: PostBriefingFormProps) {
  const [category, setCategory] = useState<BriefingCategory | ''>('')
  const [message, setMessage] = useState('')

  const handlePost = () => {
    if (!category || !message.trim()) return
    onPost({ category: category as BriefingCategory, message: message.trim() })
    setCategory('')
    setMessage('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Megaphone className="h-5 w-5 text-primary" />
          <span>Post Briefing</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={category} onValueChange={(v) => setCategory(v as BriefingCategory)}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Weather">Weather</SelectItem>
            <SelectItem value="Incident">Incident</SelectItem>
            <SelectItem value="General">General</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder="Enter safety briefing message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
        <Button onClick={handlePost} disabled={!category || !message.trim()} className="w-full">
          Post
        </Button>
      </CardContent>
    </Card>
  )
}
