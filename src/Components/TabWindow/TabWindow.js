import React, { useEffect, useMemo, useState } from "react";
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
import TabContainer from "./TabContainer";

import SearchParamTab from "./SearchParamTab";
import AuthenticationTab from "./AuthenticationTab";
import HeadersTab from "./HeadersTab";
import BodyTab from "./BodyTab";
import SaveIcon from "@mui/icons-material/Save";
import SaveModal from "./SaveModal";

function TabWindow({ uuid, response, dispatchRequest }) {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    console.log("response: ", response);
  }, [response]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        padding: "16px 8px",
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
      }}
    >
      <Box
        sx={{
          width: "100%",
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
          <SendRequest uuid={uuid} dispatch={dispatchRequest} />
        </Grid>

        <Box
          sx={{ borderBottom: 1, borderColor: "divider", paddingTop: "8px" }}
        >
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

                    height: "32px",
                    minHeight: "32px",
                  }}
                />
              );
            })}
          </Tabs>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",

          overflowY: "scroll",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",

            position: "relative",
          }}
        >
          <Grid
            sx={{
              padding: "8px 16px",

              width: "100%",
            }}
          >
            <TabContainer
              index={tabValue}
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <SearchParamTab uuid={uuid} />
              <AuthenticationTab uuid={uuid} />
              <HeadersTab uuid={uuid} />
              <BodyTab uuid={uuid} />
            </TabContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const SendRequest = ({ uuid, dispatch }) => {
  const request = useSelector((s) => s.req[uuid]);
  const [headers, setHeaders] = useState({});

  useEffect(() => {
    const h = {};
    request?.headers?.forEach((e) => {
      h[e.key] = e.value;
    });

    setHeaders(h);
  }, [request?.headers]);

  const sendResponsehandler = () => {
    const Authorization = {};
    if (request?.Authorization?.type && request?.Authorization?.token) {
      Authorization[
        "Authorization"
      ] = `${request?.Authorization?.type} ${request?.Authorization?.token}`;
    }

    dispatch({
      url: request?.url ?? "",
      method: request?.method ?? "get",
      data: request?.body,
      headers: { ...headers, ...Authorization },
    });
  };
  return (
    <Grid item>
      <Button
        variant="contained"
        color={"primary"}
        disableElevation
        onClick={sendResponsehandler}
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
  );
};

const Heading = React.memo(({ uuid }) => {
  const [open, setOpen] = useState(false);
  const url = useSelector((s) => s?.req[uuid]?.url);
  const name = useSelector((s) => s?.req[uuid]?.name);

  const handlOpen = (s) => {
    setOpen?.(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 8px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          padding: "16px 0px",
        }}
      >
        {name ? name : url}
      </Typography>

      <Box>
        <Button
          variant={"outlined"}
          color={"disable"}
          startIcon={<SaveIcon />}
          disabled={!!name}
          onClick={handlOpen}
          sx={
            {
              // color: "#fff",
            }
          }
          disableElevation
        >
          Save
        </Button>
      </Box>
      <SaveModal open={open} setOpen={setOpen} uuid={uuid} />
    </Box>
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
