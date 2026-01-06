import Header from "@/components/page-header/Header";
import { Plus } from "lucide-react";
import StoreForm from "@/components/new-Store-form/store-form";

const NewStore = () => {
  return (
    <main className="mt-4 container mx-auto p-4">
      <Header
        title="Create New Store"
        subTitle="Create New Store"
        icon={<Plus />}
      />
      <section className="mt-6">
        <StoreForm />
      </section>
    </main>
  );
};

export default NewStore;
