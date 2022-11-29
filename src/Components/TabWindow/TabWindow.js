import React from "react";

import {
  Box,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import MyInputField from "../Utils/MyInputField";

function TabWindow() {
  return (
    <Box
      sx={{
        // border: "1px solid green",
        height: "100%",
        padding: "16px 8px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          padding: "16px 0px",
        }}
      >
        https://www.youtube.com/
      </Typography>

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
        <Grid item>
          <FormControl sx={{ minWidth: 150, maxWidth: 150 }}>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={"POST"}
              // onChange={handleChange}
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
        <Grid
          item
          sx={{
            // border: "1px solid green",
            height: "55px",
            width: " calc( 100% - ( 150px + 90px ) )",
          }}
        >
          <MyInputField />
        </Grid>

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
    </Box>
  );
}

export default React.memo(TabWindow);
