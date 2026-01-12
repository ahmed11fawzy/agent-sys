import Header from "@/components/page-header/Header";
import { User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetAllCommissionsQuery } from "@/features/api-queries/commission-query";
import { CommissionStats } from "../../components/charts/commission-stats";
import { CommissionCharts } from "../../components/charts/commission-charts";

const AgentCommissions = () => {
  const navigate = useNavigate();
  const { data: commissionsData, isLoading } = useGetAllCommissionsQuery({});

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
          Create Commission
        </Button>
      </header>

      <section>
        <CommissionStats commissions={commissions} />
      </section>

      <section>
        <CommissionCharts commissions={commissions} />
      </section>

      <section>{/* Existing content or table would go here */}</section>
    </main>
  );
};

export default AgentCommissions;
