import * as z from "zod";

export const commissionSchema = z.object({
  agent_id: z.coerce.number().min(1, "Agent is required"),
  period_type: z.enum(["monthly", "weekly", "daily"]),
  period_date: z.string().min(1, "Period date is required"),
  total_stores_registered: z.coerce.number().min(0).optional(),
  approved_stores: z.coerce.number().min(0).optional(),
  active_stores: z.coerce.number().min(0).optional(),
  rejected_stores: z.coerce.number().min(0).optional(),
  target_stores: z.coerce.number().min(0).optional(),
  achievement_rate: z.coerce.number().min(0).max(100).optional(),
  base_salary: z.coerce.number().min(0).optional(),
  commission_amount: z.coerce.number().min(0).optional(),
  bonuses: z.coerce.number().min(0).optional(),
  deductions: z.coerce.number().min(0).optional(),
  total_payable: z.coerce.number().min(0).optional(),
  payment_status: z
    .enum(["cancelled", "paid", "approved", "calculated", "pending"])
    .optional(),
  payment_method: z.enum(["wallet", "cash", "bank_transfer"]).optional(),
  paid_at: z.string().optional(),
  transaction_ref: z.string().max(100).optional(),
  notes: z.string().optional(),
});