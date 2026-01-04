import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================================
// TYPES
// ============================================================================

export interface FetchResult<T> {
  data: T[];
  hasMore: boolean;
  total?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type FetchFunction<T> = (
  page: number,
  pageSize: number,
  signal: AbortSignal
) => Promise<FetchResult<T>>;

export interface UseInfiniteScrollOptions<T> {
  fetchFn: FetchFunction<T>;
  pageSize?: number;
  initialPage?: number;
  enabled?: boolean;
}

export interface UseInfiniteScrollReturn<T> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  error: string | null;
  loadMore: () => void;
  reset: () => void;
  reload: () => void;
  page: number;
  total: number | undefined;
}

// ============================================================================
// CUSTOM HOOK: useInfiniteScroll
// ============================================================================

export const useInfiniteScroll = <T,>({
  fetchFn,
  pageSize = 20,
  initialPage = 1,
  enabled = true,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> => {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async (pageNum: number, isInitial = false) => {
      if (!enabled || (!isInitial && !hasMore)) return;

      // Cancel previous request if it's still running
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      try {
        if (isInitial) {
          setIsLoading(true);
        } else {
          setIsFetchingMore(true);
        }
        setError(null);

        const result = await fetchFn(
          pageNum,
          pageSize,
          abortControllerRef.current.signal
        );

        setItems((prev) =>
          isInitial ? result.data : [...prev, ...result.data]
        );
        setHasMore(result.hasMore);
        setTotal(result.total);
        setPage(pageNum);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("InfiniteScroll Error:", err);
          setError(err.message || "Failed to fetch data");
        }
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    },
    [fetchFn, pageSize, enabled, hasMore]
  );

  const loadMore = useCallback(() => {
    if (!isLoading && !isFetchingMore && hasMore && !error) {
      fetchData(page + 1, false);
    }
  }, [page, isLoading, isFetchingMore, hasMore, error, fetchData]);

  const reset = useCallback(() => {
    setItems([]);
    setPage(initialPage);
    setHasMore(true);
    setError(null);
    setTotal(undefined);
    fetchData(initialPage, true);
  }, [fetchData, initialPage]);

  const reload = useCallback(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (enabled) {
      fetchData(initialPage, true);
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [enabled, initialPage]);

  return {
    items,
    setItems,
    isLoading,
    isFetchingMore,
    hasMore,
    error,
    loadMore,
    reset,
    reload,
    page,
    total,
  };
};
