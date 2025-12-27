"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string;
  stores: number;
  commission: number;
  status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",

    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-500 drop-shadow-accent">
            {row.getValue("name").charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium">{row.getValue("name")}</div>
            <div className="text-sm text-muted-foreground">
              {row.getValue("email")}
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "stores",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stores
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "commission",
    header: "Commission",
    /*  cell: ({ row }) => {
      const amount = row.getValue("commission");

      return (
        <span className=" font-medium flex items-center gap-2">
          {amount} <SaudiRiyal />
        </span>
      );
    }, */
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            status === "pending"
              ? "bg-yellow-100 text-(--primary-800)"
              : status === "processing"
              ? "bg-blue-100 text-slate-800"
              : status === "success"
              ? "bg-green-100 text-green-700"
              : "border bg-red-100 text-red-700"
          }`}
        >
          {row.getValue("status")}
        </span>
      );
    },
  },
];
