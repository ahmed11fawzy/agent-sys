import type { Transaction } from "@/types/transaction-types";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

export const transactionColumns = (t: TFunction): ColumnDef<Transaction>[] => [
  {
    accessorKey: "id",
    header: t("ID"),
  },
  {
    accessorKey: "amount",
    header: t("Amount"),
  },
  {
    accessorKey: "type",
    header: t("Type"),
  },
  {
    accessorKey: "method",
    header: t("Method"),
  },
  {
    accessorKey: "status",
    header: t("Status"),
    cell: ({ row }) => {
      const status = row.original.status;

      // Define styles based on your status values ('paid', 'calculated', etc.)
      let badgeClass = "bg-gray-100 text-gray-700"; // Default

      switch (status) {
        case "completed":
          badgeClass = "bg-green-100 text-green-700 border-green-200";
          break;
        case "pending":
          badgeClass = "bg-amber-100 text-amber-700 border-amber-200";
          break;
        case "failed":
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
  {
    accessorKey: "created_at",
    header: t("Created At"),
  },
];
