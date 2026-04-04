import { useState, useEffect } from "react"
import { MapPin, Clock, CloudSun, Wind, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const airports = [
  { code: "SFO", name: "San Francisco International" },
  { code: "LAX", name: "Los Angeles International" },
  { code: "ORD", name: "O'Hare International" },
  { code: "JFK", name: "John F. Kennedy International" },
  { code: "SEA", name: "Seattle-Tacoma International" },
]

const weatherData: Record<string, { temp: number; condition: string; wind: string }> = {
  SFO: { temp: 62, condition: "Partly Cloudy", wind: "12 mph NW" },
  LAX: { temp: 74, condition: "Sunny", wind: "8 mph SW" },
  ORD: { temp: 45, condition: "Overcast", wind: "18 mph N" },
  JFK: { temp: 55, condition: "Light Rain", wind: "14 mph E" },
  SEA: { temp: 51, condition: "Drizzle", wind: "10 mph S" },
}

export function AirportHeader() {
  const [selectedAirport, setSelectedAirport] = useState(airports[0])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const weather = weatherData[selectedAirport.code]

  return (
    <div className="sticky top-14 z-40 w-full border-b bg-muted/50 backdrop-blur supports-[backdrop-filter]:bg-muted/30">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Airport Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto p-1.5 font-semibold text-foreground hover:bg-accent">
                <MapPin className="h-4 w-4 mr-1.5 text-primary" />
                <span className="text-sm font-bold">{selectedAirport.code}</span>
                <span className="text-xs text-muted-foreground ml-1.5 hidden sm:inline">
                  — {selectedAirport.name}
                </span>
                <ChevronDown className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {airports.map((airport) => (
                <DropdownMenuItem
                  key={airport.code}
                  onClick={() => setSelectedAirport(airport)}
                  className={airport.code === selectedAirport.code ? "bg-accent" : ""}
                >
                  <span className="font-bold mr-2">{airport.code}</span>
                  <span className="text-muted-foreground text-xs">{airport.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Time & Weather */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-mono tabular-nums">
                {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CloudSun className="h-3.5 w-3.5" />
              <span>{weather.temp}°F</span>
              <span className="hidden sm:inline">· {weather.condition}</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-3.5 w-3.5" />
              <span>{weather.wind}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
