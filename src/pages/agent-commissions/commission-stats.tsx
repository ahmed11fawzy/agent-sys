import StatsCard from "@/components/stats-card/stats-card";
import type { StatsCardProps } from "@/components/stats-card/types";
import {
  Store,
  Banknote,
  TrendingUp,
  CircleCheckBig,
  AlertTriangle,
  TrendingDown,
  Landmark,
} from "lucide-react";
import { motion } from "motion/react";

export function CommissionStats() {
  const commissionsStats = [
    {
      title: "0",
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
      title: "0",
      subtitle: "Total Salary",
      icon: <Store />,
      Badge: {
        variant: "secondary",
        className: "bg-(--primary-50) text-(--primary-700)",
        badgeTitle: "81%",
        badgeIcon: <CircleCheckBig />,
      },
    },
    {
      title: "0",
      subtitle: "Salary Coverage",
      icon: <Landmark />,
      Badge: {
        variant: "secondary",
        className: "bg-green-100 text-green-700",
        badgeTitle: "+4% coverage",
        badgeIcon: <TrendingUp />,
      },
    },
    {
      title: "0",
      subtitle: "Suspended Salary",
      icon: <AlertTriangle />,
      Badge: {
        variant: "destructive",
        className: "bg-red-100 text-red-700",
        badgeTitle: "-2%",
        badgeIcon: <TrendingDown />,
      },
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {commissionsStats.map((stat, index) => (
        <motion.div
          key={stat.subtitle}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }} // Optional: stagger animation
        >
          <StatsCard
            title={stat.title}
            subtitle={stat.subtitle}
            icon={stat.icon}
            Badge={stat.Badge as StatsCardProps["Badge"]}
          />
        </motion.div>
      ))}
    </div>
  );
}
