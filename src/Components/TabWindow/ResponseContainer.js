import React from "react";

import { Box } from "@mui/material";
import Editor from "../Commom/Editor";

export default function ResponseContainer({ response }) {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0,0,0,0.04)",
        overflowY: "scroll",
        height: "100%",
        border: "1px solid red",
      }}
    >
      <Editor />
    </Box>
  );
}
