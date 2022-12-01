import React, { useMemo } from "react";

import {
  Grid,
  InputBase,
  FormControl,
  OutlinedInput,
  Button,
  //   FormHelperText,
  Checkbox,
} from "@mui/material";

function Row({ onRemove, data, change }) {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
      }}
    >
      {useMemo(
        () => (
          <Grid item>
            <Checkbox checked={true} />
          </Grid>
        ),

        []
      )}

      <Grid item>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            placeholder="key"
            value={data?.key}
            onChange={(e) => {
              change?.({ ...data, key: e.target.value });
            }}
            id="outlined-adornment-weight"
            //   value={values.weight}
            //   onChange={handleChange("weight")}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            sx={{
              height: "36px",
            }}
          />
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            value={data?.value}
            onChange={(e) => {
              change?.({ ...data, value: e.target.value });
            }}
            placeholder="value"
            id="outlined-adornment-weight"
            //   value={values.weight}
            //   onChange={handleChange("weight")}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            sx={{
              height: "36px",
            }}
          />
        </FormControl>
      </Grid>

      <Grid item>
        <Button
          variant="outlined"
          onClick={() => {
            onRemove?.(data);
          }}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
}

export default React.memo(Row);
