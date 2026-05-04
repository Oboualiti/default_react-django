import React from "react";

const accentColorMap = {
  blue: "border-l-accent-primary",
  green: "border-l-accent-green",
  red: "border-l-accent-red",
  yellow: "border-l-accent-yellow",
  purple: "border-l-accent-purple",
  connected: "border-l-status-connected",
  captcha: "border-l-status-captcha",
  blocked: "border-l-status-blocked",
  suspended: "border-l-status-suspended",
  warming: "border-l-status-warming",
};

/**
 * Summary statistic card with a left-border accent color.
 *
 * @param {object} props
 * @param {string} props.title - Card title / label.
 * @param {string|number} props.value - Large displayed value.
 * @param {string} props.subtitle - Optional subtitle below the value.
 * @param {string} props.percentage - Optional percentage string (e.g. "+12%").
 * @param {"positive"|"negative"|"neutral"} props.trend - Colors the percentage text.
 * @param {string} props.accentColor - Left border color key.
 * @param {React.ReactNode} props.icon - Optional icon displayed top-right.
 * @param {string} props.className - Additional classes.
 */
export default function StatCard({
  title,
  value,
  subtitle,
  percentage,
  trend = "neutral",
  accentColor = "blue",
  icon,
  className = "",
}) {
  const borderClass = accentColorMap[accentColor] ?? accentColorMap.blue;

  const trendColor =
    trend === "positive"
      ? "text-accent-green"
      : trend === "negative"
      ? "text-accent-red"
      : "text-text-muted";

  return (
    <div
      className={`rounded-lg bg-app-card border border-border-default border-l-4 ${borderClass} p-4 ${className}`}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {title}
        </p>
        {icon && <span className="text-text-muted">{icon}</span>}
      </div>

      <p
        className="mt-2 text-2xl font-bold text-text-primary"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {value}
      </p>

      {(subtitle || percentage) && (
        <div className="mt-1 flex items-center gap-2 text-xs">
          {percentage && <span className={trendColor}>{percentage}</span>}
          {subtitle && <span className="text-text-muted">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
