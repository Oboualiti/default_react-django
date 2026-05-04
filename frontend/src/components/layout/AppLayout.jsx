import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [hidden, setHidden] = useState(false)

  return (
    <div className="flex h-screen bg-app-bg overflow-hidden">
      {/* Sidebar with slide transition */}
      <div
        className="shrink-0 transition-all duration-300 overflow-hidden"
        style={{ width: hidden ? 0 : collapsed ? 68 : 260 }}
      >
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          onHide={() => setHidden(true)}
        />
      </div>

      {/* Show sidebar button — visible only when sidebar is hidden */}
      {hidden && (
        <button
          onClick={() => setHidden(false)}
          className="absolute top-3 left-3 z-50 p-2 bg-app-card border border-border-default rounded-lg
                     text-text-muted hover:text-text-primary hover:border-border-hover
                     shadow-lg transition-colors"
          title="Show sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar collapsed={collapsed} onToggleSidebar={() => setCollapsed((c) => !c)} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
