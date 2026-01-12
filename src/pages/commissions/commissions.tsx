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
import { getCommissionColumns } from "@/columns/commission-settings-columns";
import {
  useGetAllCommissionsQuery,
  useGetCommissionSettingsQuery,
} from "@/features/api-queries/commission-query";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Commissions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: commissionSettings } = useGetCommissionSettingsQuery(
    new URLSearchParams({ page: "1" }).toString()
  );
  const { data: commissions } = useGetAllCommissionsQuery();
  const createNewCommissionHandler = () => {
    navigate("/commissions/new-commission");
  };

  console.log("commissions", commissions);
  return (
    <main className="mt-5">
      <header className="flex items-center justify-between">
        <Header
          title="Commissions"
          subTitle="Follow team commissions and salary . "
          icon={<Banknote />}
        />
        <div className="flex items-center gap-5">
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
          <Button
            variant="primary"
            className="py-5 px-6 bg-gradient-to-r from-(--primary-700) via-(--primary-600) to-(--primary-400) "
            onClick={createNewCommissionHandler}
          >
            {t("Create Commission")}
          </Button>
        </div>
      </header>
      <section className="flex flex-col gap-5">
        <CommissionsStats />
        <Card>
          <CardHeader>
            <CardTitle>{t("Commissions and Salary List")}</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              getColumns={getCommissionColumns}
              data={commissionSettings?.data || []}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Commissions;
