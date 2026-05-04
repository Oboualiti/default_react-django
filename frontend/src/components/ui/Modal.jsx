import React, { useEffect, useRef } from "react";

const maxWidthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-[95vw]",
};

/**
 * Modal dialog with dark backdrop overlay.
 *
 * @param {object} props
 * @param {boolean} props.open - Controls visibility.
 * @param {function} props.onClose - Called when the modal requests to close.
 * @param {string} props.title - Header text.
 * @param {"sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"4xl"} props.maxWidth - Maximum width.
 * @param {React.ReactNode} props.children - Body content.
 * @param {React.ReactNode} props.footer - Footer content (action buttons).
 * @param {boolean} props.closeOnBackdrop - Close when clicking backdrop (default true).
 * @param {string} props.className - Additional classes on the panel.
 */
export default function Modal({
  open = false,
  onClose,
  title,
  maxWidth = "lg",
  children,
  footer,
  closeOnBackdrop = true,
  className = "",
}) {
  const panelRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const widthClass = maxWidthMap[maxWidth] ?? maxWidthMap.lg;
  const isFull = maxWidth === "full";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => closeOnBackdrop && onClose?.()}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full ${widthClass} mx-4 rounded-xl bg-app-card border border-border-default shadow-2xl shadow-black/40 animate-in fade-in zoom-in-95 duration-200 ${isFull ? 'h-[95vh] flex flex-col' : ''} ${className}`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-default shrink-0">
            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-app-elevated transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className={`px-6 py-4 text-text-secondary text-sm leading-relaxed overflow-y-auto ${isFull ? 'flex-1 min-h-0' : 'max-h-[70vh]'}`}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-default shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
