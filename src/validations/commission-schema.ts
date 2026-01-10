import { z } from "zod";

export const CommissionTypeSchema = z.enum([
  "fixed_only",
  "commission_only",
  "fixed_plus_commission", // Assuming strict disjoint types for now
]);

export type CommissionType = z.infer<typeof CommissionTypeSchema>;

// Base schema for common fields
const BaseSchema = z.object({
  agent_id: z.string().min(1, "Agent is required"),
  salary_type: CommissionTypeSchema,
});

// Fixed Only Schema
const FixedOnlySchema = BaseSchema.extend({
  salary_type: z.literal("fixed_only"),
  fixed_salary: z.coerce.number().min(0, "Must be a positive number"),
  bonus_perfect_attendance: z.coerce.number().min(0).optional(),
  deduction_per_absent: z.coerce.number().min(0).optional(),
});

// Commission Only Schema
const CommissionOnlySchema = BaseSchema.extend({
  salary_type: z.literal("commission_only"),
  commission_per_new_store: z.coerce.number().min(0).optional(),
  commission_per_approved: z.coerce.number().min(0).optional(),
  commission_on_sales: z.coerce.number().min(0).max(100).optional(), // Assuming percentage 0-100
  bonus_on_target_achievement: z.coerce.number().min(0).optional(),
});

// Fixed + Commission Schema
const MixedSchema = BaseSchema.extend({
  salary_type: z.literal("fixed_plus_commission"),
  fixed_salary: z.coerce.number().min(0, "Must be a positive number"),
  bonus_perfect_attendance: z.coerce.number().min(0).optional(),
  deduction_per_absent: z.coerce.number().min(0).optional(),
  commission_per_new_store: z.coerce.number().min(0).optional(),
  commission_per_approved: z.coerce.number().min(0).optional(),
  commission_on_sales: z.coerce.number().min(0).max(100).optional(),
  bonus_on_target_achievement: z.coerce.number().min(0).optional(),
  deduction_late_followup: z.coerce.number().min(0).optional(),
});

// Discriminated Union
export const CommissionFormSchema = z.discriminatedUnion("salary_type", [
  FixedOnlySchema,
  CommissionOnlySchema,
  MixedSchema,
]);

export type CommissionFormValues = z.infer<typeof CommissionFormSchema>;

// Export a flattened type for useForm generic to avoid union type conflicts in RHF
export type CommissionFormValuesFlat = {
  agent_id: string;
  salary_type: CommissionType;
  fixed_salary?: number;
  bonus_perfect_attendance?: number;
  deduction_per_absent?: number;
  commission_per_new_store?: number;
  commission_per_approved?: number;
  commission_on_sales?: number;
  bonus_on_target_achievement?: number;
  deduction_late_followup?: number;
};
