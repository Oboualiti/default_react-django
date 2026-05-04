import React from "react";

/**
 * Pagination component with page numbers, previous/next buttons, and rows-per-page selector.
 *
 * @param {object} props
 * @param {number} props.currentPage - Current active page (1-based).
 * @param {number} props.totalItems - Total number of items.
 * @param {number} props.rowsPerPage - Number of rows displayed per page.
 * @param {function} props.onPageChange - Callback with new page number.
 * @param {function} props.onRowsPerPageChange - Callback with new rows-per-page value.
 * @param {number[]} props.rowsPerPageOptions - Available page size options.
 * @param {string} props.className - Additional classes.
 */
export default function Pagination({
  currentPage = 1,
  totalItems = 0,
  rowsPerPage = 25,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [25, 50, 100, 200],
  className = "",
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  // Build page numbers with ellipses
  const getPages = () => {
    const pages = [];
    const delta = 1; // pages shown around current

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (rangeStart > 2) pages.push("...");

    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);

    if (rangeEnd < totalPages - 1) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  const pages = getPages();

  const btnBase =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-150 h-8 min-w-[2rem] px-2";
  const btnActive = "bg-accent-primary text-white";
  const btnInactive =
    "text-text-secondary hover:text-text-primary hover:bg-app-elevated";
  const btnDisabled = "opacity-40 cursor-not-allowed pointer-events-none";

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-sm ${className}`}
    >
      {/* Rows per page + summary */}
      <div className="flex items-center gap-4 text-text-secondary">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
            className="appearance-none rounded-md bg-app-bg border border-border-default text-text-primary text-sm px-2 py-1 pr-7 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
          >
            {rowsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <span className="whitespace-nowrap text-text-muted">
          Showing {startItem}-{endItem} of {totalItems}
        </span>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`${btnBase} ${
            currentPage <= 1 ? btnDisabled : btnInactive
          }`}
          aria-label="Previous page"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline ml-1">Previous</span>
        </button>

        {/* Page numbers */}
        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-1 text-text-muted select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`${btnBase} ${
                page === currentPage ? btnActive : btnInactive
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`${btnBase} ${
            currentPage >= totalPages ? btnDisabled : btnInactive
          }`}
          aria-label="Next page"
        >
          <span className="hidden sm:inline mr-1">Next</span>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
