import { useState, useCallback } from 'react'

export function usePagination(initialPageSize = 25) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage)
  }, [])

  const handlePageSizeChange = useCallback((newSize) => {
    setPageSize(newSize)
    setPage(1)
  }, [])

  const reset = useCallback(() => {
    setPage(1)
  }, [])

  return {
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    reset,
  }
}
