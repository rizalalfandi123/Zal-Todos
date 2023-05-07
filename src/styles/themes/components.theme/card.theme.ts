import type { Components, Theme } from '@mui/material/styles';

export const muiCard: Components<Theme>['MuiCard'] = {
 defaultProps: {},
};

export const muiCardHeader: Components<Theme>['MuiCardHeader'] = {
 defaultProps: {
  titleTypographyProps: {
   variant: 'h6',
  },
 },

 styleOverrides: {
  root: ({ theme }) => ({
   padding: theme.spacing(1),
  }),
 },
};

export const muiCardContent: Components<Theme>['MuiCardContent'] = {
 styleOverrides: {
  root: ({ theme }) => ({
   padding: theme.spacing(1),
   ':last-child': {
    paddingBottom: theme.spacing(1),
   },
  }),
 },
};
