import { z } from "zod";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
export const createAgentSchema = z.object({
  // User Data
  user_name: z.string().min(3, { message: "Name be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  password_confirmation: z.string(),
  birth_date: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Invalid date" }),
  gender: z.enum(["0", "1"]), // 0 for female, 1 for male
  status: z.enum(["active", "inactive","suspended","on_leave"]), // 0 for inactive, 1 for active
  avatar: z
          .any()
          .optional()
          .refine((file) => {
              if (!file) return true;
              if (file instanceof File) {
                  return file.size <= MAX_FILE_SIZE;
              }
              return true;
          }, `Max file size is 2MB.`)
          .refine((file) => {
              if (!file) return true;
              if (file instanceof File) {
                  return ACCEPTED_IMAGE_TYPES.includes(file.type);
              }
              return true;
          }, "Only .jpg, .jpeg, .png formats are supported."),
// Agent Data
  national_id: z.string().min(1, { message: "National ID is required" }),
  bank_name: z.string().min(1, { message: "Bank Name is required" }),
  iban: z.string().min(1, { message: "IBAN is required" }),
  salary_type: z.enum(["fixed", "commission", "mixed"]),
  base_salary: z.coerce.number().min(0, { message: "Base Salary must be a positive number" }),
  commission_rate: z.coerce.number().min(0).max(100, { message: "Commission Rate must be between 0 and 100" }),
  daily_target: z.coerce.number().min(0),
  weekly_target: z.coerce.number().min(0),
  monthly_target: z.coerce.number().min(0),
  hire_date: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Invalid date" }),
  notes: z.string().optional(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export type CreateAgentSchema = z.infer<typeof createAgentSchema>;
