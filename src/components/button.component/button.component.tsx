import { Theme, SxProps } from '@mui/material/styles';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

const progressStyle: SxProps<Theme> = {
 color: 'white',
 marginLeft: '8px',
};

interface IButtonProps extends MuiButtonProps {
 isLoading?: boolean;

 slots?: {
  progressProps: CircularProgressProps;
 };
}

export const Button = (props: IButtonProps) => {
 const { isLoading = false, children, slots = { progressProps: {} }, ...moreProps } = props;

 return (
  <MuiButton {...moreProps}>
   {children}

   {isLoading && <CircularProgress sx={progressStyle} size='1.1rem' />}
  </MuiButton>
 );
};
