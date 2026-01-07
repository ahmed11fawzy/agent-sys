/* eslint-disable @typescript-eslint/no-unused-vars */
import AgentSkeleton from "@/components/agent-card/agent-skeleton";
import Header from "@/components/page-header/Header";
import StoreCard from "@/components/store-card/store-card";
import { VirtualGridList } from "@/components/virtual-scroll";
import { useLazyGetStoresQuery } from "@/features/api-queries/stores-query";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { AgentStore } from "@/types/store-type";
import { Store } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const Stores = () => {
  const { t } = useTranslation();
  const [agentCode, setAgentCode] = useState("");
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [status, setStatus] = useState("");
  const [storeName, setStoreName] = useState("");

  const [getStores] = useLazyGetStoresQuery();

  const fetchStores = useCallback(
    async (page: number, pageSize: number, signal: AbortSignal) => {
      const filterQuery = new URLSearchParams({
        page: page.toString(),
        per_page: pageSize.toString(),
        ...(status && { status }),
        ...(agentCode && { agentCode }),
        ...(storeName && { storeName }),
      }).toString();

      const res = await getStores(filterQuery).unwrap();

      return {
        data: res.data,
        hasMore: res.meta.current_page < res.meta.last_page,
        total: res.meta.total,
      };
    },
    [status, agentCode, storeName, getStores]
  );

  // Initialize Infinite Scroll Hook
  const {
    items: stores,
    loadMore,
    isFetchingMore,
    hasMore,
    isLoading,
    error: scrollError,
  } = useInfiniteScroll<AgentStore>({
    fetchFn: fetchStores,
    pageSize: per_page,
    initialPage: 1,
  });
  // Render Item for Virtualized List
  const renderAgent = useCallback(
    (store: AgentStore, index: number, virtualRow: any) => (
      <StoreCard store={store} />
    ),
    []
  );

  return (
    <main>
      <Header
        title="Stores"
        subTitle="show records of stores"
        icon={<Store />}
      />
      <section>
        {/* Error Handling */}
        {scrollError && (
          <div className="text-red-500 mb-4">
            {t("Error")}: {t(scrollError)}
          </div>
        )}
        {/* Virtualized List */}
        <div className="h-[600px] w-full border rounded-md shadow-sm bg-background">
          {isLoading && stores.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AgentSkeleton />
              <AgentSkeleton />
              <AgentSkeleton />
              <AgentSkeleton />
            </div>
          ) : (
            <VirtualGridList<AgentStore>
              items={stores}
              renderItem={renderAgent}
              onEndReached={loadMore}
              isFetchingMore={isFetchingMore}
              hasMore={hasMore}
              estimateSize={220} // Approximate height of AgentCard including padding
              itemKey={(store: AgentStore) => store.id}
              height="100%"
              width="100%"
              className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              endMessage={
                <div className="flex flex-col items-center justify-center p-4 text-muted-foreground">
                  <p>{t("You have reached the end of the list.")}</p>
                </div>
              }
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Stores;
