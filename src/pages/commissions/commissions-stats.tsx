import StatsCard from "@/components/stats-card/stats-card";
import type { StatsCardProps } from "@/components/stats-card/types";
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Banknote,
  Gem,
  Landmark,
  AlertTriangle,
} from "lucide-react";

const commissionsStatsMock: StatsCardProps[] = [
  {
    title: "125,323",
    subtitle: "Total Commissions",
    icon: <Banknote />,
    Badge: {
      variant: "secondary",
      className: "bg-green-100 text-green-700",
      badgeTitle: "this month",
      badgeIcon: <TrendingUp />,
    },
  },
  {
    title: "39",
    subtitle: "Total Salary",
    icon: <Gem />,
    Badge: {
      variant: "secondary",
      className: "bg-(--primary-50) text-(--primary-700)",
      badgeTitle: "81%",
      badgeIcon: <ShieldCheck />,
    },
  },
  {
    title: "58",
    subtitle: "ٍSalary Coverage",
    icon: <Landmark />,
    Badge: {
      variant: "secondary",
      className: "bg-green-100 text-green-700",
      badgeTitle: "+4% coverage",
      badgeIcon: <TrendingUp />,
    },
  },
  {
    title: "7%",
    subtitle: "Suspended Salary ",
    icon: <AlertTriangle />,
    Badge: {
      variant: "destructive",
      className: "bg-red-100 text-red-700",
      badgeTitle: "-2%",
      badgeIcon: <TrendingDown />,
    },
  },
];

const CommissionsStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {commissionsStatsMock.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default CommissionsStats;
