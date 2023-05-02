import type { Control } from 'react-hook-form';
import type { AppDateFormat, AppLanguage, TGeneralSettings } from '@schemas';

import { useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { useApplicationSettingsStore } from '@utils';

export const GeneralSettingChanges = (props: { control: Control<TGeneralSettings> }) => {
 const formValues = useWatch({ control: props.control });

 const changeTempSettings = useApplicationSettingsStore((store) => store.changeTempSettings);

 const changeAppLanguage = (newLang: AppLanguage) => {
  changeTempSettings((prevState) => ({
   ...prevState,
   general: {
    ...prevState.general,
    language: newLang,
   },
  }));
 };

 const changeAppDateFormat = (newDateFormat: AppDateFormat) => {
  changeTempSettings((prevState) => ({
   ...prevState,
   general: {
    ...prevState.general,
    dateFormat: newDateFormat,
   },
  }));
 };

 const changeAppTimeFormat = (isAmPmTimeFormat: boolean) => {
  changeTempSettings((prevState) => ({
   ...prevState,
   general: {
    ...prevState.general,
    isAmPmTimeFormat,
   },
  }));
 };

 useEffect(() => {
  if (formValues.language?.value) {
   changeAppLanguage(formValues.language.value);
  }

  if (formValues.dateFormat) {
   changeAppDateFormat(formValues.dateFormat);
  }

  if (typeof formValues.timeFormat?.value === 'boolean') {
   changeAppTimeFormat(formValues.timeFormat.value);
  }
 }, [formValues]);

 return null;
};
