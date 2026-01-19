import Header from "@/components/page-header/Header";
import { useGetStoreByIdQuery } from "@/features/api-queries/stores-query";
import { decodeFromFakeUuid } from "@/lib/uuid-obfuscator";
import { Store } from "lucide-react";
import { useParams } from "react-router-dom";

const StoreDetails = () => {
  const { id } = useParams();
  console.log("HASHED ID : ", id);

  const decodedId = id ? decodeFromFakeUuid(id as string) : null;
  console.log("DECODED ID : ", decodedId);

  const { data } = useGetStoreByIdQuery(decodedId as number);

  console.log("Store DATA  : ", data);

  return (
    <main>
      <Header
        title="Store Details"
        subTitle="Show store details with all the information"
        icon={<Store size={24} />}
      />
      <section></section>
    </main>
  );
};

export default StoreDetails;
