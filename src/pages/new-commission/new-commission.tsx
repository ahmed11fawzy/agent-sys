import Header from "@/components/page-header/Header";
import { Banknote, Loader2 } from "lucide-react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommissionFormSchema,
  type CommissionFormValues,
  type CommissionFormValuesFlat,
} from "../../validations/commission-schema";
import { useGetAgentsQuery } from "@/features/api-queries/agent-query";
import { useCreateCommissionMutation } from "@/features/api-queries/commission-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { Agent } from "../../types/agent-types";

const NewCommission = () => {
  const navigate = useNavigate();
  const { data: agentsData, isLoading: isLoadingAgents } = useGetAgentsQuery(
    new URLSearchParams({ page: "1", per_page: "100" }).toString()
  );

  const [createCommission, { isLoading: isSubmitting }] =
    useCreateCommissionMutation();

  const form = useForm<CommissionFormValuesFlat>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(CommissionFormSchema) as any,
    defaultValues: {
      salary_type: "fixed_only",
    },
  });

  const salaryType = useWatch({
    control: form.control,
    name: "salary_type",
  });

  // Reset fields when salary type changes to avoid validation errors from hidden fields if any
  useEffect(() => {
    form.clearErrors();
  }, [salaryType, form]);

  const onSubmit: SubmitHandler<CommissionFormValuesFlat> = async (values) => {
    try {
      await createCommission(values as CommissionFormValues).unwrap();
      toast.success("Commission settings created successfully");
      navigate("/commissions");
    } catch (error) {
      toast.error("Failed to create commission settings");
      console.error(error);
    }
  };

  const agents = agentsData?.data || [];

  return (
    <main className="mt-5 space-y-5">
      <Header
        title="New Commission"
        subTitle="Add new commission"
        icon={<Banknote />}
      />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Agent Selection */}
                <FormField
                  control={form.control}
                  name="agent_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Agent" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingAgents ? (
                            <div className="flex justify-center p-2">
                              <Loader2 className="animate-spin h-4 w-4" />
                            </div>
                          ) : (
                            agents.map((agent: Agent) => (
                              <SelectItem
                                key={agent.id}
                                value={agent.id.toString()}
                              >
                                {agent.user.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Salary Type Selection */}
                <FormField
                  control={form.control}
                  name="salary_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fixed_only">Fixed Only</SelectItem>
                          <SelectItem value="commission_only">
                            Commission Only
                          </SelectItem>
                          <SelectItem value="fixed_plus_commission">
                            Fixed + Commission
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Dynamic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(salaryType === "fixed_only" ||
                  salaryType === "fixed_plus_commission") && (
                  <>
                    <FormField
                      control={form.control}
                      name="fixed_salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fixed Salary</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bonus_perfect_attendance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bonus (Perfect Attendance)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deduction_per_absent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deduction (Per Absent)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {(salaryType === "commission_only" ||
                  salaryType === "fixed_plus_commission") && (
                  <>
                    <FormField
                      control={form.control}
                      name="commission_per_new_store"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commission (Per New Store)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="commission_per_approved"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commission (Per Approved)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="commission_on_sales"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commission % on Sales</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0-100"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bonus_on_target_achievement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bonus (Target Achievement)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {salaryType === "fixed_plus_commission" && (
                  <FormField
                    control={form.control}
                    name="deduction_late_followup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deduction (Late Follow-up)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Commission
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default NewCommission;
