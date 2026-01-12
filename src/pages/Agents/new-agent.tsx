import Header from "@/components/page-header/Header";
import { PlusIcon } from "lucide-react";
import NewAgentForm from "@/components/new-agent-form/new-agent-form";
import { useTranslation } from "react-i18next";

const NewAgent = () => {
  const { t } = useTranslation();
  return (
    <main className="mt-5">
      <Header
        title={t("Create New Agent")}
        subTitle={t("Add a new agent")}
        icon={<PlusIcon className="h-5 w-5" />}
      />
      <section className="">
        <NewAgentForm />
      </section>
    </main>
  );
};

export default NewAgent;
