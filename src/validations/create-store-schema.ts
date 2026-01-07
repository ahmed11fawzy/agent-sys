import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(8, "Password confirmation must be at least 8 characters"),
    phone: z.string().optional(),
    type: z.string().default("manager"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const storeSchema = z.object({
  name_ar: z.string().min(1, "Arabic Name is required"),
  name_en: z.string().min(1, "English Name is required"),
  business_activitie_id: z.string().min(1, "Business Activity is required"),
  market_id: z.string().min(1, "Market is required"),
  email: z.string().email("Invalid store email"), // Changed from store_email
  phone: z.string().min(1, "Store Phone is required"), // Changed from store_phone
  location: z.string().min(1, "Location is required"),
  street: z.string().min(1, "Street is required"),
  zip_code: z.string().min(1, "Zip Code is required"),
  subcode: z.string().optional(),
  mailbox: z.string().optional(),
  location_id: z.string().optional(),
});

export const businessSchema = z.object({
  business_name: z.string().min(1, "Business Name is required"),
  commercial_registration_number: z.string().min(1, "CR Number is required"),
  unified_number: z.string().min(1, "Unified Number is required"),
  cr_expiry_date: z.string().min(1, "CR Expiry Date is required"),
  owner_phone: z.string().min(1, "Owner Phone is required"),
  municipal_license_number: z.string().optional(),
  tax_number: z.string().optional(),
});

export const storeFormSchema = z.object({
  user: userSchema,
  store: storeSchema,
  business: businessSchema,
});

export type StoreFormValues = z.infer<typeof storeFormSchema>;
export type UserStepValues = z.infer<typeof userSchema>;
export type StoreStepValues = z.infer<typeof storeSchema>;
export type BusinessStepValues = z.infer<typeof businessSchema>;
