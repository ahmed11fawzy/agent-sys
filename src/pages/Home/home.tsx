import Header from "@/components/page-header/Header";
import { HomeIcon } from "lucide-react";
import TeamStats from "./team.stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getColumns } from "@/components/agents-table/columns";
import { DataTable } from "@/components/agents-table/data-table";
import { useGetAgentsQuery } from "@/features/api-queries/agent-query";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const { data: agents } = useGetAgentsQuery(
    new URLSearchParams({ page: "1" }).toString()
  );
  console.log("agents", agents);
  return (
    <main className="mt-5">
      <Header
        title="Dashboard"
        subTitle="welcome to dashboard "
        icon={<HomeIcon className="h-5 w-5" />}
      />
      <section className="flex flex-col gap-5">
        <TeamStats />
        {/* Agent List */}
        <Card>
          <CardHeader>
            <CardTitle>{t("Agent List")}</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable getColumns={getColumns} data={agents?.data || []} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Home;
