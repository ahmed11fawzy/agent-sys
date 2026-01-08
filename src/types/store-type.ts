// agent-stores.types.ts

export type AgentStoresResponse = {
  data: AgentStore[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type AgentStore = {
  id: number;
  name: string;
  agent: Agent;
  user: User;
  team: Team;
  business: Business;
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



/* ===================== AGENT ===================== */

export type Agent = {
  id: number;
  name: string;
  code: string;
};

/* ===================== USER ===================== */

export type User = {
  id: number;
  name: string;
};

/* ===================== TEAM ===================== */

export type Team = {
  id: number;
  name: string;
};

/* ===================== BUSINESS ===================== */

export type Business = {
  id: number;
  business_name: string;
  commercial_registration_number: string;
  cr_expiry_date: string; // YYYY-MM-DD HH:mm:ss
  cr_file_url: string;
  status: "pending" | "approved" | "rejected" | string;
};
