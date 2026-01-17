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
import { motion } from "motion/react";
import { getColumns } from "@/columns/all-team-commission-stats-column";

const Commissions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: commissionSettings } = useGetCommissionSettingsQuery(
    new URLSearchParams({ page: "1" }).toString()
  );

  const { data: allCommissions } = useGetAllCommissionsQuery({});
  console.log(allCommissions);
  const createNewCommissionHandler = () => {
    navigate("/commissions/new-commission");
  };

  return (
    <main className="mt-5">
      <header className="flex items-center justify-between">
        <Header
          title={t("Commissions")}
          subTitle={t("Follow team commissions and salary . ")}
          icon={<Banknote />}
        />
        <div className="flex items-center gap-5">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("Select Month")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("Months")}</SelectLabel>
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
              <DataTable
                getColumns={getColumns}
                data={allCommissions?.data || []}
              />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {t("Commissions and Salary (Bonuses / Deductions) List")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                getColumns={getCommissionColumns}
                data={commissionSettings?.data || []}
              />
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
};

export default Commissions;
