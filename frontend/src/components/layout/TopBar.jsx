import { useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../config/routes'

const PAGE_TITLES = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.EXAMPLES]: 'Examples',
  [ROUTES.USERS]: 'Users',
  [ROUTES.SETTINGS]: 'Settings',
}

export default function TopBar() {
  const { user } = useAuth()
  const location = useLocation()

  const title = PAGE_TITLES[location.pathname] || 'AppName'

  return (
    <header className="h-14 bg-app-card border-b border-border-default flex items-center justify-between px-6 shrink-0">
      <h2 className="text-base font-semibold text-text-primary">{title}</h2>

      <div className="flex items-center gap-4">
        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <span className="text-xs font-semibold text-accent-primary">
              {(user?.full_name || user?.username || 'U').charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text-primary leading-tight">
              {user?.full_name || user?.username}
            </p>
            <p className="text-[11px] text-accent-primary uppercase">
              {user?.role_name}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
