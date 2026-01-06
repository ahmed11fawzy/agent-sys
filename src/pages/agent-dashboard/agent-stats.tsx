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
  Archive,
  TargetIcon,
} from "lucide-react";

const agentStatsMock: StatsCardProps[] = [
  {
    title: "8",
    subtitle: "Daily Store ",
    icon: <Store />,
    Badge: {
      variant: "secondary",
      className: "bg-green-100 text-green-700",
      badgeTitle: "",
      badgeIcon: <TrendingUp />,
    },
  },
  {
    title: "39",
    subtitle: "Total Store",
    icon: <Archive />,
    Badge: {
      variant: "secondary",
      className: "bg-(--primary-50) text-(--primary-700)",
      badgeTitle: "81%",
      badgeIcon: <ShieldCheck />,
    },
  },
  {
    title: "925.23",
    subtitle: "Commission",
    icon: <Banknote />,
    Badge: {
      variant: "secondary",
      className: "bg-green-100 text-green-700",
      badgeTitle: "+4%",
      badgeIcon: <TrendingUp />,
    },
  },
  {
    title: "300",
    subtitle: "Month Target",
    icon: <TargetIcon />,
    Badge: {
      variant: "destructive",
      className: "bg-red-100 text-red-700",
      badgeTitle: "",
      badgeIcon: <TrendingDown />,
    },
  },
];

const AgentStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {agentStatsMock.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default AgentStats;
