import { useContext } from 'react'
import { LookupContext } from '../context/LookupContext'

export function useLookup() {
  const context = useContext(LookupContext)
  if (!context) {
    throw new Error('useLookup must be used within a LookupProvider')
  }
  return context
}
