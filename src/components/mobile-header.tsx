import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Role = 'MANAGER' | 'GROUND_OPS'

interface MobileHeaderProps {
  title: string
  onMenuClick?: () => void
  notificationCount?: number
  role?: Role
  onRoleSwitch?: () => void
}

export function MobileHeader({ title, onMenuClick, notificationCount = 0, role, onRoleSwitch }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold tracking-tight text-foreground">{title}</h1>
          {role === 'MANAGER' && (
            <Badge variant="outline" className="text-xs font-semibold border-primary text-primary hidden sm:inline-flex">
              SFO
            </Badge>
          )}
          <span className="text-xs text-muted-foreground hidden sm:inline">Ground Ops at-a-Glance</span>
        </div>

        <div className="flex items-center space-x-2">
          {role && (
            <>
              <Badge
                className={role === 'MANAGER'
                  ? "text-xs font-semibold bg-primary text-primary-foreground"
                  : "text-xs font-semibold bg-muted text-muted-foreground"}
              >
                {role === 'MANAGER' ? 'MANAGER' : 'GROUND OPS'}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 px-2"
                onClick={onRoleSwitch}
              >
                Switch Role
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
