import { createTheme } from '@mui/material/styles';
import { AppThemeOptions, tailwindColors } from '@utils';
import { useMemo } from 'react';
import { components } from './components.theme';

export const getTheme = (selectedTheme: AppThemeOptions) => {
 const theme = useMemo(
  () =>
   createTheme({
    additionalFields: { appBarHeight: 42, sideBarWidth: 240 },

    typography: {
     fontFamily: "'Poppins', sans-serif",

     fontWeightRegular: 500,

     fontSize: 12,

     allVariants: {
      color: tailwindColors.stale[700],
     },
    },

    palette: {
     secondary: {
      main: tailwindColors.stale[200],
     },

     error: {
      main: tailwindColors.red[500],
     },

     info: {
      main: tailwindColors.blue[500],
     },

     background: {
      default: tailwindColors.stale[50],
      paper: tailwindColors.stale[50],
     },

     text: {
      primary: tailwindColors.stale[700],
     },
    },

    components,

    ...selectedTheme,
   }),
  [selectedTheme]
 );

 return theme;
};
