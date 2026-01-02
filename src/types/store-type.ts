// agent-stores.types.ts

export type AgentStoresResponse = {
  data: AgentStore[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type AgentStore = {
  id: number;
  name: string;
  user: {
    id: number;
    name: string;
  };
  agent: {
    id: number;
    name: string;
    code: string;
  };
  team: {
    id: number;
    name: string;
  };
  business: {
    id: number;
    business_name: string;
    commercial_registration_number: string;
    cr_file_url: string;
    cr_expiry_date: string; // YYYY-MM-DD
    status: "active" | "inactive" | "suspended";
  };
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
