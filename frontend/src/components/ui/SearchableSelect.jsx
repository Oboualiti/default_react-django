import { useState, useRef, useEffect, useMemo } from 'react'

/**
 * SearchableSelect - Dropdown with search filtering and loading state.
 *
 * @param {object} props
 * @param {Array<{value:string|number, label:string}>} props.options
 * @param {string|number} props.value - Currently selected value.
 * @param {function} props.onChange - Called with the selected value string.
 * @param {string} props.placeholder - Placeholder when nothing is selected.
 * @param {boolean} props.loading - Shows spinner when true.
 * @param {boolean} props.disabled
 * @param {boolean} props.error - Adds error border styling.
 * @param {string} props.size - 'sm' | 'md' (default 'md').
 * @param {string} props.className - Additional wrapper classes.
 */
export default function SearchableSelect({
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  loading = false,
  disabled = false,
  error = false,
  size = 'md',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef(null)
  const searchRef = useRef(null)

  const selected = useMemo(
    () => options.find(o => String(o.value) === String(value)),
    [options, value],
  )

  const filtered = useMemo(() => {
    if (!search.trim()) return options
    const q = search.toLowerCase()
    return options.filter(o => o.label.toLowerCase().includes(q))
  }, [options, search])

  // Close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isOpen])

  const handleSelect = (val) => {
    onChange?.(val)
    setIsOpen(false)
    setSearch('')
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange?.('')
    setSearch('')
  }

  const isSm = size === 'sm'
  const py = isSm ? 'py-1.5' : 'py-2.5'
  const textSize = isSm ? 'text-xs' : 'text-sm'

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled || loading}
        onClick={() => { if (!disabled && !loading) setIsOpen(!isOpen) }}
        className={[
          'w-full flex items-center rounded-lg bg-app-bg border',
          textSize, 'px-3', py, 'text-left transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-accent-primary/50',
          error ? 'border-accent-red focus:ring-accent-red/50' : 'border-border-default hover:border-border-hover',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        {loading ? (
          <span className="flex items-center gap-2 text-text-muted flex-1">
            <svg className="animate-spin h-4 w-4 text-accent-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </span>
        ) : selected ? (
          <span className="text-text-primary flex-1 truncate">{selected.label}</span>
        ) : (
          <span className="text-text-muted flex-1">{placeholder}</span>
        )}

        <span className="flex items-center gap-1 ml-2 shrink-0">
          {/* Clear button */}
          {value && !loading && !disabled && (
            <span
              onClick={handleClear}
              className="p-0.5 rounded hover:bg-app-elevated text-text-muted hover:text-text-primary transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          )}
          {/* Chevron */}
          <svg
            className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-app-card border border-border-default rounded-lg shadow-xl overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-border-default">
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-md bg-app-bg border border-border-default text-text-primary text-xs pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent-primary/50 placeholder:text-text-muted"
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-[260px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-text-muted">
                {search ? 'No results found' : 'No options available'}
              </div>
            ) : (
              filtered.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(String(opt.value))}
                  className={[
                    'w-full text-left px-3 py-2 text-xs transition-colors',
                    String(opt.value) === String(value)
                      ? 'bg-accent-primary/10 text-accent-primary font-medium'
                      : 'text-text-primary hover:bg-app-elevated',
                  ].join(' ')}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
