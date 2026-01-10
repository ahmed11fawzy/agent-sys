"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import type { AgentCommissionSetting } from "@/types/commission-types";

export const getCommissionColumns = (
  t: TFunction
): ColumnDef<AgentCommissionSetting>[] => [
  {
    accessorKey: "user",
    header: t("Agent"),
    cell: ({ row }) => {
      const user = row.original.user;
      const agent = row.original.agent;
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">{agent.code}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "team",
    header: t("Team"),
    cell: ({ row }) => row.original.team.name,
  },
  {
    accessorKey: "salary_type",
    header: t("Salary Type"),
    cell: ({ row }) => {
      const type = row.original.salary_type as string; // Casting to string to handle potential variants
      let label = type;
      switch (type) {
        case "fixed":
        case "fixed_only": // Handling potential variations if any, though type says 'fixed' | ...
          label = t("Fixed Only");
          break;
        case "commission":
        case "commission_only":
          label = t("Commission Only");
          break;
        case "fixed_plus_commission":
          label = t("Fixed + Commission");
          break;
        default:
          label = t(type);
      }
      return <div className="font-medium">{label}</div>;
    },
  },
  {
    accessorKey: "fixed_salary",
    header: t("Fixed Salary"),
    cell: ({ row }) => {
      const val = row.original.fixed_salary;
      return val ? val.toLocaleString() : "-";
    },
  },
  {
    accessorKey: "commissions",
    header: t("Commission Details"),
    cell: ({ row }) => {
      const comm = row.original.commissions;
      if (!comm) return "-";

      const details = [];
      if (comm.per_new_store > 0)
        details.push(`${t("Store")}: ${comm.per_new_store}`);
      if (comm.on_sales_percent > 0)
        details.push(`${t("Sales")}: ${comm.on_sales_percent}%`);

      if (details.length === 0) return "-";

      return (
        <div className="text-sm">
          {details.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "bonuses_deductions", // Virtual column for display
    header: t("Bonuses / Deductions"),
    cell: ({ row }) => {
      const bonuses = row.original.bonuses;
      const deductions = row.original.deductions;
      return (
        <div className="text-xs space-y-1">
          {bonuses?.perfect_attendance > 0 && (
            <span className="text-green-600 block">
              + {bonuses.perfect_attendance} ({t("Attendance")})
            </span>
          )}
          {deductions?.per_absent > 0 && (
            <span className="text-red-600 block">
              - {deductions.per_absent} ({t("Absent")})
            </span>
          )}
        </div>
      );
    },
  },
];
