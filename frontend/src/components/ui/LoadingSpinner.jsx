import React from "react";

const sizeMap = {
  small: "h-5 w-5",
  medium: "h-8 w-8",
  large: "h-12 w-12",
};

/**
 * Centered loading spinner with optional descriptive text.
 *
 * @param {object} props
 * @param {string} props.text - Optional text below the spinner.
 * @param {"small"|"medium"|"large"} props.size - Spinner size.
 * @param {string} props.className - Additional classes.
 */
export default function LoadingSpinner({
  text,
  size = "medium",
  className = "",
}) {
  const sizeClass = sizeMap[size] ?? sizeMap.medium;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-12 ${className}`}
    >
      <svg
        className={`animate-spin text-accent-primary ${sizeClass}`}
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
      {text && (
        <p className="text-sm text-text-muted animate-pulse">{text}</p>
      )}
    </div>
  );
}
