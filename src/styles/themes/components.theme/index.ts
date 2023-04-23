import { ThemeOptions } from "@mui/material/styles";
import { muiButton } from "./button.theme";
import { muiInputBase } from "./input-base.theme";

export const components: ThemeOptions["components"] = {
  MuiButton: muiButton,
  MuiInputBase: muiInputBase
};
