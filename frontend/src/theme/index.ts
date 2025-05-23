import { createTheme } from "@mui/material/styles";

const THEME = createTheme({
  typography: {
    fontFamily: `"Nunito", "ui-sans-serif", "system-ui", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default THEME;