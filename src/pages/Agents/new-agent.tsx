import Header from "@/components/page-header/Header";
import { PlusIcon } from "lucide-react";
import NewAgentForm from "@/components/new-agent-form/new-agent-form";

const NewAgent = () => {
  return (
    <main className="mt-5">
      <Header
        title="Create New Agent"
        subTitle="Add a new agent"
        icon={<PlusIcon className="h-5 w-5" />}
      />
      <section className="">
        <NewAgentForm />
      </section>
    </main>
  );
};

export default NewAgent;
