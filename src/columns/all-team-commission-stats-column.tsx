import type { Commission } from "@/types/commission-data-types";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

export const getColumns = (t: TFunction): ColumnDef<Commission>[] => [
  // --- Column: Agent Name (with Avatar fallback) ---
  {
    accessorKey: "name",
    header: t("Agent Name"),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const initial = name ? name.charAt(0).toUpperCase() : "-";

      return (
        <div className="flex items-center gap-2">
          {/* Fallback Avatar logic since JSON doesn't have an image URL */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 font-bold">
            {initial}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{name}</span>
            <span className="text-xs text-muted-foreground">
              {row.original.agent_id}
            </span>
          </div>
        </div>
      );
    },
  },

  // --- Column: Period ---
  {
    accessorKey: "period.date", // Accessing nested data
    header: t("Period"),
    cell: ({ row }) => {
      const date = new Date(row.original.period.date);
      const type = row.original.period.type;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {date.toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="text-xs text-muted-foreground capitalize">
            {t(type)}
          </span>
        </div>
      );
    },
  },

  // --- Column: Statistics (Achievement) ---
  {
    accessorKey: "statistics.achievement_rate",
    header: t("Achievement"),
    cell: ({ row }) => {
      const rate = row.original.statistics.achievement_rate;
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{rate}%</span>
          <span className="text-xs text-muted-foreground">
            ({row.original.statistics.approved} /{" "}
            {row.original.statistics.target})
          </span>
        </div>
      );
    },
  },

  // --- Column: Commission Amount ---
  {
    accessorKey: "financials.commission",
    header: t("Commission"),
    cell: ({ row }) => {
      const amount = parseFloat(
        row.original.financials.commission as unknown as string
      );
      return <span className="font-medium">{amount.toFixed(2)}</span>;
    },
  },

  // --- Column: Total Amount ---
  {
    accessorKey: "financials.total",
    header: t("Total Payout"),
    cell: ({ row }) => {
      const amount = parseFloat(
        row.original.financials.total as unknown as string
      );
      return (
        <span className="font-bold text-primary">{amount.toFixed(2)}</span>
      );
    },
  },

  // --- Column: Payment Status ---
  {
    accessorKey: "payment.status",
    header: t("Status"),
    cell: ({ row }) => {
      const status = row.original.payment.status;

      // Define styles based on your status values ('paid', 'calculated', etc.)
      let badgeClass = "bg-gray-100 text-gray-700"; // Default

      switch (status) {
        case "paid":
          badgeClass = "bg-green-100 text-green-700 border-green-200";
          break;
        case "calculated":
          badgeClass = "bg-blue-100 text-blue-700 border-blue-200";
          break;
        case "pending":
          badgeClass = "bg-yellow-100 text-yellow-700 border-yellow-200";
          break;
        case "rejected":
          badgeClass = "bg-red-100 text-red-700 border-red-200";
          break;
      }

      return (
        <span
          className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badgeClass}`}
        >
          {t(status)}
        </span>
      );
    },
  },
];
