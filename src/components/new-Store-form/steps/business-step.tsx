import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

const BusinessStep = () => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="business.business_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Business Name")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter business name")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="business.commercial_registration_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Commercial Registration Number")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter CR number")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="business.unified_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Unified Number")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter unified number")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="business.cr_expiry_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("CR Expiry Date")}</FormLabel>
            <FormControl>
              <Input
                type="date"
                placeholder={t("Select expiry date")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="business.owner_phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Owner Phone")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter owner phone")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="business.municipal_license_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Municipal License Number")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("Enter municipal license number")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="business.tax_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Tax Number")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter tax number")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BusinessStep;
