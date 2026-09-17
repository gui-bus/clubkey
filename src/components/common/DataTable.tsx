"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"

export type TableColumnAlign = "left" | "center" | "right"

export interface TableColumn<T> {
  key: string
  header: React.ReactNode
  align?: TableColumnAlign
  width?: string
  className?: string
  headerClassName?: string
  render?: (item: T, index: number) => React.ReactNode
  accessor?: keyof T | ((item: T) => React.ReactNode)
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  keyExtractor?: (item: T, index: number) => string | number
  getRowClassName?: (item: T, index: number) => string | undefined | false
  onRowClick?: (item: T, index: number) => void
  emptyMessage?: React.ReactNode
  className?: string
  tableClassName?: string
  headerRowClassName?: string
  bodyRowClassName?: string
  containerClassName?: string
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  getRowClassName,
  onRowClick,
  emptyMessage = "Nenhum registro encontrado.",
  className,
  tableClassName,
  headerRowClassName,
  bodyRowClassName,
  containerClassName,
}: DataTableProps<T>): React.JSX.Element {
  const getAlignClass = (align?: TableColumnAlign): string => {
    switch (align) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      case "left":
      default:
        return "text-left"
    }
  }

  return (
    <div
      className={cn(
        "rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs",
        containerClassName,
        className
      )}
    >
      <div className="overflow-x-auto scrollbar-none">
        <table className={cn("w-full text-left border-collapse text-xs", tableClassName)}>
          <thead>
            <tr
              className={cn(
                "border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]",
                headerRowClassName
              )}
            >
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={column.width ? { width: column.width } : undefined}
                  className={cn(
                    "py-3.5 px-4 font-bold select-none",
                    getAlignClass(column.align),
                    column.headerClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 px-4 text-center text-zinc-500 dark:text-zinc-400 text-xs font-medium"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => {
                const rowKey = keyExtractor
                  ? keyExtractor(item, rowIndex)
                  : (item as Record<string, unknown>).id !== undefined
                  ? String((item as Record<string, unknown>).id)
                  : rowIndex

                const customRowClass = getRowClassName
                  ? getRowClassName(item, rowIndex)
                  : undefined

                const isClickable = !!onRowClick

                return (
                  <tr
                    key={rowKey}
                    onClick={isClickable ? () => onRowClick(item, rowIndex) : undefined}
                    className={cn(
                      "transition-colors",
                      isClickable && "cursor-pointer",
                      customRowClass || "hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30",
                      bodyRowClassName
                    )}
                  >
                    {columns.map((column) => {
                      let cellContent: React.ReactNode = null

                      if (column.render) {
                        cellContent = column.render(item, rowIndex)
                      } else if (typeof column.accessor === "function") {
                        cellContent = column.accessor(item)
                      } else if (column.accessor) {
                        cellContent = String(item[column.accessor] ?? "")
                      } else {
                        const fallbackVal = (item as Record<string, unknown>)[column.key]
                        cellContent = fallbackVal !== undefined ? String(fallbackVal) : null
                      }

                      return (
                        <td
                          key={column.key}
                          style={column.width ? { width: column.width } : undefined}
                          className={cn(
                            "py-4 px-4 align-middle",
                            getAlignClass(column.align),
                            column.className
                          )}
                        >
                          {cellContent}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
