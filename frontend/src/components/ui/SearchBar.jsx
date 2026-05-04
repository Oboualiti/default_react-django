import React from "react";

/**
 * Search input with a magnifying glass icon on the left.
 *
 * @param {object} props
 * @param {string} props.value - Controlled value.
 * @param {function} props.onChange - Change handler receiving the event.
 * @param {string} props.placeholder - Placeholder text.
 * @param {string} props.className - Additional classes on the wrapper.
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  ...rest
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Search icon */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={[
          "w-full rounded-lg bg-app-bg border border-border-default text-sm text-text-primary placeholder:text-text-muted",
          "pl-10 pr-3 py-2 transition-colors duration-150",
          "hover:border-border-hover",
          "focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary",
        ].join(" ")}
        {...rest}
      />
    </div>
  );
}
