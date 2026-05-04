import { createContext, useMemo, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'

export const PermissionContext = createContext(null)

export function PermissionProvider({ children }) {
  const { user } = useAuth()

  const permissions = useMemo(() => {
    if (!user?.effective_permissions) return new Set()
    return new Set(user.effective_permissions)
  }, [user?.effective_permissions])

  const hasPermission = useCallback((key) => {
    if (!user) return false
    if (user.role_code === 'developer_admin') return true
    return permissions.has(key)
  }, [user, permissions])

  const hasAnyPermission = useCallback((keys) => {
    return keys.some((key) => hasPermission(key))
  }, [hasPermission])

  const hasAllPermissions = useCallback((keys) => {
    return keys.every((key) => hasPermission(key))
  }, [hasPermission])

  const value = {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  }

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  )
}
