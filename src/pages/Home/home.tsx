import Header from "@/components/page-header/Header";
import { HomeIcon } from "lucide-react";
import TeamStats from "./team.stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns, type Payment } from "@/components/agents-table/columns";
import { DataTable } from "@/components/agents-table/data-table";

const paymentsMock: Payment[] = [
  {
    id: "PMT-001",
    name: "John Carter",
    stores: 5,
    commission: 1240,
    status: "success",
  },
  {
    id: "PMT-002",
    name: "Aisha Khan",
    stores: 3,
    commission: 860,
    status: "processing",
  },
  {
    id: "PMT-003",
    name: "Miguel Santos",
    stores: 7,
    commission: 1890,
    status: "pending",
  },
  {
    id: "PMT-004",
    name: "Emily Chen",
    stores: 2,
    commission: 420,
    status: "failed",
  },
  {
    id: "PMT-005",
    name: "David Okafor",
    stores: 4,
    commission: 1030,
    status: "success",
  },
];

const Home = () => {
  return (
    <main className="mt-5">
      <Header
        title="Dashboard"
        subTitle="welcome to dashboard "
        icon={<HomeIcon className="h-5 w-5" />}
      />
      <section className="flex flex-col gap-5">
        <TeamStats />
        {/* Agent List */}
        <Card>
          <CardHeader>
            <CardTitle>Agent List</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={paymentsMock} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Home;
