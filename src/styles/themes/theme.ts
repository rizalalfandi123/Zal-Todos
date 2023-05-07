import { createTheme } from '@mui/material/styles';
import { AppThemeOptions, tailwindColors } from '@utils';
import { useMemo } from 'react';
import { components } from './components.theme';

export const getTheme = (selectedTheme: AppThemeOptions) => {
 const theme = useMemo(
  () =>
   createTheme({
    additionalFields: { appBarHeight: 42, sideBarWidth: 240, todoSectionWidth: 358, todoItemMinWidth: 300 },

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
      main: '#4b5563',
     },

     neutral: {
      main: tailwindColors.stale[500],
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
      secondary: tailwindColors.stale[500],
     },
     ...selectedTheme.palette,
    },

    shape: {
     ...selectedTheme.shape,
    },

    spacing: [4, 8, 12, 16, 20, 24, 28, 32, 36],

    components,
   }),
  [selectedTheme]
 );

 return theme;
};
