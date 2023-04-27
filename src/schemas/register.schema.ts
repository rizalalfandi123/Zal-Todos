import { z } from 'zod';

export const registerSchema = z.object({
 email: z.string().email({ message: 'Email Anda tidak valid' }),
 password: z.string().min(8, { message: 'Password minimal 8' }),
 phone: z.string().optional(),
});

export type TRegisterForm = z.infer<typeof registerSchema>;
