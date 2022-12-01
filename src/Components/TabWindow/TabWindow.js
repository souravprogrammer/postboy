import React, { useEffect, useMemo, useState } from "react";

import useFetch from "../Functions/ApiHandler";

import {
  Box,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import MyInputField from "../Utils/MyInputField";

import { useSelector, useDispatch } from "react-redux";
import { ChangeRequest } from "../../Redux";
import SearchParamTab from "./SearchParamTab";

function TabWindow({ uuid }) {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [response, dispatchRequest] = useFetch();

  useEffect(() => {
    dispatchRequest({
      url: "https://jsonplaceholder.typicode.com/posts/1",
      method: "get",
    });
  }, []);

  useEffect(() => {
    console.log("response: ", response);
  }, [response]);
  return (
    <Box
      sx={{
        height: "100%",
        padding: "16px 8px",
      }}
    >
      <Heading uuid={uuid} />
      <Grid
        container
        sx={{
          alignItems: "center",
          border: "1px solid",
          borderColor: "rgba(0,0,0,0.2)",
          borderRadius: "5px",
          height: "55px",
        }}
      >
        <SelectAPI uuid={uuid} />
        <Inp dispatch={dispatch} uuid={uuid} />

        <Grid item>
          <Button
            variant="contained"
            color={"primary"}
            disableElevation
            sx={{
              color: "#fff",
              height: "48px",
              width: "90px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            send
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: "divider", paddingTop: "8px" }}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => {
            setTabValue(v);
          }}
          aria-label="basic tabs example"
          sx={{
            height: "32px",
            minHeight: "32px",
          }}
        >
          {["Params", "Authorization", "Headers", "body"].map((m, i) => {
            return (
              <Tab
                label={m}
                key={i}
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  padding: "4px 8px",
                  // padding: "4px",
                  height: "32px",
                  minHeight: "32px",
                }}
              />
            );
          })}
        </Tabs>
      </Box>

      {tabValue === 0 ? <SearchParamTab uuid={uuid} /> : null}

      {/* {tabValue} */}
    </Box>
  );
}

const Heading = React.memo(({ uuid }) => {
  const url = useSelector((s) => s?.req[uuid]?.url);
  return (
    <Typography
      sx={{
        fontWeight: "bold",
        fontSize: "14px",
        padding: "16px 0px",
      }}
    >
      {url}
    </Typography>
  );
});
const SelectAPI = ({ uuid }) => {
  const method = useSelector((s) => s?.req[uuid]?.method);
  const dispatch = useDispatch();

  const handleChange = (c) => {
    dispatch(
      ChangeRequest(
        ApiRequest({
          method: c.target.value,
          uuid: uuid,
        })
      )
    );
  };
  return (
    <Grid item>
      <FormControl sx={{ minWidth: 150, maxWidth: 150 }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={method ?? "GET"}
          onChange={handleChange}
          autoWidth
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            height: "55px",
            outline: "none",
          }}
        >
          <MenuItem value={"GET"}>GET</MenuItem>
          <MenuItem value={"POST"}>POST</MenuItem>
          <MenuItem value={"PUT"}>PUT</MenuItem>
          <MenuItem value={"PATCH"}>PATCH</MenuItem>
          <MenuItem value={"DELETE"}>DETELTE</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

const Inp = React.memo(({ dispatch, uuid }) => {
  const url = useSelector((s) => s?.req[uuid]?.url);

  return (
    <Grid
      item
      sx={{
        height: "55px",
        width: " calc( 100% - ( 150px + 90px ) )",
      }}
    >
      <MyInputField
        initialValue={url}
        change={(value) => {
          console.log("value", value);
          dispatch(
            ChangeRequest(
              ApiRequest({
                url: value,
                uuid,
              })
            )
          );
        }}
      />
    </Grid>
  );
});

export function ApiRequest(params) {
  return {
    ...params,
  };
}

export default React.memo(TabWindow);
