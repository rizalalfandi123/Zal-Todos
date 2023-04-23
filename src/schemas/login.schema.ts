import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email Anda tidak valid" }),
  password: z.string().min(8, { message: "Password minimal 8" }),
});

export type TLoginForm = z.infer<typeof loginSchema>;
