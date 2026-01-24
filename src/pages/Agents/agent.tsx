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
import { motion } from "motion/react";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Agents = () => {
  const { t } = useTranslation();

  // State for filters
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);

  // Filters
  const [name, setName] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [salary_type, setSalaryType] = useState<string>("all");
  const [is_online, setIsOnline] = useState<string>("all");

  const debouncedName = useDebounce(name, 500);

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
        ...(debouncedName && { name: debouncedName }),
        ...(status && status !== "all" && { status }),
        ...(salary_type && salary_type !== "all" && { salary_type }),
        ...(is_online && is_online !== "all" && { is_online }),
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
    [debouncedName, status, salary_type, is_online, getAgents]
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
    (agent: Agent, index: number) => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <AgentCard agent={agent} />
      </motion.div>
    ),
    []
  );

  return (
    <main className="mt-5 container mx-auto ">
      <header className="flex justify-between items-center mb-6">
        <Header
          title={t("Agents")}
          subTitle={t("Manage and view all your agents here.")}
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

      {/* Filter Section */}
      <Card className="mb-6 relative overflow-hidden">
        <CardHeader>
          <CardTitle>{t("Filters")}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search by Name */}
          <Input
            placeholder={t("Search by name...")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Status Filter */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder={t("Select Status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Statuses")}</SelectItem>
              <SelectItem value="active">{t("Active")}</SelectItem>
              <SelectItem value="inactive">{t("Inactive")}</SelectItem>
              <SelectItem value="suspended">{t("Suspended")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Salary Type Filter */}
          <Select value={salary_type} onValueChange={setSalaryType}>
            <SelectTrigger>
              <SelectValue placeholder={t("Select Salary Type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Salary Types")}</SelectItem>
              <SelectItem value="fixed">{t("Fixed")}</SelectItem>
              <SelectItem value="commission">{t("Commission")}</SelectItem>
              <SelectItem value="mixed">{t("Mixed")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Online Status Filter */}
          <Select value={is_online} onValueChange={setIsOnline}>
            <SelectTrigger>
              <SelectValue placeholder={t("Select Online Status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All")}</SelectItem>
              <SelectItem value="1">{t("Online")}</SelectItem>
              <SelectItem value="0">{t("Offline")}</SelectItem>
            </SelectContent>
          </Select>
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
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
      </motion.div>
    </main>
  );
};

export default Agents;
