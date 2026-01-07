import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLazyGetMarketsQuery } from "@/features/api-queries/markets-query";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { VirtualList } from "@/components/virtual-scroll/VirtualList"; // Adjust import path if needed
import { type Market } from "@/types/market-type";
import { FormControl } from "@/components/ui/form";

interface MarketSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarketSelect({ value, onChange }: MarketSelectProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(""); // Add search if API supports it, currently just for show or local filter if needed

  const [getMarkets] = useLazyGetMarketsQuery();

  const fetchMarkets = useCallback(
    async (page: number, pageSize: number, signal: AbortSignal) => {
      const query = new URLSearchParams({
        page: page.toString(),
        per_page: pageSize.toString(),
      }).toString();

      const res = await getMarkets(query).unwrap();

      return {
        data: res.data,
        hasMore: res.meta.current_page < res.meta.last_page,
        total: res.meta.total,
      };
    },
    [getMarkets]
  );

  const {
    items: markets,
    loadMore,
    isFetchingMore,
    hasMore,
    isLoading,
  } = useInfiniteScroll<Market>({
    fetchFn: fetchMarkets,
    pageSize: 10,
    initialPage: 1,
    enabled: open, // Only fetch when popover is open
  });

  const selectedMarket = markets.find((m) => m.id.toString() === value);

  const renderItem = useCallback(
    (item: Market) => (
      <div
        className={cn(
          "flex items-center justify-between p-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm",
          value === item.id.toString() ? "bg-accent" : ""
        )}
        onClick={() => {
          onChange(item.id.toString());
          setOpen(false);
        }}
      >
        <span>{item.name}</span>
        {value === item.id.toString() && <Check className="ml-2 h-4 w-4" />}
      </div>
    ),
    [value, onChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              !value && "text-muted-foreground"
            )}
          >
            {value
              ? markets.find((market) => market.id.toString() === value)
                  ?.name || t("Select market...") // Ideally we should have the selected market name even if not in the list, but for now this works for loaded items
              : t("Select market...")}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="h-[300px] p-2">
          {isLoading && markets.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-sm text-muted-foreground">
                {t("Loading...")}
              </span>
            </div>
          ) : (
            <VirtualList<Market>
              items={markets}
              renderItem={renderItem}
              onEndReached={loadMore}
              isFetchingMore={isFetchingMore}
              hasMore={hasMore}
              estimateSize={40}
              height="100%"
              width="100%"
              itemKey={(item) => item.id}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
