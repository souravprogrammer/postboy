import React, { useState, useLayoutEffect } from "react";
import { Grid, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Row from "./Row";
import useCustSearchparams from "../Functions/useCustomSearchParam";
import { ChangeRequest } from "../../Redux";
import { ApiRequest } from "./TabWindow";

export default function SearchParamTab({ uuid }) {
  const [params, setParams] = useState([]);
  const url = useSelector((s) => s.req[uuid].url);

  const dispatch = useDispatch();
  const searchparams = useCustSearchparams(url);

  useLayoutEffect(() => {
    setParams(searchparams);
  }, [searchparams]);

  const addRow = () => {
    setParams((p) => [...p, { key: "", value: "" }]);
  };

  const onChangeparam = async (param) => {
    const cpy = { ...param };
    const par = params.map((m, i) =>
      cpy.index === i ? (delete cpy.index ? cpy : cpy) : m
    );
    setParams((p) => {
      return p.map((m, i) =>
        param.index === i ? (delete param.index ? param : param) : m
      );
    });
    let searchlist = [];
    for (let p of par) {
      searchlist.push(new URLSearchParams({ [p.key]: p.value }).toString());
    }
    if (searchlist.length > 0) {
      const value = url.split(/\?(.*)/s)[0] + "?" + searchlist.join("&");
      dispatch(
        ChangeRequest(
          ApiRequest({
            url: value,
            uuid,
          })
        )
      );
    }
  };

  const onRemove = async (param) => {
    const par = params.filter((f, i) => i !== param.index);
    setParams((p, i) => {
      return p.filter((f) => i !== param.index);
    });

    console.log(">> ", par);
    let searchlist = [];
    for (let p of par) {
      searchlist.push(new URLSearchParams({ [p.key]: p.value }).toString());
    }

    const value = url.split(/\?(.*)/s)[0] + "?" + searchlist.join("&");
    dispatch(
      ChangeRequest(
        ApiRequest({
          url: value,
          uuid,
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
        {params?.map((parm, index) => {
          return (
            <Row
              key={index}
              data={{ ...parm, index }}
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
