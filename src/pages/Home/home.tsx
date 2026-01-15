import Header from "@/components/page-header/Header";
import { HomeIcon } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getColumns } from "@/columns/agent-columns";
import { DataTable } from "@/components/table/data-table";
import { useGetAgentsQuery } from "@/features/api-queries/agent-query";
import { useTranslation } from "react-i18next";
import TeamStats from "./team.stats";
import { Spinner } from "@/components/ui/spinner";

const Home = () => {
  const { t } = useTranslation();
  const { data: agents, isLoading } = useGetAgentsQuery(
    new URLSearchParams({ page: "1" }).toString()
  );
  if (isLoading) return <Spinner />;
  return (
    <main className="mt-5">
      <Header
        title="Dashboard"
        subTitle="welcome to dashboard"
        icon={<HomeIcon className="h-5 w-5" />}
      />
      <section className="flex flex-col gap-5">
        <TeamStats />
        {/* Agent List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t("Agent List")}</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable getColumns={getColumns} data={agents?.data || []} />
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
