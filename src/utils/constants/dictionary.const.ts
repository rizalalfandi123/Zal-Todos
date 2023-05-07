import { AppLanguage } from '@schemas';

export type DictionaryData = keyof typeof en;

export type Dictionary = typeof en;

export const en = {
 applicationSettings: 'Application Settings',
 language: 'Language',
 account: 'Account',
 general: 'General',
 theme: 'Theme',
 sidebar: 'Sidebar',
 dateFormat: 'Date Format',
 timeFormat: 'Time Format',
 hours: 'Hours',
 discardChanges: 'Discard changes',
 discardChangesNotice: "The changes you've made won't be saved",
 cancel: 'Cancel',
 discard: 'Discard',
 save: 'Save',
 yourTheme: 'Your theme',
 borderRadius: 'Border Radius',
};

export const id: Dictionary = {
 applicationSettings: 'Pengaturan Aplikasi',
 language: 'Bahasa',
 account: 'Akun',
 general: 'Umum',
 theme: 'Tema',
 sidebar: 'Bilah Samping',
 dateFormat: 'Format Hari',
 timeFormat: 'Format Jam',
 hours: 'Jam',
 discardChanges: 'Buang perubahan',
 discardChangesNotice: 'Perubahan yang Anda buat tidak akan di disimpan',
 cancel: 'Kembali',
 discard: 'Buang',
 save: 'Simpan',
 yourTheme: 'Tema Anda',
 borderRadius: 'Kelengkungan Tepi',
};

export const languageData: Record<AppLanguage, Dictionary> = {
 en,
 id,
};
