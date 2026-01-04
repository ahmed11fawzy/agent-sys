import React, { useRef, useEffect, useState, memo, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTranslation } from "react-i18next";
import type { VirtualGridListProps, ResponsiveColumns } from "./types";

/**
 * Get current column count based on window width
 */
const getColumnCount = (columns: ResponsiveColumns, width: number): number => {
  if (width >= 1280 && columns.xl) return columns.xl;
  if (width >= 1024 && columns.lg) return columns.lg;
  if (width >= 768 && columns.md) return columns.md;
  if (width >= 640 && columns.sm) return columns.sm;
  return columns.default;
};

/**
 * VirtualGridList - Grid layout with configurable responsive columns
 * Ideal for cards, tiles, and grid-based content
 */
export const VirtualGridList = memo(
  <T,>({
    items,
    renderItem,
    onEndReached,
    isFetchingMore,
    hasMore,
    estimateSize = 200,
    overscan = 3,
    className = "",
    style = {},
    height = "100%",
    width = "100%",
    loadingIndicator,
    emptyComponent,
    endMessage,
    itemKey,
    columns = { default: 1, sm: 2, md: 3, lg: 4 },
    gap = 16,
  }: VirtualGridListProps<T>) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    // Track container width for responsive columns
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
      const container = parentRef.current;
      if (!container) return;

      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          setContainerWidth(entry.contentRect.width);
        }
      });

      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }, []);

    // Calculate current column count
    const columnCount = useMemo(
      () => getColumnCount(columns, containerWidth),
      [columns, containerWidth]
    );

    // Group items into rows
    const rows = useMemo(() => {
      const result: T[][] = [];
      for (let i = 0; i < items.length; i += columnCount) {
        result.push(items.slice(i, i + columnCount));
      }
      return result;
    }, [items, columnCount]);

    const rowVirtualizer = useVirtualizer({
      count: rows.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => estimateSize,
      overscan,
    });

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
              const rowItems = rows[virtualRow.index];
              const startIndex = virtualRow.index * columnCount;

              return (
                <div
                  key={virtualRow.key}
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
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                      gap: `${gap}px`,
                      padding: `${gap / 2}px`,
                    }}
                  >
                    {rowItems.map((item, colIndex) => {
                      const itemIndex = startIndex + colIndex;
                      return (
                        <div
                          key={
                            itemKey
                              ? itemKey(item, itemIndex)
                              : `${virtualRow.key}-${colIndex}`
                          }
                        >
                          {renderItem(item, itemIndex)}
                        </div>
                      );
                    })}
                  </div>
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
              <div style={{ height: 1 }} />
            )
          ) : (
            items.length > 0 && (endMessage || defaultEndMessage)
          )}
        </div>
      </div>
    );
  }
);

(VirtualGridList as React.NamedExoticComponent).displayName = "VirtualGridList";
