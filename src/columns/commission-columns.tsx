"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import type { Agent, AgentUser } from "@/types/agent-types";

export const getColumns = (t: TFunction): ColumnDef<Agent>[] => [
  {
    accessorKey: "user",
    header: t("Name"),

    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-500 drop-shadow-accent">
            {(row.getValue("user") as AgentUser)?.avatar ? (
              <img src={(row.getValue("user") as AgentUser).avatar} alt="" />
            ) : (
              (row.getValue("user") as AgentUser).name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="font-medium">
              {(row.getValue("user") as AgentUser).name}
            </div>
            <div className="text-sm text-muted-foreground">
              {row.original.agent_code}
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "base_salary",
    header: t("Base Salary"),
  },
  {
    accessorKey: "commission_rate",
    header: t("Commission Rate"),
  },
  {
    accessorKey: "base_salary",
    header: t("Base Salary"),
  },
  {
    accessorKey: "status",
    header: t("Status"),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : status === "inactive"
                ? "bg-yellow-100 text-(--primary-800)"
                : status === "processing"
                  ? "bg-blue-100 text-slate-800"
                  : status === "suspended"
                    ? "bg-red-100 text-red-700"
                    : "border bg-red-100 text-red-700"
          }`}
        >
          {t(status)}
        </span>
      );
    },
  },
];
