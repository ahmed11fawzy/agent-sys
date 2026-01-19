// transactions.types.ts

import type { PaginatedResponse } from "./paginatedResponse";

/* =======================
   User
======================= */
export type TransactionUser = {
  id: number;
  name: string;
  type: "sales_agent" | string;
};

/* =======================
   Transaction
======================= */
export type Transaction = {
  id: number;
  user: TransactionUser;
  type: "in" | "out";
  method: "wallet" | string;
  amount: string; // API returns string
  status: "completed" | "pending" | "failed";
  desc: string | null;
  created_at: string; // keep as string or parse later
};



/* =======================
   Final API Response
======================= */
export type TransactionsResponse = PaginatedResponse<Transaction>;
