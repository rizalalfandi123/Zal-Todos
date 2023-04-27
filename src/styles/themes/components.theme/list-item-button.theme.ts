import { Components, Theme } from '@mui/material/styles';

export const muiListItemButton: Components<Theme>['MuiListItemButton'] = {
 styleOverrides: {
  root: (props) => ({
   padding: '4px 16px',
   margin: '2px 4px',
   borderRadius: props.theme.shape.borderRadius + 'px',
  }),
 },
};
