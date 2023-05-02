import { z } from 'zod';

export const generalSettingsSchema = z.object({
 language: z.object({
  value: z.union([z.literal('en'), z.literal('id')]),
  label: z.string(),
 }),

 dateFormat: z.union([z.literal('DD-MM-YYYY'), z.literal('MM-DD-YYYY')]),

 timeFormat: z.object({
  value: z.boolean(),
  label: z.string(),
 }),
});

export type TGeneralSettings = z.infer<typeof generalSettingsSchema>;

export type AppLanguage = TGeneralSettings['language']['value'];

export type AppDateFormat = TGeneralSettings['dateFormat'];
