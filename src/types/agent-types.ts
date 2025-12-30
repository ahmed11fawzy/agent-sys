export type AgentResponse = {
  data: Agent[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type Agent = {
  id: number;
  uuid: string;
  agent_code: string;
  national_id: string;
  bank_name: string;
  iban: string;
  assigned_areas: string[];
  salary_type: "fixed" | "commission" | "mixed";
  base_salary: number;
  commission_rate: number;
  daily_target: number;
  weekly_target: number;
  monthly_target: number;
  current_lat: number;
  current_lng: number;
  is_online: boolean;
  status: "active" | "inactive" | "suspended";
  hire_date: string; // ISO date
  notes: string | null;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  user: AgentUser;
  team: AgentTeam;
};

export type AgentUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  birth_date: string;
  gender: 0 | 1; // 0 = female, 1 = male (adjust if needed)
};

export type AgentTeam = {
  id: number;
  name: string;
  manager: TeamManager;
};

export type TeamManager = {
  id: number;
  name: string;
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
