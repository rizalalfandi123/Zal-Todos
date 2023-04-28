import type { Components, Theme } from '@mui/material/styles';

import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { listItemTextClasses } from '@mui/material/ListItemText';
import { typographyClasses } from '@mui/material/Typography';

export const muiListItemButton: Components<Theme>['MuiListItemButton'] = {
 styleOverrides: {
  root: (props) => ({
   padding: '4px 16px',
   margin: '2px 4px',
   borderRadius: props.theme.shape.borderRadius + 'px',

   '&.Mui-selected': {
    [`& .${listItemTextClasses.root}`]: {
     [`& .${typographyClasses.root}`]: {
      color: props.theme.palette.primary.main,
     },
    },

    [`& .${listItemIconClasses.root}`]: {
     [`& .${svgIconClasses.root}`]: {
      color: props.theme.palette.primary.main,
     },
    },
   },
  }),
 },
};
