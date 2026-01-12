import { CommissionForm } from "@/components/commissions-form/commission-form";
import Header from "@/components/page-header/Header";
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";

const NewCommissionCalculations = () => {
  const { t } = useTranslation();
  return (
    <main className="mt-5 ">
      <Header
        title={t("New Commission Calculations")}
        subTitle={t("Create new commission calculations")}
        icon={<User />}
      />

      <section>
        <CommissionForm />
      </section>
    </main>
  );
};

export default NewCommissionCalculations;
