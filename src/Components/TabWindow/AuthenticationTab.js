import React from "react";

import {
  Box,
  Grid,
  Typography,
  FormControl,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function AuthenticationTab({ uuid }) {
  return (
    <Grid
      container
      sx={{
        // height: "150px",
        height: "100%",
      }}
    >
      <Grid item xs={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", color: "grey", fontSize: "14px" }}
          >
            Type
          </Typography>

          <FormControl sx={{ minWidth: 150, maxWidth: 150 }}>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={"no auth"}
              //   onChange={}
              autoWidth
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                height: "40px",
                outline: "none",
              }}
            >
              <MenuItem value={"no auth"}>No Auth</MenuItem>
              <MenuItem value={"bearer"}>bearer Token</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            padding: "8px 16px",
            textAlign: "left",
          }}
        >
          <Typography sx={{ color: "grey", fontSize: "14px" }}>
            The authorization header will be automatically generated when you
            send the request.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{
            display: "flex",
            padding: "8px 6px",
          }}
        >
          <Box>
            <InfoOutlinedIcon sx={{ color: "grey", height: "18px" }} />
          </Box>
          <Box sx={{ padding: "0px 8px" }}>
            <Typography sx={{ color: "grey", fontSize: "14px" }}>
              Heads up! These paremeters hold sensitive data. To keeep this data
              secure while working in a collaborative environment , we recommend
              using variables.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            padding: "8px 16px",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", color: "grey", fontSize: "14px" }}
          >
            Token
          </Typography>

          <OutlinedInput
            placeholder="Token"
            sx={{
              height: "38px",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
