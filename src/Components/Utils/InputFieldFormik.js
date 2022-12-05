import React from "react";

import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import { useFormikContext, useField } from "formik";
const MyInput = React.forwardRef((props, ref) => {
  const { sx, name, handler, label, ...rest } = props;
  const { handleBlur, handleChange, errors, values, touched } = handler;

  return (
    <TextField
      label={label ? (props?.validation ? `${label} *` : label) : ""}
      size="small"
      variant="standard"
      name={name}
      ref={(el) => ref && (ref.current[name] = el)}
      onBlur={handleBlur}
      onChange={handleChange}
      value={values[`${name}`]}
      error={touched[`${name}`] && Boolean(errors[`${name}`])}
      helperText={touched[`${name}`] && errors[`${name}`]}
      sx={{
        width: "100%",
        fontSize: "18px",
        "&:hover:not(.Mui-disabled):not(.mui):before": {
          borderBottom: "2px solid",
          borderColor: "border.primary",
        },
        "&.Mui-error": {
          color: "text.secondary",
        },
        ...sx,
      }}
      {...rest}
    />
  );
});

const SelectType = React.forwardRef((props, ref) => {
  const { sx, name, handler, disable, options, label, ...rest } = props;
  const { handleBlur, errors, values, touched } = handler;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <Grid>
      <FormControl
        variant="standard"
        error={touched[`${name}`] && Boolean(errors[`${name}`])}
        sx={{ width: "100%" }}
      >
        {label ? (
          <InputLabel
            sx={{
              color:
                touched[`${name}`] && Boolean(errors[`${name}`]) && "#da4e4e",
            }}
          >
            {label ? (props?.validation ? `${label} *` : label) : ""}
          </InputLabel>
        ) : null}
        <Select
          size="small"
          variant="standard"
          name={name}
          displayEmpty={label ? false : true}
          ref={(el) => (ref.current[name] = el)}
          value={values[`${name}`]}
          label={label ? (props?.validation ? `${label} *` : label) : ""}
          onChange={(e) => {
            props?.handelchange && props.handelchange(e.target.value);
            setFieldValue(field.name, e.target.value);
          }}
          error={touched[`${name}`] && Boolean(errors[`${name}`])}
          onBlur={handleBlur}
          sx={{
            width: "100%",
            pt: label ? "0px" : "17px",
            color:
              touched[`${name}`] && Boolean(errors[`${name}`]) && "#da4e4e",
            "&:hover:not(.Mui-disabled):not(.mui):before": {
              borderBottom: "2px solid",
              borderColor: "border.primary",
            },
            ...sx,
          }}
          {...rest}
        >
          {options.map((option, i) => (
            <MenuItem
              key={i}
              disabled={i == disable || option.disable}
              value={option.value}
            >
              {option.key}
            </MenuItem>
          ))}
        </Select>
        {touched[`${name}`] && (
          <Typography color="error" sx={{ fontSize: "12px", m: "6px 0px 0px" }}>
            {errors[`${name}`]}
          </Typography>
        )}
      </FormControl>
    </Grid>
  );
});

export default MyInput;

export { SelectType };
