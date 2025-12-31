import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  type ReactNode,
} from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";
import { useTranslation } from "react-i18next";

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
    fetchData(initialPage, true);
  }, [fetchData, initialPage]);

  // Forces a re-fetch of the current state without resetting items entirely if not needed,
  // simply acts as an alias for reset in this context to keep data fresh.
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
  }, [enabled, initialPage]); // Removed fetchData from deps to avoid double fetch if fetchFn is not stable

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
  };
};

// ============================================================================
// VIRTUALIZED LIST COMPONENT
// ============================================================================

export interface VirtualizedInfiniteListProps<T> {
  items: T[];
  renderItem: (item: T, index: number, virtualRow: any) => ReactNode;
  onEndReached: () => void;
  isFetchingMore: boolean;
  hasMore: boolean;
  estimateSize?: number;
  overscan?: number;
  className?: string;
  style?: React.CSSProperties;
  height?: string | number;
  width?: string | number;
  loadingIndicator?: ReactNode;
  emptyComponent?: ReactNode;
  endMessage?: ReactNode;
  itemKey?: (item: T, index: number) => string | number;
}

export const VirtualizedInfiniteList = memo(
  <T,>({
    items,
    renderItem,
    onEndReached,
    isFetchingMore,
    hasMore,
    estimateSize = 100,
    overscan = 5,
    className = "",
    style = {},
    height = "100%",
    width = "100%",
    loadingIndicator,
    emptyComponent,
    endMessage,
    itemKey,
  }: VirtualizedInfiniteListProps<T>) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
      count: items.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => estimateSize,
      overscan,
    });

    const { t } = useTranslation();
    // Intersection Observer for triggering load more
    useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel || !hasMore) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isFetchingMore) {
            onEndReached();
          }
        },
        { threshold: 0.1, root: parentRef.current }
      );

      observer.observe(sentinel);

      return () => {
        observer.disconnect();
      };
    }, [hasMore, isFetchingMore, onEndReached]);

    const defaultLoadingIndicator = (
      <div className="flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="ml-2 text-sm text-gray-500">
          {t("Loading more...")}
        </span>
      </div>
    );

    const defaultEndMessage = (
      <div className="flex items-center justify-center p-4 text-sm text-gray-500">
        {t("No more items to load")}
      </div>
    );

    const defaultEmptyComponent = (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
        <p>{t("No items found")}</p>
      </div>
    );

    const contentHeight = typeof height === "number" ? `${height}px` : height;

    return (
      <div
        ref={parentRef}
        className={`overflow-auto ${className}`}
        style={{
          height: contentHeight,
          width: width,
          contain: "strict",
          ...style,
        }}
      >
        {items.length === 0 && !isFetchingMore && !hasMore ? (
          emptyComponent || defaultEmptyComponent
        ) : (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const item = items[virtualRow.index];
              return (
                <div
                  key={
                    itemKey ? itemKey(item, virtualRow.index) : virtualRow.key
                  }
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {renderItem(item, virtualRow.index, virtualRow)}
                </div>
              );
            })}
          </div>
        )}

        {/* Sentinel & Loading Indicators */}
        <div ref={sentinelRef} className="w-full">
          {hasMore ? (
            isFetchingMore ? (
              loadingIndicator || defaultLoadingIndicator
            ) : (
              <div style={{ height: 1 }} /> // Invisible Spacer for observer
            )
          ) : (
            items.length > 0 && (endMessage || defaultEndMessage)
          )}
        </div>
      </div>
    );
  }
);

// Helper for display name
(VirtualizedInfiniteList as React.NamedExoticComponent).displayName =
  "VirtualizedInfiniteList";
