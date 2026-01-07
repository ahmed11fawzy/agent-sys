import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  businessSchema,
  storeFormSchema,
  storeSchema,
  userSchema,
  type StoreFormValues,
} from "../../validations/create-store-schema";
import UserStep from "./steps/user-step";
import StoreStep from "./steps/store-step";
import BusinessStep from "./steps/business-step";
import { useCreateStoreMutation } from "@/features/api-queries/stores-query";
// import { toast } from "sonner";

const steps = [
  {
    id: "user",
    title: "User Information",
    schema: userSchema,
    fields: [
      "user.name",
      "user.email",
      "user.password",
      "user.password_confirmation",
      "user.phone",
      "user.type",
    ] as const,
  },
  {
    id: "store",
    title: "Store Information",
    schema: storeSchema,
    fields: [
      "store.name_ar",
      "store.name_en",
      "store.business_activitie_id",
      "store.market_id",
      "store.email",
      "store.phone",
      "store.location",
      "store.street",
      "store.zip_code",
      "store.subcode",
      "store.mailbox",
      "store.location_id",
    ] as const,
  },
  {
    id: "business",
    title: "Business Information",
    schema: businessSchema,
    fields: [
      "business.business_name",
      "business.commercial_registration_number",
      "business.unified_number",
      "business.cr_expiry_date",
      "business.owner_phone",
      "business.municipal_license_number",
      "business.tax_number",
    ] as const,
  },
];

const StoreForm = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [createStore, { isLoading }] = useCreateStoreMutation();

  const methods = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    mode: "onChange",
    defaultValues: {
      user: {
        type: "manager",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
      },
      store: {
        name_ar: "",
        name_en: "",
        business_activitie_id: "",
        market_id: "",
        email: "",
        phone: "",
        location: "",
        street: "",
        zip_code: "",
        subcode: "",
        mailbox: "",
        location_id: "",
      },
      business: {
        business_name: "",
        commercial_registration_number: "",
        unified_number: "",
        cr_expiry_date: "",
        owner_phone: "",
        municipal_license_number: "",
        tax_number: "",
      },
    },
  });

  const { trigger, handleSubmit } = methods;

  const nextStep = async () => {
    const fields = steps[currentStep].fields as unknown as Array<
      keyof StoreFormValues
    >;
    // We cast to any here because react-hook-form trigger normally expects flat keys,
    // but works with nested paths. However, the type definitions might not fully support const arrays of deep keys.
    // The previous cast to 'any' was safe for runtime but lint complained.
    // We can try a slightly stronger type if possible, or suppress the specific lint if it persists.
    // Using unknown -> Array<keyof StoreFormValues> is a common workaround for deep keys in RHF.
    const isStepValid = await trigger(fields);

    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: StoreFormValues) => {
    try {
      console.log("storedata", data);

      const formData = new FormData();

      // User Data
      formData.append("user[name]", data.user.name);
      formData.append("user[email]", data.user.email);
      formData.append("user[password]", data.user.password);
      formData.append(
        "user[password_confirmation]",
        data.user.password_confirmation
      );
      if (data.user.phone) formData.append("user[phone]", data.user.phone);
      if (data.user.type) formData.append("user[type]", data.user.type);

      // Store Data
      formData.append("store[name_ar]", data.store.name_ar);
      formData.append("store[name_en]", data.store.name_en);
      formData.append(
        "store[business_activitie_id]",
        data.store.business_activitie_id
      );
      formData.append("store[market_id]", data.store.market_id);
      formData.append("store[email]", data.store.email);
      formData.append("store[phone]", data.store.phone);
      formData.append("store[location]", data.store.location);
      formData.append("store[street]", data.store.street);
      formData.append("store[zip_code]", data.store.zip_code);
      if (data.store.subcode)
        formData.append("store[subcode]", data.store.subcode);
      if (data.store.mailbox)
        formData.append("store[mailbox]", data.store.mailbox);
      if (data.store.location_id)
        formData.append("store[location_id]", data.store.location_id);
      if (data.store.store_image)
        formData.append("store[store_image]", data.store.store_image);
      if (data.store.store_logo)
        formData.append("store[store_logo]", data.store.store_logo);

      // Business Data
      formData.append("business[business_name]", data.business.business_name);
      formData.append(
        "business[commercial_registration_number]",
        data.business.commercial_registration_number
      );
      formData.append("business[unified_number]", data.business.unified_number);
      formData.append("business[cr_expiry_date]", data.business.cr_expiry_date);
      formData.append("business[owner_phone]", data.business.owner_phone);
      if (data.business.municipal_license_number)
        formData.append(
          "business[municipal_license_number]",
          data.business.municipal_license_number
        );
      if (data.business.tax_number)
        formData.append("business[tax_number]", data.business.tax_number);
      if (data.business.cr_file_url)
        formData.append("business[cr_file_url]", data.business.cr_file_url);

      const res = await createStore(formData).unwrap();
      console.log("store res ", res);
      // Handle success (e.g., toast, redirect)
      console.log("Store created successfully", data);
    } catch (error) {
      console.error("Failed to create store", error);
    }
  };

  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        {/* Stepper UI */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  index === currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : index < currentStep
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  index === currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {t(step.title)}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 ${
                    index < currentStep
                      ? "bg-green-500"
                      : "bg-muted-foreground/30"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 0 && <UserStep />}
            {currentStep === 1 && <StoreStep />}
            {currentStep === 2 && <BusinessStep />}
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          {t("Previous")}
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button className="bg-primary" onClick={nextStep}>
            {t("Next")}
          </Button>
        ) : (
          <Button
            className="bg-primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? t("Submitting...") : t("Submit")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default StoreForm;
