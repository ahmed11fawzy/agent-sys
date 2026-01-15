import StatsCard from "@/components/stats-card/stats-card";
import { useDashboardStatsQuery } from "@/features/api-queries/agent-query";
import {
  Store,
  TrendingUp,
  TrendingDown,
  Banknote,
  User,
  Activity,
  CircleCheckBig,
} from "lucide-react";
import { motion } from "motion/react";
import { Spinner } from "@/components/ui/spinner";

const TeamStats = () => {
  const { data: dashboardStats, isLoading } = useDashboardStatsQuery();
  if (isLoading) return <Spinner />;
  const statsConfig = [
    {
      title: dashboardStats?.data?.summary?.total_registered_stores?.count,
      subtitle: "Total Registered Stores",
      icon: <Store />,
      badge: {
        variant: "secondary" as const,
        className: "bg-green-100 text-green-700",
        badgeTitle: "+6",
        badgeIcon: <TrendingUp />,
      },
    },
    {
      title: dashboardStats?.data?.summary?.total_agents?.count,
      subtitle: "Total Agents",
      icon: <User />,
      badge: {
        variant: "secondary" as const,
        className: "bg-gray-100 text-gray-700",
        badgeTitle: "",
        badgeIcon: <CircleCheckBig />,
      },
    },
    {
      title: dashboardStats?.data?.summary?.today_activities?.count,
      subtitle: "Today Activities",
      icon: <Activity />,
      badge: {
        variant: "destructive" as const,
        className: "bg-red-100 text-red-700",
        badgeTitle: "-2",
        badgeIcon: <TrendingDown />,
      },
    },
    {
      title: dashboardStats?.data?.summary?.total_commissions?.amount,
      subtitle: "Total Commissions",
      icon: <Banknote />,
      badge: {
        variant: "destructive" as const,
        className: "bg-blue-100 text-blue-700",
        badgeTitle: "2%",
        badgeIcon: <TrendingUp />,
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {statsConfig.map((stat, index) => (
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
            Badge={stat.badge}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default TeamStats;
