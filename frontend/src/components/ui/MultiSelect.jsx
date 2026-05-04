import React, { useState, useRef, useEffect, useMemo } from "react";

/**
 * Multi-select dropdown with checkboxes, search filtering, select all, and clear.
 *
 * @param {object} props
 * @param {string} props.label - Label text above the component.
 * @param {Array<{value:string, label:string}>} props.options - Available options.
 * @param {string[]} props.value - Array of currently selected values.
 * @param {function} props.onChange - Callback with updated array of selected values.
 * @param {string} props.placeholder - Placeholder when nothing is selected.
 * @param {boolean} props.disabled - Disables the component.
 * @param {boolean} props.searchable - Enable the search filter input (default true).
 * @param {string} props.className - Additional classes on the wrapper.
 */
export default function MultiSelect({
  label,
  options = [],
  value = [],
  onChange,
  placeholder = "Select...",
  disabled = false,
  searchable = true,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return options;
    const lower = search.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(lower));
  }, [options, search]);

  const selectedSet = useMemo(() => new Set(value), [value]);

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((opt) => selectedSet.has(opt.value));

  const toggleOption = (optValue) => {
    const next = selectedSet.has(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    onChange?.(next);
  };

  const selectAll = () => {
    const all = new Set([...value, ...filtered.map((o) => o.value)]);
    onChange?.([...all]);
  };

  const deselectAll = () => {
    const filteredValues = new Set(filtered.map((o) => o.value));
    onChange?.(value.filter((v) => !filteredValues.has(v)));
  };

  const clearAll = () => {
    onChange?.([]);
    setSearch("");
  };

  // Display text
  const displayText =
    value.length === 0
      ? placeholder
      : value.length === 1
      ? options.find((o) => o.value === value[0])?.label ?? value[0]
      : `${value.length} selected`;

  return (
    <div className={`relative flex flex-col gap-1.5 ${className}`} ref={containerRef}>
      {label && (
        <span className="text-sm font-medium text-text-secondary">{label}</span>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
        className={[
          "flex items-center justify-between w-full rounded-lg bg-app-bg border text-sm px-3 py-2 transition-colors duration-150 text-left",
          "focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary",
          open ? "border-accent-primary" : "border-border-default hover:border-border-hover",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        <span
          className={
            value.length === 0 ? "text-text-muted" : "text-text-primary"
          }
        >
          {displayText}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50">
          <div className="mt-1 rounded-lg bg-app-card border border-border-default shadow-xl shadow-black/30 overflow-hidden">
            {/* Search */}
            {searchable && (
              <div className="p-2 border-b border-border-default">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-md bg-app-bg border border-border-default text-sm text-text-primary placeholder:text-text-muted px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent-primary/50"
                  autoFocus
                />
              </div>
            )}

            {/* Select all / Clear */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-border-default">
              <button
                type="button"
                onClick={allFilteredSelected ? deselectAll : selectAll}
                className="text-xs text-accent-primary hover:underline"
              >
                {allFilteredSelected ? "Deselect all" : "Select all"}
              </button>
              {value.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-text-muted hover:text-accent-red"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Options list */}
            <ul className="max-h-80 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <li className="px-3 py-2 text-xs text-text-muted text-center">
                  No options found
                </li>
              ) : (
                filtered.map((opt) => {
                  const checked = selectedSet.has(opt.value);
                  return (
                    <li key={opt.value}>
                      <button
                        type="button"
                        onClick={() => toggleOption(opt.value)}
                        className="flex items-center gap-2.5 w-full px-3 py-1.5 text-sm text-text-primary hover:bg-app-elevated transition-colors text-left"
                      >
                        {/* Checkbox */}
                        <span
                          className={[
                            "inline-flex items-center justify-center h-4 w-4 rounded border shrink-0 transition-colors",
                            checked
                              ? "bg-accent-primary border-accent-primary"
                              : "border-border-hover bg-transparent",
                          ].join(" ")}
                        >
                          {checked && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>
                        <span>{opt.label}</span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
