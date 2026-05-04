import React, { forwardRef } from "react";

/**
 * Text input with label, error, and disabled state.
 *
 * @param {object} props
 * @param {string} props.label - Label text above the input.
 * @param {string} props.placeholder - Placeholder text.
 * @param {string} props.value - Controlled value.
 * @param {function} props.onChange - Change handler.
 * @param {string} props.error - Error message displayed below the input.
 * @param {boolean} props.disabled - Disables the input.
 * @param {string} props.type - Input type (default "text").
 * @param {string} props.id - HTML id attribute.
 * @param {React.ReactNode} props.iconLeft - Icon rendered inside the input on the left.
 * @param {React.ReactNode} props.iconRight - Icon rendered inside the input on the right.
 * @param {string} props.className - Additional classes on the wrapper.
 */
const Input = forwardRef(function Input(
  {
    label,
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    type = "text",
    id,
    iconLeft,
    iconRight,
    className = "",
    ...rest
  },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            {iconLeft}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={[
            "w-full rounded-lg bg-app-bg border text-sm text-text-primary placeholder:text-text-muted",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary",
            error
              ? "border-accent-red focus:ring-accent-red/50 focus:border-accent-red"
              : "border-border-default hover:border-border-hover",
            disabled ? "opacity-50 cursor-not-allowed" : "",
            iconLeft ? "pl-10" : "pl-3",
            iconRight ? "pr-10" : "pr-3",
            "py-2",
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            {iconRight}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-accent-red">{error}</p>}
    </div>
  );
});

export default Input;
