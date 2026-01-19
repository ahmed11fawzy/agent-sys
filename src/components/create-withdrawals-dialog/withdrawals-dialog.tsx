import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { useTranslation } from "react-i18next";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getWithdrawalSchema,
  type WithdrawalFormValues,
} from "@/validations/withdrawal-schema"; // Adjust path as needed
import { useState } from "react";
import { useCreateWithdrawalMutation } from "@/features/api-queries/wallet-query";
import { toast } from "sonner";

export function WithdrawalsDialog() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [createWithdrawal] = useCreateWithdrawalMutation();
  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(
      getWithdrawalSchema(t)
    ) as Resolver<WithdrawalFormValues>,
    defaultValues: {
      amount: 0,
      method: "bank_transfer",
    },
  });

  const onSubmit = async (data: WithdrawalFormValues) => {
    try {
      console.log("Form data:", data);
      // Handle your withdrawal submission here

      await createWithdrawal(data).unwrap();
      toast.success(t("Withdrawal is processed successfully"));
      // After successful submission, close the dialog:
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(t("Withdrawal process is failed !", error.message as string));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="primary"
          className="py-5 px-6 bg-linear-to-r from-(--primary-700) via-(--primary-600) to-(--primary-400)"
        >
          {t("Withdraw")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-156.25">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("Create Withdraw")}</DialogTitle>
            <DialogDescription>
              {t("Enter the withdrawal details below.")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Amount */}
            <Field>
              <FieldLabel htmlFor="amount">{t("Amount")} *</FieldLabel>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...form.register("amount")}
                placeholder="0.00"
              />
              <FieldError
                errors={[{ message: form.formState.errors.amount?.message }]}
              />
            </Field>

            {/* Withdrawal Method */}
            <Field>
              <FieldLabel>{t("Withdrawal Method")} *</FieldLabel>
              <Controller
                name="method"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select method")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">
                        {t("Bank Transfer")}
                      </SelectItem>
                      <SelectItem value="wallet">{t("Wallet")}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError
                errors={[{ message: form.formState.errors.method?.message }]}
              />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t("Cancel")}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="cursor-pointer bg-linear-to-r from-(--primary-700) via-(--primary-600) to-(--primary-400)"
            >
              {form.formState.isSubmitting
                ? t("withdrawing...")
                : t("withdraw")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
