import React from "react";

const colorMap = {
  connected: {
    filled: "bg-status-connected/20 text-status-connected",
    outline: "border border-status-connected/40 text-status-connected bg-transparent",
  },
  captcha: {
    filled: "bg-status-captcha/20 text-status-captcha",
    outline: "border border-status-captcha/40 text-status-captcha bg-transparent",
  },
  blocked: {
    filled: "bg-status-blocked/20 text-status-blocked",
    outline: "border border-status-blocked/40 text-status-blocked bg-transparent",
  },
  suspended: {
    filled: "bg-status-suspended/20 text-status-suspended",
    outline: "border border-status-suspended/40 text-status-suspended bg-transparent",
  },
  warming: {
    filled: "bg-status-warming/20 text-status-warming",
    outline: "border border-status-warming/40 text-status-warming bg-transparent",
  },
  blue: {
    filled: "bg-accent-primary/20 text-accent-primary",
    outline: "border border-accent-primary/40 text-accent-primary bg-transparent",
  },
  green: {
    filled: "bg-accent-green/20 text-accent-green",
    outline: "border border-accent-green/40 text-accent-green bg-transparent",
  },
  red: {
    filled: "bg-accent-red/20 text-accent-red",
    outline: "border border-accent-red/40 text-accent-red bg-transparent",
  },
  yellow: {
    filled: "bg-accent-yellow/20 text-accent-yellow",
    outline: "border border-accent-yellow/40 text-accent-yellow bg-transparent",
  },
  purple: {
    filled: "bg-accent-purple/20 text-accent-purple",
    outline: "border border-accent-purple/40 text-accent-purple bg-transparent",
  },
  gray: {
    filled: "bg-app-elevated text-text-secondary",
    outline: "border border-border-default text-text-secondary bg-transparent",
  },
};

/**
 * Check if a string is a hex color (e.g. "#10b981" or "#fff").
 */
function isHexColor(str) {
  return typeof str === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(str);
}

/**
 * Convert a hex color to an rgba string with the given alpha.
 */
function hexToRgba(hex, alpha) {
  let r, g, b;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return `rgba(${r},${g},${b},${alpha})`;
}

/**
 * Badge component for status / category display.
 *
 * @param {object} props
 * @param {string} props.label - Text displayed inside the badge.
 * @param {string} props.color - Color key from the color map, OR a hex color string (e.g. "#10b981").
 * @param {"filled"|"outline"} props.variant - Visual style.
 * @param {boolean} props.dot - Show a leading colored dot.
 * @param {string} props.className - Additional CSS classes.
 */
export default function Badge({
  label,
  color = "gray",
  variant = "filled",
  dot = false,
  className = "",
}) {
  // Check if color is a hex string for dynamic/inline styling
  const isHex = isHexColor(color);

  if (isHex) {
    // Use inline styles for dynamic hex colors
    const inlineStyle =
      variant === "outline"
        ? {
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: hexToRgba(color, 0.4),
            color: color,
            backgroundColor: "transparent",
          }
        : {
            backgroundColor: hexToRgba(color, 0.15),
            color: color,
          };

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${className}`}
        style={inlineStyle}
      >
        {dot && (
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
        {label}
      </span>
    );
  }

  // Static color map path
  const palette = colorMap[color] ?? colorMap.gray;
  const style = palette[variant] ?? palette.filled;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${style} ${className}`}
    >
      {dot && (
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            color === "connected"
              ? "bg-status-connected"
              : color === "captcha"
              ? "bg-status-captcha"
              : color === "blocked"
              ? "bg-status-blocked"
              : color === "suspended"
              ? "bg-status-suspended"
              : color === "warming"
              ? "bg-status-warming"
              : color === "blue"
              ? "bg-accent-primary"
              : color === "green"
              ? "bg-accent-green"
              : color === "red"
              ? "bg-accent-red"
              : color === "yellow"
              ? "bg-accent-yellow"
              : color === "purple"
              ? "bg-accent-purple"
              : "bg-text-muted"
          }`}
        />
      )}
      {label}
    </span>
  );
}
