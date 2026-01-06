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

const StoreStep = () => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="store.name_ar"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Store Name (Arabic)")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter store name in Arabic")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.name_en"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Store Name (English)")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("Enter store name in English")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.business_activitie_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Business Activity ID")}</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={t("Enter Activity ID")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.market_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Market ID")}</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={t("Enter Market ID")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Store Email")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter store email")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Store Phone")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter store phone")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Location")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter location URL")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.street"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Street")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter street")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.zip_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Zip Code")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter zip code")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.subcode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Subcode")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter subcode")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.mailbox"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Mailbox")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter mailbox")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="store.location_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Location ID")}</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={t("Enter Location ID")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StoreStep;
