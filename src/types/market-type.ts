
export interface Market {
  id: number;
  name: string;
  market_type: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface MarketsResponse {
  data: Market[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
