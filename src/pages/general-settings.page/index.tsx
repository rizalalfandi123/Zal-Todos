import type { AppDateFormat, TGeneralSettings } from '@schemas';

import { useForm } from 'react-hook-form';
import { generalSettingsSchema } from '@schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';

import { StaticAutocomplete } from '@components';
import { GeneralSettingChanges } from './general-settings-changes';
import { t, useApplicationSettingsStore } from '@utils';

type LanguageOption = TGeneralSettings['language'];

type TimeFormatOption = TGeneralSettings['timeFormat'];

const languageOptions: LanguageOption[] = [
 {
  label: 'English',
  value: 'en',
 },
 {
  label: 'Bahasa Indonesia',
  value: 'id',
 },
];

const timeFormatOptions: TimeFormatOption[] = [
 {
  label: `24 ${t('hours')}`,
  value: false,
 },
 {
  label: `24 ${t('hours')}`,
  value: true,
 },
];

const dateFormatOptions: AppDateFormat[] = ['DD-MM-YYYY', 'MM-DD-YYYY'];

export const GeneralSettingsPage = () => {
 const settings = useApplicationSettingsStore((store) => store.settings);

 const { control } = useForm<TGeneralSettings>({
  defaultValues: {
   language: languageOptions.find((lang) => lang.value === settings.general.language),
   dateFormat: settings.general.dateFormat,
   timeFormat: timeFormatOptions.find((lang) => lang.value === settings.general.isAmPmTimeFormat),
  },
  resolver: zodResolver(generalSettingsSchema),
 });

 return (
  <Stack paddingY={2} spacing={2}>
   <GeneralSettingChanges control={control} />

   <StaticAutocomplete<LanguageOption, TGeneralSettings, 'language'>
    control={control}
    name='language'
    options={languageOptions}
    label={t('language')}
    slots={{
     autoCompleteProps: {
      isOptionEqualToValue: (option, value) => option.value === value.value,
      disableClearable: true,
     },
    }}
   />

   <StaticAutocomplete<AppDateFormat, TGeneralSettings, 'dateFormat'>
    control={control}
    name='dateFormat'
    options={dateFormatOptions}
    label={t('dateFormat')}
    slots={{
     autoCompleteProps: {
      disableClearable: true,
     },
    }}
   />

   <StaticAutocomplete<TimeFormatOption, TGeneralSettings, 'timeFormat'>
    control={control}
    name='timeFormat'
    options={timeFormatOptions}
    label={t('timeFormat')}
    slots={{
     autoCompleteProps: {
      isOptionEqualToValue: (option, value) => option.value === value.value,
      disableClearable: true,
     },
    }}
   />
  </Stack>
 );
};

export default GeneralSettingsPage;
