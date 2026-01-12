import { z } from "zod";

export const signinSchema = (t: any) =>
  z.object({
    email: z.string().email(t("Invalid email")),
    password: z
      .string()
      .min(8)
      .max(32)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
        {
          message: t(
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          ),
        }
      ),
    type: z
      .enum(["agent", "leader"], {
        message: t("Invalid type"),
      })
      .default("agent"),
  });