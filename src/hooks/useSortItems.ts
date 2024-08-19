import { useCallback, useEffect, useState } from "react";

export function useSortItems<T>(items: T[], defaultSort?: keyof T) {
  type ColumnKey = keyof T;

  const [sortedItems, setSortedItems] = useState(items);
  const [sortedBy, setSortedBy] = useState<ColumnKey | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortItems = useCallback(
    (key: ColumnKey) => {
      const sorted = [...sortedItems].sort((a, b) => {
        if (a[key] > b[key]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        if (a[key] < b[key]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        return 0;
      });

      setSortedBy(key);
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      setSortedItems(sorted);
    },
    [sortDirection, sortedItems]
  );

  useEffect(() => {
    if (defaultSort) {
      sortItems(defaultSort);
    }
  }, [defaultSort, sortItems]);

  return {
    items: sortedItems,
    sortedBy,
    sortDirection,
    sortItems,
  };
}
