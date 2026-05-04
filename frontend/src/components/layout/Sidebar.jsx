import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { ROUTES } from '../../config/routes'

const ICONS = {
  BarChart3: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3v18h18M7 16V9m4 7V5m4 11v-4m4 4V8" /></svg>,
  ListBullet: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m21 0v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm3-3a4 4 0 0 1 0 8" /></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.2 3a1 1 0 0 0-1 .8L10.8 6a7 7 0 0 0-1.6.9l-2.1-.7a1 1 0 0 0-1.1.5l-1 1.7a1 1 0 0 0 .1 1.2l1.7 1.4a7 7 0 0 0 0 1.8l-1.7 1.4a1 1 0 0 0-.1 1.2l1 1.7a1 1 0 0 0 1.1.5l2.1-.7a7 7 0 0 0 1.6.9l.4 2.2a1 1 0 0 0 1 .8h2a1 1 0 0 0 1-.8l.4-2.2a7 7 0 0 0 1.6-.9l2.1.7a1 1 0 0 0 1.1-.5l1-1.7a1 1 0 0 0-.1-1.2l-1.7-1.4a7 7 0 0 0 0-1.8l1.7-1.4a1 1 0 0 0 .1-1.2l-1-1.7a1 1 0 0 0-1.1-.5l-2.1.7a7 7 0 0 0-1.6-.9l-.4-2.2a1 1 0 0 0-1-.8h-2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>,
  LogOut: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9" /></svg>,
}

const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'BarChart3' },
  { label: 'Examples',  path: ROUTES.EXAMPLES,  icon: 'ListBullet' },
  { label: 'Users',     path: ROUTES.USERS,     icon: 'Users' },
  { label: 'Settings',  path: ROUTES.SETTINGS,  icon: 'Settings' },
]

export default function Sidebar({ collapsed, onToggle, onHide }) {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <aside
      className={`h-full bg-app-card border-r border-border-default flex flex-col shrink-0 transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-[260px]'
      }`}
    >
      {/* Logo + Toggle + Hide */}
      <div className="px-3 py-4 border-b border-border-default flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-lg font-bold text-text-primary tracking-tight pl-2">
            <span className="text-accent-primary">A</span>ppName
          </h1>
        )}
        <div className={`flex items-center gap-1 ${collapsed ? 'mx-auto flex-col' : ''}`}>
          <button
            onClick={onToggle}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-app-elevated rounded-lg transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {collapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              )}
            </svg>
          </button>
          <button
            onClick={onHide}
            className="p-2 text-text-muted hover:text-accent-red hover:bg-app-elevated rounded-lg transition-colors"
            title="Hide sidebar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon]
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path)

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={`flex items-center mx-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                collapsed ? 'justify-center' : 'gap-3'
              } ${
                isActive
                  ? 'bg-accent-primary/10 text-accent-primary border-l-2 border-accent-primary'
                  : 'text-text-secondary hover:bg-app-elevated hover:text-text-primary'
              }`}
            >
              {Icon && <Icon />}
              {!collapsed && <span className="flex-1">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="px-3 py-2 border-t border-border-default">
        <button
          onClick={toggleTheme}
          className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors text-text-secondary hover:bg-app-elevated hover:text-text-primary ${
            collapsed ? 'justify-center' : 'gap-3'
          }`}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
          {!collapsed && (
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          )}
        </button>
      </div>

      {/* User Info */}
      <div className="px-3 py-3 border-t border-border-default">
        {collapsed ? (
          <button
            onClick={logout}
            className="w-full flex items-center justify-center p-2 text-text-muted hover:text-accent-red transition-colors rounded-lg hover:bg-app-elevated"
            title="Logout"
          >
            <ICONS.LogOut />
          </button>
        ) : (
          <div className="flex items-center justify-between px-1">
            <div className="min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {user?.full_name || user?.username || 'User'}
              </p>
              <p className="text-xs text-accent-primary uppercase tracking-wide">
                {user?.role_name || 'Role'}
              </p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-text-muted hover:text-accent-red transition-colors rounded-lg hover:bg-app-elevated"
              title="Logout"
            >
              <ICONS.LogOut />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
