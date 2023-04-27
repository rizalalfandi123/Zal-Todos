import { Components, Theme } from '@mui/material/styles';

export const muiAppbar: Components<Theme>['MuiAppBar'] = {
 styleOverrides: {
  root: {
   boxShadow: 'none',
  },
 },
};
