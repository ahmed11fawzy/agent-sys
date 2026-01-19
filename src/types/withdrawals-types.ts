// withdrawals.types.ts

import type { PaginatedResponse } from "./paginatedResponse";

/* =======================
   Wallet
======================= */
export type Wallet = {
  id: number;
  balance: string; // API returns string
};

/* =======================
   User
======================= */
export type WithdrawalUser = {
  id: number;
  name: string;
  type: "sales_agent" | string;
};

/* =======================
   Withdrawal
======================= */
export type Withdrawal = {
  id: number;
  wallet: Wallet;
  user: WithdrawalUser;
  amount: string; // string from API
  method: "bank_transfer" | "wallet" | string;
  status: "pending" | "approved" | "rejected";
  admin_notes: string | null;
  created_at: string;
  processed_at: string | null;
};


export type WithdrawalsResponse = PaginatedResponse<Withdrawal>;