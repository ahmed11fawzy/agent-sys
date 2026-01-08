"use client";

import { useMemo } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { AgentActivity } from "@/types/activities-types";
import { useTranslation } from "react-i18next";

interface ActivityRadarChartProps {
  activities: AgentActivity[];
}

export function ActivityRadarChart({ activities }: ActivityRadarChartProps) {
  const { t } = useTranslation();

  const chartData = useMemo(() => {
    const activityCounts: Record<string, number> = {};

    activities.forEach((activity) => {
      const type = activity.activity_type || "Unknown";
      activityCounts[type] = (activityCounts[type] || 0) + 1;
    });

    return Object.entries(activityCounts).map(([type, count]) => ({
      activity: type,
      count,
    }));
  }, [activities]);

  const chartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="col-span-1 h-full">
      <CardHeader className="items-center pb-4">
        <CardTitle>{t("Activity Distribution")}</CardTitle>
        <CardDescription>
          {t("Showing distribution of activity types")}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-sidebar" />}
            />
            <PolarAngleAxis dataKey="activity" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--primary-100)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
