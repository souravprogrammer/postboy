import React from "react";

import { Box, Typography } from "@mui/material";
// import Editor from "../Commom/Editor";

import ReactJson from "react-json-view";
// import prettier from "prettier/standalone";
import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";
import Edit from "../Commom/Editor";

export default function ResponseContainer({ response }) {
  return (
    <Box
      sx={{
        overflowY: "scroll",
        overflowX: "hidden",
        height: "100%",
        maxHeight: "100%",
        border: "1px solid grey",
      }}
    >
      {typeof response?.data === "string" && (
        <Typography
          sx={{
            wordWrap: "break-word",

            width: "100%",
          }}
        >
          {response?.data}
        </Typography>
      )}

      {typeof response?.data === "object" && (
        <ReactJson
          name={null}
          enableClipboard={false}
          displayDataTypes={false}
          src={response?.data ?? {}}
          collapsed={true}
          displayObjectSize={false}
          style={{
            fontSize: "12px",
          }}
        />
      )}
    </Box>
  );
}
