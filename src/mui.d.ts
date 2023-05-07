import type { ThemeOptions as MuiThemeOptions, Theme as MuiTheme } from '@mui/material/styles';

interface AdditionalThemeFields {
 appBarHeight: number;
 sideBarWidth: number;
 todoSectionWidth: number;
 todoItemMinWidth: number;
}

declare module '@mui/material/styles' {
 interface ThemeOptions extends MuiThemeOptions {
  additionalFields?: AdditionalThemeFields;
 }

 interface Theme extends MuiTheme {
  additionalFields?: AdditionalThemeFields;
 }

 interface Palette {
  neutral?: Palette['primary'];
 }

 interface PaletteOptions {
  neutral?: PaletteOptions['primary'];
 }
}

declare module '@mui/material/Button' {
 interface ButtonPropsColorOverrides {
  neutral: true;
 }
}
