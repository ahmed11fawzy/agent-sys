/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useLazyGetAgentsQuery } from "@/features/api-queries/agent-query";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { VirtualGridList } from "@/components/virtual-scroll";
import AgentCard from "@/components/agent-card/agent-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type Agent } from "@/types/agent-types";
import { BorderBeam } from "@/components/ui/border-beam";
import AgentSkeleton from "@/components/agent-card/agent-skeleton";
import Header from "@/components/page-header/Header";
import { useTranslation } from "react-i18next";

const Agents = () => {
  const { t } = useTranslation();

  // State for filters
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [status, setStatus] = useState("");
  const [salary_type, setSalaryType] = useState("");
  const [team_id, setTeamId] = useState("");
  const [is_online, setIsOnline] = useState("");

  // API Query
  const [getAgents] = useLazyGetAgentsQuery();

  const navigate = useNavigate();

  const handleAddAgent = () => {
    navigate("/agents/new-agent");
  };

  // Fetch function for infinite scroll
  const fetchAgents = useCallback(
    async (page: number, pageSize: number, signal: AbortSignal) => {
      const filterQuery = new URLSearchParams({
        page: page.toString(),
        per_page: pageSize.toString(),
        ...(status && { status }),
        ...(salary_type && { salary_type }),
        ...(team_id && { team_id }),
        ...(is_online && { is_online }),
      }).toString();

      try {
        const response = await getAgents(filterQuery).unwrap();
        console.log(response);
        return {
          data: response.data,
          hasMore: response.meta.current_page < response.meta.last_page,
          total: response.meta.total,
        };
      } catch (error) {
        console.error("Failed to fetch agents", error);
        throw error;
      }
    },
    [status, salary_type, team_id, is_online, getAgents]
  );

  // Initialize Infinite Scroll Hook
  const {
    items: agents,
    loadMore,
    isFetchingMore,
    hasMore,
    isLoading,
    error: scrollError,
  } = useInfiniteScroll<Agent>({
    fetchFn: fetchAgents,
    pageSize: per_page,
    initialPage: 1,
  });

  // Render Item for Virtualized List
  const renderAgent = useCallback(
    (agent: Agent, index: number) => <AgentCard agent={agent} />,
    []
  );

  return (
    <main className="mt-5 container mx-auto ">
      <header className="flex justify-between items-center mb-6">
        <Header
          title="Agents"
          subTitle="Manage and view all your agents here."
          icon={<> </>}
        />

        <Button
          variant="primary"
          className="py-5 px-6 bg-gradient-to-r from-(--primary-700) via-(--primary-600) to-(--primary-400) "
          onClick={handleAddAgent}
        >
          {t("Add New Agent")}
        </Button>
      </header>

      {/* Filter Section (Basic placeholder for now, expandable) */}
      <Card className="mb-6 relative overflow-hidden">
        <CardHeader>
          <CardTitle>{t("Filters")}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder={t("Search by name...")}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          {/* Add more filter inputs here as needed */}
        </CardContent>
        <BorderBeam size={150} duration={12} delay={9} />
      </Card>

      {/* Error Handling */}
      {scrollError && (
        <div className="text-red-500 mb-4">
          {t("Error")}: {t(scrollError)}
        </div>
      )}

      {/* Virtualized Grid List */}
      <div className="h-[600px] w-full border rounded-md shadow-sm bg-background">
        {isLoading && agents.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            <AgentSkeleton />
            <AgentSkeleton />
            <AgentSkeleton />
            <AgentSkeleton />
          </div>
        ) : (
          <VirtualGridList<Agent>
            items={agents}
            renderItem={renderAgent}
            onEndReached={loadMore}
            isFetchingMore={isFetchingMore}
            hasMore={hasMore}
            estimateSize={220}
            itemKey={(agent) => agent.id}
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
    </main>
  );
};

export default Agents;
