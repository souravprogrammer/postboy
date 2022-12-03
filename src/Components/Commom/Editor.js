import React, { useLayoutEffect, useState } from "react";

import { Box } from "@mui/material";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

import "./editor.css";

export default function Edit(props) {
  return (
    <Box>
      <Editor
        value={props?.code ?? ""}
        onValueChange={(code) => {
          props?.setCode?.(code);
        }}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontSize: 12,

          ...props.sx,
        }}
      />
    </Box>
  );
}
