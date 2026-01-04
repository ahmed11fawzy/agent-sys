import Header from "@/components/page-header/Header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Banknote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { months } from "./months";
import CommissionsStats from "./commissions-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "@/columns/commission-columns";
import { useGetAgentsQuery } from "@/features/api-queries/agent-query";

const Commissions = () => {
  const { t } = useTranslation();
  const { data: agents } = useGetAgentsQuery(
    new URLSearchParams({ page: "1" }).toString()
  );
  return (
    <main className="mt-5">
      <div className="flex items-center justify-between">
        <Header
          title="Commissions"
          subTitle="Follow team commissions and salary . "
          icon={<Banknote />}
        />
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("Select Month")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Months</SelectLabel>
                {months.map((month, index) => (
                  <SelectItem key={month} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <section className="flex flex-col gap-5">
        <CommissionsStats />
        <Card>
          <CardHeader>
            <CardTitle>{t("Commissions and Salary List")}</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable getColumns={getColumns} data={agents?.data || []} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Commissions;
