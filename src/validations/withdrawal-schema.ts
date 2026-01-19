import { z } from "zod";

export const withdrawalBaseSchema = z.object({
  amount: z.coerce
    .number()
    .min(1, "Amount must be at least 1"),
  method: z.enum(["bank_transfer", "wallet"], {
    message: "Withdrawal method is required",
  }),
});

export type WithdrawalFormValues = z.infer<typeof withdrawalBaseSchema>;

export const getWithdrawalSchema = (t: (key: string) => string) => {
  return z.object({
    amount: z.coerce
      .number()
      .min(1, t("Amount must be at least 1")),
    method: z.enum(["bank_transfer", "wallet"], {
      message: t("Withdrawal method is required"),
    }),
  });
};
