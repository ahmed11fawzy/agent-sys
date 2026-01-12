export type CommissionResponse = {
  data: Commission[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type Commission = {
  id: number;
  uuid: string;
  agent_id: number;
  period: {
    type: "monthly" | "weekly" | "daily";
    date: string;
  };
  statistics: CommissionStatistics;
  financials: CommissionFinancials;
  payment: CommissionPayment;
  notes: string | null;
  created_at: string;
};

export type CommissionStatistics = {
  registered: number;
  approved: number;
  active: number;
  rejected: number;
  target: number;
  achievement_rate: number;
};

export type CommissionFinancials = {
  base_salary: number;
  commission: number;
  bonuses: number;
  deductions: number;
  total: number;
};

export type CommissionPayment = {
  status: "paid" | "pending" | "cancelled" | "approved" | "calculated";
  method: "bank_transfer" | "wallet" | "cash";
  paid_at: string | null;
  transaction_ref: string | null;
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
