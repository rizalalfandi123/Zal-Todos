import { Components, Theme } from '@mui/material/styles';

export const muiButton: Components<Theme>['MuiButton'] = {
 styleOverrides: {
  root: {
   boxShadow: 'none',

   ':hover': {
    boxShadow: 'none',
   },

   textTransform: 'none',
  },

 contained: {
    color: "white"
 } 
 },

 defaultProps: {
  variant: 'contained',
 },
};
