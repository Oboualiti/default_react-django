import { createContext, useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'
import api from '../api/client'

export const LookupContext = createContext(null)

/**
 * LookupProvider - Generic lookup data provider.
 * Loads cached lookup data once after login.
 * Extend with your own endpoints as needed.
 */
export function LookupProvider({ children }) {
  const { isAuthenticated } = useAuth()

  const [lookups, setLookups] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchLookups = useCallback(async () => {
    setLoading(true)
    try {
      // Example: fetch lookup data from your API
      // const res = await api.get('/lookups/')
      // setLookups(res.data || {})
      setLookups({})
    } catch {
      setLookups({})
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchLookups()
    } else {
      setLookups({})
    }
  }, [isAuthenticated, fetchLookups])

  const value = {
    lookups,
    loading,
    refreshLookups: fetchLookups,
  }

  return (
    <LookupContext.Provider value={value}>
      {children}
    </LookupContext.Provider>
  )
}
