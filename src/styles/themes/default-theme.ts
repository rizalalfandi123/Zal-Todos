import { createTheme } from '@mui/material/styles';
import { tailwindColors } from '@utils';
import { components } from './components.theme';

export const defaultTheme = createTheme({
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
  primary: {
   main: tailwindColors.indigo[500],
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

 shape: { borderRadius: 8 },

 components,
});
