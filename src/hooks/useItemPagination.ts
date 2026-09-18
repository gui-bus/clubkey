import * as React from "react"

export interface ItemWithId {
  id: string | number
}

export interface UseItemPaginationReturn<T> {
  currentIndex: number
  prevItem: T
  nextItem: T
  totalItems: number
}

export function useItemPagination<T extends ItemWithId>(
  items: T[],
  currentId: string | number
): UseItemPaginationReturn<T> {
  return React.useMemo(() => {
    if (!items || items.length === 0) {
      const fallback = {} as T
      return {
        currentIndex: -1,
        prevItem: fallback,
        nextItem: fallback,
        totalItems: 0,
      }
    }

    const currentIndex = items.findIndex((item) => item.id === currentId)
    const safeIndex = currentIndex >= 0 ? currentIndex : 0

    const prevItem =
      safeIndex > 0 ? items[safeIndex - 1] : items[items.length - 1]
    const nextItem =
      safeIndex < items.length - 1 ? items[safeIndex + 1] : items[0]

    return {
      currentIndex: safeIndex,
      prevItem,
      nextItem,
      totalItems: items.length,
    }
  }, [items, currentId])
}
