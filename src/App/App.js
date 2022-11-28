import React, { useMemo } from "react";
import "./App.css";

import Window from "../Components/Window/Window";

import {
  Box,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";

import { getDesignTheme } from "./Theme/Theme";

import Store from "../Redux/Store";
import { Provider } from "react-redux";

function App() {
  const theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTheme("light"))),
    []
  );
  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <Provider store={Store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Window />
        </ThemeProvider>
      </Provider>
    </Box>
  );
}

export default App;
