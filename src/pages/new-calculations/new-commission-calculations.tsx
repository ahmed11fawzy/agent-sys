import { CommissionForm } from "@/components/commissions-form/commission-form";
import Header from "@/components/page-header/Header";
import { User } from "lucide-react";
const NewCommissionCalculations = () => {
  return (
    <main className="mt-5 ">
      <Header
        title="New Commission Calculations"
        subTitle="Create new commission calculations"
        icon={<User />}
      />

      <section>
        <CommissionForm />
      </section>
    </main>
  );
};

export default NewCommissionCalculations;
