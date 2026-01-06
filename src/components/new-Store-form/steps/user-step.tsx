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

const UserStep = () => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="user.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("User Name")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter user name")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="user.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Email")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter email")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="user.password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Password")}</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder={t("Enter password")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="user.password_confirmation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Confirm Password")}</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder={t("Confirm password")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="user.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Phone Number")}</FormLabel>
            <FormControl>
              <Input placeholder={t("Enter phone number")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="user.type"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <Input {...field} value="manager" type="hidden" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default UserStep;
