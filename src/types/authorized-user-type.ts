export type AuthorizedUser = {
    id: number;
    name: string;
    avatar: string | null;
    type: "admin" | "agent" | "team_manager" | string;
    is_active: 0 | 1;
    store_id: number | null;
    token: string;
    all_permissions: string[];
}