import AppRoutes from "@routes";
import { QueryClientProvider } from "react-query";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { defaultTheme } from "@styles";
import { queryClient } from "@utils";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
