import type { Session } from '@supabase/supabase-js';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppThemeOptions, appThemes, Dictionary, DictionaryData, languageData, pathnames, reduxDevtoolOptions, storeNames } from '../constants';
import { history } from '@routes';
import { AppDateFormat, AppLanguage } from '@schemas';

export interface AppSettings {
 theme: AppThemeOptions;
 general: {
  language: AppLanguage;
  dateFormat: AppDateFormat;
  isAmPmTimeFormat: boolean;
 };
}

export interface SettingsState {
 settings: AppSettings;

 tempSettings: AppSettings;

 changeTempSettings: (previousState: (previousState: AppSettings) => AppSettings) => void;

 applySettingChanges: () => void;

 discardSettingChanges: (actionAfterDiscard?: () => void) => void;
}

const defaultSettings: AppSettings = {
 theme: {
  ...appThemes[0],
  shape: {
   borderRadius: 8,
  },
 },
 general: {
  language: 'en',
  dateFormat: 'DD-MM-YYYY',
  isAmPmTimeFormat: false,
 },
};

export const useApplicationSettingsStore = create<SettingsState>()(
 devtools(
  persist<SettingsState>(
   (set, get) => ({
    settings: defaultSettings,

    tempSettings: defaultSettings,

    changeTempSettings: (getNextState) => {
     const nextState = getNextState(get().tempSettings);

     return set({
      tempSettings: nextState,
     });
    },

    applySettingChanges: () => {
     return set({
      settings: get().tempSettings,
     });
    },

    discardSettingChanges: (actionAfterDiscard) => {
     set({
      tempSettings: get().settings,
     });

     if (actionAfterDiscard) {
      actionAfterDiscard();
     }
    },
   }),
   { name: 'zal-todos-auth' }
  ),
  {
   store: storeNames.settings,
   ...reduxDevtoolOptions,
  }
 )
);

export const t = (data: DictionaryData) => {
 const userLanguage = useApplicationSettingsStore.getState().settings.general.language;

 return languageData[userLanguage][data];
};
