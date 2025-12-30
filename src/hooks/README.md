# useInfiniteScroll Hook & VirtualizedInfiniteList

A highly optimized, reusable React hook for infinite scrolling with built-in virtualization support using `@tanstack/react-virtual`.

## Installation

Ensure you have the required dependencies:

```bash
npm install @tanstack/react-virtual
```

## Features

- **Infinite Scrolling**: Automatically loads more data when reaching the bottom.
- **Virtualization**: Renders only visible items for high performance with large lists.
- **AbortController**: Auto-cancels stale requests (e.g., fast page switching).
- **TypeScript**: Fully typed for safety.
- **Customizable**: rendering, loading states, error handling, and styling.

## Usage

### 1. Define your fetch function

The fetch function must return a specific structure:

```typescript
import { FetchResult } from "./useInfiniteScroll";

const fetchUsers = async (
  page: number,
  pageSize: number,
  signal: AbortSignal
): Promise<FetchResult<User>> => {
  const response = await fetch(`/api/users?page=${page}&limit=${pageSize}`, {
    signal,
  });
  const data = await response.json();

  return {
    data: data.users,
    hasMore: data.hasMore, // boolean indicating if there are more pages
    total: data.total,
  };
};
```

### 2. Use the Hook

```tsx
import {
  useInfiniteScroll,
  VirtualizedInfiniteList,
} from "./useInfiniteScroll";

const MyComponent = () => {
  const { items, isLoading, isFetchingMore, hasMore, loadMore } =
    useInfiniteScroll({
      fetchFn: fetchUsers,
      pageSize: 20,
      enabled: true,
    });

  return (
    <div className="h-[500px] border rounded-md">
      {isLoading ? (
        <div>Loading initial...</div>
      ) : (
        <VirtualizedInfiniteList
          items={items}
          hasMore={hasMore}
          isFetchingMore={isFetchingMore}
          onEndReached={loadMore}
          estimateSize={80} // Approx height of one item in px
          renderItem={(user, index) => (
            <div className="p-4 border-b">
              #{index + 1} - {user.name}
            </div>
          )}
        />
      )}
    </div>
  );
};
```

## API Reference

### `useInfiniteScroll` Options

| Option | Type | Default | Description |
|Data|Type|Default|Description|
|---|---|---|---|
| `fetchFn` | `function` | Required | Async function to fetch data. Receives `page`, `pageSize`, `signal`. |
| `pageSize` | `number` | `20` | Number of items per page. |
| `initialPage` | `number` | `0` | Starting page index. |
| `enabled` | `boolean` | `true` | Whether to start fetching automatically. |

### `useInfiniteScroll` Returns

| Property         | Type       | Description                              |
| ---------------- | ---------- | ---------------------------------------- |
| `items`          | `T[]`      | Array of fetched items.                  |
| `isLoading`      | `boolean`  | True during initial load.                |
| `isFetchingMore` | `boolean`  | True during subsequent page loads.       |
| `hasMore`        | `boolean`  | Whether more pages are available.        |
| `error`          | `string`   | Error message if fetch fails.            |
| `reset`          | `function` | Clears items and re-fetches from page 0. |

### `VirtualizedInfiniteList` Props

| Prop           | Type             | Default  | Description                                                  |
| -------------- | ---------------- | -------- | ------------------------------------------------------------ |
| `items`        | `T[]`            | Required | Array of data to render.                                     |
| `renderItem`   | `function`       | Required | Render function for each item. `(item, index) => ReactNode`. |
| `onEndReached` | `function`       | Required | Callback to load more data.                                  |
| `estimateSize` | `number`         | `100`    | Estimated height of a single row in px.                      |
| `height`       | `string\|number` | `"100%"` | Height of the container.                                     |
| `className`    | `string`         | `""`     | Class for container.                                         |
