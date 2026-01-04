import type { ReactNode } from "react";

// ============================================================================
// LAYOUT CONFIGURATION
// ============================================================================

/**
 * Responsive column configuration
 * Values represent number of columns at each breakpoint
 */
export interface ResponsiveColumns {
  /** Default columns (mobile first) */
  default: number;
  /** Small screens (≥640px) */
  sm?: number;
  /** Medium screens (≥768px) */
  md?: number;
  /** Large screens (≥1024px) */
  lg?: number;
  /** Extra large screens (≥1280px) */
  xl?: number;
}

export interface LayoutConfig {
  /** Layout type */
  type: "list" | "grid";
  /** Column configuration for grid layout */
  columns?: ResponsiveColumns;
  /** Gap between items in pixels */
  gap?: number;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface BaseVirtualScrollProps<T> {
  /** Array of items to render */
  items: T[];
  /** Function to render each item */
  renderItem: (item: T, index: number) => ReactNode;
  /** Callback when user scrolls near the end */
  onEndReached: () => void;
  /** Whether more items are being fetched */
  isFetchingMore: boolean;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Estimated size of each row in pixels */
  estimateSize?: number;
  /** Number of items to render outside visible area */
  overscan?: number;
  /** Container class name */
  className?: string;
  /** Container inline styles */
  style?: React.CSSProperties;
  /** Container height */
  height?: string | number;
  /** Container width */
  width?: string | number;
  /** Custom loading indicator */
  loadingIndicator?: ReactNode;
  /** Component to show when list is empty */
  emptyComponent?: ReactNode;
  /** Message to show when all items are loaded */
  endMessage?: ReactNode;
  /** Function to generate unique key for each item */
  itemKey?: (item: T, index: number) => string | number;
}

export interface VirtualListProps<T> extends BaseVirtualScrollProps<T> {
  /** Single column list - no additional layout props needed */
}

export interface VirtualGridListProps<T> extends BaseVirtualScrollProps<T> {
  /** Column configuration */
  columns?: ResponsiveColumns;
  /** Gap between items in pixels */
  gap?: number;
}
