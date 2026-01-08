export type AgentActivitiesResponse = {
  data: AgentActivity[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

/* ===================== ACTIVITY ===================== */

export type AgentActivity = {
  id: number;
  uuid: string;

  agent: ActivityAgent;

  activity_type: "visit" | "call" | "meeting" | "registration" | string;
  store_id: number;

  location: ActivityLocation;

  duration_minutes: number;
  notes: string | null;

  outcome: "successful" | "failed" | "pending" | string;
  is_successful: boolean;

  attachments: string[];

  scheduled_at: string; // YYYY-MM-DD HH:mm:ss
  started_at: string | null;
  completed_at: string | null;

  created_at: string;
  updated_at: string;
};

/* ===================== NESTED ===================== */

export type ActivityAgent = {
  id: number;
  code: string;
};

export type ActivityLocation = {
  name: string;
  lat: number;
  lng: number;
};

/* ===================== PAGINATION ===================== */

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
