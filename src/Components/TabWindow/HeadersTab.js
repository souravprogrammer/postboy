import React, { useState, useLayoutEffect } from "react";
import { Grid, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Row from "./Row";
import { ChangeRequest } from "../../Redux";
import { ApiRequest } from "./TabWindow";

export default function HeadersTab({ uuid }) {
  const header = useSelector((s) => s.req[uuid].header);

  const dispatch = useDispatch();

  const addRow = () => {
    dispatch(
      ChangeRequest(
        ApiRequest({
          uuid,
          header: [...header, { key: "", value: "" }],
        })
      )
    );
  };

  const onChangeparam = async (param) => {
    const list = header?.map((h, i) => {
      return param.index === i ? (delete param.index ? param : param) : h;
    });
    dispatch(
      ChangeRequest(
        ApiRequest({
          uuid,
          header: [...list],
        })
      )
    );
  };

  const onRemove = async (param) => {
    const list = header?.filter((h, i) => {
      return param?.index !== i;
    });
    dispatch(
      ChangeRequest(
        ApiRequest({
          uuid,
          header: [...list],
        })
      )
    );
  };

  return (
    <Grid>
      <Grid
        sx={{
          maxHeight: "150px",
          overflowY: "scroll",
          overflowX: "hidden",
          margin: "8px 0px",
        }}
      >
        {header?.map((h, index) => {
          return (
            <Row
              key={index}
              data={{ ...h, index }}
              change={onChangeparam}
              onRemove={onRemove}
            />
          );
        })}
      </Grid>
      <Button variant="outlined" onClick={addRow}>
        Add
      </Button>
    </Grid>
  );
}
