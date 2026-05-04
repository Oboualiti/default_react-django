import React from "react";

/**
 * Placeholder component shown when there is no data to display.
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon - Custom icon element. Falls back to a default inbox icon.
 * @param {string} props.title - Headline message.
 * @param {string} props.message - Descriptive sub-message.
 * @param {React.ReactNode} props.action - Optional action element (e.g. a Button).
 * @param {string} props.className - Additional classes.
 */
export default function EmptyState({
  icon,
  title = "No data",
  message = "There are no items to display.",
  action,
  className = "",
}) {
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 text-text-muted"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  );

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <div className="mb-4">{icon || defaultIcon}</div>
      <h3 className="text-base font-medium text-text-secondary">{title}</h3>
      <p className="mt-1 text-sm text-text-muted max-w-sm">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
