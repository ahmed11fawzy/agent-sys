import Header from "@/components/page-header/Header";
import { AlignVerticalDistributeStartIcon } from "lucide-react";

const Visits = () => {
  return (
    <main className="mt-5">
      <Header
        title="My Visits"
        subTitle="showing your daily visits and follow you activity"
        icon={<AlignVerticalDistributeStartIcon />}
      />
    </main>
  );
};

export default Visits;
