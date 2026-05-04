import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

/**
 * DataTable wrapping TanStack Table with sorting, pagination, and dark theme.
 *
 * @param {object} props
 * @param {import("@tanstack/react-table").ColumnDef[]} props.columns - TanStack column definitions.
 * @param {Array<object>} props.data - Row data array.
 * @param {boolean} props.loading - Show loading spinner instead of rows.
 * @param {string} props.emptyTitle - Title shown when data is empty.
 * @param {string} props.emptyMessage - Message shown when data is empty.
 * @param {boolean} props.showPagination - Show the pagination footer (default true).
 * @param {number} props.defaultPageSize - Initial rows per page.
 * @param {number[]} props.pageSizeOptions - Available page size options.
 * @param {function} props.onRowClick - Callback when a row is clicked, receives the row object.
 * @param {string} props.className - Additional classes on the wrapper.
 *
 * Server-side pagination props (when provided, disables client-side pagination):
 * @param {number} props.pageCount - Total number of pages (server-side).
 * @param {number} props.currentPage - Current page (1-based, server-side).
 * @param {number} props.totalItems - Total item count (server-side).
 * @param {function} props.onPageChange - Callback with new page number (server-side).
 * @param {function} props.onPageSizeChange - Callback with new page size (server-side).
 */
export default function DataTable({
  columns,
  data = [],
  loading = false,
  emptyTitle = "No data",
  emptyMessage = "There are no items to display.",
  showPagination = true,
  defaultPageSize = 25,
  pageSizeOptions = [25, 50, 100, 200],
  onRowClick,
  className = "",
  // Server-side pagination
  pageCount: serverPageCount,
  currentPage: serverCurrentPage,
  totalItems: serverTotalItems,
  onPageChange: serverOnPageChange,
  onPageSizeChange: serverOnPageSizeChange,
}) {
  const isServerSide = serverOnPageChange !== undefined;

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      ...(isServerSide
        ? {}
        : { pagination }),
    },
    onSortingChange: setSorting,
    ...(isServerSide
      ? { manualPagination: true, pageCount: serverPageCount ?? -1 }
      : { onPaginationChange: setPagination }),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(!isServerSide ? { getPaginationRowModel: getPaginationRowModel() } : {}),
  });

  // Derived pagination values
  const paginationCurrentPage = isServerSide
    ? serverCurrentPage
    : pagination.pageIndex + 1;
  const paginationRowsPerPage = isServerSide
    ? (defaultPageSize)
    : pagination.pageSize;
  const paginationTotalItems = isServerSide
    ? (serverTotalItems ?? data.length)
    : data.length;

  const handlePageChange = (page) => {
    if (isServerSide) {
      serverOnPageChange?.(page);
    } else {
      setPagination((prev) => ({ ...prev, pageIndex: page - 1 }));
    }
  };

  const handleRowsPerPageChange = (size) => {
    if (isServerSide) {
      serverOnPageSizeChange?.(size);
    } else {
      setPagination({ pageIndex: 0, pageSize: size });
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border-default">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-app-elevated">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className={[
                        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted",
                        "border-b border-border-default",
                        canSort
                          ? "cursor-pointer select-none hover:text-text-primary transition-colors"
                          : "",
                      ].join(" ")}
                      style={{
                        width:
                          header.getSize() !== 150
                            ? header.getSize()
                            : undefined,
                      }}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-1.5">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {canSort && (
                          <span className="inline-flex flex-col text-[10px] leading-none">
                            <span
                              className={
                                sorted === "asc"
                                  ? "text-accent-primary"
                                  : "text-text-muted/40"
                              }
                            >
                              ▲
                            </span>
                            <span
                              className={
                                sorted === "desc"
                                  ? "text-accent-primary"
                                  : "text-text-muted/40"
                              }
                            >
                              ▼
                            </span>
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-border-default">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="bg-app-card"
                >
                  <LoadingSpinner text="Loading data..." />
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="bg-app-card"
                >
                  <EmptyState title={emptyTitle} message={emptyMessage} />
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={[
                    "bg-app-card transition-colors duration-100",
                    "hover:bg-app-elevated/60",
                    onRowClick ? "cursor-pointer" : "",
                  ].join(" ")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-text-primary whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && !loading && data.length > 0 && (
        <div className="mt-4">
          <Pagination
            currentPage={paginationCurrentPage}
            totalItems={paginationTotalItems}
            rowsPerPage={paginationRowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={pageSizeOptions}
          />
        </div>
      )}
    </div>
  );
}
