import { useState, useRef } from "react";
import "./InputStyle.css";

import { Box } from "@mui/material";
const REGEX = /({{.*?}})/g;

export default function MyInputField() {
  const [value, setValue] = useState("");
  const ref = useRef(null);

  const syncScroll = (e) => {
    ref.current.scrollTop = e.target.scrollTop;
    ref.current.scrollLeft = e.target.scrollLeft;
  };

  return (
    <Box className="input-container">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onScroll={syncScroll}
        placeholder="Enter URL"
      />
      <div ref={ref} className="input-renderer">
        {value.split(REGEX).map((word, i) => {
          if (word.match(REGEX) !== null) {
            return (
              <Box key={i} sx={{ color: "primary.main" }}>
                {word}
              </Box>
            );
          } else {
            return <span key={i}>{word}</span>;
          }
        })}
      </div>
    </Box>
  );
}
