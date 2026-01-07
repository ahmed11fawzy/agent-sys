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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_FILE_TYPES = [...ACCEPTED_IMAGE_TYPES, "application/pdf"];

export const storeSchema = z.object({
  name_ar: z.string().min(1, "Arabic Name is required"),
  name_en: z.string().min(1, "English Name is required"),
  business_activitie_id: z.string().min(1, "Business Activity is required"),
  market_id: z.string().min(1, "Market is required"),
  email: z.string().email("Invalid store email"),
  phone: z.string().min(1, "Store Phone is required"),
  location: z.string().min(1, "Location is required"),
  street: z.string().min(1, "Street is required"),
  zip_code: z.string().min(1, "Zip Code is required"),
  subcode: z.string().optional(),
  mailbox: z.string().optional(),
  location_id: z.string().min(1, "Location ID is required"),
  store_image: z
    .any()
    .refine((file) => file, "Store image is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  store_logo: z
    .any()
    .refine((file) => file, "Store logo is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const businessSchema = z.object({
  business_name: z.string().min(1, "Business Name is required"),
  commercial_registration_number: z.string().min(1, "CR Number is required"),
  unified_number: z.string().min(1, "Unified Number is required"),
  cr_expiry_date: z.string().min(1, "CR Expiry Date is required"),
  owner_phone: z.string().min(1, "Owner Phone is required"),
  municipal_license_number: z.string().optional(),
  tax_number: z.string().optional(),
  cr_file_url: z
    .any()
    .refine((file) => file, "CR File is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .webp and .pdf formats are supported."
    ),
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
