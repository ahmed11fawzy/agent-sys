// agent-commission-settings.types.ts

export type AgentCommissionSettingsResponse = {
  data: AgentCommissionSetting[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type AgentCommissionSetting = {
  id: number;

  user: {
    id: number;
    name: string;
  };

  team: {
    id: number;
    name: string;
  };

  agent: {
    id: number;
    code: string;
  };

  salary_type: "fixed" | "commission" | "fixed_plus_commission";

  fixed_salary: number;

  commissions: {
    per_new_store: number;
    per_approved: number;
    per_active: number;
    on_sales_percent: number;
    on_revenue_percent: number;

    tiered: {
      tier_name: string;
      min_sales: number;
      max_sales: number;
      commission_rate: number;
    }[];
  };

  bonuses: {
    on_target: number;
    perfect_attendance: number;
  };

  deductions: {
    per_absent: number;
    late_followup: number;
  };

  created_at: string; // YYYY-MM-DD HH:mm:ss
  updated_at: string; // YYYY-MM-DD HH:mm:ss
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};
