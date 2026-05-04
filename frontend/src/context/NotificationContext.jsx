import { createContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
import api from '../api/client'

export const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchUnreadCount = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      const { data } = await api.get('/notifications/unread-count/')
      setUnreadCount(data.unread_count || 0)
    } catch {
      // Silently fail
    }
  }, [isAuthenticated])

  useEffect(() => {
    fetchUnreadCount()
    if (!isAuthenticated) return

    const interval = setInterval(fetchUnreadCount, 30000) // Poll every 30s
    return () => clearInterval(interval)
  }, [isAuthenticated, fetchUnreadCount])

  const value = {
    unreadCount,
    fetchUnreadCount,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
