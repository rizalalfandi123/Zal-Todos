import { useTheme } from '@mui/material/styles';
import { useEffect, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

export const LoadingFallback = () => {
 const ref = useRef<LoadingBarRef | null>(null);

 const theme = useTheme();

 useEffect(() => {
  if (ref) {
   ref.current?.staticStart();
  }
 }, [ref]);

 return <LoadingBar color={theme.palette.secondary.main} height={6} ref={ref} shadow />;
};
