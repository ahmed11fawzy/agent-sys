import type { ColumnDef } from "@tanstack/react-table";
import type { AgentActivity } from "@/types/activities-types";
import { useTranslation } from "react-i18next";
import { MoreHorizontal, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const useActivityColumns = ({
  onDelete,
  onView,
}: {
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}): ColumnDef<AgentActivity>[] => {
  const { t } = useTranslation();

  return [
    {
      accessorKey: "id",
      header: t("ID"),
    },
    {
      accessorKey: "agent.code",
      header: t("Agent Code"),
    },
    {
      accessorKey: "activity_type",
      header: t("Activity Type"),
      cell: ({ row }) => t(row.getValue<string>("activity_type")),
    },
    {
      accessorKey: "location.name",
      header: t("Location"),
    },
    {
      accessorKey: "scheduled_at",
      header: t("Date"),
      cell: ({ row }) => {
        const date = new Date(row.getValue("scheduled_at"));
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
      },
    },
    {
      accessorKey: "outcome",
      header: t("Outcome"),
      cell: ({ row }) => {
        const outcome = row.getValue("outcome") as string;
        let colorClass = "bg-gray-100 text-gray-800";
        if (outcome === "successful")
          colorClass = "bg-green-100 text-green-800";
        if (outcome === "failed") colorClass = "bg-red-100 text-red-800";
        if (outcome === "pending") colorClass = "bg-yellow-100 text-yellow-800";

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
          >
            {t(outcome)}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const activity = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t("Open menu")}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onView(activity.id)}>
                <Eye className="mr-2 h-4 w-4" />
                {t("View Details")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(activity.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                {t("Delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
