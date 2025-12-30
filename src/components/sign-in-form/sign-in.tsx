/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { signinSchema } from "@/validations/signin-schema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Chromium } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "@/features/api-queries/auth-query";
import type {
  AuthUser,
  AuthUserResponse,
  LoginError,
} from "@/types/login-type";
import { setCredentials } from "@/features/auth-slice";
import type { AuthorizedUser } from "@/types/authorized-user-type";
import { useDispatch } from "react-redux";

export const SignInForm = () => {
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      type: "agent",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signinSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
    try {
      const res: AuthUserResponse | LoginError = await login(values).unwrap();
      console.log("logging", res);
      if (res.status) {
        const {
          id,
          name,
          avatar,
          type,
          is_active,
          store_id,
          token,
          all_permissions,
        } = (res as AuthUserResponse).data as AuthUser;
        dispatch(
          setCredentials({
            id,
            name,
            avatar,
            type,
            is_active,
            store_id,
            token,
            all_permissions,
          } as AuthorizedUser)
        );
        navigate("/", { replace: true, state: { user: values } });
      } else {
        throw new Error((res as LoginError).message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-3 block">{t("Email")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Email")} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{t("Password")}</FormLabel>
                <a href="#" className="text-sm text-muted-foreground">
                  {t("Forgot Password ?")}
                </a>
              </div>

              <FormControl>
                <Input placeholder={t("password")} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <RadioGroup
                  defaultValue="agent"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-8 "
                >
                  <div className="flex items-center space-x-2 gap-2">
                    <RadioGroupItem
                      value="agent"
                      id="option-one"
                      className="fill-accent"
                    />
                    <Label htmlFor="option-one">{t("Agent")}</Label>
                  </div>
                  <div className="flex items-center space-x-2 gap-2">
                    <RadioGroupItem
                      value="leader"
                      id="option-two"
                      className="fill-accent"
                    />
                    <Label htmlFor="option-two">{t("Leader")}</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="primary" className="w-full">
          {t("Sign In")}
        </Button>
        <div className="flex flex-col gap-4">
          <div className="">
            <p
              className="text-center relative text-md  text-gray-500 / 
             after:content-[''] after:absolute after:inset-0 after:border-b
              after:border-gray-700 after:z-0 after:w-2/5 after:top-1/3
               after:-translate-y-1/2 after:left-3/5 
               before:content-[''] before:absolute before:inset-0 before:border-b
               before:border-gray-700 before:z-0 before:w-2/5 before:top-1/3
               before:-translate-y-1/2 before:right-3/5
              
               
               "
            >
              or
            </p>
          </div>
          <Button
            className="w-ful cursor-pointer"
            variant="animatedOutline"
            type="button"
          >
            <Chromium />
            {t("Log In with Google")}
          </Button>
          <p className="text-center text-sm font-light">
            {t("Don't have an account?")}
            <Link to="/signup" className=" text-md font-semibold">
              {t("Sign Up")}
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
