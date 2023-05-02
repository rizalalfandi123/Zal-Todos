import { Components, Theme } from '@mui/material/styles';

export const muiToolbar: Components<Theme>['MuiToolbar'] = {
 styleOverrides: {
  root: (props) => ({
   [props.theme.breakpoints.up('xs')]: {
    minHeight: props.theme.additionalFields!.appBarHeight + 'px',
   },
  }),
 },
};
