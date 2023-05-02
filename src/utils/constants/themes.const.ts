import type { ThemeOptions as MuiThemeOptions } from '@mui/material/styles';
import { tailwindColors } from './tailwind-color.const';

export interface AppThemeOptions extends MuiThemeOptions {
 title: string;
}

export const appThemes: AppThemeOptions[] = [
 {
  title: 'Indigo',
  palette: {
   primary: {
    main: tailwindColors.indigo[500],
   },
  },
 },

 {
  title: 'Green',
  palette: {
   primary: {
    main: tailwindColors.green[500],
   },
  },
 },

 {
  title: 'Orange',
  palette: {
   primary: {
    main: tailwindColors.orange[500],
   },
  },
 },

 {
  title: 'Purple',
  palette: {
   primary: {
    main: tailwindColors.purple[500],
   },
  },
 },

 {
  title: 'Violet',
  palette: {
   primary: {
    main: tailwindColors.violet[500],
   },
  },
 },

 {
  title: 'Cyan',
  palette: {
   primary: {
    main: tailwindColors.cyan[500],
   },
  },
 },
];
