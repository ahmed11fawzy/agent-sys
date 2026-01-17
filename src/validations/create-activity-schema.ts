import { z } from "zod";

// Create the base schema - this is the actual Zod schema
const createActivityBaseSchema = z.object({
  activity_type: z.enum(
    ["report", "meeting", "registration", "follow_up", "call", "visit"],
    {
      message: "Activity type is required",
    }
  ),
  store_id: z.coerce.number({
    message: "Store is required",
    
  }),
  location_name: z.string().max(200).optional(),
  location_lat: z.coerce
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .optional()
    .or(z.literal("")),
  location_lng: z.coerce
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .optional()
    .or(z.literal("")),
  duration_minutes: z.coerce
    .number()
    .min(1, "Duration must be at least 1 minute")
    .optional()
    .or(z.literal("")),
  notes: z.string().optional(),
  outcome: z
    .enum(["rescheduled", "failed", "pending", "successful"])
    .default("pending"),
  scheduled_at: z.string().datetime("Invalid datetime format").optional(),
  started_at: z.string().datetime("Invalid datetime format").optional(),
  completed_at: z.string().datetime("Invalid datetime format").optional(),
});

// Export the type from the base schema
export type CreateActivityFormValues = z.infer<typeof createActivityBaseSchema>;

// Export a function that returns the schema with translated messages
export const createActivitySchema = (t: (key: string) => string) => {
  return createActivityBaseSchema.refine(
    () => {
      // Custom validations if needed
      return true;
    },
    {
      message: t("Validation failed"),
      path: [], // Specify field path if needed
    }
  );
};