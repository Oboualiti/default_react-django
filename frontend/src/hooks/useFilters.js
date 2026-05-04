import { useState, useCallback } from 'react'

export function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters)

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => {
      if (value === '' || value === null || value === undefined) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: value }
    })
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const getActiveCount = useCallback(() => {
    return Object.values(filters).filter((v) => v !== '' && v !== null && v !== undefined).length
  }, [filters])

  return {
    filters,
    setFilter,
    setFilters,
    clearFilters,
    getActiveCount,
  }
}
