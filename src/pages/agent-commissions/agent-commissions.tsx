import Header from "@/components/page-header/Header";
import { User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetAllCommissionsQuery } from "@/features/api-queries/commission-query";
import { CommissionStats } from "./commission-stats";
import { CommissionCharts } from "../../components/commission-chart/commission-charts";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "@/columns/all-team-commission-stats-column";

const AgentCommissions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: commissionsData, isLoading } = useGetAllCommissionsQuery({});
  console.log(commissionsData);
  const handleCreateCommission = () => {
    navigate("/agent-commissions/create");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const commissions = commissionsData?.data || [];

  return (
    <main className="mt-5 space-y-6">
      <header className="flex justify-between items-center">
        <Header
          title="Agent Commissions"
          subTitle="Manage agent commissions"
          icon={<User />}
        />
        <Button variant="primary" onClick={handleCreateCommission}>
          {t("Create Commission")}
        </Button>
      </header>

      <section>
        <CommissionStats />
      </section>

      <section>
        <CommissionCharts commissions={commissions} />
      </section>

      <section>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t("Commissions List")}</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable getColumns={getColumns} data={commissions || []} />
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
};

export default AgentCommissions;
