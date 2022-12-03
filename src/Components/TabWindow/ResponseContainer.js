import React from "react";

import { Box } from "@mui/material";
// import Editor from "../Commom/Editor";

import ReactJson from "react-json-view";

export default function ResponseContainer({ response }) {
  console.log("> ", response);
  return (
    <Box
      sx={{
        // backgroundColor: "rgba(0,0,0,0.04)",
        overflowY: "scroll",
        height: "100%",
        border: "1px solid grey",
      }}
    >
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

      {/* <Editor code={response?.data} input={"object"} /> */}
    </Box>
  );
}
