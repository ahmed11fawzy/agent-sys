export type AuthUserResponse = {
  status: boolean;
  data: AuthUser;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  birth_date: string; // YYYY-MM-DD
  gender: 0 | 1;
  type: "admin" | "agent" | "team_manager" | string;
  is_active: 0 | 1;
  store_id: number | null;

  email_verified_at: string | null;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  created_by: number | null;

  token: string;
  all_permissions: string[];
};

export type LoginError = {
    message: string;
    status: boolean;
}
