import AgentSkeleton from "@/components/agent-card/agent-skeleton";
import Header from "@/components/page-header/Header";
import StatsCard from "@/components/stats-card/stats-card";
import StoreCard from "@/components/store-card/store-card";
import { Button } from "@/components/ui/button";
import { VirtualGridList } from "@/components/virtual-scroll";
import {
  useGetAgentStoresQuery,
  useLazyGetAgentStoresQuery,
} from "@/features/api-queries/stores-query";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { AgentStore } from "@/types/store-type";
import {
  Activity,
  AlertTriangle,
  CircleCheckBig,
  Clock,
  Store,
  XCircle,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MyStores = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [status, setStatus] = useState("");
  const [storeName, setStoreName] = useState("");

  const [getAgentStores] = useLazyGetAgentStoresQuery();

  // Stats Queries
  const { data: allStoresData } = useGetAgentStoresQuery("per_page=1");
  const { data: activeStoresData } = useGetAgentStoresQuery(
    "status=active&per_page=1"
  );
  const { data: pendingStoresData } = useGetAgentStoresQuery(
    "status=pending&per_page=1"
  );
  const { data: rejectedStoresData } = useGetAgentStoresQuery(
    "status=rejected&per_page=1"
  );

  const fetchStores = useCallback(
    async (page: number, pageSize: number, signal: AbortSignal) => {
      const filterQuery = new URLSearchParams({
        page: page.toString(),
        per_page: pageSize.toString(),
        ...(status && { status }),
        ...(storeName && { storeName }),
      }).toString();

      const res = await getAgentStores(filterQuery).unwrap();

      return {
        data: res.data,
        hasMore: res.meta.current_page < res.meta.last_page,
        total: res.meta.total,
      };
    },
    [status, storeName, getAgentStores]
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
  const renderStore = useCallback(
    (store: AgentStore, index: number, virtualRow: any) => (
      <StoreCard store={store} />
    ),
    []
  );

  const addNewStoreHandler = () => {
    navigate("/my-stores/new-store");
  };

  return (
    <main className="mt-5">
      <header className="flex items-center justify-between gap-2">
        <Header
          title="My Stores"
          subTitle="show your Stores , follow store details "
          icon={<Store className="h-5 w-5" />}
        />
        <Button
          variant="primary"
          className="py-5 px-6 bg-gradient-to-r from-(--primary-700) via-(--primary-600) to-(--primary-400) "
          onClick={addNewStoreHandler}
        >
          {t("Add New Store")}
        </Button>
      </header>

      <section className="flex flex-col gap-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title={allStoresData?.meta?.total || 0}
            subtitle="Total Stores"
            icon={<Store />}
            Badge={{
              variant: "default",
              className: "bg-blue-100 text-blue-700",
              badgeTitle: "All",
              badgeIcon: <Activity className="w-4 h-4 mr-1" />,
            }}
          />
          <StatsCard
            title={activeStoresData?.meta?.total || 0}
            subtitle="Active Stores"
            icon={<CircleCheckBig />}
            Badge={{
              variant: "default",
              className: "bg-green-100 text-green-700",
              badgeTitle: "Active",
              badgeIcon: <CircleCheckBig className="w-4 h-4 mr-1" />,
            }}
          />
          <StatsCard
            title={pendingStoresData?.meta?.total || 0}
            subtitle="Pending Stores"
            icon={<Clock />}
            Badge={{
              variant: "default",
              className: "bg-yellow-100 text-yellow-700",
              badgeTitle: "Pending",
              badgeIcon: <AlertTriangle className="w-4 h-4 mr-1" />,
            }}
          />
          <StatsCard
            title={rejectedStoresData?.meta?.total || 0}
            subtitle="Rejected Stores"
            icon={<XCircle />}
            Badge={{
              variant: "destructive",
              className: "bg-red-100 text-red-700",
              badgeTitle: "Rejected",
              badgeIcon: <XCircle className="w-4 h-4 mr-1" />,
            }}
          />
        </div>

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
              renderItem={renderStore}
              onEndReached={loadMore}
              isFetchingMore={isFetchingMore}
              hasMore={hasMore}
              estimateSize={220} // Approximate height of StoreCard including padding
              itemKey={(store: AgentStore) => store?.id}
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

export default MyStores;
