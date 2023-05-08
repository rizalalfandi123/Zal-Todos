import { t } from '@utils';
import { z } from 'zod';

export const todoSchema = z.object({
 title: z.string().min(1, { message: t('required') }),
 description: z.string().optional(),
});

export type TodoForm = z.infer<typeof todoSchema>;
