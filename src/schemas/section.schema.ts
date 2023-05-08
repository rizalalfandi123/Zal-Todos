import { t } from '@utils';
import { z } from 'zod';

export const sectionSchema = z.object({
 title: z.string().min(1, { message: t('required') }),
});

export type SectionForm = z.infer<typeof sectionSchema>;
