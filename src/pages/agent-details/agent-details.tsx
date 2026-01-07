import Header from "@/components/page-header/Header";
import StatsCard from "@/components/stats-card/stats-card";
import { Spinner } from "@/components/ui/spinner";
import ProfileCard from "@/components/user-profile-card/profile-card";
import { useGetAgentByIdQuery } from "@/features/api-queries/agent-query";
import { decodeFromFakeUuid } from "@/lib/uuid-obfuscator";
import {
  Activity,
  AlertTriangleIcon,
  ArrowUp,
  Banknote,
  CircleCheckBig,
  DollarSign,
  Store,
  Target,
  User,
} from "lucide-react";
import { useParams } from "react-router-dom";

const AgentDetails = () => {
  const { id } = useParams();
  console.log("HASHED ID : ", id);

  const decodedId = id ? decodeFromFakeUuid(id as string) : null;
  console.log("DECODED ID : ", decodedId);
  const { data, isLoading } = useGetAgentByIdQuery(decodedId as number);

  console.log("Agent DATA  : ", data);
  return (
    <main className="mt-5">
      <Header
        title="Agent Details"
        subTitle="show user details"
        icon={<User />}
      />
      <section>
        {isLoading && <Spinner className="size-6 text-yellow-500" />}
        {!isLoading && (
          <div className="flex  gap-4 ">
            <div className="flex-4   ">
              <ProfileCard agent={data?.data} />
            </div>
            <div className="flex-8 grid grid-cols-2 gap-4">
              <StatsCard
                title={
                  data?.data?.total_merchants ? data.data.total_merchants : 20
                }
                subtitle="Total recorded stores"
                icon={<Store />}
                Badge={{
                  variant: "default",
                  className: "bg-(--primary-100) text-(--primary-700) ",
                  badgeTitle: "Active stores",
                  badgeIcon: <CircleCheckBig />,
                }}
              />
              <StatsCard
                title={
                  data.data.monthly_target ? data.data.monthly_target : 200
                }
                subtitle="Monthly Target"
                icon={<Target />}
                Badge={{
                  variant: "default",
                  className: "bg-green-100 text-green-700",
                  badgeTitle: "20%",
                  badgeIcon: <Activity />,
                }}
              />
              <StatsCard
                title={data?.data?.base_salary ? data.data.base_salary : 200}
                subtitle="Base Salary"
                icon={<Banknote />}
                Badge={{
                  variant: "default",
                  className: "bg-blue-100 text-blue-700 p-2",
                  badgeTitle: `Commission Rate ${data?.data?.commission_rate ? data.data.commission_rate : 5}%`,
                  badgeIcon: <> </>,
                }}
              />
              <StatsCard
                title={
                  data?.data?.rejected_merchants
                    ? data.data.rejected_merchants
                    : 20
                }
                subtitle="Rejected stores"
                icon={<Store />}
                Badge={{
                  variant: "default",
                  className: "bg-red-100 text-red-700 ",
                  badgeTitle: "",
                  badgeIcon: <AlertTriangleIcon />,
                }}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default AgentDetails;
