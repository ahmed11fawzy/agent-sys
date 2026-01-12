import { z } from "zod";

export const userSchema = (t: any) =>
  z
    .object({
      name: z.string().min(1, t("Name is required")),
      email: z.string().email(t("Invalid email address")),
      password: z
        .string()
        .min(8, t("Password must be at least 8 characters")),
      password_confirmation: z
        .string()
        .min(8, t("Password confirmation must be at least 8 characters")),
      phone: z.string().optional(),
      type: z.string().default("manager"),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("Passwords do not match"),
      path: ["password_confirmation"],
    });

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_FILE_TYPES = [...ACCEPTED_IMAGE_TYPES, "application/pdf"];

export const storeSchema = (t: any) =>
  z.object({
    name_ar: z.string().min(1, t("Arabic Name is required")),
    name_en: z.string().min(1, t("English Name is required")),
    business_activitie_id: z.string().min(1, t("Business Activity is required")),
    market_id: z.string().min(1, t("Market is required")),
    email: z.string().email(t("Invalid store email")),
    phone: z.string().min(1, t("Store Phone is required")),
    location: z.string().min(1, t("Location is required")),
    street: z.string().min(1, t("Street is required")),
    zip_code: z.string().min(1, t("Zip Code is required")),
    subcode: z.string().optional(),
    mailbox: z.string().optional(),
    location_id: z.string().min(1, t("Location ID is required")),
    store_image: z
      .any()
      .refine((file) => file, t("Store image is required"))
      .refine(
        (file) => file?.size <= MAX_FILE_SIZE,
        t("Max file size is 5MB.")
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        t("Only .jpg, .jpeg, .png and .webp formats are supported.")
      ),
    store_logo: z
      .any()
      .refine((file) => file, t("Store logo is required"))
      .refine(
        (file) => file?.size <= MAX_FILE_SIZE,
        t("Max file size is 5MB.")
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        t("Only .jpg, .jpeg, .png and .webp formats are supported.")
      ),
  });

export const businessSchema = (t: any) =>
  z.object({
    business_name: z.string().min(1, t("Business Name is required")),
    commercial_registration_number: z
      .string()
      .min(1, t("CR Number is required")),
    unified_number: z.string().min(1, t("Unified Number is required")),
    cr_expiry_date: z.string().min(1, t("CR Expiry Date is required")),
    owner_phone: z.string().min(1, t("Owner Phone is required")),
    municipal_license_number: z.string().optional(),
    tax_number: z.string().optional(),
    cr_file_url: z
      .any()
      .refine((file) => file, t("CR File is required"))
      .refine(
        (file) => file?.size <= MAX_FILE_SIZE,
        t("Max file size is 5MB.")
      )
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
        t("Only .jpg, .jpeg, .png, .webp and .pdf formats are supported.")
      ),
  });

export const storeFormSchema = (t: any) =>
  z.object({
    user: userSchema(t),
    store: storeSchema(t),
    business: businessSchema(t),
  });

export type StoreFormValues = z.infer<ReturnType<typeof storeFormSchema>>;
export type UserStepValues = z.infer<ReturnType<typeof userSchema>>;
export type StoreStepValues = z.infer<ReturnType<typeof storeSchema>>;
export type BusinessStepValues = z.infer<ReturnType<typeof businessSchema>>;
