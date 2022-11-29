import React from "react";

import { Box } from "@mui/material";
import TabWindow from "../../TabWindow/TabWindow";

export default function MainPannel() {
  return (
    <Box
      sx={{
        // border: "1px solid red",
        height: "100%",
      }}
    >
      <TabWindow />
    </Box>
  );
}
