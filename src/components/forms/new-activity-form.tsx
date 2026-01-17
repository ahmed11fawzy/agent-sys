import { useTranslation } from "react-i18next";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler } from "react-hook-form";
import {
  createActivitySchema,
  type CreateActivityFormValues,
} from "@/validations/create-activity-schema";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCreateActivityMutation } from "@/features/api-queries/activities-query";
import { useGetAgentStoresQuery } from "@/features/api-queries/stores-query";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import type { AgentStore } from "@/types/store-type";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "../ui/field";

export const NewActivityForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [createActivity, { isLoading }] = useCreateActivityMutation();
  const { data: stores, isLoading: isStoresLoading } =
    useGetAgentStoresQuery("");

  const form = useForm<CreateActivityFormValues>({
    resolver: zodResolver(
      createActivitySchema(t)
    ) as Resolver<CreateActivityFormValues>,
    defaultValues: {
      activity_type: "visit",
      store_id: undefined, // This matches the schema's number type
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

  const onSubmit: SubmitHandler<CreateActivityFormValues> = async (data) => {
    try {
      // Clean up empty strings to match backend expectations
      const payload = {
        ...data,
        location_lat: data.location_lat === "" ? undefined : data.location_lat,
        location_lng: data.location_lng === "" ? undefined : data.location_lng,
        duration_minutes:
          data.duration_minutes === "" ? undefined : data.duration_minutes,
      };

      await createActivity(payload).unwrap();
      toast.success(t("Activity created successfully"));
      navigate("/daily-visits");
    } catch (error) {
      console.error("Failed to create activity:", error);
      toast.error(t("Failed to create activity"));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Activity Type */}
              <Field>
                <FieldLabel>{t("Activity Type")} *</FieldLabel>
                <Select
                  {...form.register("activity_type")}
                  defaultValue="visit"
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select activity type")} />
                  </SelectTrigger>
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
                <FieldError
                  errors={[
                    { message: form.formState.errors.activity_type?.message },
                  ]}
                />
              </Field>

              {/* Store */}
              <Field>
                <FieldLabel>{t("Store")} *</FieldLabel>
                <Select
                  {...form.register("store_id", {
                    setValueAs: (value) => (value ? Number(value) : undefined),
                  })}
                  disabled={isStoresLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select store")} />
                  </SelectTrigger>
                  <SelectContent>
                    {stores?.data?.map((store: AgentStore) => (
                      <SelectItem key={store.id} value={store.id.toString()}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError
                  errors={[
                    { message: form.formState.errors.store_id?.message },
                  ]}
                />
              </Field>

              {/* Location Name */}
              <Field>
                <FieldLabel htmlFor="location_name">
                  {t("Location Name")}
                </FieldLabel>
                <Input
                  id="location_name"
                  {...form.register("location_name")}
                  placeholder={t("Enter location name")}
                />
                <FieldError
                  errors={[
                    { message: form.formState.errors.location_name?.message },
                  ]}
                />
              </Field>

              {/* Duration */}
              <Field>
                <FieldLabel htmlFor="duration_minutes">
                  {t("Duration (Minutes)")}
                </FieldLabel>
                <Input
                  id="duration_minutes"
                  type="number"
                  min={1}
                  {...form.register("duration_minutes", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                />
                <FieldError
                  errors={[
                    {
                      message: form.formState.errors.duration_minutes?.message,
                    },
                  ]}
                />
              </Field>

              {/* Latitude */}
              <Field>
                <FieldLabel htmlFor="location_lat">{t("Latitude")}</FieldLabel>
                <Input
                  id="location_lat"
                  type="number"
                  step="any"
                  {...form.register("location_lat", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                />
                <FieldError
                  errors={[
                    { message: form.formState.errors.location_lat?.message },
                  ]}
                />
              </Field>

              {/* Longitude */}
              <Field>
                <FieldLabel htmlFor="location_lng">{t("Longitude")}</FieldLabel>
                <Input
                  id="location_lng"
                  type="number"
                  step="any"
                  {...form.register("location_lng", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                />
                <FieldError
                  errors={[
                    { message: form.formState.errors.location_lng?.message },
                  ]}
                />
              </Field>

              {/* Outcome */}
              <Field>
                <FieldLabel>{t("Outcome")}</FieldLabel>
                <Select {...form.register("outcome")} defaultValue="pending">
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select outcome")} />
                  </SelectTrigger>
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
                <FieldError
                  errors={[{ message: form.formState.errors.outcome?.message }]}
                />
              </Field>

              {/* Scheduled At */}
              <Field>
                <FieldLabel htmlFor="scheduled_at">
                  {t("Scheduled At")}
                </FieldLabel>
                <Input
                  id="scheduled_at"
                  type="datetime-local"
                  {...form.register("scheduled_at")}
                />
                <FieldError
                  errors={[
                    { message: form.formState.errors.scheduled_at?.message },
                  ]}
                />
              </Field>

              {/* Started At */}
              <Field>
                <FieldLabel htmlFor="started_at">{t("Started At")}</FieldLabel>
                <Input
                  id="started_at"
                  type="datetime-local"
                  {...form.register("started_at")}
                />
                <FieldError
                  errors={[
                    { message: form.formState.errors.started_at?.message },
                  ]}
                />
              </Field>

              {/* Completed At */}
              <Field>
                <FieldLabel htmlFor="completed_at">
                  {t("Completed At")}
                </FieldLabel>
                <Input
                  id="completed_at"
                  type="datetime-local"
                  {...form.register("completed_at")}
                />
                <FieldError
                  errors={[
                    { message: form.formState.errors.completed_at?.message },
                  ]}
                />
              </Field>

              {/* Notes - Full Width */}
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="notes">{t("Notes")}</FieldLabel>
                <textarea
                  id="notes"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...form.register("notes")}
                  placeholder={t("Add any notes here")}
                  rows={3}
                />
                <FieldError
                  errors={[{ message: form.formState.errors.notes?.message }]}
                />
              </Field>
            </div>
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
          </div>
        </div>
      </form>
    </Form>
  );
};
