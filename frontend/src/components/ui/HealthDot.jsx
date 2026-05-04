import React from "react";

const statusColors = {
  good: "bg-status-connected",
  warning: "bg-status-captcha",
  error: "bg-status-blocked",
};

const pulseColors = {
  good: "bg-status-connected/40",
  warning: "bg-status-captcha/40",
  error: "bg-status-blocked/40",
};

const sizeMap = {
  small: 6,
  medium: 8,
  large: 12,
};

/**
 * Small colored circle indicating health / status.
 *
 * @param {object} props
 * @param {"good"|"warning"|"error"} props.status - Health status.
 * @param {"small"|"medium"|"large"} props.size - Dot diameter.
 * @param {boolean} props.pulse - Show a pulsing ring animation.
 * @param {string} props.className - Additional classes.
 */
export default function HealthDot({
  status = "good",
  size = "medium",
  pulse = false,
  className = "",
}) {
  const px = sizeMap[size] ?? sizeMap.medium;
  const colorClass = statusColors[status] ?? statusColors.good;
  const pulseClass = pulseColors[status] ?? pulseColors.good;

  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: `${px}px`, height: `${px}px` }}
      title={status}
    >
      {pulse && (
        <span
          className={`absolute inline-flex rounded-full ${pulseClass} animate-ping`}
          style={{ width: `${px}px`, height: `${px}px` }}
        />
      )}
      <span
        className={`relative inline-block rounded-full ${colorClass}`}
        style={{ width: `${px}px`, height: `${px}px` }}
      />
    </span>
  );
}
