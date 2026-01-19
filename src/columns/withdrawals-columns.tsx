import type { Withdrawal } from "@/types/withdrawals-types";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

export const withdrawalsColumns = (t: TFunction): ColumnDef<Withdrawal>[] => [
  {
    accessorKey: "id",
    header: t("ID"),
  },
  {
    accessorKey: "user",
    header: t("User"),
    cell: ({ row }) => row.original.user.name,
  },
  {
    accessorKey: "amount",
    header: t("Amount"),
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
        case "approved":
          badgeClass = "bg-green-100 text-green-700 border-green-200";
          break;
        case "pending":
          badgeClass = "bg-amber-100 text-amber-700 border-amber-200";
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
  {
    accessorKey: "created_at",
    header: t("Created At"),
  },
];
