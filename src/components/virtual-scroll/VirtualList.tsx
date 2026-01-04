import React, { useRef, useEffect, memo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTranslation } from "react-i18next";
import type { VirtualListProps } from "./types";

/**
 * VirtualList - Single column virtualized list
 * Ideal for dropdowns, menus, and simple lists
 */
export const VirtualList = memo(
  <T,>({
    items,
    renderItem,
    onEndReached,
    isFetchingMore,
    hasMore,
    estimateSize = 50,
    overscan = 5,
    className = "",
    style = {},
    height = "100%",
    width = "100%",
    loadingIndicator,
    emptyComponent,
    endMessage,
    itemKey,
  }: VirtualListProps<T>) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    const rowVirtualizer = useVirtualizer({
      count: items.length,
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
                  {renderItem(item, virtualRow.index)}
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
//
(VirtualList as unknown as React.NamedExoticComponent).displayName =
  "VirtualList";
