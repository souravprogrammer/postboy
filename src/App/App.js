import React, { useMemo } from "react";
import "./App.css";

import {
  Box,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";

import Store from "../Redux/Store";
import { Provider } from "react-redux";
import { getDesignTheme } from "./Theme/Theme";

import BaseLayout from "../Components/Layout/BaseLayout";
import "./Split.css";

function App() {
  const theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTheme("light"))),
    []
  );
  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <Provider store={Store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BaseLayout />
        </ThemeProvider>
      </Provider>
    </Box>
  );
}

export default App;
