# Virtual Infinite Scroll Refactoring

Refactor the current monolithic `virtual-infinite-scrolling.tsx` into a clean, modular structure separating **hook logic** from **UI components** with customizable layouts (grid/list).

## Current Issues

- Hook and component are in one file
- No support for grid layouts (cards in rows)
- Layout is hardcoded, not customizable
- Difficult to use for different render modes (cards, dropdown menus, etc.)

---

## Proposed File Structure

```
src/
├── hooks/
│   └── use-infinite-scroll.ts          # Pure hook (logic only)
├── components/
│   └── virtual-scroll/
│       ├── index.ts                    # Re-exports
│       ├── types.ts                    # Shared types
│       ├── VirtualList.tsx             # Single-column list
│       └── VirtualGridList.tsx         # Grid with configurable columns
```

---

## Proposed Changes

### Hooks

#### [NEW] use-infinite-scroll.ts

Pure hook containing only data fetching logic:

- `useInfiniteScroll<T>()` - Returns: `items`, `loadMore`, `isLoading`, `hasMore`, etc.
- No JSX, no UI components

---

### Components

#### [NEW] types.ts

Shared TypeScript interfaces:

```typescript
interface LayoutConfig {
  type: "list" | "grid";
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
}

interface VirtualScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  layout?: LayoutConfig;
  onEndReached: () => void;
  // ... other props
}
```

---

#### [NEW] VirtualGridList.tsx

Grid layout component:

- Configurable columns per breakpoint: `{ default: 1, sm: 2, md: 3, lg: 4 }`
- Uses CSS Grid for responsive layouts
- Each "row" is virtualized (contains multiple items)

---

#### [NEW] VirtualList.tsx

Simple single-column list (for dropdowns, menus):

- Each item is one virtualized row
- Minimal wrapper around `@tanstack/react-virtual`

---

#### [NEW] index.ts

Re-exports all components and types.

---

### Updated Usage

#### [MODIFY] agent.tsx

Update to use new components:

```tsx
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { VirtualGridList } from "@/components/virtual-scroll";

// ...

<VirtualGridList
  items={agents}
  renderItem={(agent) => <AgentCard agent={agent} />}
  onEndReached={loadMore}
  layout={{
    type: "grid",
    columns: { default: 1, sm: 2, md: 3, lg: 4 },
    gap: 16,
  }}
  // ...
/>;
```

---

#### [DELETE] virtual-infinite-scrolling.tsx

Remove after migration is complete.

---

## Benefits

| Before               | After                           |
| -------------------- | ------------------------------- |
| Single 317-line file | Modular files (~100 lines each) |
| Layout hardcoded     | Configurable via `layout` prop  |
| Only list view       | List + Grid views               |
| Hard to reuse        | Easy to import and customize    |

---

## Verification Plan

### Manual Testing

1. Test `VirtualGridList` with 1-4 cards per row on different screen sizes
2. Test `VirtualList` for dropdowns
3. Verify infinite scroll triggers correctly
4. Verify loading indicators work
