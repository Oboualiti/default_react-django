import React, { forwardRef } from "react";

/**
 * Select dropdown with dark theme styling.
 *
 * @param {object} props
 * @param {string} props.label - Label text above the select.
 * @param {Array<{value:string, label:string}>} props.options - Selectable options.
 * @param {string} props.value - Currently selected value.
 * @param {function} props.onChange - Change handler.
 * @param {string} props.placeholder - Placeholder option text.
 * @param {boolean} props.disabled - Disables the select.
 * @param {string} props.error - Error message.
 * @param {string} props.id - HTML id attribute.
 * @param {string} props.className - Additional classes on the wrapper.
 */
const Dropdown = forwardRef(function Dropdown(
  {
    label,
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    disabled = false,
    error,
    id,
    className = "",
    ...rest
  },
  ref
) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={[
            "w-full appearance-none rounded-lg bg-app-bg border text-sm text-text-primary",
            "pl-3 pr-10 py-2 transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary",
            error
              ? "border-accent-red focus:ring-accent-red/50 focus:border-accent-red"
              : "border-border-default hover:border-border-hover",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
      {error && <p className="text-xs text-accent-red">{error}</p>}
    </div>
  );
});

export default Dropdown;
