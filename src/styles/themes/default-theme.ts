import { createTheme } from "@mui/material/styles";
import { tailwindColors } from "@utils";
import { components } from "./components.theme";

export const defaultTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontWeightRegular: 500,
    fontSize: 12,
  },

  palette: {
    primary: {
      main: tailwindColors.indigo[500],
    },

    error: {
      main: tailwindColors.red[500],
    },
  },

  shape: { borderRadius: 8 },

  components,
});
