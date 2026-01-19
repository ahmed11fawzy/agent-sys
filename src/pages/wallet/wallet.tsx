import Header from "@/components/page-header/Header";
import { WalletIcon } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/table/data-table";
import { transactionColumns } from "@/columns/transaction-columns";
import { useTranslation } from "react-i18next";
import {
  useGetTransactionQuery,
  useGetAllWithdrawalsQuery,
} from "@/features/api-queries/wallet-query";
import { withdrawalsColumns } from "@/columns/withdrawals-columns";
import { WithdrawalsDialog } from "@/components/create-withdrawals-dialog/withdrawals-dialog";
const Wallet = () => {
  const { t } = useTranslation();
  const { data: allTransactions } = useGetTransactionQuery({});
  const { data: allWithdrawals } = useGetAllWithdrawalsQuery({});

  return (
    <main className="mt-5">
      <header className="flex items-center justify-between">
        <Header
          title="Wallet"
          subTitle="Show your wallet balance "
          icon={<WalletIcon />}
        />
        <WithdrawalsDialog />
      </header>
      <section className="mt-5 space-y-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t("Transactions List")}</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                getColumns={transactionColumns}
                data={allTransactions?.data || []}
              />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t("Withdrawals List")}</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                getColumns={withdrawalsColumns}
                data={allWithdrawals?.data || []}
              />
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
};

export default Wallet;
