import { useTheme } from '@mui/material/styles';
import { tailwindColors } from '@utils';
import { useEffect, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

export const SuspenseFallback = () => {
 const ref = useRef<LoadingBarRef | null>(null);

 const theme = useTheme();

 useEffect(() => {
  if (ref) {
   ref.current?.staticStart();
  }
 }, [ref]);

 return <LoadingBar color={tailwindColors.gray[400]} ref={ref} shadow />;
};
