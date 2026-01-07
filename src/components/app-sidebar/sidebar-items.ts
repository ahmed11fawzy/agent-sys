// Menu items.
import {
  Banknote,
  BarChart,
  Home,
  Inbox,
  Settings,
  Store,
} from "lucide-react";
import type { UserType } from "@/types/user-type";
import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
  allowedRoles: UserType[];
}

export const LeaderItems: SidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    allowedRoles: ["team_manager"],
  },
  {
    title: "Agents",
    url: "/agents",
    icon: Inbox,
    allowedRoles: ["team_manager"],
  },
  {
    title: "Stores",
    url: "/stores",
    icon: Store,
    allowedRoles: ["team_manager"],
  },
  {
    title: "Commissions",
    url: "/commissions",
    icon: Banknote,
    allowedRoles: ["team_manager"],
  },
  {
    title: "reports",
    url: "/reports",
    icon: BarChart,
    allowedRoles: ["team_manager"],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    allowedRoles: ["team_manager"],
  },
];

export const AgentItems: SidebarItem[] = [
  {
    title: "My Dashboard",
    url: "/my-dashboard",
    icon: Home,
    allowedRoles: ["sales_agent"],
  },
  {
    title: "Daily Visits",
    url: "/daily-visits",
    icon: Inbox,
    allowedRoles: ["sales_agent"],
  },
  {
    title: "My Stores",
    url: "/my-stores",
    icon: Store,
    allowedRoles: ["sales_agent"],
  },
  {
    title: "My Wallet",
    url: "/my-wallet",
    icon: Banknote,
    allowedRoles: ["sales_agent"],
  },
];
