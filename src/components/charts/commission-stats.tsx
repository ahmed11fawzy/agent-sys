import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Commission } from "@/types/commission-data-types";
import { Users, DollarSign, Store, Activity } from "lucide-react";

interface CommissionStatsProps {
  commissions: Commission[];
}

export function CommissionStats({ commissions }: CommissionStatsProps) {
  const totalCommission = commissions.reduce(
    (acc, curr) => acc + curr.financials.total,
    0
  );

  const totalRegistered = commissions.reduce(
    (acc, curr) => acc + curr.statistics.registered,
    0
  );

  const totalActive = commissions.reduce(
    (acc, curr) => acc + curr.statistics.active,
    0
  );

  const avgAchievement =
    commissions.length > 0
      ? commissions.reduce(
          (acc, curr) => acc + curr.statistics.achievement_rate,
          0
        ) / commissions.length
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Commissions
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalCommission.toLocaleString("en-US", {
              style: "currency",
              currency: "SAR",
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Total paid and pending
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Registered Stores
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRegistered}</div>
          <p className="text-xs text-muted-foreground">
            Total stores registered
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Stores</CardTitle>
          <Store className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalActive}</div>
          <p className="text-xs text-muted-foreground">
            Currently active stores
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Achievement</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgAchievement.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Average target achievement
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
