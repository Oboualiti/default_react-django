import { Navigate } from 'react-router-dom'
import { usePermission } from '../../hooks/usePermission'

export default function PermissionGuard({ permission, children }) {
  const { hasPermission } = usePermission()

  if (!hasPermission(permission)) {
    return <Navigate to="/" replace />
  }

  return children
}
