import type { ThemeOptions as MuiThemeOptions, Theme as MuiTheme } from '@mui/material/styles';

interface AdditionalThemeFields {
 appBarHeight: number;
 sideBarWidth: number;
}

declare module '@mui/material/styles' {
 interface ThemeOptions extends MuiThemeOptions {
  additionalFields: AdditionalThemeFields;
 }

 interface Theme extends MuiTheme {
  additionalFields: AdditionalThemeFields;
 }
}
