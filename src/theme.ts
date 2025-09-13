import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000",
      paper: "#121212",
    },
    text: {
      primary: "#fff",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial",
  },
});
