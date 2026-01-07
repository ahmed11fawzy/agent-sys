/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "@/components/page-header/Header";
import { Home } from "lucide-react";
import AgentStats from "./agent-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AgentSkeleton from "@/components/agent-card/agent-skeleton";
import { VirtualGridList } from "@/components/virtual-scroll";
import type { AgentStore } from "@/types/store-type";
import { useCallback, useState } from "react";
import { useLazyGetAgentStoresQuery } from "@/features/api-queries/stores-query";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import StoreCard from "@/components/store-card/store-card";
import { useTranslation } from "react-i18next";

const MyDashboard = () => {
  const { t } = useTranslation();
  const [agentCode, setAgentCode] = useState("");
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [status, setStatus] = useState("");
  const [storeName, setStoreName] = useState("");

  const [getAgentStores] = useLazyGetAgentStoresQuery();

  const fetchStores = useCallback(
    async (page: number, pageSize: number, signal: AbortSignal) => {
      const filterQuery = new URLSearchParams({
        page: page.toString(),
        per_page: pageSize.toString(),
        ...(status && { status }),
        ...(agentCode && { agentCode }),
        ...(storeName && { storeName }),
      }).toString();

      try {
        const res = await getAgentStores(filterQuery).unwrap();

        return {
          data: res.data,
          hasMore: res.meta.current_page < res.meta.last_page,
          total: res.meta.total,
        };
      } catch (error) {
        console.error(error);
      }
    },
    [status, agentCode, storeName, getAgentStores]
  );

  // Initialize Infinite Scroll Hook
  const {
    items: agents,
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
    (agent: AgentStore, index: number) => <StoreCard store={agent} />,
    []
  );

  return (
    <main>
      <Header
        title="My Dashboard"
        subTitle="Welcome to My Dashboard"
        icon={<Home />}
      />
      <section className="flex flex-col gap-4">
        <AgentStats />
        <Card>
          <CardHeader>
            <CardTitle>List of newly added stores</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Error Handling */}
            {scrollError && (
              <div className="text-red-500 mb-4">
                {t("Error")}: {t(scrollError)}
              </div>
            )}

            {/* Virtualized Grid List */}
            <div className="h-[600px] w-full  ">
              {isLoading && agents.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                  <AgentSkeleton />
                  <AgentSkeleton />
                  <AgentSkeleton />
                  <AgentSkeleton />
                </div>
              ) : (
                <VirtualGridList<AgentStore>
                  items={agents}
                  renderItem={renderAgent}
                  onEndReached={loadMore}
                  isFetchingMore={isFetchingMore}
                  hasMore={hasMore}
                  estimateSize={220}
                  itemKey={(agent: AgentStore) => agent.id}
                  height="100%"
                  width="100%"
                  className="p-2"
                  columns={{ default: 1, sm: 2, md: 3, lg: 4 }}
                  gap={16}
                  endMessage={
                    <div className="flex flex-col items-center justify-center p-4 text-muted-foreground">
                      <p>{t("You have reached the end of the list.")}</p>
                    </div>
                  }
                />
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default MyDashboard;
