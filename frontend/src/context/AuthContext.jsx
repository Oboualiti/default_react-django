import { createContext, useState, useEffect, useCallback } from 'react'
import { authAPI } from '../api/auth.api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token')
      if (!token) {
        setLoading(false)
        return
      }
      const { data } = await authAPI.getMe()
      setUser(data)
    } catch {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const login = async (credentials) => {
    setError(null)
    try {
      const { data } = await authAPI.login(credentials)
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      await fetchUser()
      return data
    } catch (err) {
      const message = err.response?.data?.detail || err.response?.data?.error || 'Login failed'
      setError(message)
      throw err
    }
  }

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        await authAPI.logout(refreshToken)
      }
    } catch {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    fetchUser,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
