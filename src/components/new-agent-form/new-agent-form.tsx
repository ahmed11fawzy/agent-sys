import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAgentSchema,
  type CreateAgentSchema,
} from "@/validations/create-agent-schema.zod";
import { useCreateAgentMutation } from "@/features/api-queries/agent-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const steps = [
  { id: 1, title: "User Information" },
  { id: 2, title: "Agent Details" },
];

const NewAgentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [createAgent, { isLoading }] = useCreateAgentMutation();

  const form = useForm<CreateAgentSchema>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      user_name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      birth_date: "",
      gender: "1",
      status: "active",
      avatar: "",
      national_id: "",
      bank_name: "",
      iban: "",
      salary_type: "fixed",
      base_salary: 0,
      commission_rate: 0,
      daily_target: 0,
      weekly_target: 0,
      monthly_target: 0,
      hire_date: "",
      notes: "",
    },
  });

  const onSubmit = async (data: CreateAgentSchema) => {
    try {
      console.log(data);
      const res: any = await createAgent(data).unwrap();
      console.log(res);
      alert("Agent created successfully");

      form.reset();
      setCurrentStep(1);
    } catch (error) {
      console.error("Failed to create agent:", error);
      alert("Failed to create agent");
    }
  };

  const handleNext = async () => {
    // Validate step 1 fields before proceeding
    const step1Fields = [
      "user_name",
      "email",
      "phone",
      "password",
      "password_confirmation",
      "birth_date",
      "gender",
      "status",
      "avatar",
    ] as const;
    const isValid = await form.trigger(step1Fields);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="grid gap-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4 mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                currentStep === step.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : currentStep > step.id
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-muted-foreground/30 text-muted-foreground"
              }`}
            >
              {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep === step.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id
                    ? "bg-green-500"
                    : "bg-muted-foreground/30"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          {/* Step 1: User Data Section */}
          {currentStep === 1 && (
            <Card className="animate-in fade-in-50 duration-300">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>
                  Enter the personal details for the agent's user account.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="user_name">Name</FieldLabel>
                  <Input
                    id="user_name"
                    {...form.register("user_name")}
                    placeholder="Full Name"
                  />
                  <FieldError
                    errors={[
                      { message: form.formState.errors.user_name?.message },
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="Email Address"
                  />
                  <FieldError
                    errors={[{ message: form.formState.errors.email?.message }]}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("password")}
                    placeholder="Password"
                  />
                  <FieldError
                    errors={[
                      { message: form.formState.errors.password?.message },
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...form.register("password_confirmation")}
                    placeholder="Confirm Password"
                  />
                  <FieldError
                    errors={[
                      {
                        message:
                          form.formState.errors.password_confirmation?.message,
                      },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    placeholder="Phone Number"
                  />
                  <FieldError
                    errors={[{ message: form.formState.errors.phone?.message }]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="birth_date">Birth Date</FieldLabel>
                  <Input
                    id="birth_date"
                    type="date"
                    {...form.register("birth_date")}
                  />
                  <FieldError
                    errors={[
                      { message: form.formState.errors.birth_date?.message },
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel>Gender</FieldLabel>

                  <Select {...form.register("gender")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Male</SelectItem>
                      <SelectItem value="0">Female</SelectItem>
                    </SelectContent>
                  </Select>

                  <FieldError
                    errors={[
                      { message: form.formState.errors.gender?.message },
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Select {...form.register("status")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>

                  <FieldError
                    errors={[
                      { message: form.formState.errors.status?.message },
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="avatar">Avatar</FieldLabel>
                  <Input
                    id="avatar"
                    type="file"
                    {...form.register("avatar")}
                    placeholder="Avatar"
                  />
                  <FieldError
                    errors={[
                      {
                        message: form.formState.errors.avatar
                          ?.message as string,
                      },
                    ]}
                  />
                </Field>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Agent Data Section */}
          {currentStep === 2 && (
            <Card className="animate-in fade-in-50 duration-300">
              <CardHeader>
                <CardTitle>Agent Details</CardTitle>
                <CardDescription>
                  Enter the specific details for the agent profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="national_id">National ID</FieldLabel>
                  <Input
                    id="national_id"
                    {...form.register("national_id")}
                    placeholder="National ID"
                  />
                  <FieldError
                    errors={[
                      { message: form.formState.errors.national_id?.message },
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="bank_name">Bank Name</FieldLabel>
                  <Input
                    id="bank_name"
                    {...form.register("bank_name")}
                    placeholder="Bank Name"
                  />
                  <FieldError
                    errors={[
                      { message: form.formState.errors.bank_name?.message },
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="iban">IBAN</FieldLabel>
                  <Input
                    id="iban"
                    {...form.register("iban")}
                    placeholder="IBAN"
                  />
                  <FieldError
                    errors={[{ message: form.formState.errors.iban?.message }]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="salary_type">Salary Type</FieldLabel>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...form.register("salary_type")}
                  >
                    <option value="fixed">Fixed</option>
                    <option value="commission">Commission</option>
                    <option value="mixed">Mixed</option>
                  </select>
                  <FieldError
                    errors={[
                      { message: form.formState.errors.salary_type?.message },
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="base_salary">Base Salary</FieldLabel>
                  <Input
                    id="base_salary"
                    type="number"
                    {...form.register("base_salary")}
                    placeholder="0.00"
                  />
                  <FieldError
                    errors={[
                      { message: form.formState.errors.base_salary?.message },
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="commission_rate">
                    Commission Rate (%)
                  </FieldLabel>
                  <Input
                    id="commission_rate"
                    type="number"
                    {...form.register("commission_rate")}
                    placeholder="0-100"
                  />
                  <FieldError
                    errors={[
                      {
                        message: form.formState.errors.commission_rate?.message,
                      },
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="hire_date">Hire Date</FieldLabel>
                  <Input
                    id="hire_date"
                    type="date"
                    {...form.register("hire_date")}
                  />
                  <FieldError
                    errors={[
                      { message: form.formState.errors.hire_date?.message },
                    ]}
                  />
                </Field>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel htmlFor="daily_target">Daily Target</FieldLabel>
                    <Input
                      id="daily_target"
                      type="number"
                      {...form.register("daily_target")}
                      placeholder="0"
                    />
                    <FieldError
                      errors={[
                        {
                          message: form.formState.errors.daily_target?.message,
                        },
                      ]}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="weekly_target">
                      Weekly Target
                    </FieldLabel>
                    <Input
                      id="weekly_target"
                      type="number"
                      {...form.register("weekly_target")}
                      placeholder="0"
                    />
                    <FieldError
                      errors={[
                        {
                          message: form.formState.errors.weekly_target?.message,
                        },
                      ]}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="monthly_target">
                      Monthly Target
                    </FieldLabel>
                    <Input
                      id="monthly_target"
                      type="number"
                      {...form.register("monthly_target")}
                      placeholder="0"
                    />
                    <FieldError
                      errors={[
                        {
                          message:
                            form.formState.errors.monthly_target?.message,
                        },
                      ]}
                    />
                  </Field>
                </div>

                <Field className="md:col-span-2">
                  <FieldLabel htmlFor="notes">Notes</FieldLabel>
                  <Input
                    id="notes"
                    {...form.register("notes")}
                    placeholder="Additional notes..."
                  />
                  <FieldError
                    errors={[{ message: form.formState.errors.notes?.message }]}
                  />
                </Field>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 2 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="gap-2"
                variant="primary"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                variant="primary"
                className="gap-2"
              >
                {isLoading ? "Creating..." : "Create Agent"}
                <Check className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewAgentForm;
