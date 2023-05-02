import { AppLanguage } from '@schemas';

export const en = {
 applicationSettings: 'Application Settings',
 language: 'Language',
 account: 'Account',
 general: 'General',
 theme: 'Theme',
 sidebar: 'Sidebar',
};

export type DictionaryData = keyof typeof en;

export type Dictionary = typeof en;

export const id: Dictionary = {
 applicationSettings: 'Pengaturan Aplikasi',
 language: 'Bahasa',
 account: 'Akun',
 general: 'Umum',
 theme: 'Teme',
 sidebar: 'Bilah Samping',
};

export const languageData: Record<AppLanguage, Dictionary> = {
 en,
 id,
};
