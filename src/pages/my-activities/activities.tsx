import Header from "@/components/page-header/Header";
import StatsCard from "@/components/stats-card/stats-card";
import {
  Activity,
  AlertTriangleIcon,
  AlignVerticalDistributeStartIcon,
  AreaChartIcon,
  CheckCircle,
  Clock,
  List,
  TrendingUp,
} from "lucide-react";
import {
  useDeleteActivityMutation,
  useGetAllActivitiesQuery,
} from "@/features/api-queries/activities-query";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";
import type { AgentActivity } from "@/types/activities-types";
import { ActivityRadarChart } from "@/components/charts/activity-radar-chart";
import { mockActivities } from "@/mocks/activities-mock";
import { useState } from "react";
import { useActivityColumns } from "@/columns/activity-columns";
import { ServerDataTable } from "@/components/table/server-data-table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Activities = () => {
  const { t } = useTranslation();
  const [deleteActivity] = useDeleteActivityMutation();
  const navigate = useNavigate();
  // Filter State
  const [filters, setFilters] = useState({
    name: "",
    activity_type: "",
    agent_code: "",
    page: 1,
    per_page: 10,
  });

  const { data, isLoading } = useGetAllActivitiesQuery(filters);
  console.log(data);

  // Handlers
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleDelete = async (id: number) => {
    if (confirm(t("Are you sure you want to delete this activity?"))) {
      try {
        await deleteActivity(id).unwrap();
      } catch (error) {
        console.error("Failed to delete activity", error);
      }
    }
  };

  const handleView = (id: number) => {
    console.log("View activity", id);
    // Navigate to details page or open modal
  };

  const columns = useActivityColumns({
    onDelete: handleDelete,
    onView: handleView,
  });

  // Use mock data if API data is empty or too small for demonstration purposes (Radar Chart)
  // For Table, we prefer real data, but if empty we can fallback to empty array or mock if needed.
  // Ideally, the table should reflect exactly what the API returns.
  // Determine if we should use mock data (if API is loading, empty, or has very few items)
  const isUsingMocks = !isLoading && (!data?.data || data.data.length < 4);

  // Process data for Table
  let tableData: AgentActivity[] = [];
  let pageCount = 1;

  if (isUsingMocks) {
    // Client-side filtering for Mock Data
    let filteredMocks = mockActivities.filter((activity) => {
      const matchesName =
        !filters.name ||
        // Check various fields for name search (agent code, location, etc as proxy or unrelated?)
        // The mock data doesn't have a direct "name" field for the activity itself, usually agent name or location?
        // Let's assume searching Location Name or just ignore if not applicable,
        // or maybe strict Agent Code search?
        // Let's search Location Name for "name" filter for now.
        activity.location.name
          .toLowerCase()
          .includes(filters.name.toLowerCase());

      const matchesType =
        !filters.activity_type ||
        activity.activity_type === filters.activity_type;

      const matchesCode =
        !filters.agent_code ||
        activity.agent.code
          .toLowerCase()
          .includes(filters.agent_code.toLowerCase());

      return matchesName && matchesType && matchesCode;
    });

    pageCount = Math.ceil(filteredMocks.length / filters.per_page);
    const startIndex = (filters.page - 1) * filters.per_page;
    tableData = filteredMocks.slice(startIndex, startIndex + filters.per_page);
  } else {
    // Server-side data from API
    tableData = data?.data || [];
    pageCount = data?.meta?.last_page || 1;
  }

  const displayDataForChart = isUsingMocks ? mockActivities : data?.data || [];

  const addNewActivityHandler = () => {
    navigate("/add-activity");
  };

  return (
    <main className="mt-5 space-y-6">
      <header className="flex items-center justify-between">
        <Header
          title={t("My Activities")}
          subTitle={t("showing your daily visits and follow you activity")}
          icon={<AlignVerticalDistributeStartIcon />}
        />
        <Button
          variant="primary"
          className="py-5 px-6 bg-gradient-to-r from-(--primary-700) via-(--primary-600) to-(--primary-400) "
          onClick={addNewActivityHandler}
        >
          {t("Add New Activity")}
        </Button>
      </header>

      {/* Stats Section */}

      {isLoading ? (
        <Spinner />
      ) : (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="grid grid-cols-2 gap-5">
              <StatsCard
                title={displayDataForChart.length}
                subtitle={t("Total Activities")}
                icon={<Activity />}
                Badge={{
                  variant: "secondary",
                  className: "bg-green-100 text-green-700",
                  badgeTitle: t("+4% this month"),
                  badgeIcon: <TrendingUp />,
                }}
              />
              <StatsCard
                title={
                  displayDataForChart.filter(
                    (activity: AgentActivity) =>
                      activity.outcome === "successful"
                  ).length
                }
                subtitle={t("Successful Activities")}
                icon={<AreaChartIcon />}
                Badge={{
                  variant: "secondary",
                  className: "bg-(--primary-100) text-(--primary-700)",
                  badgeTitle: t("+4% "),
                  badgeIcon: <CheckCircle />,
                }}
              />
              <StatsCard
                title={
                  displayDataForChart.filter(
                    (activity: AgentActivity) => activity.outcome === "failed"
                  ).length
                }
                subtitle={t("Failed Activities")}
                icon={<AlertTriangleIcon />}
                Badge={{
                  variant: "destructive",
                  className: "bg-red-100 text-red-700",
                  badgeTitle: t("+4% this month"),
                  badgeIcon: <TrendingUp />,
                }}
              />
              <StatsCard
                title={
                  displayDataForChart.filter(
                    (activity: AgentActivity) => activity.outcome === "pending"
                  ).length
                }
                subtitle={t("Pending Activities")}
                icon={<Clock />}
                Badge={{
                  variant: "secondary",
                  className: "bg-yellow-100 text-yellow-700",
                  badgeTitle: t("+4% this month"),
                  badgeIcon: <TrendingUp />,
                }}
              />
            </div>
            <div>
              <ActivityRadarChart activities={displayDataForChart} />
            </div>
          </div>

          <Card className="space-y-4 my-6 p-3">
            <CardHeader className="flex justify-between gap-2">
              <p className="flex items-center gap-2">
                <List />
                {t("List of Activities")}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder={t("Filter by Location Name")}
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  className="md:w-1/4"
                />
                <Select
                  value={filters.activity_type}
                  onValueChange={(value) =>
                    handleFilterChange(
                      "activity_type",
                      value === "all" ? "" : value
                    )
                  }
                >
                  <SelectTrigger className="md:w-1/4">
                    <SelectValue placeholder={t("Filter by Activity Type")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All Activities")}</SelectItem>
                    <SelectItem value="visit">{t("Visit")}</SelectItem>
                    <SelectItem value="call">{t("Call")}</SelectItem>
                    <SelectItem value="meeting">{t("Meeting")}</SelectItem>
                    <SelectItem value="registration">
                      {t("Registration")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder={t("Filter by Agent Code")}
                  value={filters.agent_code}
                  onChange={(e) =>
                    handleFilterChange("agent_code", e.target.value)
                  }
                  className="md:w-1/4"
                />
                {/* <Button variant="outline" onClick={() => refetch()}>
            {t("Refresh")}
          </Button> */}
              </div>

              <div className="bg-background rounded-md border shadow-sm">
                {isLoading && !isUsingMocks ? ( // Only show spinner if truly loading from API and not using mocks
                  <div className="p-8 flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <ServerDataTable
                    columns={columns}
                    data={tableData}
                    pageCount={pageCount}
                    setPage={(page) =>
                      setFilters((prev) => ({ ...prev, page: page }))
                    }
                    page={filters.page}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </main>
  );
};

export default Activities;
