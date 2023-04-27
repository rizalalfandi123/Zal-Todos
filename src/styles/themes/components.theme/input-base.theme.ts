import { Components, Theme } from '@mui/material/styles';

export const muiInputBase: Components<Theme>['MuiInputBase'] = {
 defaultProps: {
  size: 'small',
  fullWidth: true,
 },

 variants: [
  {
   props: {
    size: 'small',
   },
   style: {
    input: {
     padding: '6px 14px',
    },
   },
  },
 ],
};
