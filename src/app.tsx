import AppRoutes from '@routes';
import { QueryClientProvider } from 'react-query';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { getTheme } from '@styles';
import { queryClient, useApplicationSettingsStore } from '@utils';

const App = () => {
 const selectedTheme = useApplicationSettingsStore((store) => store.tempSettings.theme);

 const theme = getTheme(selectedTheme);

 return (
  <QueryClientProvider client={queryClient}>
   <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppRoutes />
   </ThemeProvider>
  </QueryClientProvider>
 );
};

export default App;
