import React, { useRef, useState, useCallback } from "react";

/**
 * File upload with drag-and-drop zone.
 *
 * @param {object} props
 * @param {function} props.onFileSelect - Callback receiving the selected File object.
 * @param {string} props.accept - Accepted file types string (e.g. ".csv,.xlsx,.txt").
 * @param {string} props.label - Label text above the drop zone.
 * @param {string} props.description - Helper text inside the drop zone.
 * @param {boolean} props.disabled - Disables the upload.
 * @param {number} props.maxSizeMB - Maximum file size in megabytes.
 * @param {string} props.className - Additional classes.
 */
export default function FileUpload({
  onFileSelect,
  accept = "",
  label,
  description = "Drag & drop a file here, or click to browse",
  disabled = false,
  maxSizeMB,
  className = "",
}) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const validateAndSelect = useCallback(
    (file) => {
      if (!file) return;
      setError(null);

      if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
        setError(`File exceeds the ${maxSizeMB} MB size limit.`);
        return;
      }

      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [maxSizeMB, onFileSelect]
  );

  const handleDrag = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;

      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    },
    [disabled]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (disabled) return;

      const file = e.dataTransfer?.files?.[0];
      validateAndSelect(file);
    },
    [disabled, validateAndSelect]
  );

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    validateAndSelect(file);
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-text-secondary">{label}</span>
      )}

      <div
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={[
          "relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors duration-150",
          dragActive
            ? "border-accent-primary bg-accent-primary/5"
            : "border-border-default hover:border-border-hover bg-app-bg",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />

        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-8 w-8 ${
            dragActive ? "text-accent-primary" : "text-text-muted"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>

        {selectedFile ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-primary font-medium">
              {selectedFile.name}
            </span>
            <span className="text-xs text-text-muted">
              ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
            <button
              onClick={handleClear}
              className="p-0.5 rounded text-text-muted hover:text-accent-red transition-colors"
              aria-label="Remove file"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <p className="text-sm text-text-muted text-center">{description}</p>
        )}

        {accept && !selectedFile && (
          <p className="text-xs text-text-muted">
            Accepted: {accept}
          </p>
        )}
      </div>

      {error && <p className="text-xs text-accent-red">{error}</p>}
    </div>
  );
}
