import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Edit from "../Commom/Editor";
import { ApiRequest } from "./TabWindow";
import { ChangeRequest } from "../../Redux";

export default function BodyTab({ uuid }) {
  const body = useSelector((s) => s.req[uuid].body);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(">>> ", body);
  }, [body]);
  return (
    <Box
      sx={{
        border: "1px solid rgba(0,0,0,0.2)",
        height: "100%",
        overflowY: "scroll",
        borderRadius: "3px",
      }}
    >
      <Edit
        code={body}
        setCode={(c) => {
          console.log(c);
          dispatch(
            ChangeRequest(
              ApiRequest({
                uuid,
                body: c,
              })
            )
          );
        }}
        sx={{ minHeight: "230px" }}
      />
    </Box>
  );
}
