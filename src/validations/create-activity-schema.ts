import { z } from "zod";

export const createActivitySchema = z.object({
  activity_type: z.enum(
    ["report", "meeting", "registration", "follow_up", "call", "visit"],
    {
      required_error: "Activity type is required",
    }
  ),
  store_id: z.coerce.number({
    required_error: "Store is required",
    invalid_type_error: "Store is required",
  }),
  location_name: z.string().max(200).optional(),
  location_lat: z.coerce
    .number()
    .min(-90)
    .max(90)
    .optional()
    .or(z.literal("")),
  location_lng: z.coerce
    .number()
    .min(-180)
    .max(180)
    .optional()
    .or(z.literal("")),
  duration_minutes: z.coerce.number().min(1).optional().or(z.literal("")),
  notes: z.string().optional(),
  outcome: z
    .enum(["rescheduled", "failed", "pending", "successful"])
    .optional(),
  scheduled_at: z.string().optional(),
  started_at: z.string().optional(),
  completed_at: z.string().optional(),
});

export type CreateActivityFormValues = z.infer<typeof createActivitySchema>;
