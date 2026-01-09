import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createActivitySchema,
  CreateActivityFormValues,
} from "@/validations/create-activity-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateActivityMutation } from "@/features/api-queries/activities-query";
import { useGetAgentStoresQuery } from "@/features/api-queries/stores-query";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import type { AgentStore } from "@/types/store-type";
import { toast } from "sonner";

export const NewActivityForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [createActivity, { isLoading }] = useCreateActivityMutation();
  const { data: stores, isLoading: isStoresLoading } =
    useGetAgentStoresQuery("");

  const form = useForm<CreateActivityFormValues>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      activity_type: "visit",
      location_name: "",
      location_lat: "",
      location_lng: "",
      duration_minutes: "",
      notes: "",
      outcome: "pending",
      scheduled_at: "",
      started_at: "",
      completed_at: "",
    },
  });

  async function onSubmit(data: CreateActivityFormValues) {
    try {
      await createActivity(data).unwrap();
      toast.success(t("Activity created successfully"));
      navigate("/daily-visits");
    } catch (error) {
      console.error(error);
      toast.error(t("Failed to create activity"));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Activity Type */}
          <FormField
            control={form.control}
            name="activity_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Activity Type")} *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select activity type")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "report",
                      "meeting",
                      "registration",
                      "follow_up",
                      "call",
                      "visit",
                    ].map((type) => (
                      <SelectItem key={type} value={type}>
                        {t(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Store */}
          <FormField
            control={form.control}
            name="store_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Store")} *</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger disabled={isStoresLoading}>
                      <SelectValue placeholder={t("Select store")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stores?.data?.map((store: AgentStore) => (
                      <SelectItem key={store.id} value={store.id.toString()}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location Name */}
          <FormField
            control={form.control}
            name="location_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Location Name")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("Enter location name")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration_minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Duration (Minutes)")}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min={1} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Lat/Lng */}
          <FormField
            control={form.control}
            name="location_lat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Latitude")}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} step="any" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location_lng"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Longitude")}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} step="any" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Outcome */}
          <FormField
            control={form.control}
            name="outcome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Outcome")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select outcome")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["rescheduled", "failed", "pending", "successful"].map(
                      (outcome) => (
                        <SelectItem key={outcome} value={outcome}>
                          {t(outcome)}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Scheduled At */}
          <FormField
            control={form.control}
            name="scheduled_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Scheduled At")}</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Notes")}</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder={t("Add any notes here")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/daily-visits")}
          >
            {t("Cancel")}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("Create Activity")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
