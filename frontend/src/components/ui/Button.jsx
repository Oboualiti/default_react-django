import React from "react";

const variantStyles = {
  primary:
    "bg-accent-primary hover:bg-blue-500 text-white shadow-sm shadow-accent-primary/20",
  secondary:
    "bg-app-elevated hover:bg-border-hover text-text-primary border border-border-default",
  danger:
    "bg-accent-red hover:bg-red-500 text-white shadow-sm shadow-accent-red/20",
  ghost:
    "bg-transparent hover:bg-app-elevated text-text-secondary hover:text-text-primary",
  success:
    "bg-accent-green hover:bg-green-500 text-white shadow-sm shadow-accent-green/20",
};

const sizeStyles = {
  small: "px-3 py-1.5 text-xs gap-1.5",
  medium: "px-4 py-2 text-sm gap-2",
  large: "px-6 py-2.5 text-base gap-2.5",
};

const iconOnlySizeStyles = {
  small: "p-1.5",
  medium: "p-2",
  large: "p-2.5",
};

/**
 * Button component with multiple variants and sizes.
 *
 * @param {object} props
 * @param {"primary"|"secondary"|"danger"|"ghost"|"success"} props.variant - Visual style variant.
 * @param {"small"|"medium"|"large"} props.size - Button size.
 * @param {boolean} props.disabled - Disables the button.
 * @param {React.ReactNode} props.iconLeft - Icon rendered before children.
 * @param {React.ReactNode} props.iconRight - Icon rendered after children.
 * @param {boolean} props.iconOnly - Render as an icon-only button (no text padding).
 * @param {boolean} props.loading - Shows a spinner and disables the button.
 * @param {string} props.className - Additional CSS classes.
 * @param {React.ReactNode} props.children
 */
export default function Button({
  variant = "primary",
  size = "medium",
  disabled = false,
  iconLeft,
  iconRight,
  iconOnly = false,
  loading = false,
  className = "",
  children,
  ...rest
}) {
  const isDisabled = disabled || loading;

  const classes = [
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 cursor-pointer select-none",
    "focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:ring-offset-1 focus:ring-offset-app-bg",
    variantStyles[variant] ?? variantStyles.primary,
    iconOnly
      ? iconOnlySizeStyles[size] ?? iconOnlySizeStyles.medium
      : sizeStyles[size] ?? sizeStyles.medium,
    isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={isDisabled} {...rest}>
      {loading && (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {!loading && iconLeft && <span className="shrink-0">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}
