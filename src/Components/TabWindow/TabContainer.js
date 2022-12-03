import React, { Children } from "react";
import { Box } from "@mui/material";

export default function TabContainer({ index, children, ...props }) {
  return (
    <Box {...props}>
      {children instanceof Array ? children[index] : children}
    </Box>
  );
}
