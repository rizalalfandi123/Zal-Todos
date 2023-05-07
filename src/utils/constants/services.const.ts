import type { DevtoolsOptions } from 'zustand/middleware';

export const developmentMode = import.meta.env.MODE === 'development';

export const localStorageKey = {
 auth: '9506b2073949ebeb07c18eec443c5d7b',
};

export const reduxDevtoolOptions: DevtoolsOptions = {
 name: 'ZAL-TODOS',
 anonymousActionType: 'UPDATE',
 enabled: developmentMode,
};

export const storeNames = {
 auth: 'AUTH',
 alert: 'ALERT',
 todos: 'TODOS',
 sections: 'SECTIONS',
 projects: 'PROJECTS',
 settings: 'SETTINGS',
};
