import StatsCard from "@/components/stats-card/stats-card";
import type { StatsCardProps } from "@/components/stats-card/types";
import {
  Store,
  TrendingUp,
  TrendingDown,
  BarChart3,
  UserCheck,
  ShieldCheck,
  Banknote,
} from "lucide-react";

const agentTeamStatsMock: StatsCardProps[] = [
  {
    title: "48",
    subtitle: "Total Agents",
    icon: <Store />,
    Badge: {
      variant: "secondary",
      className: "bg-green-100 text-green-700",
      badgeTitle: "+6 this month",
      badgeIcon: <TrendingUp />,
    },
  },
  {
    title: "39",
    subtitle: "Active Agents",
    icon: <UserCheck />,
    Badge: {
      variant: "secondary",
      className: "bg-(--primary-50) text-(--primary-700)",
      badgeTitle: "81%",
      badgeIcon: <ShieldCheck />,
    },
  },
  {
    title: "92%",
    subtitle: "Task Completion",
    icon: <BarChart3 />,
    Badge: {
      variant: "secondary",
      className: "bg-green-100 text-green-700",
      badgeTitle: "+4% improvement",
      badgeIcon: <TrendingUp />,
    },
  },
  {
    title: "7%",
    subtitle: "Commission Rate",
    icon: <Banknote />,
    Badge: {
      variant: "destructive",
      className: "bg-red-100 text-red-700",
      badgeTitle: "-2%",
      badgeIcon: <TrendingDown />,
    },
  },
];

const TeamStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {agentTeamStatsMock.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default TeamStats;
