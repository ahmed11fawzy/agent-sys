/* =======================
   Pagination
======================= */
export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type MetaLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

/* =======================
   Generic Paginated Response
======================= */
export type PaginatedResponse<T> = {
  data: T[]; // ✅ iterable
  links: PaginationLinks;
  meta: PaginationMeta;
};