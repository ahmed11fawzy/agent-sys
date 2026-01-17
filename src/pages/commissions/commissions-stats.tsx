import StatsCard from "@/components/stats-card/stats-card";
import type { StatsCardProps } from "@/components/stats-card/types";
import { useGetTeamLeaderCommissionsStatsQuery } from "@/features/api-queries/commission-query";
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Banknote,
  Gem,
  Landmark,
  AlertTriangle,
} from "lucide-react";
import { motion } from "motion/react";

const CommissionsStats = () => {
  const { data: teamLeaderCommissionsStats } =
    useGetTeamLeaderCommissionsStatsQuery({});
  const commissionsStats = [
    {
      title: teamLeaderCommissionsStats?.summary?.total_commissions?.amount,
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
      title: teamLeaderCommissionsStats?.summary?.total_salaries?.amount,
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
      title: teamLeaderCommissionsStats?.payrolls?.totals?.total_payable,
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
      title: teamLeaderCommissionsStats?.summary?.pending_withdrawals,
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
};

export default CommissionsStats;
