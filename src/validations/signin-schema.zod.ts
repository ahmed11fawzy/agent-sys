
import { z } from "zod";

export const signinSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8).max(32).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,{
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
    type: z.enum(["agent", "leader"],
        {
            message: "Invalid type",
        }
    ).default("agent"),
});