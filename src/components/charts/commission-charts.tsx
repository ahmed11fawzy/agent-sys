import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Commission } from "@/types/commission-data-types";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CommissionChartsProps {
  commissions: Commission[];
}

export function CommissionCharts({ commissions }: CommissionChartsProps) {
  // Sort by date ascending
  const sortedData = [...commissions].sort(
    (a, b) =>
      new Date(a.period.date).getTime() - new Date(b.period.date).getTime()
  );
  console.log(commissions);
  const chartData = sortedData.map((c) => ({
    date: c.period.date,
    total: c.financials.total,
    registered: c.statistics.registered,
    approved: c.statistics.approved,
    rejected: c.statistics.rejected,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} SAR`}
              />
              <Tooltip formatter={(value) => `${value} SAR`} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#adfa1d"
                fill="#adfa1d"
                fillOpacity={0.2}
                name="Total Commission"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Store Statistics</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="registered"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
                name="Registered"
              />
              <Bar
                dataKey="approved"
                fill="#16a34a"
                radius={[4, 4, 0, 0]}
                name="Approved"
              />
              <Bar
                dataKey="rejected"
                fill="#dc2626"
                radius={[4, 4, 0, 0]}
                name="Rejected"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
